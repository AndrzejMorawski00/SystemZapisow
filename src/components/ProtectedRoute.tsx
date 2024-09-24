import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useRefreshToken from "../api/auth/useRefreshToken";
import { isJWTTokenValid } from "../utils/Auth/isJWTTokenValid";
import { ACCESS_TOKEN } from "../constants/auth";

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null);
    const handleAuthStateChange = (newVal: boolean) => {
        setIsAuthorized(newVal);
    };
    const refreshTokenMutation = useRefreshToken(handleAuthStateChange);

    useEffect(() => {
        auth();
    }, []);

    const auth = async (): Promise<void> => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        if (isJWTTokenValid(token)) {
            setIsAuthorized(true);
        } else {
            (await refreshTokenMutation).mutateAsync();
        }
    };
    if (isAuthorized === null) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <p className=" text-white text-2xl">Ładowanie...</p>
            </div>
        );
    }

    return isAuthorized ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
