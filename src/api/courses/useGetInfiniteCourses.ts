import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "../../types/api";
import { Course } from "../../types/courseTypes";
import { getAPILinkValue } from "../../utils/api/apiConfig";

const apiLink = getAPILinkValue();

const fetchCourses = async (
    pageParam: string,
    semesterId: number,
    endpointData: string
): Promise<PaginatedResponse<Course>> => {
    const link = `${apiLink}/api/courses/${semesterId}/${endpointData}&page=${pageParam}`;
    console.log(link);
    const response = await fetch(link);
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
