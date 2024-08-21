export type LoginFormData = {
    username: string;
    password: string;

};
export type RegisterFormData = {
    username: string;
    password: string;
    repeatPassword: string;
};

export type RegisterFormDataTypeKey = keyof RegisterFormData

export type ValidationRule = {
    message: string;
    validationFn: (formData : RegisterFormData) => boolean;
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
