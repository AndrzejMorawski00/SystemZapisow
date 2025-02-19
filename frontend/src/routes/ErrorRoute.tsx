import { Link } from "react-router-dom";

const ErrorRoute = () => {
    return (
        <div className="flex flex-col w-screen h-screen gap-3 items-center justify-center">
            <h1 className="text-white tracking-wider text-6xl">Oops!</h1>
            <p className="text-white tracking-wider text-4xl">Coś poszło nie tak...</p>
            <Link to="/" className="text-white tracking-wider underline text-3xl transition hover:scale-[102%]">
                Strona główna
            </Link>
        </div>
    );
};

export default ErrorRoute;
