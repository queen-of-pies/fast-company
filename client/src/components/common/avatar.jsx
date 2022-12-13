import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ size }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width={size === "big" ? "150" : "65"}
            height={size === "big" ? "150" : "65"}
        />
    );
};

Avatar.propTypes = {
    size: PropTypes.string
};

export default Avatar;
