import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ favorites, onClick }) => {
    return favorites ? (
        <i onClick={onClick} className="bi bi-bookmark-fill"></i>
    ) : (
        <i onClick={onClick} className="bi bi-bookmark"></i>
    );
};

Bookmark.propTypes = {
    favorites: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default Bookmark;
