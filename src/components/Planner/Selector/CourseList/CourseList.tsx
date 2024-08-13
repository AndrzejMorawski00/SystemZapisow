import { useEffect } from "react";
import useGetInfiniteCourses from "../../../../api/courses/useGetInfiniteCourses";
import { usePlannerContext } from "../../../../useContextHooks/usePlannerContext";
import { getCourseQueryParams } from "../../../../utils";
import { useInView } from "react-intersection-observer";
import CourseItem from "./CourseItem";
import DragableItem from "../../Draggable/DragableItem";

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
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading courses</p>;
    }

    return (
        <ul className="overflow-y-scroll max-h-screen">
            {courses.map((course) => (
                <DragableItem key={course.id} courseId={course.id}>
                    <CourseItem course={course} fetchNextRef={ref} />
                </DragableItem>
            ))}

            {isFetchingNextPage ? <li>Loading more courses...</li> : ""}
        </ul>
    );
};

export default CourseList;
