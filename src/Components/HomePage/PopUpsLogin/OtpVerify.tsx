import React, { useState, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
// import config from '../../../API'; // Import the configuration file



interface OtpVerifyProps {
    onNext: () => void;
    onClose: () => void;
}

export const OtpVerify: React.FC<OtpVerifyProps> = ({ onNext, onClose }) => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState<boolean>(false); // State to track validation error
    // const [shouldNavigate, setShouldNavigate] = useState<boolean>(false); // State to control navigation
    const totalInputs = 6;
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = otpValues.every((value) => value !== "");
        if (isValid) {
            onNext();
        } else {
            setError(true);
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
