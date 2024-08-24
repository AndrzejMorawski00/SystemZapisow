const apiLink = import.meta.env.VITE_API_URL;

export const generateEndpoint = (args: string[]): string => {
    const result = args.reduce((prevVal, arg) => `${prevVal}/${arg}`, apiLink);
    return `${result}/`;
};
