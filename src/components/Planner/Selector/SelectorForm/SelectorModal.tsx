import { useState } from "react";
import ReusableModal from "../../../ReusableModal/ReusableModal";
import { GearIcon } from "@radix-ui/react-icons";
import SelectorSettings from "./SelectorSettings";

const SelectorModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <ReusableModal open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
            <ReusableModal.Button asChild>
                <button className="" onClick={() => setOpen(true)}>
                    <GearIcon />
                </button>
            </ReusableModal.Button>
            <ReusableModal.Content title="Select Filters">
                <SelectorSettings />
            </ReusableModal.Content>
        </ReusableModal>
    );
};

export default SelectorModal;
