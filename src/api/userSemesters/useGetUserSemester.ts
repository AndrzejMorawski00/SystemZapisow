import { keepPreviousData, useQueries, UseQueryResult } from "@tanstack/react-query";
import { apiConfig } from "../apiConfig";
import { UserSemester } from "../../types";

const apiLink = import.meta.env.VITE_API_URL;

const fetchUserSemester = async (semesterId: number): Promise<UserSemester> => {
    const response = await fetch(`${apiLink}/planner/semester/${semesterId}/`, {
        headers: apiConfig(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch semester");
    }
    return response.json();
};

const useGetUserSemesters = (semesterIdList: number[]) => {
    return useQueries({
        queries: semesterIdList.map((id) => ({
            queryKey: ["userSemesters", "single", id],
            queryFn: () => fetchUserSemester(id),
            staleTime: Infinity,
            placeholderData: keepPreviousData,
        })),
    }) as UseQueryResult<UserSemester>[];
};

export default useGetUserSemesters;
