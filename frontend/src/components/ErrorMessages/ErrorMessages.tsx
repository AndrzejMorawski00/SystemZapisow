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
                        <ul className="flex flex-col gap-2 ml-3">
                            {messages.map((message, idx) => (
                                <li className="text-xl text-white tracking-wider" key={idx}>
                                    {message}
                                </li>
                            ))}
                        </ul>
                        <button className="tracking-wide text-2xl text-white mt-10 px-5 pt-1 pb-2 rounded-full bg-slate-700 border-2 transition hover:scale-[102%] hover:bg-slate-800 hover:text-gray-100" onClick={handleRemoveMessages}>Ok</button>
                    </div>
                </ReusableModal.Content>
            </ReusableModal>
        );
    }
    return <>{children}</>;
};

export default ErrorMessages;
