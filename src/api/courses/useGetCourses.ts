import { useQuery } from "@tanstack/react-query";

const apiLink = import.meta.env.VITE_API_URL;

const useGetCourses = (semesterId: number) => {
    return useQuery({
        queryKey: ["courses", "list", semesterId],
        queryFn: async () => {
            const response = await fetch(`${apiLink}/api/courses/${semesterId}/`);
            if (!response.ok) {
                throw new Error(`Falied to fetch courses. Response status: ${response.status} ${response.statusText}`);
            }
            return response.json();
        },
    });
};

export default useGetCourses;
