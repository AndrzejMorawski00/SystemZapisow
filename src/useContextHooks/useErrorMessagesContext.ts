import { useContext } from "react";
import { ErrorMessagesContext } from "../providers/ErrorMessagesProvider";
import { ErrorMessagesContextType } from "../types/providers";

const useErrorMessagesContext = (): ErrorMessagesContextType => {
    const context = useContext(ErrorMessagesContext);
    if (context === undefined) {
        throw new Error("Error Message Context is Undefined");
    }
    return context;
};

export default useErrorMessagesContext;
