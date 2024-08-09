import { useParams } from "react-router-dom";
import CourseSelector from "../../components/Planner/Selector/CourseSelector";
import PlanInfo from "../../components/Planner/PlanInfo";
import PlanTable from "../../components/Planner/Table/PlanTable";
import CourseList from "../../components/Planner/Selector/CourseList";
import PlannerContextProvider from "../../providers/PlannerContextProvider";

const Planner = () => {
    const { planSlug } = useParams();
    console.log(planSlug);
    return (
        <PlannerContextProvider>
            <div className="flex flex-row">
                <div className="">
                    <CourseSelector />
                    <CourseList />
                    <PlanInfo />
                </div>
                <PlanTable />
            </div>
        </PlannerContextProvider>
    );
};

export default Planner;
