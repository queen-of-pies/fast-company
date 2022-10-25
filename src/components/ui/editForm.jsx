import React, { useEffect, useState } from "react";
import validator from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";
import { useProfessions } from "../../hooks/useProfessions";
import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";

const EditForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: {},
        sex: "male",
        qualities: []
    });
    const [errors, setErrors] = useState({});
    const { professions, isLoading: isProfessionsLoaded } = useProfessions();

    const { qualities, isLoading: isQualitiesLoaded } = useQualities();

    const { currentUser, updateUser } = useAuth();

    const history = useHistory();
    const { userId } = useParams();

    useEffect(() => {
        if (userId !== currentUser._id) {
            history.push(`/users/${currentUser._id}/edit`);
        }
    }, []);

    useEffect(() => {
        setData(currentUser);
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const validateConfig = {
        name: {
            isRequired: { message: `Поле name обязательно к заполнению.` }
        },
        email: {
            isRequired: { message: `Поле email обязательно к заполнению.` },
            isEmail: { message: "Введеный email некорректный" }
        },
        profession: {
            isRequired: { message: "Необходимо выбрать профессию." }
        },
        license: {
            isRequired: {
                message: "Необходимо принять лицензионное соглашение."
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) =>
                typeof q === "string" ? q : q._id
            ),
            profession:
                typeof data.profession === "string"
                    ? data.profession
                    : data.profession._id
        };
        try {
            await updateUser(newData);
            history.goBack();
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <>
            <button
                className="btn btn-primary mt-5 ms-lg-5"
                onClick={() => history.goBack()}
            >
                Назад
            </button>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        {data.name.length &&
                        !isProfessionsLoaded &&
                        !isQualitiesLoaded ? (
                            <>
                                <h3 className="mb-4">Edit</h3>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Name"
                                        onChange={handleChange}
                                        name="name"
                                        value={data.name}
                                        error={errors.name}
                                    />
                                    <TextField
                                        label="Email"
                                        onChange={handleChange}
                                        name="email"
                                        value={data.email}
                                        error={errors.email}
                                    />
                                    <SelectField
                                        label={"Выберите профессию"}
                                        options={professions}
                                        onChange={handleChange}
                                        name="profession"
                                        value={data.profession}
                                        error={errors.profession}
                                    />
                                    <RadioField
                                        label="Sex"
                                        options={[
                                            { name: "Male", value: "male" },
                                            { name: "Female", value: "female" }
                                        ]}
                                        onChange={handleChange}
                                        name="sex"
                                        value={data.sex}
                                    />
                                    <MultiSelectField
                                        label="Выберите качества"
                                        options={qualities}
                                        onChange={handleChange}
                                        name="qualities"
                                        value={data.qualities}
                                    />
                                    <button
                                        className="btn btn-primary w-100 mx-auto"
                                        disabled={!isValid}
                                    >
                                        Submit
                                    </button>
                                </form>
                            </>
                        ) : (
                            <h1>Loading...</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditForm;
