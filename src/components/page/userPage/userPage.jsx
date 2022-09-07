import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import QualitiesList from "../../ui/qualities/qualitiesList";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUser(user);
            console.log("user: ", user);
        });
    }, []);
    const handleMoveToEdit = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (!user) {
        return <h1>Loading</h1>;
    }
    return (
        <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <h3>CompletedMeetings: {user.completedMeetings}</h3>
            <h2>Rate: {user.rate}</h2>
            <button onClick={handleMoveToEdit}>Редактировать</button>
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
