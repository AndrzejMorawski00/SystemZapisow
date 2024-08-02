import { PLAN_TYPES } from "./constants";

export type Course = {
    id: number;
    name: string;
    ects: number;
    recommended_for_first_year: boolean;
    type: number;
    effects: number[];
    tags: number[];
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
};

export type UserSemester = {};
