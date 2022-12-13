import React from "react";
import Select from "react-select";
import PropTypes, { oneOfType } from "prop-types";

const MultiSelectField = ({ options, label, onChange, name, value }) => {
    const optionsArray = options.map((option) => ({
        value: option._id,
        label: option.name,
        color: option.color
    }));
    const transformedValue = value.map((val) => {
        let option = val;
        if (typeof val === "string") {
            option = options.find((opt) => opt._id === val);
        }
        return {
            value: option._id,
            label: option.name,
            color: option.color
        };
    });

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
