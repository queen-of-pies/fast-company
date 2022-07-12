import React from "react";
import QualitieList from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {
    const {
        _id,
        name,
        qualities,
        profession,
        completedMeetings,
        rate,
        onDelete,
        favorites,
        onFavoritesChange
    } = props;
    return (
        <tr key={_id}>
            <th scope="row">{name}</th>
            <td>
                <QualitieList qualities={qualities}/>
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td  onClick={()=>onFavoritesChange(_id)}>
                <Bookmark favorites={favorites} />
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => onDelete(_id)}>
                    delete
                </button>
            </td>
        </tr>
    );
};

export default User