import { createContext, ReactNode, useState } from "react";
import { ErrorMessagesContextType } from "../types/providers";


export const ErrorMessagesContext = createContext<ErrorMessagesContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

const ErrorMessagesProvider = ({ children }: Props) => {
    const [messages, setMessages] = useState<string[]>([]);

    const errorMessagesContext: ErrorMessagesContextType = {
        messages: messages,
        handleAddMessages: (newMessages) => setMessages((prevMessages) => [...prevMessages, ...newMessages]),
        handleRemoveMessages: () => setMessages([]),
    };

    return <ErrorMessagesContext.Provider value={errorMessagesContext}>{children}</ErrorMessagesContext.Provider>;
};

export default ErrorMessagesProvider;
