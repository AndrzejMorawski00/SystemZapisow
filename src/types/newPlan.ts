import { PLAN_TYPES } from "../constants";
import { UserPlan } from "../types";

export type NewUserPlan = Omit<UserPlan, 'pk' | 'owner'>