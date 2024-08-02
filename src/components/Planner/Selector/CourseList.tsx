import useGetCourses from "../../../api/subjects/useGetCourses";

interface ICourseList {
    filter: string;
    semesterID: number;
    filterData: undefined;
}

const CourseList = ({ filter, semesterID }: ICourseList) => {
    console.log(filter);
    const { data, isLoading, isError } = useGetCourses(semesterID);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }
    console.log(data);

    return <ul></ul>;
};

export default CourseList;
