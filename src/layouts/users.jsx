import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { UsersProvider } from "../hooks/useUsers";

const Users = () => {
    const { userId } = useParams();
    return (
        <UsersProvider>
            {userId ? <UserPage userId={userId} /> : <UsersListPage />}
        </UsersProvider>
    );
};

export default Users;
