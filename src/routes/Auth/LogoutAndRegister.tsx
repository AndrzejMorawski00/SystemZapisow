import Register from "./Register";

const LogoutAndRegister = () => {
    localStorage.clear();
    return <Register />;
};

export default LogoutAndRegister;
