import { createContext, ReactNode, useState } from "react";
import { StudiesProgresContextType, StudiesProgressType } from "../types";
import { INITIAL_STUDIES_REQUIREMENTS } from "../constants";
import { isValidKeyValue } from "../utils";

export const StudiesProgressContext = createContext<StudiesProgresContextType | undefined>(undefined);

const getInitialStudiesData = (studiesType: "Engineer" | "Bachelor"): StudiesProgressType => {
    switch (studiesType) {
        case "Engineer":
            return {
                type: "Engineer",
                ...INITIAL_STUDIES_REQUIREMENTS,
            };
        case "Bachelor":
            return {
                type: "Bachelor",
                ...INITIAL_STUDIES_REQUIREMENTS,
            };
        default:
            throw new Error(`Invalid studies Type: ${studiesType}`);
    }
};

interface Props {
    studiesType: "Engineer" | "Bachelor";
    children: ReactNode;
}

const StudiesProgressProvider = ({ children, studiesType }: Props) => {
    const [studiesProgress, setStudiesProgress] = useState<StudiesProgressType>(getInitialStudiesData(studiesType));

    const handleStudiesProgressChange = <T extends keyof StudiesProgressType>(
        key: string,
        value: StudiesProgressType[T]
    ): void => {
        if (isValidKeyValue<StudiesProgressType>(key, studiesProgress)) {
            if (key === "tags") {
                const newTags: number[] = [...studiesProgress.tags, value as number];
                setStudiesProgress({
                    ...studiesProgress,
                    tags: newTags,
                });
            } else {
                setStudiesProgress({
                    ...studiesProgress,
                    [key]: value,
                });
            }
        }
    };

    const studiesProgresContext: StudiesProgresContextType = {
        studiesProgress: studiesProgress,
        handleStudiesProgressChange: handleStudiesProgressChange,
    };

    return <StudiesProgressContext.Provider value={studiesProgresContext}>{children}</StudiesProgressContext.Provider>;
};

export default StudiesProgressProvider;
