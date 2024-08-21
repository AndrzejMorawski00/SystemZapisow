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
            <div>
                <p>Ładowanie...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <p>Coś poszło nie tak...</p>
            </div>
        );
    }

    return (
        <ul>
            {requirementTags.map((tag) => (
                <li className={`${tag.conditionMet ? "" : ""}`} key={tag.id}>
                    {tag.shortcut}
                </li>
            ))}
        </ul>
    );
};

export default TagRequirements;
