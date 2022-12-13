import React, { useEffect, useState } from "react";
import validator from "../../../utils/validator";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
import { createComment } from "../../../store/comments";

const NewComment = ({ userId }) => {
    const [newComment, setNewComment] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        validate();
    }, [newComment]);

    const validateConfig = {
        content: {
            isRequired: { message: `Комментарий не должен быть пустым.` }
        }
    };

    const validate = () => {
        const errors = validator(newComment, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = ({ target }) => {
        setNewComment((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = () => {
        const isValid = validate();
        if (!isValid) return;
        const comment = {
            ...newComment,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        dispatch(createComment(comment));
        setNewComment({});
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            Сообщение
                        </label>
                        <textarea
                            className={`form-control ${
                                errors.content && "is-invalid"
                            }`}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            value={newComment.content || ""}
                            onChange={handleChange}
                            name="content"
                        />
                        {errors.content && (
                            <div className="invalid-feedback">
                                {errors.content}
                            </div>
                        )}
                        <button
                            disabled={!isValid}
                            onClick={handleSubmit}
                            className="btn btn-primary mt-4"
                        >
                            Опубликовать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

NewComment.propTypes = {
    userId: PropTypes.string.isRequired
};

export default NewComment;
