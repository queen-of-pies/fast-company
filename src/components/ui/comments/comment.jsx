import React from "react";
import PropTypes from "prop-types";
import { calculateCommentTime } from "../../../utils/calculateCommentTime";
import { useComments } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../../store/users";

const Comment = ({ comment }) => {
    const { deleteComment } = useComments();
    const user = useSelector(getUserById(comment.userId));
    const currentUserId = useSelector(getCurrentUserId());

    if (!user) {
        return <></>;
    }

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={user.img}
                            alt="comment-avatar"
                            height="40"
                            className="img-responsive rounded-circle mx-2"
                        />
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
                                    {currentUserId === user._id && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() =>
                                                deleteComment(comment._id)
                                            }
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
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
    user: PropTypes.object
};

export default Comment;
