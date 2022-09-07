import React, { useEffect, useState } from "react";
import validator from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";

const EditForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: {},
        sex: "male",
        qualities: []
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const { userId } = useParams();
    const history = useHistory();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setData(user);
            setIsLoaded(true);
        });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        data.qualities = data.qualities.map((quality) => ({
            _id: quality.value,
            name: quality.label,
            color: quality.color
        }));
        console.log(data);
        api.users.update(userId, data).then(() => history.goBack());
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    {isLoaded ? (
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
                                    value={data.profession._id}
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
    );
};

export default EditForm;
