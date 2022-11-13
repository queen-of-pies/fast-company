import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { CommentsProvider } from "../hooks/useComments";
import UserEditPage from "../components/page/userEditPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <UsersLoader>
            {userId ? (
                <CommentsProvider>
                    {edit ? <UserEditPage /> : <UserPage userId={userId} />}
                </CommentsProvider>
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    );
};

export default Users;
