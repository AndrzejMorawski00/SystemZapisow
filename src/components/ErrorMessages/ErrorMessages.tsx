import { ReactNode } from "react";
import useErrorMessagesContext from "../../useContextHooks/useErrorMessagesContext";
import ReusableModal from "../ReusableModal/ReusableModal";

interface Props {
    children: ReactNode;
}

const ErrorMessages = ({ children }: Props) => {
    const { messages, handleRemoveMessages } = useErrorMessagesContext();
    if (messages.length > 0) {
        return (
            <ReusableModal open={true} onOpenChange={handleRemoveMessages}>
                <ReusableModal.Content title="Errors">
                    <div>
                        <ul>
                            {messages.map((message, idx) => (
                                <li key={idx}>{message}</li>
                            ))}
                        </ul>
                        <button onClick={handleRemoveMessages}>Ok</button>
                    </div>
                </ReusableModal.Content>
            </ReusableModal>
        );
    }
    return <>{children}</>;
};

export default ErrorMessages;
