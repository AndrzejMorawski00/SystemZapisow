import { useState } from "react";
import { isValidKeyValue } from "../../utils";
import PasswordValidation from "../../components/RegisterValidation";
import { RegisterFormDataType } from "../../types/auth";
import useRegister from "../../api/auth/useRegister";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_DATA = {
    username: "",
    password: "",
    repeatPassword: "",
};

const Register = () => {
    const registerMutation = useRegister();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormDataType>(INITIAL_FORM_DATA);
    const [validForm, setValidForm] = useState(false);
    const handleFormDataChange = <T extends keyof RegisterFormDataType>(
        key: string,
        value: RegisterFormDataType[T]
    ): void => {
        if (isValidKeyValue<RegisterFormDataType>(key, formData)) {
            setFormData({
                ...formData,
                [key]: value,
            });
            return;
        }
        throw new Error(`Invalid key ${key}`);
    };

    const handleFormValidChange = (newVal: boolean) => {
        setValidForm(newVal);
    };

    const handleFormSubmit = async (): Promise<void> => {
        if (!validForm) {
            return
        }
        
        const response = await registerMutation.mutateAsync({...formData})
        console.log(response);
        navigate('/login')
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username:"
                    value={formData.username}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
                <input
                    // type="password"
                    name="password"
                    id="password"
                    placeholder="Password:"
                    value={formData.password}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
                <input
                    // type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    placeholder="Repeat Password:"
                    value={formData.repeatPassword}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
                <button disabled={!validForm} type="submit">
                    Register
                </button>
            </form>
            <PasswordValidation
                formData={formData}
                handleFormValidChange={handleFormValidChange}
            />
        </div>
    );
};

export default Register;
