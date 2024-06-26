import React from 'react';

interface CheckboxProps {
    id: string;
    name: string;
    value: string;
    label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, value, label }) => {
    return (
        <div className=''>
            <input
                type="checkbox"
                id={id}
                name={name}
                value={value}
            />
            <label htmlFor={id} className="pl-1">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
