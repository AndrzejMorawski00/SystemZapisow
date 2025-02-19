import { ReactNode } from "react";
import ErrorMessages from "../components/ErrorMessages/ErrorMessages";
import ErrorMessagesProvider from "./ErrorMessagesProvider";
import QueryProvider from "./QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
    children: ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <QueryProvider>
            <ErrorMessagesProvider>
                <ErrorMessages>
                    <>
                        {children}
                        <ReactQueryDevtools />
                    </>
                </ErrorMessages>
            </ErrorMessagesProvider>
        </QueryProvider>
    );
};

export default Providers;
