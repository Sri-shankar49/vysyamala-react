import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";


interface AccountSetupProps {
    onNext: () => void;
    onClose: () => void;
}

export const AccountSetup: React.FC<AccountSetupProps> = ({ onNext, onClose }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    // Toggle the Password field
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // console.log('AccountSetup component rendered'); // Debug log

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p className="text-[16px] text-primary">While we find Matches for you</p>
                <h5 className="text-[24px] text-primary font-semibold mb-5">Let's set up your account</h5>
            </div>

            <div className="mb-5">
                {/* <label className="block text-ash font-bold text-sm mb-2" htmlFor="profileFor">
                    Matrimony Profile for
                </label> */}
                <select
                    id="profileFor"
                    className="text-ash font-medium block w-full px-3 py-2 border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                >
                    <option value="Matrimony Profile for" selected disabled>Matrimony Profile for</option>
                    <option value="Your self">Your self</option>
                    <option value="son / Daughter">Son / Daughter</option>
                    <option value="Relatives">Relatives</option>
                    <option value="Friends">Friends</option>
                </select>
            </div>

            <div className="mb-5">
                {/* <label className="block text-ash text-sm mb-2" htmlFor="mobile">
                    Mobile number
                </label> */}
                <input
                    type="tel"
                    id="mobile"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Mobile Number"
                />
            </div>

            <div className="mb-5">
                {/* <label className="block text-ash text-sm mb-2" htmlFor="email">
                    Email
                </label> */}
                <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Email"
                />
            </div>

            <div className="mb-5">
                {/* <label className="block text-ash text-sm mb-2" htmlFor="password">
                    Create Password
                </label> */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        placeholder="Create Password"
                    />

                    <div onClick={handleShowPassword} className="absolute inset-y-1.5 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
            >
                Register
            </button>

            <p className="text-center text-[16px] text-ash mt-5">
                Existing user?{' '}
                <button
                    type="button"
                    onClick={onNext}
                    className="text-secondary hover:underline"
                >
                    Login
                </button>
            </p>
            
            {/* <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 bg-black rounded-full flex items-center hover:text-gray-700"
            >
                &times;
            </button> */}

            <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
        </form>
    );
};

