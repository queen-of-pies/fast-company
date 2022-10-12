import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import { useUsers } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const pageSize = 8;

    const { users, deleteUser } = useUsers();

    const handleDelete = (id) => {
        deleteUser(id);
    };

    const handleChange = (id) => {
        // const newState = users.map((user) => {
        //     if (user._id === id) {
        //         user.favorites = !user.favorites;
        //     }
        //     return user;
        // });
        // setUsers(newState);
    };

    const handleProfessionSelect = (item) => {
        setSearch("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearch = (e) => {
        setSelectedProf();
        const { value } = e.target;
        setSearch(value);
    };

    if (users && users.length) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : search
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
              )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
            setSortBy({});
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus users={filteredUsers} />
                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearch}
                        style={{ outline: "none" }}
                    />
                    {count > 0 && (
                        <UsersTable
                            userCrop={userCrop}
                            onFavoritesChange={handleChange}
                            onDelete={handleDelete}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCounts={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

export default UsersListPage;
