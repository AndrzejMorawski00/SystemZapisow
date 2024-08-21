import useEditUserSemester from "../../../api/userSemesters/useEditUserSemester";
import { GetUserSemester } from "../../../types/planTypes";
import { getNewUserSemesterCourses } from "../../../utils/Table/getNewUserSemesterCourses";
import DropableList from "../Draggable/DropableList";
import PlanTableCourse from "./PlanTableCourse";

interface Props {
    semester: GetUserSemester;
    containerName: string;
}

const UserSemesterList = ({ semester }: Props) => {
    const editUserSemesterMutation = useEditUserSemester();

    const handleUserSemesterChange = async (courseId: number, action: "add" | "remove") => {
        const { update, newCourses } = getNewUserSemesterCourses(semester.courses, courseId, action);
        if (update) {
            const newUserSemester = {
                ...semester,
                ["courses"]: newCourses,
            };
            await editUserSemesterMutation.mutateAsync(newUserSemester);
        }
    };

    return (
        <div className=" bg-slate-500 w-[50%]">
            <p>{semester.name}</p>
            <DropableList
                courses={semester.courses}
                containerName="semester"
                classStyles=""
                semesterId={semester.id}
                handleUserSemesterChange={handleUserSemesterChange}
            >
                {semester.courses.map((course) => (
                    <PlanTableCourse
                        key={course.id}
                        course={course}
                        handleUserSemesterChange={handleUserSemesterChange}
                    />
                ))}
            </DropableList>
        </div>
    );
};

export default UserSemesterList;
