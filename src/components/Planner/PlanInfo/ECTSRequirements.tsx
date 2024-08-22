import { StudiesProgressType } from "../../../types/providers";
import ECTERequirementLabel from "./ECTERequirementLabel";

interface Props {
    requirements: StudiesProgressType;
    studiesProgress: StudiesProgressType;
}

const ECTSRequirements = ({ requirements, studiesProgress }: Props) => {
    const isEng = studiesProgress.type === "Inżynierskie" ? true : false;

    return (
        <div className="flex flex-col gap-1">
            <p className="text-3xl">ECTS:</p>
            <div className="flex flex-row justify-start my-7">
                <div className="flex flex-col gap-3 min-w-[20vw]">
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
                    <div className="flex flex-col gap-3 min-w-[20vw]">
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
        </div>
    );
};

export default ECTSRequirements;
