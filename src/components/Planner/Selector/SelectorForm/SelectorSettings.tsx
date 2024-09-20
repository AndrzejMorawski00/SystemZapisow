import SelectorForm from "./SelectorForm";
import { SelectorSettingType } from "../../../../types/selector";
import usePlannerContext from "../../../../useContextHooks/usePlannerContext";
import { CourseEffect, CourseTag, CourseType, Semester } from "../../../../types/courseTypes";
import { generateEndpoint } from "../../../../utils/api/generateEndpoint";
import useGetRequest from "../../../../api/useGetRequest";

const SelectorSettings = () => {
    const { handleFormDataChange } = usePlannerContext();
    const {
        data: effects,
        isError: isEffectsError,
        isLoading: isEffectsLoading,
    } = useGetRequest<CourseEffect[]>(["list", "effects"], generateEndpoint(["api", "effects"]));

    const {
        data: types,
        isError: isTypesError,
        isLoading: isTypesLoading,
    } = useGetRequest<CourseType[]>(["list", "types"], generateEndpoint(["api", "types"]));
    const {
        data: tags,
        isError: isTagError,
        isLoading: isTagLoading,
    } = useGetRequest<CourseTag[]>(["list", "tags"], generateEndpoint(["api", "tags"]));
    const {
        data: semesters,
        isError: isSemestersError,
        isLoading: isSemestersLoading,
    } = useGetRequest<Semester[]>(["semesters", "list"], generateEndpoint(["api", "semesters"]));

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
        return <p className="text-xl text-white">Ładowanie...</p>;
    }
    if (isError) {
        return <p className="text-xl text-white">Coś poszło nie tak... </p>;
    }
    return <SelectorForm handleFormDataChange={handleFormDataChange} keyName={objName} data={selectData} />;
};

export default SelectorSettings;
