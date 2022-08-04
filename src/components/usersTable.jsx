import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";

const UsersTable = ({
    userCrop,
    onSort,
    selectedSort,
    onFavoritesChange,
    onDelete
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    favorites={user.favorites}
                    onClick={() => onFavoritesChange(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <table className="table">
            <TableHeader {...{ selectedSort, onSort, columns }} />
            <TableBody {...{ columns, data: userCrop }} />
        </table>
    );
};

UsersTable.propTypes = {
    userCrop: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onFavoritesChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
