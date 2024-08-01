import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiConfig } from "../apiConfig";
import { UserPlan } from "../../types";

const apiLink = import.meta.env.VITE_API_URL;

const useGetUserPlans = () => {
    return useQuery({
        queryKey: ["plans", "list"],
        queryFn: async (): Promise<UserPlan[]> => {
            const headers = apiConfig();
            const response = await fetch(`${apiLink}/planner/plans/`, {
                headers,
            });
            if (!response.ok) {
                throw new Error(
                    `Falied to fetch user plans. Response status: ${response.status} ${response.statusText}`
                );
            }
            return response.json();
        },
        placeholderData: keepPreviousData,
    });
};

export default useGetUserPlans;
