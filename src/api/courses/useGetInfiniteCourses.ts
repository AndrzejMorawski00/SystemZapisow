import { useInfiniteQuery } from "@tanstack/react-query";
import { Course, PaginatedResponse } from "../../types";

const apiLink = import.meta.env.VITE_API_URL;

const fetchCourses = async (
    pageParam: string,
    semesterId: number,
    endpointData: string
): Promise<PaginatedResponse<Course>> => {
    const response = await fetch(`${apiLink}/api/courses/${semesterId}/${endpointData}&page=${pageParam}`);
    return response.json();
};

const useGetInfiniteCourses = (semesterId: number, endpointData: string) => {
    return useInfiniteQuery({
        queryKey: ["courses", "infinite", semesterId, endpointData],
        queryFn: ({ pageParam }) => fetchCourses(pageParam?.toString() ?? "1", semesterId, endpointData),
        initialPageParam: "1",

        getNextPageParam: (lastPage) => {
            return lastPage.next?.split("=")[1] || null;
        },
        getPreviousPageParam: (firstPage) => {
            return firstPage.previous?.split("=")[1] || null;
        },
    });
};
export default useGetInfiniteCourses;
