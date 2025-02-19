import { Course } from "../../types/courseTypes";

export const getNewUserSemesterCourses = (
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