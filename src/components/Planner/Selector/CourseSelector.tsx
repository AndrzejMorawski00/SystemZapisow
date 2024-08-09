import SelectorModal from "./SelectorForm/SelectorModal";
import { usePlannerContext } from "../../../useContextHooks/usePlannerContext";


const CourseSelector = () => {
    const plannerContext = usePlannerContext();
    return (
        <form action="">
            <input
                type="text"
                value={plannerContext.filterValue}
                onChange={(e) => plannerContext.handleFilterValueChange(e.target.value)}
            />
            <SelectorModal />
        </form>
    );
};

export default CourseSelector;
