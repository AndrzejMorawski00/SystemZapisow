import { useLocation } from "react-router-dom";
import CourseSelector from "../../components/Planner/Selector/CourseSelector";

import CourseList from "../../components/Planner/Selector/CourseList/CourseList";
import PlannerContextProvider from "../../providers/PlannerContextProvider";
import StudiesProgressProvider from "../../providers/StudiesProgressProvider";
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
    let content;

    if (isLoading) content = <div>Loading...</div>;

    if (isError) content = <div>Error loading data</div>;

    return (
        <PlannerContextProvider>
            <StudiesProgressProvider studiesType={planType}>
                <>
                    <div className="flex flex-row">
                        <div className="flex flex-col gap-1 max-h-screen py-2">
                            <CourseSelector />
                            <CourseList />
                            <PlanInfoWrapper userSemesters={userSemesters} planType={planType} />
                        </div>
                        {content ? content : <PlanTablePagination userSemesters={userSemesters} />}
                    </div>
                </>
            </StudiesProgressProvider>
        </PlannerContextProvider>
    );
};

export default Planner;
