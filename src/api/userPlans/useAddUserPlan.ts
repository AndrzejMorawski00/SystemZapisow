import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewUserPlan } from "../../types/planTypes";
import { apiConfig, getAPILinkValue } from "../../utils/api/apiConfig";
import useResponseHandler from "../../utils/api/useResponseHandler";

const apiLink = getAPILinkValue();

const useAddUserPlan = (handleFormOpenClose: (newValue: boolean) => void) => {
    const responseHandler = useResponseHandler();
    const queryClient = useQueryClient();
    const headers = apiConfig();
    return useMutation({
        mutationFn: async (planData: NewUserPlan) => {
            const response = await fetch(`${apiLink}/planner/plans/`, {
                method: "POST",
                headers,
                body: JSON.stringify(planData),
            });
            return responseHandler(response);
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
