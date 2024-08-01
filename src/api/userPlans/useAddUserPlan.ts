import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewUserPlan } from "../../types/newPlan";
const apiLink = import.meta.env.VITE_API_URL;

import { apiConfig } from "../apiConfig";

const useAddUserPlan = (handleFormOpenClose: (newValue: boolean) => void) => {
    const queryClient = useQueryClient();
    const headers = apiConfig();
    return useMutation({
        mutationFn: async (planData: NewUserPlan) => {
            const response = await fetch(`${apiLink}/planner/plans/`, {
                method: "POST",
                headers,
                body: JSON.stringify(planData),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["plans", "list"],
            });
            handleFormOpenClose(false)
        },
    });
};

export default useAddUserPlan;
