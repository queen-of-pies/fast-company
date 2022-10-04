import React from "react";
import { useProfessions } from "../../hooks/useProfessions";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    return <p>{!isLoading ? getProfession(id).name : "Loading"}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
