import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewUserPlan } from "../../types/newPlan";
const apiLink = import.meta.env.VITE_API_URL;

import { apiConfig } from "../apiConfig";

const useEdiUserPlan = () => {
    const queryClient = useQueryClient();
    const headers = apiConfig();
}