import { useQuery } from "@tanstack/react-query";
import { Semester } from "../../types";

const apiLink = import.meta.env.VITE_API_URL;

const useGetSemester = (semesterId: number) => {
    return useQuery({
        queryKey: ["semesters", "single", semesterId],
        queryFn: async (): Promise<Semester> => {
            const response = await fetch(`${apiLink}/api/semesters/${semesterId}/`);
            if (!response.ok) {
                throw new Error(
                    `Falied to fetch semesters. Response status: ${response.status} ${response.statusText}`
                );
            }
            return response.json();
        },
    });
};

export default useGetSemester;
