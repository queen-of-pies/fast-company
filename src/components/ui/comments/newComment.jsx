import React, { useEffect, useState } from "react";
import SelectField from "../../common/form/selectField";
import api from "../../../api";
import PropTypes from "prop-types";
import validator from "../../../utils/validator";

const NewComment = ({ pageId, fetchComments }) => {
    const [users, setUsers] = useState([]);
    const defaultNewComment = { user: { _id: "" }, content: "" };
    const [newComment, setNewComment] = useState(defaultNewComment);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const users = data.map((item) => ({
                _id: item._id,
                name: item.name
            }));
            setUsers(users);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [newComment]);

    const validateConfig = {
        user: {
            isRequired: { message: `Необходимо выбрать пользователя.` }
        },
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
        api.comments
            .add({
                pageId,
                userId: newComment.user._id,
                content: newComment.content
            })
            .then(() => {
                fetchComments();
                setNewComment(defaultNewComment);
            });
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <SelectField
                            options={users}
                            onChange={handleChange}
                            value={newComment.user}
                            name="user"
                            error={errors.user}
                        />
                    </div>
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
                            value={newComment.content}
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
    pageId: PropTypes.string.isRequired,
    fetchComments: PropTypes.func.isRequired
};

export default NewComment;
