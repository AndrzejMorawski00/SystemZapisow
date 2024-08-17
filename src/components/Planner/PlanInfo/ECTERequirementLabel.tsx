interface Props {
    label: string;
    userValue: number;
    requirementsValue: number;
}

const ECTERequirementLabel = ({ label, userValue, requirementsValue }: Props) => {
    const conditionMet = userValue >= requirementsValue;

    return (
        <div className={`flex flex-row gap-2`}>
            <p className={`${conditionMet ? "" : ""}`}>{label}:</p>
            <p className={`${conditionMet ? "" : ""}`}>
                {userValue} / {requirementsValue}
            </p>
        </div>
    );
};

export default ECTERequirementLabel;
