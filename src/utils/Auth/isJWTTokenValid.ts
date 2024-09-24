import { jwtDecode } from "jwt-decode";

export const isJWTTokenValid = (token: string): boolean => {
    try {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp ? decoded.exp : -1;
        return (tokenExpiration < Date.now() / 1000);
    } catch (error) {
        console.error(`Error decoding token ${error}`);
        return false;
    }
};
