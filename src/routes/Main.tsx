import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <Link to="/login/">
                <button>Login</button>
            </Link>
            <Link to="/register/">
                <button>Register</button>
            </Link>
            <p>Funny Stuff</p>
        </div>
    );
};

export default Main;
