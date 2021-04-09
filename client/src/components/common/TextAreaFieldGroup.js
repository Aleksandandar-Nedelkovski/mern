import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({ name, placeholder, value, error, onChange }) => {
  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <textarea
        className={classnames(
          "block border border-grey-light w-full p-3 rounded mb-4",
          { "border-red-500": error }
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;
