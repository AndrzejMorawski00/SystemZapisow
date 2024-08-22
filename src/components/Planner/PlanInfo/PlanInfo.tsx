import { BAC_REQUIREMENTS, ENG_REQUIREMENTS } from "../../../constants/studiesProgress";
import { StudiesProgressType } from "../../../types/providers";
// import { StudiesProgressType } from "../../../types";
import ECTSRequirements from "./ECTSRequirements";
import SubjectRequirements from "./SubjectRequirements";
import TagRequirements from "./TagsRequirements";

const getStudiaRequirements = (studiesType: "Licencjackie" | "Inżynierskie"): StudiesProgressType => {
    switch (studiesType) {
        case "Inżynierskie":
            return ENG_REQUIREMENTS;
        case "Licencjackie":
            return BAC_REQUIREMENTS;
        default:
            throw new Error(`Invalid Studies Type: ${studiesType}`);
    }
};

interface Props {
    studiesProgress: StudiesProgressType;
}

const PlanInfo = ({ studiesProgress }: Props) => {
    const requirements = getStudiaRequirements(studiesProgress.type);
    return (
        <div className="p-4 text-white flex flex-col gap-2">
            <ECTSRequirements requirements={requirements} studiesProgress={studiesProgress} />
            <SubjectRequirements requirements={requirements} studiesProgress={studiesProgress} />
            <div className="flex flex-col gap-1 w-full">
                <p className="text-3xl">Tagi:</p>
                <TagRequirements requirements={requirements} studiesProgress={studiesProgress} />
            </div>
        </div>
    );
};

export default PlanInfo;
