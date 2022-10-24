import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, options, onChange, name, value, error }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => options[option])
            : options;

    const handleChange = ({ target }) => {
        const item = optionsArray.find((option) => option._id === target.value);
        console.log("select handle change", item);
        onChange({ target: { name, value: item } });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                onChange={handleChange}
                className={`form-select ${error && "is-invalid"}`}
                id={name}
                name={name}
                defaultValue={typeof value === "object" ? value._id : value}
            >
                <option disabled value="">
                    Choose...
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    error: PropTypes.string
};

export default SelectField;
