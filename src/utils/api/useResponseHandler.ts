import { useNavigate } from "react-router-dom";
import useRefreshToken from "../../api/auth/useRefreshToken";

const useResponseHandler = () => {
    const refreshMutation = useRefreshToken();
    const navigate = useNavigate();

    const responseHandler = async (response: Response): Promise<any> => {
        if (response.ok) {
            if (containsData(response)) {
                return await response.json();
            }
            return null;
        }
        if (response.status === 403 || response.status === 401) {
            try {
                (await refreshMutation).mutateAsync();
            } catch (error) {
                navigate("/");
                throw new Error("Failed to refresh token");
            }
            return;
        }
        throw new Error(`Something went wrong... Status code:${response.status}`);
    };

    return responseHandler;
};

const containsData = (response: Response): boolean => {
    const contentType = response.headers.get("content-type") || "";
    return !!(contentType && contentType.indexOf("application/json") !== -1);
};

export default useResponseHandler;
