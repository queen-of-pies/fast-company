import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const sortByDateAsc = (a, b) => {
    const a_ = Date.parse(a.created_at);
    const b_ = Date.parse(b.created_at);
    return a_ < b_ ? 1 : -1;
};

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        errors: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            action.payload.sort(sortByDateAsc);
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestedFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        commentDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
            state.entities.sort(sortByDateAsc);
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestedFailed,
    commentDeleted,
    commentCreated
} = actions;

const commentDeleteRequested = createAction("comments/commentDeleteRequested");
const commentDeleteRequestedFailed = createAction(
    "comments/commentDeleteRequestedFailed"
);
const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateRequestedFailed = createAction(
    "comments/commentCreateRequestedFailed"
);

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const data = await commentService.getComments(userId);
        dispatch(commentsReceived(data));
    } catch (error) {
        dispatch(commentsRequestedFailed(error.message));
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    dispatch(commentDeleteRequested());
    try {
        await commentService.deleteComment(commentId);
        dispatch(commentDeleted(commentId));
    } catch {
        dispatch(commentDeleteRequestedFailed());
    }
};

export const createComment = (comment) => async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
        const data = await commentService.createComment(comment);
        dispatch(commentCreated(data));
    } catch {
        dispatch(commentCreateRequestedFailed());
    }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
