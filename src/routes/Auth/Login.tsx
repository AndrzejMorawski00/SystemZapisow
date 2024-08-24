import { useState } from "react";
import useLoginUser from "../../api/auth/useLoginUser";
import { Link } from "react-router-dom";
import useErrorMessagesContext from "../../useContextHooks/useErrorMessagesContext";
import { INITIAL_LOGIN_FORM_DATA } from "../../constants/login";
import { LoginFormData } from "../../types/auth";
import { isValidKeyValue } from "../../utils/utils";


const Login = () => {
    const { handleAddMessages } = useErrorMessagesContext();
    const [formData, setFormData] = useState<LoginFormData>(INITIAL_LOGIN_FORM_DATA);
    const loginMutation = useLoginUser((messages: string[]) => handleAddMessages(messages));
    const handleFormDataChange = <T extends keyof LoginFormData>(key: string, value: LoginFormData[T]): void => {
        if (isValidKeyValue<LoginFormData>(key, formData)) {
            setFormData({
                ...formData,
                [key]: value,
            });
            return;
        }
        throw new Error(`Invalid key ${key}`);
    };

    const handleFormSubmit = async (): Promise<void> => {
        if (formData.password && formData.username) {
            await loginMutation.mutateAsync({ ...formData });
        } else {
            handleAddMessages(["Login i hasło są wymagane"]);
        }
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <header className="flex justify-end">
                <Link to="/register/" className="text-3xl text-white my-3 mr-10 tracking-wide hover:scale-[102%]">
                    Zarejestruj się
                </Link>
            </header>
            <form
                className="flex flex-col gap-5 w-full h-full items-center justify-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <h2 className="text-4xl tracking-wider text-white ">Logowanie</h2>

                <input
                    className="FormInput focus:outline-none"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Login:"
                    value={formData.username}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
                <input
                    className="FormInput focus:outline-none"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Hasło:"
                    value={formData.password}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
                <button
                    type="submit"
                    className="tracking-wide text-5xl text-white mt-7 px-8 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100 BoxShadow"
                >
                    Zaloguj się
                </button>
            </form>
        </div>
    );
};

export default Login;
