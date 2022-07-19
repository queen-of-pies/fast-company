import React from "react";
import PropTypes from "prop-types";

const Bookmark = (props) => {
    const { favorites } = props;

    return favorites ? (
        <i className="bi bi-bookmark-fill"></i>
    ) : (
        <i className="bi bi-bookmark"></i>
    );
};

Bookmark.propTypes = {
    favorites: PropTypes.bool.isRequired
};

export default Bookmark;
