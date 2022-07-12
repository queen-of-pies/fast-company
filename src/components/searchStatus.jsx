import React from "react";

const SearchStatus = (props) => {
    const {users} = props;

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
                {users.length} {renderPhrase(users.length)} тусанет с тобой сегодня
            </span>
        </h4>
    ) : (
        <h4>
            <span className="badge bg-danger">Никто не тусанет с тобой сегодня</span>
        </h4>
    );
};

export default SearchStatus