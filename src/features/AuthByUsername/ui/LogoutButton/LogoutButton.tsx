import { useDispatch } from "react-redux";
import { logoutUser } from "../../model/services/logoutUser";

export const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return <button onClick={handleLogout}>🚪 Logout</button>;
};
