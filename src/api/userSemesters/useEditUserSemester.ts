import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "../apiConfig";

import { EditUserSemester } from "../../types";

const apiLink = import.meta.env.VITE_API_URL;

const useEditUserSemester = () => {
    const queryClient = useQueryClient();
    const headers = apiConfig();

    return useMutation({
        mutationFn: async (userSemesterData: EditUserSemester) => {
            const response = await fetch(`${apiLink}/planner/semester/${userSemesterData.id}/update/`, {
                method: "PUT",
                headers,
                body: JSON.stringify(userSemesterData),
            });
            return response.json();
        },
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({
                queryKey: ["userSemesters", "single", data.id],
            });
        },
    });
};

export default useEditUserSemester;
