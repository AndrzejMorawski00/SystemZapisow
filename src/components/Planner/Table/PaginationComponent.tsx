import { useState } from "react";
import { UserSemester } from "../../../types";
import PlanTableRow from "./PlanTableRow";

interface IPaginationContent {
    semesters: UserSemester[];
}

const PaginationComponent = ({ semesters }: IPaginationContent) => {
    const [paginationData, setPaginationData] = useState({
        currPage: 1,
        dataSize: semesters.length,
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
    const pageData = semesters.slice(start, end);
    return (
        <div className="flex flex-col gap-2 h-screen w-full justify-between py-2">
            <div className="flex gap-2 justify-between px-3">
                {pageData.map((semester) => (
                    <PlanTableRow key={semester.id} semester={semester} />
                ))}
            </div>
            <div>
                <button disabled={paginationData.currPage === 1} onClick={() => handlePageChange(-1)}>
                    Prev
                </button>
                <button
                    disabled={
                        paginationData.currPage === Math.floor(paginationData.dataSize / paginationData.pageSize) + 1
                    }
                    onClick={() => handlePageChange(1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationComponent;
