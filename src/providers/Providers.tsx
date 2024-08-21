import ErrorMessages from "../components/ErrorMessages/ErrorMessages";
import ErrorMessagesProvider from "./ErrorMessagesProvider";
import QueryProvider from "./QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface IProviders {
    children: JSX.Element;
}

const Providers = ({ children }: IProviders) => {
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
