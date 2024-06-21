import React from 'react';

interface AddOnsProps {
    label: string;
    desc: string;
    rate?: number;
    name: string;
    type?: string;
    value?: string;
    // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddOns: React.FC<AddOnsProps> = ({ label, desc, rate, name, type = 'checkbox', value }) => {
    return (
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-baseline">
                <input type={type} id={name} name={name} value={value} />
                <div className="pl-2">
                    <label htmlFor={name} className="font-semibold">
                        {label}
                    </label>
                    <p className="text-sm font-normal">{desc}</p>
                </div>
            </div>

            <div>
                <p className="text-ash">&#8377; {rate}.00/-</p>
            </div>
        </div>
    );
};
