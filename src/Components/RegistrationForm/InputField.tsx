import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", value, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
      />
    </div>
  );
};

export default InputField;
