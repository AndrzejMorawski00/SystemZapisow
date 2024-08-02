import { UserPlan } from "../types";

export type NewUserPlan = Omit<UserPlan, 'pk' | 'owner' | 'slug'>