import { PLAN_TYPES } from "./constants";
import { SelectorSettingType } from "./types/selector";

export type Course = {
    id: number;
    name: string;
    ects: number;
    recommended_for_first_year: boolean;
    type: CourseType;
    effects: CourseEffect[];
    tags: CourseTag[];
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

export type GetUserSemester = {
    id: number;
    name: string;
    owner: number;
    plan: number;
    courses: Course[];
};

export type EditUserSemester = {
    id: number;
    name: string;
    owner: number;
    plan: number;
    courses: number[];
};

export type PlannerContextType = {
    handleFormDataChange: <T extends keyof SelectorSettingType>(key: string, value: SelectorSettingType[T]) => void;
    handleFilterValueChange: (newValue: string) => void;
    filterValue: string;
} & SelectorSettingType;

export type StudiesProgressType = {
    type: "Engineer" | "Bachelor";
    i_ects: number;
    iinz_ects: number;
    kinz_ects: number;
    oikp_ects: number;
    project: number;
    tags: number[];
    ps: number;
    practices: number;
    hs_ects: number;
    owi_ects: number;
    e_ects: number;
};

export type StudiesProgresContextType = {
    studiesProgress: StudiesProgressType;
    handleStudiesProgressChange: <T extends keyof Omit<StudiesProgressType, 'type'>>(
        key: string,
        value: StudiesProgressType[T]
    ) => void;
};

export type StudiesProgressRequirementObject = {
    tagIdList: number[];
    keyName: keyof StudiesProgressType;
};
