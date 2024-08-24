import { ReactNode, useEffect, useRef, useState } from "react";

import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Course } from "../../../types/courseTypes";

interface Props {
    children: ReactNode;
    containerName: string;
    courses: Course[];
    semesterId: number;
    handleUserSemesterChange: (courseId: number, action: "add" | "remove") => Promise<void>;
}

const DropableList = ({ children, containerName, handleUserSemesterChange }: Props) => {
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
            className={`overflow-y-auto ScrollBarStyles  h-full w-full 
                        max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] 
                        md:max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-160px)] 
                        xl:max-h-[calc(100vh-180px)] ${isDraggedOver ? "bg-slate-400" : ""}`}
            id={containerName}
            ref={dragRef}
        >
            {children}
        </ul>
    );
};

export default DropableList;
