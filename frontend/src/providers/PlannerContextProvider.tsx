import { createContext, ReactNode, useState } from "react";
import { SelectorSettingType } from "../types/selector";
import { PlannerContextType } from "../types/providers";
import { isValidKeyValue } from "../utils/utils";
import { INITIAL_SEMESTER_ID } from "../constants/semesterData";

export const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

const INITIAL_FORM_DATA = {
    effect: -1,
    semester: INITIAL_SEMESTER_ID,
    type: -1,
    tag: -1,
};

interface Props {
    children: ReactNode;
}

const PlannerContextProvider = ({ children }: Props) => {
    const [filterValue, setFilterValue] = useState<string>("");
    const [formData, setFormData] = useState<SelectorSettingType>(INITIAL_FORM_DATA);

    const handleFormDataChange = <T extends keyof SelectorSettingType>(key: string, value: SelectorSettingType[T]) => {
        if (isValidKeyValue(key, formData)) {
            setFormData({
                ...formData,
                [key]: value,
            });
            return;
        }
        throw new Error(`Invalid Form Key ${key}`);
    };

    const plannerContext: PlannerContextType = {
        handleFormDataChange: handleFormDataChange,
        handleFilterValueChange: (newValue: string) => setFilterValue(newValue),
        filterValue: filterValue,
        ...formData,
    };

    return <PlannerContext.Provider value={plannerContext}>{children}</PlannerContext.Provider>;
};

export default PlannerContextProvider;
