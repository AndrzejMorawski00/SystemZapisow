import ProtectedRoute from "./components/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./routes/Auth/Login";
import LogoutAndRegister from "./routes/Auth/LogoutAndRegister";
import Logout from "./routes/Auth/Logout";
import Home from "./routes/Home/Home";
import Main from "./routes/Main";
import Planner from "./routes/Plan/Planner";
import ErrorRoute from "./routes/ErrorRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorRoute />,
        children: [
            {
                path: "home/",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "planner/:planSlug",
        element: (
            <ProtectedRoute>
                <Planner />
            </ProtectedRoute>
        ),
    },

    {
        path: "login/",
        element: <Login />,
    },
    {
        path: "register/",
        element: <LogoutAndRegister />,
    },
    {
        path: "logout/",
        element: <Logout />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
