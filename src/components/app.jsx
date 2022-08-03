import React, { useEffect, useState } from "react";
import Users from "./users";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../api";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const users = data.map((item) => ({ ...item, favorites: false }));
            setUsers(users);
        });
    }, []);

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
