import React, { useEffect, useState } from "react";
import Avatar from "../../common/avatar";
import PropTypes from "prop-types";
import api from "../../../api";

const Comment = ({ comment }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        if (comment) {
            api.users.getById(comment.userId).then((user) => {
                setUser(user);
            });
        }
    }, []);
    if (!user) {
        return <h1>Loading</h1>;
    }

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <Avatar />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {user.name}
                                        <span className="small">
                                            5 минут назад
                                        </span>
                                    </p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center">
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default Comment;
