import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConfig, getAPILinkValue } from "../../utils/api/apiConfig";
import { EditUserSemester } from "../../types/planTypes";
import useResponseHandler from "../../utils/api/useResponseHandler";

const apiLink = getAPILinkValue();

const useEditUserSemester = () => {
    const responseHandler = useResponseHandler();
    const queryClient = useQueryClient();
    const headers = apiConfig();

    return useMutation({
        mutationFn: async (userSemesterData: EditUserSemester) => {
            const response = await fetch(`${apiLink}/planner/semester/${userSemesterData.id}/update/`, {
                method: "PUT",
                headers,
                body: JSON.stringify(userSemesterData),
            });
            return await responseHandler(response);
        },
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({
                queryKey: ["userSemesters", "single", data.id],
            });
        },
    });
};

export default useEditUserSemester;
