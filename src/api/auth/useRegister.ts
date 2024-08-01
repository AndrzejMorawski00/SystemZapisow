import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface IRegisterMutation {
    username: string;
    password: string;
    repeatPassword: string;
}

const apiLink = import.meta.env.VITE_API_URL;

const useRegister = () => {
    const navigate = useNavigate();
    const registerMutation = useMutation({
        mutationFn: async ({ username, password, repeatPassword }: IRegisterMutation) => {
            const response = await fetch(`${apiLink}/planner/register/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username, password, repeatPassword }),
            });

            if (!response.ok) {
                const data = await response.json();
                console.log(data);
                throw new Error("Register Failed");
            }
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            navigate("/login/");
        },
        onError: (error) => {
            console.log("error", error);
        },
    });

    return registerMutation;
};

export default useRegister;
