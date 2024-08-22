import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { ReactNode } from "react";

interface IReusableModal {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

interface IModalContent {
    title: string;
    children: ReactNode;
}

const ReusableModal = ({ open, onOpenChange, children }: IReusableModal) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog.Root>
    );
};

const ModalContent = ({ title, children }: IModalContent) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay">
                <Dialog.Description />
                <Dialog.Content className="DialogContent">
                    <div className="flex justify-between items-center px-2 pb-4">
                        <Dialog.Title className="text-3xl tracking-wider text-white ">{title}</Dialog.Title>
                        <Dialog.Close asChild>
                            <Cross2Icon className="w-9 h-9 text-white transition hover:scale-[102%]" />
                        </Dialog.Close>
                    </div>
                    {children}
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    );
};

ReusableModal.Close = Dialog.Close;
ReusableModal.Button = Dialog.Trigger;
ReusableModal.Content = ModalContent;
export default ReusableModal;
