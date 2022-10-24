import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { UsersProvider } from "../hooks/useUsers";
import { CommentsProvider } from "../hooks/useComments";

const Users = () => {
    const { userId } = useParams();
    return (
        <UsersProvider>
            {userId ? (
                <CommentsProvider>
                    <UserPage userId={userId} />
                </CommentsProvider>
            ) : (
                <UsersListPage />
            )}
        </UsersProvider>
    );
};

export default Users;
