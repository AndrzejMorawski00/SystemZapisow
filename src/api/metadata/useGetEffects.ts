import { useQuery } from "@tanstack/react-query";

const apiLink = import.meta.env.VITE_API_URL;

const useGetEffects = () => {
    return useQuery({
        queryKey: ["effects", "list"],
        queryFn: async () => {
            const response = await fetch(`${apiLink}/api/effects/`);
            if (!response.ok) {
                throw new Error(`Falied to fetch Tags. Response status: ${response.status} ${response.statusText}`);
            }
            return response.json();
        },
    });
};

export default useGetEffects;
