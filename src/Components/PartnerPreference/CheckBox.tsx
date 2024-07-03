import React from 'react';

interface CheckboxProps {
    id: string;
    name: string;
    value: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, value, label, onChange }) => {
    return (
        <div>
            <input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default Checkbox;
