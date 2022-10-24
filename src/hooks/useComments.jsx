import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();
    const { currentUser } = useAuth();

    useEffect(() => {
        getComments();
    }, [userId]);

    function sortComments(comments) {
        return comments.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
    }

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        };
        try {
            const content = await commentService.createComment(comment);
            setComments((prevState) => sortComments([...prevState, content]));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function getComments() {
        try {
            const content = await commentService.getComments(userId);
            setComments(sortComments(content));
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteComment(id) {
        try {
            await commentService.deleteComment(id);
            setComments((prevState) =>
                prevState.filter((comment) => comment._id !== id)
            );
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <CommentsContext.Provider
            value={{
                comments,
                createComment,
                isLoading,
                getComments,
                deleteComment
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
