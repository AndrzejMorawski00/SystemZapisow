import { StudiesProgressRequirementObject, StudiesProgressType } from "./types";

export const REFRESH_TOKEN = "refresh_token";
export const ACCESS_TOKEN = "access_token";
export const MAX_PLAN_NUMBER = 3;
export const MAX_SEMESTER_NUMBER = 10;

export const PLAN_TYPES = ["Engineer", "Bachelor"] as const;

export const BAC_REQUIREMENTS: StudiesProgressType = {
    type: "Bachelor",
    i_ects: 54,
    iinz_ects: 0,
    kinz_ects: 0,
    project: 1,
    oikp_ects: 140,
    tags: [10, 12, 13, 14, 15, 16, 18],
    ps: 1,
    practices: 3,
    hs_ects: 5,
    owi_ects: 1,
    e_ects: 0,
};

export const ENG_REQUIREMENTS: StudiesProgressType = {
    type: "Engineer",
    i_ects: 66,
    iinz_ects: 12,
    kinz_ects: 10,
    project: 1,
    oikp_ects: 170,
    tags: [10, 12, 13, 14, 15, 16, 18],
    ps: 1,
    practices: 4,
    hs_ects: 5,
    owi_ects: 1,
    e_ects: 2,
};

export const INITIAL_STUDIES_REQUIREMENTS: Omit<StudiesProgressType, "type"> = {
    i_ects: 0,
    iinz_ects: 0,
    kinz_ects: 0,
    project: 1,
    oikp_ects: 0,
    tags: [],
    ps: 1,
    practices: 0,
    hs_ects: 0,
    owi_ects: 0,
    e_ects: 0,
};

export const REQUIREMENT_ID_MAPPING: StudiesProgressRequirementObject[] = [
    {
        tagIdList: [1, 5, 6, 7, 39, 38],
        keyName: "i_ects",
    },
    {
        tagIdList: [7],
        keyName: "iinz_ects",
    },
    {
        tagIdList: [40],
        keyName: "kinz_ects",
    },
    {
        tagIdList: [1, 5, 6, 7, 8, 9, 10, 12, 13, 36, 37, 38, 39, 40],
        keyName: "oikp_ects",
    },
    {
        tagIdList: [13],
        keyName: "project",
    },
    {
        tagIdList: [14, 41],
        keyName: "ps",
    },
    {
        tagIdList: [42],
        keyName: "hs_ects",
    },
];
