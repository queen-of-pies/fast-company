import React, { useEffect, useState } from "react";
import Comment from "./comment";
import api from "../../../api";
import PropTypes from "prop-types";

const CommentsList = ({ userId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((comments) => {
            setComments(comments);
        });
    }, []);

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
    userId: PropTypes.string.isRequired
};

export default CommentsList;
