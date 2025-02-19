import { useState } from "react";
import UserSemesterList from "./UserSemesterList";
import { GetUserSemester } from "../../../types/planTypes";

interface Props {
    userSemesters: GetUserSemester[];
}

const PlanTablePaginaton = ({ userSemesters }: Props) => {
    const [paginationData, setPaginationData] = useState({
        currPage: 1,
        dataSize: userSemesters.length,
        pageSize: 2,
    });

    const handlePageChange = (newPage: number) : void => {
        setPaginationData((prevData) => ({
            ...prevData,
            currPage: prevData.currPage + newPage,
        }));
    };
    const start = (paginationData.currPage - 1) * paginationData.pageSize;
    const end = paginationData.currPage * paginationData.pageSize;
    const pageData = userSemesters.slice(start, end);
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-grow overflow-auto">
                <div className={` flex flex-row w-full min-h-[50vh]  ${pageData.length < paginationData.pageSize? 'justify-start pl-5' : 'justify-around'} `}>
                    {pageData.map((semester) => (
                        <UserSemesterList key={semester.id} semester={semester} containerName={semester.name} />
                    ))}
                </div>
            </div>
            <div className="flex w-full justify-end gap-5 pr-10 mb-3">
                <button
                    className="tracking-wide text-xl text-white px-2 pt-1 pb-1 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100"
                    disabled={paginationData.currPage === 1}
                    onClick={() => handlePageChange(-1)}
                >
                    {"<<"}
                </button>
                <button
                    className="tracking-wide text-xl text-white px-2 pt-1 pb-1 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100"
                    disabled={paginationData.currPage === Math.ceil(paginationData.dataSize / paginationData.pageSize)}
                    onClick={() => handlePageChange(1)}
                >
                    {">>"}
                </button>
            </div>
        </div>
    );
};

export default PlanTablePaginaton;
