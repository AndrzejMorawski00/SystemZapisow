import { CourseEffect, CourseTag, CourseType } from "../../../../types";
import useGetMetadataList from "../../../../api/metadata/useGetMetadataList";
import useGetSemesters from "../../../../api/semesters/useGetSemesters";

import SelectorForm from "./SelectorForm";
import { SelectorSettingType } from "../../../../types/selector";
import usePlannerContext from "../../../../useContextHooks/usePlannerContext";

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
        <div>
            <div>
                <SelectorFormWrapper
                    handleFormDataChange={handleFormDataChange}
                    selectData={tags || []}
                    isLoading={isTagLoading}
                    isError={isTagError}
                    objName="tag"
                />
                <SelectorFormWrapper
                    handleFormDataChange={handleFormDataChange}
                    selectData={types || []}
                    isLoading={isTypesLoading}
                    isError={isTypesError}
                    objName="type"
                />
            </div>
            <div>
                <SelectorFormWrapper
                    handleFormDataChange={handleFormDataChange}
                    selectData={effects || []}
                    isLoading={isEffectsLoading}
                    isError={isEffectsError}
                    objName="effect"
                />
                <SelectorFormWrapper
                    handleFormDataChange={handleFormDataChange}
                    selectData={semesters || []}
                    isLoading={isSemestersLoading}
                    isError={isSemestersError}
                    objName="semester"
                />
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
        return <p>{`Loading ${objName}s...`}</p>;
    }
    if (isError) {
        return <p>{`Error loading ${objName}`}</p>;
    }
    return <SelectorForm handleFormDataChange={handleFormDataChange} keyName={objName} data={selectData} />;
};

export default SelectorSettings;
