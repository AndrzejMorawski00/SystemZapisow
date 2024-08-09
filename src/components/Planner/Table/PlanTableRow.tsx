import { UserSemester } from "../../../types";

interface IPlanTableRowProps {
    semester: UserSemester;
}

const PlanTableRow = ({ semester }: IPlanTableRowProps) => {
    return (
        <div className="h-[90vw] min-w-[20rem]">
            <p>{semester.name}</p>
            <ul>
                {semester.courses.map((course, idx) => (
                    <li key={idx}>{course.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PlanTableRow;
