import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "../apiConfig";

const apiLink = import.meta.env.VITE_API_URL;

const useDeleteUserPlan = () => {
    const queryClient = useQueryClient();
    const headers = apiConfig();
    return useMutation({
        mutationFn: async (planPK: number) => {
            const response = await fetch(`${apiLink}/planner/plans/${planPK}/delete/`, {
                method: "DELETE",
                headers,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["plans", "list"],
            });
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });
};

export default useDeleteUserPlan;
