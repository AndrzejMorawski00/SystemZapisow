import { jwtDecode } from "jwt-decode";

export const isJWTTokenValid = (token: string): boolean => {
    try {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp ? decoded.exp : -1;
        if (tokenExpiration < Date.now() / 1000) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error(`Error decoding token ${error}`);
        return false;
    }
};
