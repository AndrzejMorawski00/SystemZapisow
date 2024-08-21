import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "../../utils/api/apiConfig";

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
            if (!response.ok) {
                throw new Error(`Failed to delete user plan`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["plans", "list"],
            });
        },
        onError: (error) => {
            console.error(error.message);
        },
    });
};

export default useDeleteUserPlan;
