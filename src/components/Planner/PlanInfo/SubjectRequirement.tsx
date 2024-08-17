interface Props {
    label: string;
    userValue: number;
    requirementsValue: number;
}

const SubjectRequirement = ({ label, userValue, requirementsValue }: Props) => {
    const conditionMet = userValue >= requirementsValue;
    return <p className={`${conditionMet ? "" : ""}`}>{label}</p>;
};
export default SubjectRequirement;
