import { useQuery } from "@tanstack/react-query";

const apiLink = import.meta.env.VITE_API_URL;

const useGetMetadataList = <T>(endpoint: string) => {
    return useQuery({
        queryKey: [endpoint, "list"],
        queryFn: async (): Promise<T[]> => {
            const response = await fetch(`${apiLink}/api/${endpoint}/`);
            if (!response.ok) {
                throw new Error(
                    `Falied to fetch ${endpoint}. Response status: ${response.status} ${response.statusText}`
                );
            }

            return response.json();
        },
    });
};

export default useGetMetadataList;
