import { PlannerContextType } from "../../types/providers";

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
