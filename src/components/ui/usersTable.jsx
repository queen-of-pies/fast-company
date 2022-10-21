import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import QualitiesList from "./qualities/qualitiesList";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UsersTable = ({ userCrop, onSort, selectedSort, onFavoritesChange }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        profession: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "favorites",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    favorites={user.favorites}
                    onClick={() => onFavoritesChange(user._id)}
                />
            )
        }
    };
    return (
        <Table
            selectedSort={selectedSort}
            onSort={onSort}
            columns={columns}
            data={userCrop}
        />
    );
};

UsersTable.propTypes = {
    userCrop: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onFavoritesChange: PropTypes.func.isRequired
};

export default UsersTable;
