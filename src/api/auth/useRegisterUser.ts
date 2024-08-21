import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const apiLink = import.meta.env.VITE_API_URL;

interface RegisterMutation {
    username: string;
    password: string;
    repeatPassword: string;
}

const useRegisterUser = (handleMessagesChange: (messages: string[]) => void) => {
    const navigate = useNavigate();
    const registerMutation = useMutation({
        mutationFn: async ({ username, password, repeatPassword }: RegisterMutation) => {
            const response = await fetch(`${apiLink}/planner/register/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username, password, repeatPassword }),
            });
            const data = await response.json();
            if (!response.ok) {
                const errorObj = data.errors;
                const errorList = errorObj.errors || [];
                if (errorList) {
                    handleMessagesChange(errorList);
                }
                throw new Error(errorObj.errors || "Failed To register User");
            }

            return data;
        },
        onSuccess: () => {
            navigate("/login/");
        },

        onError: (error) => {
            console.error(error);
        },
    });
    return registerMutation;
};

export default useRegisterUser;
