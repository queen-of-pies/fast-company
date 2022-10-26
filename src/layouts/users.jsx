import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { UsersProvider } from "../hooks/useUsers";
import { CommentsProvider } from "../hooks/useComments";
import UserEditPage from "../components/page/userEditPage";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <UsersProvider>
            {userId ? (
                <CommentsProvider>
                    {edit ? <UserEditPage /> : <UserPage userId={userId} />}
                </CommentsProvider>
            ) : (
                <UsersListPage />
            )}
        </UsersProvider>
    );
};

export default Users;
