import { useState } from "react";
import { UserPlan } from "../../types/planTypes";
import ReusableModal from "../ReusableModal/ReusableModal";
import { deleteSVG } from "../../constants/home";

interface Props {
    handlePlanListButtonClick: (action: "edit" | "delete", plan: UserPlan) => Promise<void>;
    plan: UserPlan;
}

const ConfirmPlanItemDelete = ({ handlePlanListButtonClick, plan }: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <ReusableModal open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
            <ReusableModal.Button asChild>
                <button className="text-white w-[2.5rem] h-[2.5rem] mr-3 hover:text-red-500 transition-colors transition-duration-[300]">
                    {deleteSVG}
                </button>
            </ReusableModal.Button>
            <ReusableModal.Content title="Czy na pewno chcesz usunąć plan?">
                <div className="flex flex-row justify-around w-full my-10">
                    <button
                        onClick={() => {
                            handlePlanListButtonClick("delete", plan), () => setOpen(false);
                        }}
                        className="tracking-wide text-4xl text-white px-8 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100"
                    >
                        Tak
                    </button>
                    <button
                        onClick={() => setOpen(false)}
                        className="tracking-wide text-4xl text-white px-8 pt-3 pb-4 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100"
                    >
                        Nie
                    </button>
                </div>
            </ReusableModal.Content>
        </ReusableModal>
    );
};

export default ConfirmPlanItemDelete;
