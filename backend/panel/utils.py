from typing import Dict, List
from django.db import IntegrityError
from django.http import HttpRequest
from .data_types import CourseDict
from .models import Course, CourseTag, CourseEffect, CourseType, Semester
from .site_crawler import SiteCrawler


def has_permission(request: HttpRequest, groups: List[str]) -> bool:
    is_admin = False
    if request.user:
        if request.user.is_staff or request.user.is_superuser:  # type:ignore
            is_admin = True
        mod = True if request.user.groups.filter(  # type:ignore
            name__in=groups).exists() else False
        return is_admin or mod
    return False


schema = '''{
  "semester": int,
  "courses": [
    {
      "id": int,
      "name": str,
      "url": str,
      "recommended_for_first_year": boolean,
      "type": {
        "id": int,
        "name": str,
        "shortcut": str
      },
      "ects": int,
      "tags": [
        {
          "id": int,
          "name": str,
          "shortcut": str
        }
      ],
      "effects": [
        {
          "id": int,
          "name": str,
          "shortcut": str
        }
      ]
    }
  ]
}
'''


def has_metadata() -> bool:
    has_tags = CourseTag.objects.exists()
    has_effects = CourseEffect.objects.exists()
    has_types = CourseType.objects.exists()
    return all([has_effects, has_tags, has_types])


def fetch_semester_data(selected_semesters: List[Semester]) -> int:
    sc = SiteCrawler()
    counter: int = 0
    for semester in selected_semesters:
        if semester.fetched:
            continue
        sc_response = sc.get_semester_subjects(semester.link)
        counter += process_courses(sc_response, semester, fetch_ects=True)
        semester.fetched = True
        semester.save()
    return counter


def process_courses(course_data: List[CourseDict], semester: Semester, fetch_ects: bool) -> int:
    counter: int = 0
    sc = SiteCrawler()

    for subject in course_data:
        response_keys = ['id', 'name', 'courseType',
                         'recommendedForFirstYear', 'effects', 'tags', 'url']
        course_keys = ['pk', 'name', 'type',
                       'recommended_for_first_year', 'effects', 'tags', 'url']
        course_dict: Dict = {}
        relations_dict: Dict = {}
        course_dict = {}
        for i, key in enumerate(response_keys):
            if key in subject:
                if key in ['courseType', 'effects', 'tags']:
                    relations_dict[course_keys[i]] = subject[key]
                else:
                    course_dict[course_keys[i]] = subject[key]
            else:
                raise KeyError(f'Invalid key: {key}')
        course_dict['ects'] = sc.get_subject_details(
            subject['url']) if fetch_ects else subject['ects']
        counter += create_course(course_dict, relations_dict, semester)
    return counter


def create_course(course_dict: Dict, relations_dict: Dict, semester: Semester) -> int:
    tags = CourseTag.objects.filter(pk__in=relations_dict['tags'])
    effects = CourseEffect.objects.filter(pk__in=relations_dict['effects'])
    try:
        course_type = CourseType.objects.get(pk=relations_dict['type'])
        course = Course.objects.create(
            **course_dict, type=course_type, semester=semester)
        course.tags.add(*tags)
        course.effects.add(*effects)
        course.save()
        return 1
    except (CourseType.DoesNotExist, Course.MultipleObjectsReturned, IntegrityError) as e:
        print(f'Exception: {e}')
        return 0
