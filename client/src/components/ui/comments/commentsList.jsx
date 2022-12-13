import React, { useEffect } from "react";
import Comment from "./comment";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../../store/comments";

const CommentsList = ({ userId }) => {
    const dispatch = useDispatch();
    const isCommentsLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    if (isCommentsLoading) {
        return <h1>Loading</h1>;
    }
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

CommentsList.propTypes = {
    userId: PropTypes.string.isRequired
};

export default CommentsList;
