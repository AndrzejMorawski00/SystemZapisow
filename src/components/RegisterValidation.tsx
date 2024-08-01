import { useEffect } from "react";
import { RegisterFormDataType, ValidationRule } from "../types/auth";

interface IPasswordValidation {
    formData: RegisterFormDataType;
    handleFormValidChange: (newVal: boolean) => void;
}

const validationRules: ValidationRule[] = [
    {
        message: "Username has more than 5 characters",
        validationFn: ({ username }) => username.length > 5,
    },
    {
        message: "Password has more than 8 characters",
        validationFn: ({ password }) => password.length > 8,
    },
    {
        message: "Passwords match",
        validationFn: ({ password, repeatPassword }) => password.length > 0 && password === repeatPassword,
    },
    {
        message: "Password has a number",
        validationFn: ({ password }) => /\d/g.test(password),
    },
    {
        message: "Password has a capital letter",
        validationFn: ({ password }) => /[A-Z]/.test(password),
    },
    {
        message: "Password has special characters",
        validationFn: ({ password }) => /[~`¿¡!#$%\^&*€£@+÷=\-\[\]\\';,/{}\(\)|\\":<>\?\.\_]/g.test(password),
    },
];

const RegisterValidation = ({ formData, handleFormValidChange }: IPasswordValidation) => {
    useEffect(() => {
        const isValid = validationRules.every((rule) => rule.validationFn(formData));
        handleFormValidChange(isValid);
    }, [formData, handleFormValidChange]);

    const validationMessages = validationRules.map((rule, key) => (
        <li key={key}>
            <div>{rule.validationFn(formData) ? "Yes" : "No"}</div>
            <p>{rule.message}</p>
        </li>
    ));

    return <ul>{validationMessages}</ul>;
};

export default RegisterValidation;
