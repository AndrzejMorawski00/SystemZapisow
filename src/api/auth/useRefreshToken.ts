import { useMutation } from "@tanstack/react-query";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const apiLink = import.meta.env.VITE_API_URL;

const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    const response = await fetch(`${apiLink}/planner/token/refresh/`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch token");
    }

    const data = await response.json();
    console.log(data);
    return data.access;
};

const useRefreshToken = (handleAuthStateChange: (newVal: boolean) => void) => {
    const refreshMutation = useMutation({
        mutationFn: refreshToken,
        onSuccess: (data) => {
            localStorage.setItem(ACCESS_TOKEN, data.access);
            handleAuthStateChange(true);
        },
        onError: (error) => {
            console.log(error);
            handleAuthStateChange(false);
        },
    });
    return refreshMutation;
};

export default useRefreshToken;
