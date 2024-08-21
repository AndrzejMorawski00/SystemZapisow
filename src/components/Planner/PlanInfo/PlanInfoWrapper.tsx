import { useState } from "react";

import ReusableModal from "../../ReusableModal/ReusableModal";
import PlanInfo from "./PlanInfo";
import { StudiesProgressHandler } from "../../../utils/PlanInfo/StudiesProgressHandler";
import { GetUserSemester } from "../../../types/planTypes";
import { PLAN_TYPES } from "../../../constants/studiesProgress";

interface Props {
    userSemesters: GetUserSemester[];
    planType: (typeof PLAN_TYPES)[number];
}

const PlanInfoWrapper = ({ userSemesters, planType }: Props) => {
    const [open, setOpen] = useState(false);
    const studiesProgress = new StudiesProgressHandler(userSemesters, planType).getStudiesProgress();

    return (
        <ReusableModal open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
            <ReusableModal.Button asChild>
                <button className="" onClick={() => setOpen(true)}>
                    Wymagania
                </button>
            </ReusableModal.Button>
            <ReusableModal.Content title="Wymagania">
                <PlanInfo studiesProgress={studiesProgress} />
            </ReusableModal.Content>
        </ReusableModal>
    );
};

export default PlanInfoWrapper;
