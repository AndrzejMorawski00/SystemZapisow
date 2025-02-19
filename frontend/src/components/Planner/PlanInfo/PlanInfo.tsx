import { StudiesProgressType } from "../../../types/providers";
import { getStudiaRequirements } from "../../../utils/PlanInfo/getStudiesType";
import ECTSRequirements from "./ECTSRequirements";
import SubjectRequirements from "./SubjectRequirements";
import TagRequirements from "./TagsRequirements";


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
