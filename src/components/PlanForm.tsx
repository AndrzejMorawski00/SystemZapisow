import { useEffect, useState } from "react";
import { PLAN_TYPES } from "../constants";

import { NewUserPlan } from "../types/newPlan";

import { isValidKeyValue } from "../utils";
import useAddUserPlan from "../api/userPlans/useAddUserPlan";
import { UserPlan } from "../types";
import useEditUserPlan from "../api/userPlans/useEditUserPlan";

interface INewPlan {
    currPlan: UserPlan | null;
    handleFormOpenClose: (newVal: boolean) => void;
}

const PlanForm = ({ handleFormOpenClose, currPlan }: INewPlan) => {
    const addPlanMutation = useAddUserPlan(handleFormOpenClose);
    const editPlanMutation = useEditUserPlan();
    const [formData, setFormData] = useState<NewUserPlan>({
        name: "",
        type: "Engineer",
        create: true,
    });

    useEffect(() => {
        if (currPlan) {
            setFormData({
                name: currPlan ? currPlan.name : "",
                type: currPlan ? currPlan.type : "Engineer",
                create: true,
            });
        }
    }, [currPlan]);

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
        if (currPlan) {
            await editPlanMutation.mutateAsync({
                ...currPlan,
                ...formData,
            });
        } else {
            await addPlanMutation.mutateAsync(formData);
        }
        handleFormOpenClose(false);
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
            <button type="submit">{currPlan ? "Edit" : "Create New Plan"}</button>
            <button type="button" onClick={() => handleFormOpenClose(false)}>
                Cancel
            </button>
        </form>
    );
};

export default PlanForm;
