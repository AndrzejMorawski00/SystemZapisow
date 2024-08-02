import { createContext, ReactNode, useState } from "react";
import { SelectorSettingType } from "../types/selector";
import { isValidKeyValue } from "../utils";

export type PlannerContextType = {
    handleFormDataChange: <T extends keyof SelectorSettingType>(key: string, value: SelectorSettingType[T]) => void;
    handleFilterValueChange: (newValue: string) => void;
    filterValue: string;
} & SelectorSettingType;

export const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

const INITIAL_FORM_DATA = {
    effect: -1,
    semester: -1,
    type: -1,
    tag: -1,
};

interface IPlannerContextProvider {
    children: ReactNode;
}

const PlannerContextProvider = ({ children }: IPlannerContextProvider) => {
    const [filterValue, setFilterValue] = useState("");
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
