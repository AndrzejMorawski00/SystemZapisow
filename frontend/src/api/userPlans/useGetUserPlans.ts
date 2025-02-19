import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiConfig, getAPILinkValue } from "../../utils/api/apiConfig";
import { UserPlan } from "../../types/planTypes";
import useResponseHandler from "../../utils/api/useResponseHandler";

const apiLink = getAPILinkValue();

const useGetUserPlans = () => {
    const responseHandler = useResponseHandler();

    return useQuery({
        queryKey: ["plans", "list"],
        queryFn: async (): Promise<UserPlan[]> => {
            const headers = apiConfig();
            const response = await fetch(`${apiLink}/planner/plans/`, {
                headers,
            });

            return await responseHandler(response);
        },
        placeholderData: keepPreviousData,
    });
};

export default useGetUserPlans;
