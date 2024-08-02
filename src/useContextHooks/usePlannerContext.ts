import { useContext } from "react";
import { PlannerContext, PlannerContextType } from "../providers/PlannerContextProvider";

export const usePlannerContext = (): PlannerContextType => {
    const context = useContext(PlannerContext);
    if (context === undefined) {
        throw new Error("Planner Context is Undefined");
    }
    return context;
};
