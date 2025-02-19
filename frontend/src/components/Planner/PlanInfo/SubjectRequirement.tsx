interface Props {
    label: string;
    userValue: number;
    requirementsValue: number;
}

const SubjectRequirement = ({ label, userValue, requirementsValue }: Props) => {
    const conditionMet = userValue >= requirementsValue;
    return (
        <p
            className={` text-xl tracking-wider  px-5 py-1 rounded-full BoxShadow transition hover:scale-[102%] ${
                conditionMet ? "bg-green-500" : "bg-red-500"
            }`}
        >
            {label}
        </p>
    );
};
export default SubjectRequirement;
