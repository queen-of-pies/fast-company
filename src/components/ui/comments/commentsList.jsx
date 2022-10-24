import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments }) => {
    if (!comments) {
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
    comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentsList;
