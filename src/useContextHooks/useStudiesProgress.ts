import { useContext } from "react";
import { StudiesProgressContext } from "../providers/StudiesProgressProvider";
import { StudiesProgresContextType } from "../types";
const useStudiesProgressContext = (): StudiesProgresContextType => {
    const context = useContext(StudiesProgressContext);
    if (context === undefined) {
        throw new Error("Studies Progress Context is Undefined");
    }
    return context;
};

export default useStudiesProgressContext;
