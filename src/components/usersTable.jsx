import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UsersTable = ({ userCrop, onSort, ...rest }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort("name")} scope="col">
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th onClick={() => onSort("profession.name")} scope="col">
                        Профессия
                    </th>
                    <th onClick={() => onSort("completedMeetings")} scope="col">
                        Встретился, раз
                    </th>
                    <th onClick={() => onSort("rate")} scope="col">
                        Оценка
                    </th>
                    <th onClick={() => onSort("bookmark")} scope="col">
                        Избранное
                    </th>
                    <th scope="col"></th>
                </tr>
            </thead>
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
    onSort: PropTypes.func.isRequired
};

export default UsersTable;
