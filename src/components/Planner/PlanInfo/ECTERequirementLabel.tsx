interface Props {
    label: string;
    userValue: number;
    requirementsValue: number;
}

const ECTERequirementLabel = ({ label, userValue, requirementsValue }: Props) => {
    const conditionMet = userValue >= requirementsValue;

    return (
        <div className={`flex flex-row gap-2 items-center`}>
            <span className={`w-3 h-3 mr-2 rounded-full ${conditionMet ? "bg-green-500" : "bg-red-500"}`}></span>
            <p className="text-2xl">
                {label}: {userValue} / {requirementsValue}
            </p>
        </div>
    );
};

export default ECTERequirementLabel;
