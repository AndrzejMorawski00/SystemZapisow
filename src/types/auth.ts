export type LoginFormDataType = {
    username: string;
    password: string;

};
export type RegisterFormDataType = {
    username: string;
    password: string;
    repeatPassword: string;
};

export type RegisterFormDataTypeKey = keyof RegisterFormDataType

export type ValidationRule = {
    message: string;
    validationFn: (formData : RegisterFormDataType) => boolean;
};

export type ValidationRulesNames =
    | "usernameLength"
    | "passwordLength"
    | "passwordsMatch"
    | "containsNumber"
    | "containsCapital"
    | "containsSpecial";

export type ValidationRulesMap = {
    [key in ValidationRulesNames]: ValidationRule;
};
