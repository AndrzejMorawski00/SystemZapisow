import { ReactNode, useEffect, useRef, useState } from "react";

import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Course } from "../../../types/courseTypes";

interface Props {
    children: ReactNode;
    containerName: string;
    classStyles: string;
    courses: Course[];
    semesterId: number;
    handleUserSemesterChange: (courseId: number, action: "add" | "remove") => Promise<void>;
}

const DropableList = ({ children, containerName, classStyles, handleUserSemesterChange }: Props) => {
    const dragRef = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    useEffect(() => {
        const elem = dragRef.current;
        if (elem) {
            return dropTargetForElements({
                element: elem,

                onDragEnter: () => {
                    setIsDraggedOver(true);
                },
                onDragLeave: () => setIsDraggedOver(false),
                onDrop: ({ source }) => {
                    setIsDraggedOver(false);
                    const courseId: number = Number(source.data.courseId);
                    if (courseId) {
                        handleUserSemesterChange(courseId, "add");
                    }
                },
            });
        }
    }, [handleUserSemesterChange]);

    return (
        <ul
            className={`${classStyles} ${isDraggedOver ? "bg-slate-400" : ""} h-[90vw] min-w-[20rem]`}
            id={containerName}
            ref={dragRef}
        >
            {children}
        </ul>
    );
};

export default DropableList;
