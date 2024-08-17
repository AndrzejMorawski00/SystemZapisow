import useEditUserSemester from "../../../api/userSemesters/useEditUserSemester";
import { Course, GetUserSemester } from "../../../types";
import DragableItem from "../Draggable/DragableItem";
import DropableList from "../Draggable/DropableList";
import CourseItem from "../Selector/CourseList/CourseItem";

interface IPlanTableRowProps {
    semester: GetUserSemester;
    containerName: string;
}

const getNewUserSemesterCourses = (
    courses: Course[],
    courseId: number,
    action: "add" | "remove"
): { update: boolean; newCourses: number[] } => {
    let prevCourses = courses.map((course) => course.id);
    switch (action) {
        case "add": {
            if (prevCourses.includes(courseId)) {
                return { update: false, newCourses: [...prevCourses] };
            } else {
                return { update: true, newCourses: [...prevCourses, courseId] };
            }
        }
        case "remove":
            return { update: true, newCourses: prevCourses.filter((id) => id !== courseId) };
        default:
            throw new Error(`Invalid action ${action}`);
    }
};

const UserSemesterList = ({ semester }: IPlanTableRowProps) => {
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
                {semester.courses.map((course, idx) => (
                    <DragableItem key={course.id} courseId={idx}>
                        <CourseItem course={course} />
                    </DragableItem>
                ))}
            </DropableList>
        </div>
    );
};

export default UserSemesterList;
