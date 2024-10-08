import { PLAN_TYPES, REQUIREMENT_ID_MAPPING } from "../../constants/studiesProgress";
import { Course } from "../../types/courseTypes";
import { GetUserSemester } from "../../types/planTypes";
import { StudiesProgressType } from "../../types/providers";
import { getInitialStudiesData } from "./getStudiesType";

export class StudiesProgressHandler {
    private takenCourses: Course[];
    private studiesProgress: StudiesProgressType;

    constructor(userSemesters: GetUserSemester[], planType: (typeof PLAN_TYPES)[number]) {
        this.takenCourses = userSemesters.flatMap((semester) => semester.courses);
        this.studiesProgress = getInitialStudiesData(planType);
    }

    private handleStudiesProgressChange<T extends keyof Omit<StudiesProgressType, "type">>(
        key: T,
        newValue: StudiesProgressType[T]
    ): void {
        this.studiesProgress[key] = newValue;
    }

    public getStudiesProgress(): StudiesProgressType {
        this.takenCourses.forEach((course) => {
            this.updateUserStudiesProgress(course);
        });

        return this.studiesProgress;
    }

    private updateOtherProperties(courseTags: number[], course: Course): void {
        const courseEffects = course.effects.map((effect) => effect.id);
        if (courseEffects.includes(11) || courseTags.includes(11)) {
            this.handleStudiesProgressChange("e_ects", course.ects);
        }
        if (course.name.includes("Ochrona własności intelektualnej")) {
            this.handleStudiesProgressChange("owi_ects", course.ects);
        }
        if (course.name.includes("Praktyka zawodowa ")) {
            this.handleStudiesProgressChange("practices", course.ects);
        }
    }

    private updateUserStudiesProgress(course: Course): void {
        const courseTags = course.tags.map((tag) => tag.id);
        this.updateECTSProgress(course);
        this.updateTagsProgress(courseTags);
        this.updateOtherProperties(courseTags, course);
    }

    private updateECTSProgress(course: Course): void {
        REQUIREMENT_ID_MAPPING.forEach((item) => {
            if (item.types.includes(course.type.id)) {
                const newValue = (this.studiesProgress[item.keyName] as number) + course.ects;
                this.handleStudiesProgressChange(item.keyName, newValue);
            }
        });
    }

    private updateTagsProgress(courseTags: number[]): void {
        const newTags = this.studiesProgress["tags"].concat(courseTags);
        this.handleStudiesProgressChange("tags", newTags);
    }
}
