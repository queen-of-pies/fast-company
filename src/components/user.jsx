import React from "react";
import QualitieList from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    favorites,
    onFavoritesChange
}) => {
    return (
        <tr>
            <th scope="row">{name}</th>
            <td>
                <QualitieList qualities={qualities} />
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td >
                <Bookmark favorites={favorites} onClick={() => onFavoritesChange(_id)} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    favorites: PropTypes.bool.isRequired,
    onFavoritesChange: PropTypes.func.isRequired
};

export default User;
