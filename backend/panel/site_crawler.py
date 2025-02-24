from bs4 import BeautifulSoup
from bs4.element import Tag
from typing import cast, Optional, Dict, List
from urllib import request
import json
from panel.data_types import CourseDict, SemesterData


DEFAULT_BASE_LINK = 'https://zapisy.ii.uni.wroc.pl'


class SiteCrawler:
    def __init__(self, site_link: str = '') -> None:
        self.base_link = site_link if site_link else DEFAULT_BASE_LINK

    def get_tag(self, bs_source: BeautifulSoup, tag: str, attribute: str, value: str) -> Optional[Tag]:
        res = bs_source.find(tag, {attribute: value})
        return cast(Optional[Tag],  res)

    def get_tags(self, bs_source: BeautifulSoup, tag: str, attribute: str, value: str) -> List[Tag]:
        result = bs_source.findAll(tag, {attribute: value})
        return list(map(lambda x: cast(Tag, x), filter(lambda x: x is not None, result)))

    def get_metadata(self, keys: List[str]) -> Dict[str, Dict[str, str]]:
        path = f'{self.base_link}/offer/'
        source = self.fetch_site(path)
        data: Optional[Tag] = self.get_tag(
            source, 'script', 'id', 'filters-data')
        json_data: Dict[str, Dict[str, str]] = {}
        if data is not None:
            json_data = json.loads(data.text)
        return {key: json_data[key] for key in keys if key in json_data and json_data[key]}

    def get_semesters(self) -> List[SemesterData]:
        path = f'{self.base_link}/courses/'
        source = self.fetch_site(path)
        data = self.get_tags(source, 'a', 'class', 'semester-link')
        semesters: List[SemesterData] = [
            self.extract_semester_data(semester) for semester in data]
        return semesters

    def extract_semester_data(self, semester: Tag) -> SemesterData:
        href_value = cast(str, semester.get('href')).strip() or ''
        name = semester.text.strip()
        try:
            semester_pk = int(href_value.split('/')[-1])
        except ValueError:
            semester_pk = -1
        return SemesterData(pk=semester_pk, name=name, link=href_value)

    def get_semester_subjects(self, semester) -> List[CourseDict]:
        path = f'{self.base_link}{semester}'
        source = self.fetch_site(path)
        self.fetch_site(path)
        data: Optional[Tag] = self.get_tag(
            source, 'script', 'id', 'courses-data')
        if not data:
            return []
        json_data: List[CourseDict] = json.loads(data.text)

        return json_data

    def get_subject_details(self, link: str) -> int:
        path = f'{self.base_link}{link}'
        source = self.fetch_site(path)
        table: Optional[Tag] = self.get_tag(
            source, 'table', 'id', 'table-info')
        ects_value = 0

        if not table:
            return ects_value

        rows: List[Tag] = cast(List[Tag], table.find_all('tr'))
        for row in rows:
            th = row.find('th')
            if th and 'ECTS' in th.get_text():
                td = row.find('td')
                if td:
                    ects_value = int(td.get_text(strip=True))
                    break
        return ects_value

    def fetch_site(self, path: str) -> BeautifulSoup:
        with request.urlopen(path) as response:
            return BeautifulSoup(response, 'lxml')
