import React, { useState } from "react";
import Users from "./users";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
    const initialState = api.users
        .fetchAll()
        .map((item) => ({ ...item, favorites: false }));
    const [users, setUsers] = useState(initialState);

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
    };

    const handleChange = (id) => {
        const newState = users.map((user) => {
            if (user._id === id) {
                user.favorites = !user.favorites;
            }
            return user;
        });
        setUsers(newState);
    };

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onFavoritesChange={handleChange}
            />
        </>
    );
};

export default App;
