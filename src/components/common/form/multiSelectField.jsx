import React from "react";
import Select from "react-select";
import PropTypes, { oneOfType } from "prop-types";

const MultiSelectField = ({ options, label, onChange, name, value }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => ({
                  value: options[option]._id,
                  label: options[option].name,
                  color: options[option].color
              }))
            : options;

    const transformedValue = value.map((val) => ({
        value: val._id,
        label: val.name,
        color: val.color
    }));

    const handleChange = (e) => {
        const transformedE = e.map((val) => ({
            _id: val.value,
            name: val.label,
            color: val.color
        }));
        const data = { target: { name, value: transformedE } };
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
                    defaultValue={transformedValue}
                    className="basic-multi-select"
                    classNamePrefix="select"
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
