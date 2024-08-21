import { useQuery } from "@tanstack/react-query";
import { Semester } from "../../types";

const apiLink = import.meta.env.VITE_API_URL;

const useGetSemesters = () => {
    return useQuery({
        queryKey: ["semesters", "list"],
        queryFn: async (): Promise<Semester[]> => {
            const response = await fetch(`${apiLink}/api/semesters/`);
            if (!response.ok) {
                throw new Error(`Falied to fetch Tags. Response status: ${response.status} ${response.statusText}`);
            }

            return response.json();
        },
    });
};

export default useGetSemesters;
