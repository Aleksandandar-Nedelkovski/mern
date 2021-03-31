import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const textFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  disabled,
}) => {
  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        className={classnames(
          "block border border-grey-light w-full p-3 rounded mb-4",
          { "border-red-500": error }
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

textFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

textFieldGroup.defaultProps = {
  type: "text",
};

export default textFieldGroup;
