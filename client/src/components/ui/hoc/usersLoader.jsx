import { useDispatch, useSelector } from "react-redux";
import { getDataLoadingStatus, loadUsersList } from "../../../store/users";
import { useEffect } from "react";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataLoadingStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList());
        }
    }, []);

    if (!dataStatus) {
        return "Loading...";
    }

    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;
