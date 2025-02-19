import { Link } from "react-router-dom";
import { editSVG } from "../../constants/home";
import { UserPlan } from "../../types/planTypes";
import ConfirmPlanItemDelete from "./ConfirmPlanItemDelete";

interface Props {
    plan: UserPlan;
    handlePlanListButtonClick: (action: "edit" | "delete", plan: UserPlan) => Promise<void>;
}

const PlanItem = ({ plan, handlePlanListButtonClick }: Props) => {
    return (
        <li className="flex flex-col gap-2 w-full pb-3">
            <Link
                to={`/planner/${plan.slug}/`}
                state={{ semesterIDList: plan.semesters, planType: plan.type }}
                className="text-2xl text-white tracking-wider py-2 ml-3 underline underline-offset-4 hover:scale-[102%] transition"
            >
                {plan.name.length > 20 ? `${plan.name.slice(0, 20)}...` : plan.name}
            </Link>
            <div className="flex justify-between">
                <button
                    onClick={() => handlePlanListButtonClick("edit", plan)}
                    className="text-white w-[2.5rem] h-[2.5rem] ml-3 hover:text-green-500 transition-colors transition-duration-[300]"
                >
                    {editSVG}
                </button>
                <ConfirmPlanItemDelete plan={plan} handlePlanListButtonClick={handlePlanListButtonClick} />
            </div>
        </li>
    );
};

export default PlanItem;
