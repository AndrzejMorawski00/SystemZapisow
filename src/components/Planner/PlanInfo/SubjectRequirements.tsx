import { StudiesProgressType } from "../../../types/providers";
import SubjectRequirement from "./SubjectRequirement";

interface Props {
    requirements: StudiesProgressType;
    studiesProgress: StudiesProgressType;
}

const SubjectRequirements = ({ requirements, studiesProgress }: Props) => {
    const isEng = studiesProgress.type === "Inżynierskie" ? true : false;
    return (
        <div className="flex flex-row w-full justify-around">
            <div className="flex flex-row">
                <SubjectRequirement
                    label="Projekt"
                    requirementsValue={requirements.project}
                    userValue={studiesProgress.project}
                />
                <SubjectRequirement
                    label="Proseminarium"
                    requirementsValue={requirements.ps}
                    userValue={studiesProgress.ps}
                />
                <SubjectRequirement
                    label="Praktyki"
                    requirementsValue={requirements.practices}
                    userValue={studiesProgress.practices}
                />
            </div>
            <div className="flex flex-row">
                <SubjectRequirement
                    label="Human"
                    requirementsValue={requirements.hs_ects}
                    userValue={studiesProgress.hs_ects}
                />
                <SubjectRequirement
                    label="OWI"
                    requirementsValue={requirements.owi_ects}
                    userValue={studiesProgress.owi_ects}
                />
                {isEng && (
                    <SubjectRequirement
                        label="Ekonomia"
                        requirementsValue={requirements.e_ects}
                        userValue={studiesProgress.e_ects}
                    />
                )}
            </div>
        </div>
    );
};
export default SubjectRequirements;
