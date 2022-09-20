import React, { useEffect, useState } from "react";
import Avatar from "../../common/avatar";
import PropTypes from "prop-types";
import api from "../../../api";
import { calculateCommentTime } from "../../../utils/calculateCommentTime";

const Comment = ({ comment, handleRemove }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        if (comment) {
            api.users.getById(comment.userId).then((user) => {
                setUser(user);
            });
        }
    }, []);

    if (!user) {
        return <></>;
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
                                        <span className="small p-2">
                                            {calculateCommentTime(
                                                comment.created_at
                                            )}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() =>
                                            handleRemove(comment._id)
                                        }
                                    >
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
    comment: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
};

export default Comment;
