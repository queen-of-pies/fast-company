import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import usersService from "../services/users.service";
import { toast } from "react-toastify";

const UsersContext = React.createContext();

export const useUsers = () => {
    return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const content = await usersService.fetchAll();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    function getUserById(userId) {
        return users.find((user) => user._id === userId);
    }

    const deleteUser = async (id) => {
        try {
            const content = await usersService.delete(id);
            if (content && content._id === id) {
                setUsers((prevState) =>
                    prevState.filter((item) => item._id !== id)
                );
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <UsersContext.Provider value={{ users, deleteUser, getUserById }}>
            {!isLoading ? children : <h1>Loading...</h1>}
        </UsersContext.Provider>
    );
};

UsersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
