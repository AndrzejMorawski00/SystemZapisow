import { Cross2Icon } from "@radix-ui/react-icons";
import { Course } from "../../../types/courseTypes";
import CourseItem from "../../CourseItem/CourseItem";

interface Props {
    course: Course;
    handleUserSemesterChange: (courseId: number, action: "add" | "remove") => Promise<void>;
}

const PlanTableCourse = ({ course, handleUserSemesterChange }: Props) => {
    return (
        <li key={course.id} className="flex items-start bg-slate-700 p-1 mb-2">
            <CourseItem course={course} />
            <button className="m-2" onClick={() => handleUserSemesterChange(course.id, "remove")}><Cross2Icon className="h-5 w-5 text-white transform hover:scale-[102%] hover:text-red-500"/></button>
        </li>
    );
};

export default PlanTableCourse;
