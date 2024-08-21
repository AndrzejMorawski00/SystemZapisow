import { INITIAL_STUDIES_REQUIREMENTS, PLAN_TYPES } from "../../constants/studiesProgress";
import { StudiesProgressType } from "../../types/providers";

export const getInitialStudiesData = (studiesType: (typeof PLAN_TYPES)[number]): StudiesProgressType => {
    switch (studiesType) {
        case "Inżynierskie":
            return {
                type: "Inżynierskie",
                ...INITIAL_STUDIES_REQUIREMENTS,
            };
        case "Licencjackie":
            return {
                type: "Licencjackie",
                ...INITIAL_STUDIES_REQUIREMENTS,
            };
        default:
            throw new Error(`Invalid studies Type: ${studiesType}`);
    }
};
