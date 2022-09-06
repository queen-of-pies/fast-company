import React from "react";
import PropTypes, { arrayOf, oneOfType } from "prop-types";

const CheckboxField = ({ value, onChange, error, name, children }) => {
    const handleChange = () => {
        onChange({ target: { name, value: !value } });
    };

    return (
        <div className="form-check mb-4">
            <input
                className="form-check-input"
                type="checkbox"
                value={value}
                id={name}
                name={name}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckboxField.propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    children: oneOfType([arrayOf(PropTypes.node), PropTypes.node])
};

export default CheckboxField;
