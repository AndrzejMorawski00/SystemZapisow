import useGetMetadataList from "../../../../api/metadata/useGetMetadataList";
import useGetSemesters from "../../../../api/semesters/useGetSemesters";

import SelectorForm from "./SelectorForm";
import { SelectorSettingType } from "../../../../types/selector";
import usePlannerContext from "../../../../useContextHooks/usePlannerContext";
import { CourseEffect, CourseTag, CourseType } from "../../../../types/courseTypes";

const SelectorSettings = () => {
    const { handleFormDataChange } = usePlannerContext();
    const { data: tags, isError: isTagError, isLoading: isTagLoading } = useGetMetadataList<CourseTag>("tags");
    const {
        data: effects,
        isError: isEffectsError,
        isLoading: isEffectsLoading,
    } = useGetMetadataList<CourseEffect>("effects");
    const { data: types, isError: isTypesError, isLoading: isTypesLoading } = useGetMetadataList<CourseType>("types");
    const { data: semesters, isError: isSemestersError, isLoading: isSemestersLoading } = useGetSemesters();

    return (
        <div className="w-full h-full">
            <div className="flex flex-row gap-1 w-full justify-around">
                <div className="flex flex-col gap-1 min-w-[35vw]">
                    <p className="text-3xl text-white tracking-wider">Tagi:</p>
                    <SelectorFormWrapper
                        handleFormDataChange={handleFormDataChange}
                        selectData={tags || []}
                        isLoading={isTagLoading}
                        isError={isTagError}
                        objName="tag"
                    />
                </div>
                <div className="flex flex-col gap-1 min-w-[35vw]">
                    <p className="text-3xl text-white tracking-wider">Typy:</p>
                    <SelectorFormWrapper
                        handleFormDataChange={handleFormDataChange}
                        selectData={types || []}
                        isLoading={isTypesLoading}
                        isError={isTypesError}
                        objName="type"
                    />
                </div>
            </div>
            <div className="flex flex-row gap-1 w-full justify-around">
                <div className="flex flex-col gap-1 min-w-[35vw]">
                    <p className="text-3xl text-white tracking-wider mt-5">Effekty:</p>
                    <SelectorFormWrapper
                        handleFormDataChange={handleFormDataChange}
                        selectData={effects || []}
                        isLoading={isEffectsLoading}
                        isError={isEffectsError}
                        objName="effect"
                    />
                </div>
                <div className="flex flex-col gap-1 min-w-[35vw]">
                    <p className="text-3xl text-white tracking-wider mt-5">Semestry:</p>
                    <SelectorFormWrapper
                        handleFormDataChange={handleFormDataChange}
                        selectData={semesters || []}
                        isLoading={isSemestersLoading}
                        isError={isSemestersError}
                        objName="semester"
                    />
                </div>
            </div>
        </div>
    );
};

interface ISelectorFormWrapper<T> {
    handleFormDataChange: <Key extends keyof SelectorSettingType>(key: string, value: SelectorSettingType[Key]) => void;
    selectData: T[];
    isLoading: boolean;
    isError: boolean;
    objName: "tag" | "effect" | "semester" | "type";
}

const SelectorFormWrapper = <T extends { id: number; name: string; shortcut?: string }>({
    handleFormDataChange,
    selectData,
    objName,

    isLoading,
    isError,
}: ISelectorFormWrapper<T>) => {
    if (isLoading) {
        return <p>Ładowanie...</p>;
    }
    if (isError) {
        return <p>Coś poszło nie tak... </p>;
    }
    return <SelectorForm handleFormDataChange={handleFormDataChange} keyName={objName} data={selectData} />;
};

export default SelectorSettings;
