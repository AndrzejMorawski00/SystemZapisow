import { Course } from "../../types/courseTypes";
import CourseLabelItem from "./CourseLabelItem";

interface Props {
    course: Course;
}

const CourseItem = ({ course }: Props) => {
    return (
        <div className="flex flex-col gap-2 w-full bg-slate-700">
            <p className="text-white text-[1.2rem] tracking-wide whitespace-break-spaces ">{course.name}</p>

            <div className="flex flex-row items-center justify-between w-full">
                <p className="text-white tracking-wider">ECTS: {course.ects}</p>
                <p className="text-white tracking-wider pr-5">{course.type.shortcut}</p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <p className="text-white tracking-wider text-[1.1rem] pr-2">{course.tags.length ? "Tags:" : ""}</p>
                    {course.tags.map((tag, idx) => (
                        <CourseLabelItem key={idx} color="" label={tag.shortcut} />
                    ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                    <p className="text-white tracking-wider text-[1.1rem] text-wrap">{course.effects.length ? "Effects:" : ""}</p>
                    {course.effects.map((effect, idx) => (
                        <CourseLabelItem key={idx} color="" label={effect.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseItem;
