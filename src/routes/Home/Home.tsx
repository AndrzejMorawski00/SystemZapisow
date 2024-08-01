import { act, useState } from "react";
import useGetUserPlans from "../../api/userPlans/useGetUserPlans";
import HomeHeader from "./HomeHeader";
import NewPlan from "../../components/NewPlan";
import { MAX_PLAN_NUMBER } from "../../constants";
import { UserPlan } from "../../types";

const Home = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const { data, isError: isPlanError, isLoading: isPlanLoading } = useGetUserPlans();
    const [currPlan, setCurrPlan] = useState<UserPlan | null>(null);
    const handlePlanListButtonClick = (action: "edit" | "delete", plan: UserPlan) => {
        if (action === "edit") {
            setCurrPlan(plan);
        } else if (action === "delete") {
            // delete
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
                            <p>{plan.name}</p>
                            <div>
                                <button onClick={() => handlePlanListButtonClick("edit", plan)}>Edit</button>
                                <button onClick={() => handlePlanListButtonClick("delete", plan)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {displayForm || currPlan ? (
                    <NewPlan handleFormOpenClose={(newVal) => setDisplayForm(newVal)} currPlan={currPlan} />
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
