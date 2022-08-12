import React, { useEffect, useState } from "react";
import api from "../../api";
import { useHistory, useParams } from "react-router-dom";
import QualitiesList from "../qualitiesList";

const User = () => {
    const [user, setUser] = useState();
    const { userId } = useParams();

    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUser(user);
        });
    }, []);
    const handleMoveToAllUsers = () => {
        history.push("/users");
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
            <button onClick={handleMoveToAllUsers}>Все пользователи</button>
        </>
    );
};

export default User;
