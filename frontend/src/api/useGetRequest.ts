import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiConfig } from "../utils/api/apiConfig";

const useGetRequest = <T>(
    queryKeys: string[],
    endpoint: string,
    isAuthenticated: boolean = false,
    errorMsg: string = "failed to fetch data.",
    keepData: boolean = false
) => {
    return useQuery({
        queryKey: queryKeys,
        queryFn: async (): Promise<T> => {
            const response = await fetch(endpoint, {
                headers: isAuthenticated ? apiConfig() : undefined,
            });
            if (!response.ok) {
                throw new Error(`${errorMsg} Response status: ${response.status}`);
            }
            return response.json();
        },
        placeholderData: keepData ? keepPreviousData : undefined,
    });
};

export default useGetRequest;
