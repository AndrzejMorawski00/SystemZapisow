import { useContext } from "react";
import { PlannerContext } from "../providers/PlannerContextProvider";
import { PlannerContextType } from "../types/providers";
const usePlannerContext = (): PlannerContextType => {
    const context = useContext(PlannerContext);
    if (context === undefined) {
        throw new Error("Planner Context is Undefined");
    }
    return context;
};

export default usePlannerContext;
