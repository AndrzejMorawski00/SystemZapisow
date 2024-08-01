import { useQuery } from "@tanstack/react-query";

const apiLink = import.meta.env.VITE_API_URL;

const useGetTags = () => {
    return useQuery({
        queryKey: ["tags", "list"],
        queryFn: async () => {
            const response = await fetch(`${apiLink}/api/tags/`);
            if (!response.ok) {
                throw new Error(`Falied to fetch Tags. Response status: ${response.status} ${response.statusText}`);
            }
            return response.json();
        },
    });
};

export default useGetTags;
