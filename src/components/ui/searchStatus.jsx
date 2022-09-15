import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ users }) => {
    const renderPhrase = (number) => {
        if (number > 1 && number < 5 && number % 10 > 1 && number % 10 < 5) {
            return "человека";
        } else {
            return "человек";
        }
    };
    return users.length > 0 ? (
        <h4>
            <span className="badge bg-primary">
                {users.length} {renderPhrase(users.length)} тусанет с тобой
                сегодня
            </span>
        </h4>
    ) : (
        <h4>
            <span className="badge bg-danger">
                Никто не тусанет с тобой сегодня
            </span>
        </h4>
    );
};

SearchStatus.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SearchStatus;
