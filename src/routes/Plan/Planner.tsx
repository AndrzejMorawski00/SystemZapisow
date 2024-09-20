import { Link, useLocation } from "react-router-dom";
import CourseSelector from "../../components/Planner/Selector/CourseSelector";

import CourseList from "../../components/Planner/Selector/CourseList/CourseList";
import PlannerContextProvider from "../../providers/PlannerContextProvider";
import PlanInfoWrapper from "../../components/Planner/PlanInfo/PlanInfoWrapper";
import useGetUserSemesters from "../../api/userSemesters/useGetUserSemesters";
import PlanTablePagination from "../../components/Planner/Table/PlanTablePagination";
import { GetUserSemester } from "../../types/planTypes";
import { PLAN_TYPES } from "../../constants/studiesProgress";

interface LocationState {
    semesterIDList: number[];
    planType: (typeof PLAN_TYPES)[number];
}

const Planner = () => {
    const location = useLocation();
    const { semesterIDList, planType } = location.state as LocationState;
    const results = useGetUserSemesters(semesterIDList);
    const isLoading = results.some((result) => result.isLoading);
    const isError = results.some((result) => result.isError);
    const userSemesters = results.map((result) => result.data) as GetUserSemester[];

    if (isLoading) return <div className="flex items-center justify-center h-screen text-xl text-white">Ładowanie...</div>;

    if (isError) return <div className="flex items-center justify-center h-screen text-xl text-white">Coś poszło nie tak...</div>;

    return (
        <PlannerContextProvider>
            <div className="flex flex-row w-screen h-screen">
                <div className="flex flex-col gap-1 max-h-screen w-[28vw] h-full items-center  ml-2 py-2">
                    <CourseSelector />
                    <CourseList />
                    <div className="flex w-full justify-center">
                        <PlanInfoWrapper userSemesters={userSemesters} planType={planType} />
                    </div>
                </div>
                <div className="w-full max-h-screen h-screen flex flex-col gap-3">
                    <header className="flex w-full justify-end gap-2 h-[10vh] max-h-[10vh]">
                        <Link className="text-3xl text-white my-3 mr-10 tracking-wide hover:scale-[102%]" to="/home/">
                            Powrót
                        </Link>
                        <Link className="text-3xl text-white my-3 mr-10 tracking-wide hover:scale-[102%]" to="/logout/">
                            Wyloguj się
                        </Link>
                    </header>
                    <PlanTablePagination userSemesters={userSemesters} />
                </div>
            </div>
        </PlannerContextProvider>
    );
};

export default Planner;
