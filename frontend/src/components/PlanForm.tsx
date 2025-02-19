import { useEffect, useState } from "react";
import useAddUserPlan from "../api/userPlans/useAddUserPlan";
import useEditUserPlan from "../api/userPlans/useEditUserPlan";
import { NewUserPlan, UserPlan } from "../types/planTypes";
import { PLAN_TYPES } from "../constants/studiesProgress";
import { isValidKeyValue } from "../utils/utils";

interface Props {
    currPlan: UserPlan | null;
    handleFormOpenClose: (newVal: boolean) => void;
}

const PlanForm = ({ handleFormOpenClose, currPlan }: Props) => {
    const addPlanMutation = useAddUserPlan(handleFormOpenClose);
    const editPlanMutation = useEditUserPlan();
    const [formData, setFormData] = useState<NewUserPlan>({
        name: "",
        type: "Inżynierskie",
        create: true,
    });

    useEffect(() => {
        setFormData({
            name: currPlan ? currPlan.name : "",
            type: currPlan ? currPlan.type : "Inżynierskie",
            create: true,
        });
    }, [currPlan]);

    const handleFormDataChange = <T extends keyof NewUserPlan>(key: string, value: NewUserPlan[T]): void => {
        if (!isValidKeyValue<NewUserPlan>(key, formData)) {
            throw new Error(`Invalid key ${key}`);
        }
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleFormSubmit = async (): Promise<void> => {
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
            className="flex flex-col gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
            }}
        >
            <input
                className="FormInput focus:outline-none"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                placeholder="name"
            />
            <select
                className="FormInput focus:outline-none "
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
            <button
                className="tracking-wide text-4xl text-white mt-6 px-6 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100 BoxShadow"
                type="submit"
            >
                {currPlan ? "Zapisz" : "Dodaj"}
            </button>
            <button
                className="tracking-wide text-4xl text-white mt-6 px-6 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100 BoxShadow"
                type="button"
                onClick={() => handleFormOpenClose(false)}
            >
                Anuluj
            </button>
        </form>
    );
};

export default PlanForm;
