interface Props {
    label: string;
    color: string;
}
const CourseLabelItem = ({ label, color }: Props) => {
    return <div className={`text-white bg-red-600 tracking-wider px-2 py-1 rounded-2xl w-fit ${color}`}>{label}</div>;
};

export default CourseLabelItem;
