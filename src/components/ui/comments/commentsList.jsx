import React, { useEffect } from "react";
import Comment from "./comment";
import api from "../../../api";
import PropTypes from "prop-types";

const CommentsList = ({ fetchComments, comments }) => {
    useEffect(() => {
        fetchComments();
    }, []);

    const handleRemove = (id) => {
        api.comments.remove(id).then(() => fetchComments());
    };

    if (!comments) {
        return <h1>Loading</h1>;
    }
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        handleRemove={handleRemove}
                    />
                ))}
            </div>
        </div>
    );
};

CommentsList.propTypes = {
    fetchComments: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentsList;
