import { StudiesProgressRequirementObject, StudiesProgressType } from "../types/providers";

export const PLAN_TYPES = ["Inżynierskie", "Licencjackie"] as const;

export const BAC_REQUIREMENTS: StudiesProgressType = {
    type: "Licencjackie",
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
    type: "Inżynierskie",
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
        types: [1, 5, 6, 7, 39, 38],
        keyName: "i_ects",
    },
    {
        types: [7],
        keyName: "iinz_ects",
    },
    {
        types: [40],
        keyName: "kinz_ects",
    },
    {
        types: [1, 5, 6, 7, 8, 9, 10, 12, 13, 36, 37, 38, 39, 40],
        keyName: "oikp_ects",
    },
    {
        types: [13],
        keyName: "project",
    },
    {
        types: [14, 41],
        keyName: "ps",
    },
    {
        types: [42],
        keyName: "hs_ects",
    },
];
