import { useState } from "react";
import { LoginFormDataType } from "../../types/auth";
import { isValidKeyValue } from "../../utils";
import useLogin from "../../api/auth/useLogin";
const INITIAL_FORM_DATA = {
    username: "",
    password: "",
};

const Login = () => {
    const [formData, setFormData] = useState<LoginFormDataType>(INITIAL_FORM_DATA);
    const loginMutation = useLogin();
    const handleFormDataChange = <T extends keyof LoginFormDataType>(
        key: string,
        value: LoginFormDataType[T]
    ): void => {
        if (isValidKeyValue<LoginFormDataType>(key, formData)) {
            setFormData({
                ...formData,
                [key]: value,
            });
            return;
        }
        throw new Error(`Invalid key ${key}`);
    };

    const handleFormSubmit = async (): Promise<void> => {
        await loginMutation.mutateAsync({ ...formData });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
            }}
        >
            <input
                id="username"
                name="username"
                type="text"
                placeholder="Username:"
                value={formData.username}
                onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
            />
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Password:"
                value={formData.password}
                onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
