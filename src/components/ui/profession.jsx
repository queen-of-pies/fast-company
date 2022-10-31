import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const professions = useSelector(getProfessions());
    const isLoading = useSelector(getProfessionsLoadingStatus());

    const getProfession = (id) => {
        return professions.find((prof) => prof._id === id);
    };

    return <p>{!isLoading ? getProfession(id).name : "Loading"}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
