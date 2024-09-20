import { getAPILinkValue } from "./apiConfig";

const apiLink = getAPILinkValue();

export const generateEndpoint = (args: string[]): string => {
    const result = args.reduce((prevVal, arg) => `${prevVal}/${arg}`, apiLink);
    return `${result}/`;
};
