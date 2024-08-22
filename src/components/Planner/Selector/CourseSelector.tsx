import SelectorModal from "./SelectorForm/SelectorModal";
import usePlannerContext from "../../../useContextHooks/usePlannerContext";

const CourseSelector = () => {
    const plannerContext = usePlannerContext();
    return (
        <form action="" className="flex py-2 px-2 w-full mb-2 border-b-4  bg-slate-700 border-cyan-400">
            <input
                className="w-full py-1 bg-inherit text-white text-[1rem] focus:outline-none"
                type="text"
                value={plannerContext.filterValue}
                onChange={(e) => plannerContext.handleFilterValueChange(e.target.value)}
            />
            <SelectorModal />
        </form>
    );
};

export default CourseSelector;
