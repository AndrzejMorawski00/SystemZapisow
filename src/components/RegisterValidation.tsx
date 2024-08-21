import { useEffect } from "react";
import { validationRules } from "../constants/register";
import { RegisterFormData } from "../types/auth";

interface Props {
    formData: RegisterFormData;
    handleFormValidChange: (newVal: boolean) => void;
}
const RegisterValidation = ({ formData, handleFormValidChange }: Props) => {
    useEffect(() => {
        const isValid = validationRules.every((rule) => rule.validationFn(formData));
        handleFormValidChange(isValid);
    }, [formData]);

    return (
        <ul className="flex flex-col gap-2 text-white text-2xl">
            {validationRules.map((rule, key) => (
                <li key={key} className="flex items-center">
                    <span
                        className={`w-4 h-4 mr-2 rounded-full ${
                            rule.validationFn(formData) ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></span>
                    <p className="tracking-wide ml-2">{rule.message}</p>
                </li>
            ))}
        </ul>
    );
};

export default RegisterValidation;
