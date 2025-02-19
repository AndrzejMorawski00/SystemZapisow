import { Link, Outlet, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants/auth";
import { isJWTTokenValid } from "../utils/Auth/isJWTTokenValid";
import { useEffect } from "react";

const Main = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem(ACCESS_TOKEN);
    const isAuthenticated = (token && isJWTTokenValid(token)) || false;

    useEffect(() => {
        if (isAuthenticated) {
            navigate("home/");
        }
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen">
            <header className="flex justify-end">
                {isAuthenticated && (
                    <Link to="/logout/" className="text-3xl text-white my-3 mr-10 tracking-wide hover:scale-[102%]">
                        Wyloguj się
                    </Link>
                )}
            </header>
            {token && isJWTTokenValid(token) ? (
                <Outlet />
            ) : (
                <div className="flex flex-col gap-10 w-full h-full items-center justify-center">
                    <Link to="/login/">
                        <button className="tracking-wide text-5xl text-white px-8 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100">
                            Logowanie
                        </button>
                    </Link>
                    <Link to="/register/">
                        <button className="tracking-wide text-5xl text-white px-8 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100">
                            Rejestracja
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Main;
