import { useMutation } from "@tanstack/react-query";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/auth";
import { useNavigate } from "react-router-dom";
import { getAPILinkValue } from "../../utils/api/apiConfig";

const apiLink = getAPILinkValue();

const useRefreshToken = async (handleAuthStateChange: (newVal: boolean) => void = () => {}) => {
    const navigate = useNavigate();
    const refreshMutation = useMutation({
        mutationFn: async (): Promise<{ access: string }> => {
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
                navigate("/");
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
