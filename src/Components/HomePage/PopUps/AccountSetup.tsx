// import React from 'react';
// import PropTypes from 'prop-types';

export const AccountSetup = ({ onClose }) => {
    console.log('AccountSetup component rendered'); // Debug log

    return (
        <div className="fixed inset-0 w-full h-full flex justify-center items-center z-1">
            <div className="bg-white p-8 rounded-lg w-1/5 relative">
                <button
                    onClick={onClose}
                    className="absolute top-[-20px] right-[-20px] text-[30px] text-ash bg-white rounded-full p-3 flex justify-center items-center w-[40px] h-[40px] hover:text-gray-800"
                >
                    &times;
                </button>
                <h2 className="text-xl text-ash mb-4 font-semibold">Let's set up your account</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-ash font-bold text-sm mb-2" htmlFor="profileFor">
                            Matrimony Profile for
                        </label>
                        <select
                            id="profileFor"
                            className="text-ash font-semibold block w-full px-3 py-2 border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        >
                            <option value="">Select</option>
                            <option value="self">Self</option>
                            <option value="son">Son</option>
                            <option value="daughter">Daughter</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-ash text-sm mb-2" htmlFor="mobile">
                            Mobile number
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-ash text-sm mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-ash text-sm mb-2" htmlFor="password">
                            Create Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13.875 18.825a6.375 6.375 0 01-9.09-9.09m0 0A6.375 6.375 0 1113.875 18.825zM15 15l5 5"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-4"
                    >
                        Register
                    </button>
                    <p className="text-center text-sm text-ash mt-4">
                        Existing user?{' '}
                        <button
                            type="button"
                            onClick={() => {
                                // You can add logic to switch to the login form if needed
                            }}
                            className="text-secondary hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

// Define prop types for the component
// AccountSetup.propTypes = {
//     onClose: PropTypes.func.isRequired,
// };
