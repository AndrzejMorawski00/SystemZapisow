export type Course = {
    id: number;
    name: string;
    ects: number;
    recommended_for_first_year: boolean;
    type: CourseType;
    effects: CourseEffect[];
    tags: CourseTag[];
};

export type CourseEffect = {
    id: number;
    name: string;
};

export type CourseTag = {
    id: number;
    name: string;
    shortcut: string;
};

export type CourseType = {
    id: number;
    name: string;
    shortcut: string;
};

export type Semester = {
    id: number;
    name: string;
};
