import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewUserPlan } from "../../types/planTypes";
import { apiConfig } from "../../utils/api/apiConfig";

const apiLink = import.meta.env.VITE_API_URL;

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
            if (!response.ok) {
                throw new Error(`Failed to add new UserPlan`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["plans", "list"],
            });
            handleFormOpenClose(false);
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
};

export default useAddUserPlan;
