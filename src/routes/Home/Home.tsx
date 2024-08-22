import { useState } from "react";
import useGetUserPlans from "../../api/userPlans/useGetUserPlans";
import useDeleteUserPlan from "../../api/userPlans/useDeleteUserPlan";
import PlanForm from "../../components/PlanForm";
import PlanItem from "../../components/Home/PlanItem";
import { UserPlan } from "../../types/planTypes";
import { MAX_PLAN_NUMBER } from "../../constants/semesterData";

const Home = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const deleteUserPlanMutation = useDeleteUserPlan();
    const { data, isError: isPlanError, isLoading: isPlanLoading } = useGetUserPlans();
    const [currPlan, setCurrPlan] = useState<UserPlan | null>(null);

    const handleFormOpenClose = (newVal: boolean) => {
        setDisplayForm(newVal);
        setCurrPlan(null);
    };

    const handlePlanListButtonClick = async (action: "edit" | "delete", plan: UserPlan) => {
        if (action === "edit") {
            setCurrPlan(plan);
            setDisplayForm(true);
        } else if (action === "delete") {
            await deleteUserPlanMutation.mutateAsync(plan.pk);
        } else {
            throw new Error(`Invalid PlanList action: ${action}`);
        }
    };

    if (isPlanLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-3xl text-white tracking-wide">Ładowanie...</p>
            </div>
        );
    }
    if (isPlanError) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-3xl text-white tracking-wide">Coś poszło nie tak...</p>
            </div>
        );
    }
    const plans = data ? data : [];
    return (
        <div className="flex w-full h-full items-center justify-center gap-4">
            <ul className="flex flex-col gap-2 divide-y-2 items-end border-r-2 border-white mr-5 pr-5 min-w-[25vw]">
                {plans.map((plan, idx) => (
                    <PlanItem key={idx} plan={plan} handlePlanListButtonClick={handlePlanListButtonClick} />
                ))}
            </ul>
            <div className=" flex flex-col gap-2 items-start  min-w-[25vw]">
                {displayForm ? (
                    <PlanForm handleFormOpenClose={handleFormOpenClose} currPlan={currPlan} />
                ) : plans.length < MAX_PLAN_NUMBER ? (
                    <button
                        className="tracking-wide text-4xl text-white px-8 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100"
                        onClick={() => setDisplayForm(true)}
                    >
                        Nowy Plan
                    </button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Home;
