import { StudiesProgressType } from "../../../types";
import ECTERequirementLabel from "./ECTERequirementLabel";

interface Props {
    requirements: StudiesProgressType;
    studiesProgress: StudiesProgressType;
}

const ECTSRequirements = ({ requirements, studiesProgress }: Props) => {
    const isEng = studiesProgress.type === "Engineer" ? true : false;

    return (
        <div>
            <p>ECTS:</p>
            <div>
                <ECTERequirementLabel
                    label="I"
                    userValue={studiesProgress.i_ects}
                    requirementsValue={requirements.i_ects}
                />
                <ECTERequirementLabel
                    label="O+I+K+P"
                    userValue={studiesProgress.oikp_ects}
                    requirementsValue={requirements.oikp_ects}
                />
            </div>
            {isEng && (
                <div>
                    <ECTERequirementLabel
                        label="Iinz"
                        userValue={studiesProgress.iinz_ects}
                        requirementsValue={requirements.iinz_ects}
                    />
                    <ECTERequirementLabel
                        label="Kinz"
                        userValue={studiesProgress.kinz_ects}
                        requirementsValue={requirements.kinz_ects}
                    />
                </div>
            )}
        </div>
    );
};

export default ECTSRequirements;
