import useGetRequest from "../../../api/useGetRequest";
import { CourseTag } from "../../../types/courseTypes";
import { StudiesProgressType } from "../../../types/providers";
import { generateEndpoint } from "../../../utils/api/generateEndpoint";

interface Props {
    requirements: StudiesProgressType;
    studiesProgress: StudiesProgressType;
}

const TagRequirements = ({ requirements, studiesProgress }: Props) => {
    const { data: tags, isError, isLoading } = useGetRequest<CourseTag[]>(['list','requirements', 'tags'], generateEndpoint(['api','tags']));
    // const { data: tags, isError, isLoading } = useGetRequest<CourseTag[]>(['list', 'tags'], generateEndpoint(['tags'])); // Which way is correct if I'm using the same set of keys twice?
    if (isLoading) {
        return (
            <div className="flex w-full h-full items-center justify-center">
                <p className="text-2xl tracking-wide text-white">Ładowanie...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex w-full h-full items-center justify-center">
                <p className="text-2xl tracking-wide text-white">Coś poszło nie tak...</p>
            </div>
        );
    }

    const requirementTags = (tags?.filter((tag) => requirements.tags.includes(tag.id)) || []).map((tag) => ({
        conditionMet: studiesProgress.tags.includes(tag.id),
        ...tag,
    }));

    return (
        <ul className="flex flex-row justify-around mt-5">
            {requirementTags.map((tag) => (
                <li
                    className={` text-xl tracking-wider  px-5 py-1 rounded-full BoxShadow transition hover:scale-[102%] ${
                        tag.conditionMet ? "bg-green-500" : "bg-red-500"
                    }`}
                    key={tag.id}
                >
                    {tag.shortcut}
                </li>
            ))}
        </ul>
    );
};

export default TagRequirements;
