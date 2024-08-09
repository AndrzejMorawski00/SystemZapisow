import React, { useEffect } from "react";
import useGetInfiniteCourses from "../../../api/courses/useGetInfiniteCourses";
import { usePlannerContext } from "../../../useContextHooks/usePlannerContext";
import { getCourseQueryParams } from "../../../utils";
import { Course } from "../../../types";
import { useInView } from "react-intersection-observer";

const CourseList: React.FC = () => {
    const plannerContext = usePlannerContext();
    const { ref, inView } = useInView();
    const endpointData = getCourseQueryParams({ ...plannerContext });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useGetInfiniteCourses(
        plannerContext.semester,
        endpointData
    );

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
        <ul>
            {data?.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                    {page.results.map((course: Course) => (
                        <li ref={ref} key={course.id}>
                            <h2>{course.name}</h2>
                            <p>ECTS: {course.ects}</p>
                        </li>
                    ))}
                </React.Fragment>
            ))}
            {isFetchingNextPage ? <li>Loading more courses...</li> : ""}
            {!hasNextPage && <li>No more Courses</li>}
        </ul>
    );
};

export default CourseList;
