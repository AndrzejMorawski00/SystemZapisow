import { useLocation } from "react-router-dom";
import CourseSelector from "../../components/Planner/Selector/CourseSelector";
import PlanInfo from "../../components/Planner/PlanInfo";
import PlanTable from "../../components/Planner/Table/PlanTable";
import CourseList from "../../components/Planner/Selector/CourseList/CourseList";
import PlannerContextProvider from "../../providers/PlannerContextProvider";

interface LocationState {
    state: number[];
}

const Planner = () => {
    const location = useLocation() as LocationState;
    return (
        <PlannerContextProvider>
            <div className="flex flex-row flex-grow">
                <div className="">
                    <CourseSelector />
                    <CourseList />
                    <PlanInfo />
                </div>
                <PlanTable semesterIDList={location.state} />
            </div>
        </PlannerContextProvider>
    );
};

export default Planner;
