import { ACCESS_TOKEN } from "../../constants/auth";

export const apiConfig = (): Headers => {
    const headers = new Headers();
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    } else {
        console.warn("No token found in localStorage");
    }
    headers.append("Content-Type", "application/json");
    return headers;
};
