import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "../../utils/api/apiConfig";
import { UserPlan } from "../../types/planTypes";
import useResponseHandler from "../../utils/api/useResponseHandler";

const apiLink = import.meta.env.VITE_API_URL;

const useEditUserPlan = () => {
    const responseHandler = useResponseHandler();
    const queryClient = useQueryClient();
    const headers = apiConfig();
    return useMutation({
        mutationFn: async (userPlan: UserPlan) => {
            const response = await fetch(`${apiLink}/planner/plans/${userPlan.pk}/update/`, {
                method: "PUT",
                headers,
                body: JSON.stringify(userPlan),
            });

            return await responseHandler(response);
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
