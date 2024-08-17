import { useState } from "react";
import useGetUserPlans from "../../api/userPlans/useGetUserPlans";
import useDeleteUserPlan from "../../api/userPlans/useDeleteUserPlan";
import HomeHeader from "./HomeHeader";
import NewPlan from "../../components/PlanForm";
import { MAX_PLAN_NUMBER } from "../../constants";
import { UserPlan } from "../../types";
import { Link } from "react-router-dom";

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

    let content;
    if (isPlanLoading) {
        content = <p>Loading...</p>;
    }
    if (isPlanError) {
        content = <p>Someting Went Wrong...</p>;
    }
    const plans = data ? data : [];
    return (
        <div>
            <HomeHeader />
            <div>
                <ul>
                    {plans.map((plan, idx) => (
                        <li key={idx}>
                            <Link
                                to={`/planner/${plan.slug}/`}
                                state={{ semesterIDList: plan.semesters, planType: plan.type }}
                            >
                                {plan.name}
                            </Link>
                            <div>
                                <button onClick={() => handlePlanListButtonClick("edit", plan)}>Edit</button>
                                <button onClick={() => handlePlanListButtonClick("delete", plan)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {displayForm ? (
                    <NewPlan handleFormOpenClose={handleFormOpenClose} currPlan={currPlan} />
                ) : plans.length < MAX_PLAN_NUMBER ? (
                    <button onClick={() => setDisplayForm(true)}>Create New Plan:</button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Home;
