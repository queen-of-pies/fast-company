import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";

const UserCard = ({ user }) => {
    const history = useHistory();
    const { currentUser } = useAuth();
    const professions = useSelector(getProfessions());
    const isLoading = useSelector(getProfessionsLoadingStatus());

    const handleMoveToEdit = () => {
        history.push(`/users/${user._id}/edit`);
    };
    if (isLoading) {
        return "Loading";
    }

    const prof = professions.find((prof) => prof._id === user.profession);
    return (
        <div className="card mb-3">
            <div className="card-body">
                {user._id === currentUser._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleMoveToEdit}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}
                <div className=" d-flex flex-column align-items-center text-center position-relative">
                    <div className="mt-3">
                        <img
                            src={user.img}
                            alt=""
                            className="responsive-img rounded-circle"
                        />
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">{prof.name}</p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
