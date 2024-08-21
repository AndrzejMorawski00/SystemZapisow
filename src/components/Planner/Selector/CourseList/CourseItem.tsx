import { Course } from "../../../../types/courseTypes";
import CourseLabelItem from "./CourseLabelItem";

interface Props {
    course: Course;
    fetchNextRef?: React.Ref<HTMLLIElement>;
}

const CourseItem = ({ course, fetchNextRef }: Props) => {
    return (
        <li
            key={course.id}
            className="flex flex-col bg-slate-700 gap-1 m-2 p-2 min-w-[200px] max-w-[20vw]"
            ref={fetchNextRef ? fetchNextRef : null}
        >
            <p className="text-white text-[1.2rem] tracking-wide whitespace-break-spaces max-w-[24vw]">{course.name}</p>

            <div className="flex flex-row items-center justify-between w-full">
                <p className="CourseSelectorParagraph">ECTS: {course.ects}</p>
                <p className="CourseSelectorParagraph pr-5">{course.type.shortcut}</p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <p className="CourseSelectorParagraph pr-2">{course.tags.length ? "Tags:" : ""}</p>
                    {course.tags.map((tag, idx) => (
                        <CourseLabelItem key={idx} color="" label={tag.shortcut} />
                    ))}
                </div>
                <div className="flex flex-col gap-1">
                    <p className="CourseSelectorParagraph">{course.effects.length ? "Effects:" : ""}</p>
                    {course.effects.map((effect, idx) => (
                        <CourseLabelItem key={idx} color="" label={effect.name} />
                    ))}
                </div>
            </div>
        </li>
    );
};

export default CourseItem;
