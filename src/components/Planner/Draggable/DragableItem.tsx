import { ReactNode, useEffect, useRef, useState } from "react";

import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

interface Props {
    children: ReactNode;
    courseId: number;
}

const DragableItem = ({ children, courseId }: Props) => {
    const dragRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<boolean>(false);

    useEffect(() => {
        const elem = dragRef.current;
        if (!elem) {
            return;
        }
        return draggable({
            element: elem,
            getInitialData: () => ({ courseId }),
            onDragStart: () => {
                setDragging(true);
            },
            onDrop: () => {
                setDragging(false);
            },
        });
    }, []);

    return (
        <div draggable className={`${dragging ? "opacity-80" : ""} "cursor-grab"`} ref={dragRef}>
            {children}
        </div>
    );
};

export default DragableItem;
