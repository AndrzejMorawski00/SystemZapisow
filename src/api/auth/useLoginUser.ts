import { useMutation } from "@tanstack/react-query";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/auth";
import { useNavigate } from "react-router-dom";

interface Props {
    username: string;
    password: string;
}

const apiLink = import.meta.env.VITE_API_URL;

const useLoginUser = (handleMessagesChange: (messages: string[]) => void) => {
    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationFn: async ({ username, password }: Props) => {
            const response = await fetch(`${apiLink}/planner/token/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                handleMessagesChange(["Failed To Login Please Try again."]);
                throw new Error("Login Failed");
            }
            return response.json();
        },
        onSuccess: (data) => {
            localStorage.setItem(ACCESS_TOKEN, data.access);
            localStorage.setItem(REFRESH_TOKEN, data.refresh);
            navigate("/home/");
        },
        onError: (error) => {
            console.log("error ", error);
            return error;
        },
    });
    return loginMutation;
};

export default useLoginUser;
