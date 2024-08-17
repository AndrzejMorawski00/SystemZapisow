import { useState } from "react";
import { GetUserSemester } from "../../../types";
import UserSemesterList from "./UserSemesterList";

interface Props {
    userSemesters: GetUserSemester[];
}

const PlanTablePaginaton = ({ userSemesters }: Props) => {
    const [paginationData, setPaginationData] = useState({
        currPage: 1,
        dataSize: userSemesters.length,
        pageSize: 2,
    });

    const handlePageChange = (newPage: number) => {
        setPaginationData((prevData) => ({
            ...prevData,
            currPage: prevData.currPage + newPage,
        }));
    };
    const start = (paginationData.currPage - 1) * paginationData.pageSize;
    const end = paginationData.currPage * paginationData.pageSize;
    const pageData = userSemesters.slice(start, end);
    return (
        <div className="flex flex-col gap-2 h-screen w-full justify-between py-2">
            <div className="flex gap-2 justify-between px-3">
                {pageData.map((semester) => (
                    <UserSemesterList key={semester.id} semester={semester} containerName={semester.name} />
                ))}
            </div>
            <div>
                <button disabled={paginationData.currPage === 1} onClick={() => handlePageChange(-1)}>
                    Prev
                </button>
                <button
                    disabled={paginationData.currPage === Math.ceil(paginationData.dataSize / paginationData.pageSize)}
                    onClick={() => handlePageChange(1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PlanTablePaginaton;
