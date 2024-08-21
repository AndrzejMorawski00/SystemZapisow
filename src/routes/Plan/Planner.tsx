import { Link, useLocation } from "react-router-dom";
import CourseSelector from "../../components/Planner/Selector/CourseSelector";

import CourseList from "../../components/Planner/Selector/CourseList/CourseList";
import PlannerContextProvider from "../../providers/PlannerContextProvider";
import PlanInfoWrapper from "../../components/Planner/PlanInfo/PlanInfoWrapper";
import useGetUserSemesters from "../../api/userSemesters/useGetUserSemesters";
import { GetUserSemester } from "../../types";
import PlanTablePagination from "../../components/Planner/Table/PlanTablePagination";

interface LocationState {
    semesterIDList: number[];
    planType: "Engineer" | "Bachelor";
}

const Planner = () => {
    const location = useLocation();
    const { semesterIDList, planType } = location.state as LocationState;
    const results = useGetUserSemesters(semesterIDList);
    const isLoading = results.some((result) => result.isLoading);
    const isError = results.some((result) => result.isError);
    const userSemesters = results.map((result) => result.data) as GetUserSemester[];

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error loading data</div>;

    return (
        <PlannerContextProvider>
            <div className="flex flex-row w-screen h-screen">
                <div className="flex flex-col gap-1 max-h-screen min-w-[30vw] py-2">
                    <CourseSelector />
                    <CourseList />
                    <PlanInfoWrapper userSemesters={userSemesters} planType={planType} />
                </div>
                <div className="w-full h-full">
                    <header className="flex w-full justify-end">
                        <Link to="/home/">Powrót</Link>
                        <Link to="/logout/">Wyloguj się</Link>
                    </header>
                    <PlanTablePagination userSemesters={userSemesters} />
                </div>
            </div>
        </PlannerContextProvider>
    );
};

export default Planner;
