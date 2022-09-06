import React from "react";
import Select from "react-select";
import PropTypes, { oneOfType } from "prop-types";

const MultiSelectField = ({ options, label, onChange, name, value }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => ({
                  value: option,
                  label: options[option].name
              }))
            : options;

    const handleChange = (e) => {
        const data = { target: { name, value: e } };
        onChange(data);
    };

    return (
        <div className="mb-4">
            <label className="form-label m-2">{label}</label>
            {optionsArray && (
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={optionsArray}
                    onChange={handleChange}
                    name={name}
                    value={value}
                />
            )}
        </div>
    );
};

MultiSelectField.propTypes = {
    options: oneOfType([PropTypes.array, PropTypes.object]),
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired
};

export default MultiSelectField;
