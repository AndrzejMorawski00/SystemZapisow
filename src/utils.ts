import { PlannerContextType } from "./types";

export const isValidKeyValue = <T extends Object>(s: string, obj: T): boolean => {
    return s in obj;
};

const getCourseQueryParam = (paramName: string, paramValue: number): string => {
    if (paramValue === -1) {
        return "";
    }
    return `${paramName}=${paramValue}`;
};

export const getCourseQueryParams = ({ effect, type, tag, filterValue }: PlannerContextType): string => {
    let queryParams = filterValue ? `?search="${filterValue}"` : "?";
    const queryParamsList = [
        getCourseQueryParam("effects", effect),
        getCourseQueryParam("type", type),
        getCourseQueryParam("tags", tag),
    ];
    for (const queryParam of queryParamsList) {
        if (queryParam) {
            queryParams += `&${queryParam}`;
        }
    }
    return queryParams;
};
