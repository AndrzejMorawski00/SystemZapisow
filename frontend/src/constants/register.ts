import { ValidationRule } from "../types/auth";

export const validationRules: ValidationRule[] = [
    {
        message: "Nazwa użytkownika ma więcej niż 5 znaków",
        validationFn: ({ username }) => username.length > 5,
    },
    {
        message: "Hasło ma więcej niż 8 znaków",
        validationFn: ({ password }) => password.length > 8,
    },
    {
        message: "Hasła się zgadzają",
        validationFn: ({ password, repeatPassword }) => password.length > 0 && password === repeatPassword,
    },
    {
        message: "Hasło zawiera cyfrę",
        validationFn: ({ password }) => /\d/g.test(password),
    },
    {
        message: "Hasło zawiera dużą literę",
        validationFn: ({ password }) => /[A-Z]/.test(password),
    },
    {
        message: "Hasło zawiera znak specjalny",
        validationFn: ({ password }) => /[~`¿¡!#$%\^&*€£@+÷=\-\[\]\\';,/{}\(\)|\\":<>\?\.\_]/g.test(password),
    },
];

export const INITIAL_REGISTER_FORM_DATA = {
    username: "",
    password: "",
    repeatPassword: "",
};
