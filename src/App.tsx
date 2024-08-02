import ProtectedRoute from "./components/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./routes/Auth/Login";
import LogoutAndRegister from "./routes/Auth/LogoutAndRegister";
import Logout from "./routes/Auth/Logout";
import Home from "./routes/Home/Home";
import Main from "./routes/Main";
import Planner from "./routes/Plan/Planner";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "home/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
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
    // const data1 = useGetMetadataList("types");
    // const data2 = useGetMetadataList("tags");
    // const data3 = useGetMetadataList("effects");
    // const data4 = useGetSemesters();
    // const data5 = useGetCourses(16);
    // console.log("Types: ", data1.data);
    // console.log("Tags: ", data2.data);
    // console.log("Effects: ", data3.data);
    // console.log("Semesters: ", data4.data);
    // console.log("Courses: ", data5.data);
    // const obj = useAuth();
    // useEffect(() => {
    //     obj.registerMutation.mutateAsync({
    //         username: "xdd",
    //         password: "dsadasd",
    //     });
    // }, []);
    return <RouterProvider router={router} />;
}

export default App;
