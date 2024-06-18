import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  type?: string; // Make type optional with a default value
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
}) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
      />
    </div>
  );
};

export default InputField;
