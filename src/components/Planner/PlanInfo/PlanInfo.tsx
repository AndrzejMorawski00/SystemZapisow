import { BAC_REQUIREMENTS, ENG_REQUIREMENTS } from "../../../constants";
import { StudiesProgressType } from "../../../types";
import ECTSRequirements from "./ECTSRequirements";
import SubjectRequirements from "./SubjectRequirements";
import TagRequirements from "./TagsRequirements";

const getStudiaRequirements = (studiesType: "Engineer" | "Bachelor"): StudiesProgressType => {
    switch (studiesType) {
        case "Engineer":
            return ENG_REQUIREMENTS;
        case "Bachelor":
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
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col gap-1">
            <ECTSRequirements requirements={requirements} studiesProgress={studiesProgress} />
            <SubjectRequirements requirements={requirements} studiesProgress={studiesProgress} />
            <div>
                <p>Tags:</p>
                <TagRequirements requirements={requirements} studiesProgress={studiesProgress} />
            </div>
        </div>
    );
};

export default PlanInfo;
