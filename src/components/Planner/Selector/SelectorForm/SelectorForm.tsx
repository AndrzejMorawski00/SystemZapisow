import { useState } from "react";
import { SelectorSettingType } from "../../../../types/selector";
import { usePlannerContext } from "../../../../useContextHooks/usePlannerContext";

interface ISelectorForm<T> {
    handleFormDataChange: <K extends keyof SelectorSettingType>(key: string, value: SelectorSettingType[K]) => void;
    data: T[];
    keyName: "tag" | "effect" | "semester" | "type";
}

const SelectorForm = <T extends { id: number; name: string; shortcut?: string }>({
    handleFormDataChange,
    data,
    keyName,
}: ISelectorForm<T>) => {
    const currData = usePlannerContext();
    const [selectData, setSelectData] = useState<number>(currData[keyName]);

    const handleSelectDataChange = (value: number) => {
        setSelectData(value);
        handleFormDataChange(keyName, value);
    };
    return (
        <select value={selectData} onChange={(e) => handleSelectDataChange(+e.target.value)}>
            {selectData === -1 ? (
                <option>Select an option</option>
            ) : (
                <option key={-1} value={-1}>
                    Clear
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
