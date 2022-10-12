import React, { useEffect, useState } from "react";
import validator from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";
import { useProfessions } from "../../hooks/useProfessions";
import { useQualities } from "../../hooks/useQualities";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const { professions } = useProfessions();
    const { qualities } = useQualities();
    const qualitiesList = qualities.map((qual) => ({
        label: qual.name,
        value: qual._id
    }));

    useEffect(() => {
        validate();
    }, [data]);

    const validateConfig = {
        email: {
            isRequired: { message: `Поле email обязательно к заполнению.` },
            isEmail: { message: "Введеный email некорректный" }
        },
        password: {
            isRequired: { message: `Поле password обязательно к заполнению.` },
            isCapitalSymbol: {
                message: `Поле password должно содержать хотя бы одну заглавную букву.`
            },
            isDigit: {
                message: `Поле password должно содержать хотя бы одну цифру.`
            },
            min: {
                message: `Поле password должно содержать не менее 8 символов.`,
                value: 8
            }
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
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q._id),
            profession: data.profession._id
        };
        console.log(newData);
    };

    return (
        <>
            <h3 className="mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    onChange={handleChange}
                    name="email"
                    value={data.email}
                    error={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={data.password}
                    error={errors.password}
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
                    options={qualitiesList}
                    onChange={handleChange}
                    name="qualities"
                    value={data.qualities}
                />
                <CheckboxField
                    onChange={handleChange}
                    name="license"
                    value={data.license}
                    error={errors.license}
                >
                    Принимаю <a>лицензионное соглашение</a>
                </CheckboxField>
                <button
                    className="btn btn-primary w-100 mx-auto"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
