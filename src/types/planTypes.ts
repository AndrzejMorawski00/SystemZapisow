import { PLAN_TYPES } from "../constants/studiesProgress";
import { Course } from "./courseTypes";

export type NewUserPlan = Omit<UserPlan, "pk" | "owner" | "slug" | "semesters"> & {
    create: Boolean;
};

export type UserPlan = {
    pk: number;
    name: string;
    slug: string;
    owner: number;
    type: (typeof PLAN_TYPES)[number];
    semesters: GetUserSemester[];
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
