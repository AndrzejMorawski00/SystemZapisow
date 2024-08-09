import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConfig } from "../apiConfig";

const apiLink = import.meta.env.VITE_API_URL;

// const useEditUserSemester = () => {
//     const queryClient = useQueryClient();
//     const headers = apiConfig();

//     return useMutation({
//         mutationFn: async (userSemester) => {
//             const response = await fetch(`${apiLink}/planner/semester/${userSemester.pk}/update`, {
//                 method: "PUT",
//                 headers,
//                 body: JSON.stringify(userData),
//             });
//             return response.json();
//         },
//         onSuccess: (_, data) => {
//             queryClient.invalidateQueries({
//                 queryKey: ["userSemester", "list"],
//             });
//         },
//     });
// };
