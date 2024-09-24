import { ReactNode, useState } from "react";
import { SelectorSettingType } from "../../../../types/selector";
import usePlannerContext from "../../../../useContextHooks/usePlannerContext";
import { INITIAL_SEMESTER_ID } from "../../../../constants/semesterData";

interface Props<MetadataType> {
    handleFormDataChange: <K extends keyof SelectorSettingType>(key: string, value: SelectorSettingType[K]) => void;
    data: MetadataType[];
    keyName: "tag" | "effect" | "semester" | "type";
}

const SelectorForm = <MetadataType extends { id: number; name: string; shortcut?: string }>({
    handleFormDataChange,
    data,
    keyName,
}: Props<MetadataType>) => {
    const currData = usePlannerContext();
    const [selectData, setSelectData] = useState<number>(currData[keyName]);

    const handleSelectDataChange = (value: number): void => {
        if (value === -1 && keyName === "semester") {
            setSelectData(INITIAL_SEMESTER_ID);
            handleFormDataChange("semester", INITIAL_SEMESTER_ID);
            return;
        }
        setSelectData(value);
        handleFormDataChange(keyName, value);
    };

    const getValidFormOption = (): ReactNode => {
        if (keyName === "semester") {
            return (
                <option key={INITIAL_SEMESTER_ID} value="oferta">
                    oferta
                </option>
            );
        }
        return <option>Wybierz opcję</option>;
    };

    return (
        <select
            className="FormInput focus:outline-none ScrollBarStyles"
            value={selectData}
            onChange={(e) => handleSelectDataChange(+e.target.value)}
        >
            {selectData === -1 ? (
                getValidFormOption()
            ) : (
                <option key={-1} value={-1}>
                    Usuń
                </option>
            )}
            {data.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name} {item.shortcut ? item.shortcut : ""}
                </option>
            ))}
        </select>
    );
};

export default SelectorForm;
