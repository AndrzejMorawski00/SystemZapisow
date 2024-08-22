import useGetMetadataList from "../../../api/metadata/useGetMetadataList";
import { CourseTag } from "../../../types/courseTypes";
import { StudiesProgressType } from "../../../types/providers";

interface Props {
    requirements: StudiesProgressType;
    studiesProgress: StudiesProgressType;
}

const TagRequirements = ({ requirements, studiesProgress }: Props) => {
    const { data: tags, isLoading, isError } = useGetMetadataList<CourseTag>("tags");

    const requirementTags = (tags?.filter((tag) => requirements.tags.includes(tag.id)) || []).map((tag) => ({
        conditionMet: tag.id in studiesProgress.tags,
        ...tag,
    }));

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

    return (
        <ul className="flex flex-row justify-around mt-5">
            {requirementTags.map((tag) => (
                <li className={` text-xl tracking-wider  px-5 py-1 rounded-full BoxShadow transition hover:scale-[102%] ${tag.conditionMet ? "bg-green-500" : "bg-red-500"}`} key={tag.id}>
                    {tag.shortcut}
                </li>
            ))}
        </ul>
    );
};

export default TagRequirements;
