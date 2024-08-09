import { PLAN_TYPES } from "./constants";
import { SelectorSettingType } from "./types/selector";

export type Course = {
    id: number;
    name: string;
    ects: number;
    recommended_for_first_year: boolean;
    type: number;
    effects: number[];
    tags: number[];
};

export type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

export type CourseEffect = {
    id: number;
    name: string;
};

export type CourseTag = {
    id: number;
    name: string;
    shortcut: string;
};

export type CourseType = {
    id: number;
    name: string;
    shortcut: string;
};

export type Semester = {
    id: number;
    name: string;
};

export type UserPlan = {
    pk: number;
    name: string;
    slug: string;
    owner: number;
    type: (typeof PLAN_TYPES)[number];
    semesters: number[];
};

export type UserSemester = {
    id: number;
    name: string;
    owner: number;
    plan: number;
    courses: Course[];
};

export type PlannerContextType = {
    handleFormDataChange: <T extends keyof SelectorSettingType>(key: string, value: SelectorSettingType[T]) => void;
    handleFilterValueChange: (newValue: string) => void;
    filterValue: string;
} & SelectorSettingType;
