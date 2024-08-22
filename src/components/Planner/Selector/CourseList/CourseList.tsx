import { useEffect } from "react";
import useGetInfiniteCourses from "../../../../api/courses/useGetInfiniteCourses";
import usePlannerContext from "../../../../useContextHooks/usePlannerContext";

import { useInView } from "react-intersection-observer";
import CourseListItem from "./CourseListItem";
import DragableItem from "../../Draggable/DragableItem";
import { getCourseQueryParams } from "../../../../utils/api/getCourseQueryParams";

const CourseList = () => {
    const plannerContext = usePlannerContext();
    const { ref, inView } = useInView();
    const endpointData = getCourseQueryParams({ ...plannerContext });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useGetInfiniteCourses(
        plannerContext.semester,
        endpointData
    );
    const courses = data?.pages.flatMap((page) => page.results) || [];

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <p className=" text-white text-2xl">Ładowanie...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <p className=" text-white text-2xl">Coś poszło nie tak...</p>
            </div>
        );
    }
    return courses.length > 0 ? (
        <ul className="overflow-y-scroll ScrollBarStyles pr-1 w-full h-full">
            {courses.map((course) => (
                <DragableItem key={course.id} courseId={course.id}>
                    <CourseListItem course={course} fetchNextRef={ref} />
                </DragableItem>
            ))}

            {isFetchingNextPage && <li>Ładowanie kursów...</li>}
        </ul>
    ) : (
        <div className="flex justify-center items-center w-full h-full">
            <p className="text-white text-2xl">Nie znaleziono żadnych kursów...</p>
        </div>
    );
};

export default CourseList;
