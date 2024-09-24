import { useState } from "react";
import ReusableModal from "../../../ReusableModal/ReusableModal";
import { GearIcon } from "@radix-ui/react-icons";
import SelectorSettings from "./SelectorSettings";

const SelectorModal = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <ReusableModal open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
            <ReusableModal.Button asChild>
                <button className="text-xl" onClick={() => setOpen(true)}>
                    <GearIcon className="w-9 h-9 text-white ml-5 hover:scale-[102%] hover:text-gray-50"/>
                </button>
            </ReusableModal.Button>
            <ReusableModal.Content title="Filtrowanie przedmiotów">
                <SelectorSettings />
            </ReusableModal.Content>
        </ReusableModal>
    );
};

export default SelectorModal;
