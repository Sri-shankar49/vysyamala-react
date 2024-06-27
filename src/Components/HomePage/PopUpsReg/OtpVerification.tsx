import React, { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import axios from 'axios';

interface OtpVerificationProps {
    onNext: () => void;
    onClose: () => void;
    mobileNumber: string; // Mobile number passed from the previous page
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({ onNext, onClose, mobileNumber }) => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState<boolean>(false); // State to track validation error
    const [errorMessage, setErrorMessage] = useState<string>(""); // State to store error message
    const totalInputs = 6;
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));
    const [profileId, setProfileId] = useState<string>(''); // State to store profile ID

    useEffect(() => {
        // Retrieve profile_id from session storage
        const storedProfileId = sessionStorage.getItem('profile_id');
        if (storedProfileId) {
            setProfileId(storedProfileId);
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (/^\d$/.test(value) || value === "") {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);
            setError(false); // Reset error state when user starts typing

            // Only move focus if the current input is not the last one and the value is not empty
            if (index < totalInputs - 1 && value !== "") {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = "";
            setOtpValues(newOtpValues);

            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = otpValues.every((value) => value !== "");
        if (isValid) {
            try {
                const otp = otpValues.join(''); // Concatenate OTP values
                const response = await axios.post('http://103.214.132.20:8000/auth/Otp_verify/', {
                    Otp: otp,
                    ProfileId: profileId
                });

                console.log('OTP Verification Response:', response.data);

                // Check the response for success or failure
                if (response.data.message === "OTP verified successfully.") {
                    onNext(); // Proceed to the next step upon successful OTP verification
                } else {
                    setError(true);
                    setErrorMessage("Invalid OTP. Please try again.");
                }
            } catch (error) {
                console.error('Error verifying OTP:', error);
                // Handle error (show error message, etc.)
                setError(true);
                setErrorMessage("Error verifying OTP. Please try again later.");
            }
        } else {
            setError(true);
            setErrorMessage("Please enter OTP.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <h2 className="text-primary text-[24px] font-semibold mb-2">Mobile Verification</h2>
                <p className="text-ash text-[16px]">
                    Please verify your mobile number and say why we need mobile verification
                </p>
            </div>

            <div className="text-center mb-4">
                <h2 className="text-ash text-[23px] font-semibold">OTP Verification</h2>
                <p className="text-primary">
                    We have sent a verification code to<br />
                    {mobileNumber}
                </p>
            </div>

            <div className="flex justify-center items-center gap-x-2 mb-8">
                {Array.from({ length: totalInputs }).map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className={`outline-none px-2 text-primary w-10 h-10 border ${error && !otpValues[index] ? 'border-red-500' : 'border-footer-text-gray'} rounded-md text-center`}
                        value={otpValues[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleBackspace(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                ))}
            </div>

            {error && (
                <div className="text-red-500 text-sm mb-4">
                    {errorMessage}
                </div>
            )}

            <div className="text-center mb-4">
                <p className="text-primary">
                    Didn&apos;t receive OTP?{" "}
                    <span className="text-main font-semibold hover:cursor-pointer">
                        Resend OTP
                    </span>
                </p>
            </div>

            <button
                type="submit"
                className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
            >
                Verify OTP
            </button>

            <IoIosCloseCircle
                onClick={onClose}
                className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
            />
        </form>
    );
};
