import React from "react";
import User from "./user";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";

const UsersTable = ({ userCrop, onSort, selectedSort, ...rest }) => {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: { name: "Качества" },
        profession: { iter: "profession.name", name: "Профессия" },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: { iter: "bookmark", name: "Избранное" },
        delete: {}
    };
    return (
        <table className="table">
            <TableHeader {...{ selectedSort, onSort, columns }} />
            <tbody>
                {userCrop.map((user) => (
                    <User key={user._id} {...user} {...rest} />
                ))}
            </tbody>
        </table>
    );
};

UsersTable.propTypes = {
    userCrop: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
