import { PLAN_TYPES } from "../constants";

export type NewUserPlan = {
    name: string;
    type: (typeof PLAN_TYPES)[number];
};