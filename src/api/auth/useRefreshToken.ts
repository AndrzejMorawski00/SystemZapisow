import { useMutation } from "@tanstack/react-query";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/auth";

const apiLink = import.meta.env.VITE_API_URL;

const useRefreshToken = async (handleAuthStateChange: (newVal: boolean) => void) => {
    const refreshMutation = useMutation({
        mutationFn: async () => {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            const response = await fetch(`${apiLink}/planner/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to refresh token");
            }
            
            return data;
        },
        onSuccess: (data) => {
            handleAuthStateChange(true);
            localStorage.setItem(ACCESS_TOKEN, data.access);
        },
        onError: (error) => {
            handleAuthStateChange(false);
            console.error(error);
        },
    });

    return refreshMutation;
};
export default useRefreshToken;
