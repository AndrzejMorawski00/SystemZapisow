import { useMutation } from "@tanstack/react-query";

interface ILoginMutation {
    username: string;
    password: string;
}

interface IRegisterMutation {
    username: string;
    password: string;
    repeatPassword: string;
}

const apiLink = import.meta.env.VITE_API_URL;

const useAuth = () => {
    const loginMutation = useMutation({
        mutationFn: async ({ username, password }: ILoginMutation) => {
            const response = await fetch(`${apiLink}/planner/token/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login Failed");
            }
            const data = await response.json();
            console.log(data);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
        },
    });

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    };

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
                throw new Error("Register Failed");
            }
            const data = await response.json();
            return data;
        },
    });

    return { loginMutation, registerMutation, logout };
};

export default useAuth;
