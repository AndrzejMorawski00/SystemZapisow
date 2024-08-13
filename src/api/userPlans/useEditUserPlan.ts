import { useMutation, useQueryClient } from "@tanstack/react-query";
const apiLink = import.meta.env.VITE_API_URL;

import { apiConfig } from "../apiConfig";
import { UserPlan } from "../../types";

const useEditUserPlan = () => {
    const queryClient = useQueryClient();
    const headers = apiConfig();
    return useMutation({
        mutationFn: async (userPlan: UserPlan) => {
            const response = await fetch(`${apiLink}/planner/plans/${userPlan.pk}/update/`, {
                method: "PUT",
                headers,
                body: JSON.stringify(userPlan),
            });
            return await response.json();
        },
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({
                queryKey: ["plans", "list"],
            });
            queryClient.invalidateQueries({
                queryKey: ["plans", "single", data.pk],
            });
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
};

export default useEditUserPlan;
