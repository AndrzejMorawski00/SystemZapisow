import { Course } from "../../../../types/courseTypes";
import CourseItem from "../../../CourseItem/CourseItem";

interface Props {
    course: Course;
    fetchNextRef?: React.Ref<HTMLLIElement>;
}

const CourseListItem = ({ course, fetchNextRef }: Props) => {
    return (
        <li key={course.id} className="m-2" ref={fetchNextRef ? fetchNextRef : null}>
            <CourseItem course={course} />
        </li>
    );
};

export default CourseListItem;
