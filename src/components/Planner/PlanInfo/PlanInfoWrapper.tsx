import { useState } from "react";

import ReusableModal from "../../ReusableModal/ReusableModal";
import PlanInfo from "./PlanInfo";
import { GetUserSemester, StudiesProgressType } from "../../../types";
import { INITIAL_STUDIES_REQUIREMENTS } from "../../../constants";

interface Props {
    userSemesters: GetUserSemester[];
    planType: "Engineer" | "Bachelor";
}

const getInitialStudiesData = (studiesType: "Engineer" | "Bachelor"): StudiesProgressType => {
    switch (studiesType) {
        case "Engineer":
            return {
                type: "Engineer",
                ...INITIAL_STUDIES_REQUIREMENTS,
            };
        case "Bachelor":
            return {
                type: "Bachelor",
                ...INITIAL_STUDIES_REQUIREMENTS,
            };
        default:
            throw new Error(`Invalid studies Type: ${studiesType}`);
    }
};

const getStudiesProgress = (
    userSemesters: GetUserSemester[],
    planType: "Engineer" | "Bachelor"
): StudiesProgressType => {
    const studiesProgress = getInitialStudiesData(planType);
    return studiesProgress;
};

const PlanInfoWrapper = ({ userSemesters, planType }: Props) => {
    const [open, setOpen] = useState(false);

    const studiesProgress = getStudiesProgress(userSemesters, planType);

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

// const studiesProgress: StudiesProgressType = getInitialStudiesData(planType);

// const updateUserStudiesECTSProgress = (course: Course) => {
//     REQUIREMENT_ID_MAPPING.forEach((item) => {
//         if (item.tagIdList.includes(course.id)) {
//             handleStudiesProgressChange(item.keyName, course.ects);
//         }
//     });
// };

// const updateUserStudiesTagsProgress = (courseTags: number[]) => {
//     handleStudiesProgressChange("tags", courseTags);
// };
// const updateUserStudiesProgress = (course: Course) => {
//     const courseTags = course.tags.map((tag) => tag.id);
//     updateUserStudiesECTSProgress(course);
//     updateUserStudiesTagsProgress(courseTags);
//     if (courseTags.includes(5)) {
//         handleStudiesProgressChange("e_ects", course.ects);
//     }
//     if (course.name.includes("własności")) {
//         handleStudiesProgressChange("owi_ects", course.ects);
//     }
// };
