import { keepPreviousData, useQueries, UseQueryResult } from "@tanstack/react-query";
import { apiConfig, getAPILinkValue } from "../../utils/api/apiConfig";
import { GetUserSemester } from "../../types/planTypes";

const apiLink = getAPILinkValue();

const fetchUserSemester = async (semesterId: number): Promise<GetUserSemester> => {
    const response = await fetch(`${apiLink}/planner/semester/${semesterId}/`, {
        headers: apiConfig(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch semester");
    }
    return await response.json();
};

const useGetUserSemesters = (semesterIdList: number[]) => {
    return useQueries({
        queries: semesterIdList.map((id) => ({
            queryKey: ["userSemesters", "single", id],
            queryFn: () => fetchUserSemester(id),
            staleTime: Infinity,
            keepPreviousData: keepPreviousData,
        })),
    }) as UseQueryResult<GetUserSemester>[];
};

export default useGetUserSemesters;
