import { SelectorSettingType } from "./selector";

export type ErrorMessagesContextType = {
    messages: string[];
    handleAddMessages: (newMessages: string[]) => void;
    handleRemoveMessages: () => void;
};

export type PlannerContextType = {
    handleFormDataChange: <T extends keyof SelectorSettingType>(key: string, value: SelectorSettingType[T]) => void;
    handleFilterValueChange: (newValue: string) => void;
    filterValue: string;
} & SelectorSettingType;

export type StudiesProgressType = {
    type: "Inżynierskie" | "Licencjackie";
    i_ects: number;
    iinz_ects: number;
    kinz_ects: number;
    oikp_ects: number;
    project: number;
    tags: number[];
    ps: number;
    practices: number;
    hs_ects: number;
    owi_ects: number;
    e_ects: number;
};

export type StudiesProgresContextType = {
    studiesProgress: StudiesProgressType;
    handleStudiesProgressChange: <T extends keyof Omit<StudiesProgressType, "type">>(
        key: string,
        value: StudiesProgressType[T]
    ) => void;
};

export type StudiesProgressRequirementObject = {
    types: number[];
    keyName: keyof Omit<StudiesProgressType, "type">;
};
