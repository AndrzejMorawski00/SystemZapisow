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

    const ects = semester.courses.reduce((acc, course) => acc + course.ects, 0);

    return (
        <div className="w-[45%]">
            <div className="flex w-full justify-between my-2 pr-2">
                <p className="text-xl text-white ">{semester.name}</p>
                <p className="text-xl text-white ">ECTS: {ects}</p>
            </div>
            <DropableList
                courses={semester.courses}
                containerName="semester"
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
