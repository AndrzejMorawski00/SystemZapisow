import SelectorModal from "./SelectorForm/SelectorModal";
import { usePlannerContext } from "../../../useContextHooks/usePlannerContext";

const CourseSelector = () => {
    const { handleFilterValueChange, filterValue, effect, tag, semester, type } = usePlannerContext();
    console.log(filterValue, effect, tag, semester, type);
    return (
        <form action="">
            <input type="text" value={filterValue} onChange={(e) => handleFilterValueChange(e.target.value)} />
            <SelectorModal />
        </form>
    );
};

export default CourseSelector;
