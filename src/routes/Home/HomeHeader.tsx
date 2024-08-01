import { Link } from "react-router-dom";

const HomeHeader = () => {
    return (
        <header>
            <Link to="/logout/">Logout</Link>
        </header>
    );
};

export default HomeHeader;
