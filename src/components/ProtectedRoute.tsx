import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useRefreshToken from "../api/auth/useRefreshToken";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

interface IProtectedRoute {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
    const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null);
    const handleAuthStateChange = (newVal: boolean) => {
        setIsAuthorized(newVal);
    };
    const refreshMutation = useRefreshToken(handleAuthStateChange);

    useEffect(() => {
        auth();
    }, []);

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        console.log(token);
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp ? decoded.exp : -1;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
            await refreshMutation.mutateAsync();
        } else {
            handleAuthStateChange(true);
        }
    };
    if (isAuthorized === null) {
        return <p>Loading...</p>;
    }

    return isAuthorized ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
