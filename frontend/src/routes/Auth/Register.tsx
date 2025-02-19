import { useState } from "react";
import PasswordValidation from "../../components/RegisterValidation";
import useRegisterUser from "../../api/auth/useRegisterUser";
import { Link } from "react-router-dom";
import useErrorMessagesContext from "../../useContextHooks/useErrorMessagesContext";
import { INITIAL_REGISTER_FORM_DATA } from "../../constants/register";
import { RegisterFormData } from "../../types/auth";
import { isValidKeyValue } from "../../utils/utils";


const Register = () => {
    const { handleAddMessages } = useErrorMessagesContext();
    const registerMutation = useRegisterUser(handleAddMessages);
    const [formData, setFormData] = useState<RegisterFormData>(INITIAL_REGISTER_FORM_DATA);
    const [validForm, setValidForm] = useState(false);

    const handleFormDataChange = <T extends keyof RegisterFormData>(key: string, value: RegisterFormData[T]): void => {
        if (isValidKeyValue<RegisterFormData>(key, formData)) {
            setFormData({
                ...formData,
                [key]: value,
            });
            return;
        }
        throw new Error(`Invalid key ${key}`);
    };

    const handleFormValidChange = (newVal: boolean) : void => {
        setValidForm(newVal);
    };

    const handleFormSubmit = async (): Promise<void> => {
        if (!validForm) {
            return;
        }
        await registerMutation.mutateAsync({ ...formData });
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <header className="flex justify-end">
                <Link to="/login/" className="text-3xl text-white my-3 mr-10 tracking-wide hover:scale-[102%]">
                    Zaloguj się
                </Link>
            </header>
            <div className="flex flex-row w-full h-full items-center justify-center">
                <form
                    className="flex flex-col gap-2 border-r-2 pr-6 mr-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFormSubmit();
                    }}
                >
                    <h2 className="text-4xl tracking-wider text-white ">Rejestracja</h2>

                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Login:"
                        value={formData.username}
                        className="FormInput focus:outline-none"
                        onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Hasło:"
                        value={formData.password}
                        className="FormInput focus:outline-none"
                        onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                    />
                    <input
                        type="password"
                        name="repeatPassword"
                        id="repeatPassword"
                        placeholder="Powtórz hasło:"
                        value={formData.repeatPassword}
                        className="FormInput focus:outline-none"
                        onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                    />
                    <button
                        type="submit"
                        className="tracking-wide text-5xl text-white mt-7 px-8 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100 BoxShadow"
                    >
                        Zarejestruj się
                    </button>
                </form>
                <PasswordValidation formData={formData} handleFormValidChange={handleFormValidChange} />
            </div>
        </div>
    );
};

export default Register;
