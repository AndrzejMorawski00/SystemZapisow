import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConfig, getAPILinkValue } from "../../utils/api/apiConfig";
import useResponseHandler from "../../utils/api/useResponseHandler";

const apiLink = getAPILinkValue();

const useDeleteUserPlan = () => {
    const responseHandler = useResponseHandler();
    const queryClient = useQueryClient();
    const headers = apiConfig();
    return useMutation({
        mutationFn: async (planPK: number) => {
            const response = await fetch(`${apiLink}/planner/plans/${planPK}/delete/`, {
                method: "DELETE",
                headers,
            });
            return await responseHandler(response);
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
