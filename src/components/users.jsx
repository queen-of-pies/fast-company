import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";

const Users = ({ users, onDelete, onFavoritesChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions] = useState(api.professions.fetchAll());

    const count = users.length;
    const pageSize = 5;

    const handleProfessionSelect = (props) => {
        console.log(props);
    };
    console.log(professions);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
            />
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                {...user}
                                onDelete={onDelete}
                                onFavoritesChange={onFavoritesChange}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemCounts={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onFavoritesChange: PropTypes.func.isRequired
};

export default Users;
