import { useState } from "react";
import { PLAN_TYPES } from "../constants";

import { NewUserPlan } from "../types/newPlan";

import { isValidKeyValue } from "../utils";
import useAddUserPlan from "../api/userPlans/useAddUserPlan";
import { UserPlan } from "../types";

// type NewPlanFormData = {
//     name: string;
//     type: (typeof PLAN_TYPES)[number];
// };

const INITIAL_FORM_DATA: NewUserPlan = {
    name: "",
    type: "Engineer",
};

interface INewPlan {
    currPlan: UserPlan | null;
    handleFormOpenClose: (newVal: boolean) => void;
}

const PlanForm = ({ handleFormOpenClose, currPlan }: INewPlan) => {
    const addPlanMutation = useAddUserPlan(handleFormOpenClose);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const handleFormDataChange = <T extends keyof NewUserPlan>(key: string, value: NewUserPlan[T]) => {
        if (isValidKeyValue<NewUserPlan>(key, formData)) {
            setFormData({
                ...formData,
                [key]: value,
            });
            return;
        }
        throw new Error(`Invalid key ${key}`);
    };

    const handleFormSubmit = async () => {
        if (!formData.name) {
            return;
        }
        await addPlanMutation.mutateAsync(formData);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
            }}
        >
            <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                placeholder="name"
            />
            <select
                name="type"
                id="type"
                value={formData.type}
                onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
            >
                {PLAN_TYPES.map((type, idx) => (
                    <option key={idx} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <button type="submit">{currPlan? 'Edit' : 'Create New Plan'}</button>
        </form>
    );
};

export default PlanForm;
