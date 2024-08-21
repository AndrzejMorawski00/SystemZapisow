import { Link } from "react-router-dom";

const ErrorRoute = () => {
    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to="/home/">Home</Link>
        </div>
    );
};

export default ErrorRoute;
