import { useQuery } from "@tanstack/react-query";

const apiLink = import.meta.env.VITE_API_URL;

const useGetMetadataObj = <T>(endpoint: string, obj_id: number) => {
    return useQuery({
        queryKey: [endpoint, "single", obj_id],
        queryFn: async (): Promise<T> => {
            const response = await fetch(`${apiLink}/api/${endpoint}/${obj_id}/`);
            if (!response.ok) {
                throw new Error(`Falied to fetch ${endpoint} object. Response status: ${response.status} ${response.statusText}`);
            }

            return response.json();
        },
    });
};

export default useGetMetadataObj;
