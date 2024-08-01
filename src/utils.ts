export const isValidKeyValue = <T extends Object>(s: string, obj: T) => {
    return s in obj;
};
