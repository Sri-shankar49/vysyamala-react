// import axios from "axios";
// import React, { useState, useRef } from "react";
// import { IoIosCloseCircle } from "react-icons/io";
// // import config from '../../../API'; // Import the configuration file



// interface OtpVerifyProps {
//     onNext: () => void;
//     onClose: () => void;
// }

// export const OtpVerify: React.FC<OtpVerifyProps> = ({ onNext, onClose }) => {
//     const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
//     const [error, setError] = useState<boolean>(false); // State to track validation error
//     // const [shouldNavigate, setShouldNavigate] = useState<boolean>(false); // State to control navigation
//     const totalInputs = 6;
//     const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [apiError, setApiError] = useState<string | null>(null);
//     const mobileno = sessionStorage.getItem("mobileNumber");
//     console.log(mobileno);


//     const handleChange = (index: number, value: string) => {
//         if (/^\d$/.test(value) || value === "") {
//             const newOtpValues = [...otpValues];
//             newOtpValues[index] = value;
//             setOtpValues(newOtpValues);
//             setError(false); // Reset error state when user starts typing

//             // Only move focus if the current input is not the last one and the value is not empty
//             if (index < totalInputs - 1 && value !== "") {
//                 inputRefs.current[index + 1]?.focus();
//             }
//         }
//     };

//     const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Backspace") {
//             const newOtpValues = [...otpValues];
//             newOtpValues[index] = "";
//             setOtpValues(newOtpValues);

//             if (index > 0) {
//                 inputRefs.current[index - 1]?.focus();
//             }
//         }
//     };

//     // const handleSubmit = (e: React.FormEvent) => {
//     //     e.preventDefault();

//     //     const isValid = otpValues.every((value) => value !== "");
//     //     if (isValid) {
//     //         onNext();
//     //     } else {
//     //         setError(true);
//     //     }
//     // };


//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         const isValid = otpValues.every((value) => value !== "");
//         if (isValid) {
//             const otp = otpValues.join("");
//             try {
//                 const response = await axios.post('http://103.214.132.20:8000/auth/Login_verifyotp/', {
//                     Mobile_no: mobileno,
//                     Otp: otp
//                 });

//                 if (response.data.status === 1) {
//                     sessionStorage.setItem('token', response.data.token);
//                     onNext();
//                 } else {
//                     setApiError(response.data.message || 'Verification failed');
//                 }
//             } catch (error) {
//                 setApiError('An error occurred. Please try again.');
//             }
//         } else {
//             setError(true);
//         }
//         setIsSubmitting(false);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="mb-5">
//                 <h2 className="text-primary text-[24px] font-semibold mb-2">Mobile Verification</h2>
//                 <p className="text-ash text-[16px]">
//                     Please verify your mobile number and say why we need mobile verification 
//                 </p>
//             </div>

//             <div className="text-center mb-4">
//                 <h2 className="text-ash text-[23px] font-semibold">OTP Verification</h2>
//                 <p className="text-primary">
//                     We have sent a verification code to {mobileno}<br />
//                 </p>
//             </div>

//             <div className="flex justify-center items-center gap-x-2 mb-8">
//                 {Array.from({ length: totalInputs }).map((_, index) => (
//                     <input
//                         key={index}
//                         type="text"
//                         maxLength={1}
//                         className={`outline-none px-2 text-primary w-10 h-10 border ${error && !otpValues[index] ? 'border-red-500' : 'border-footer-text-gray'} rounded-md text-center`}
//                         value={otpValues[index]}
//                         onChange={(e) => handleChange(index, e.target.value)}
//                         onKeyDown={(e) => handleBackspace(index, e)}
//                         ref={(el) => (inputRefs.current[index] = el)}
//                     />
//                 ))}
//             </div>

//             <div className="text-center mb-4">
//                 <p className="text-primary">
//                     Didn&apos;t receive OTP?{" "}
//                     <span className="text-main font-semibold hover:cursor-pointer">
//                         Resend OTP
//                     </span>
//                 </p>
//             </div>

//             <button
//                 type="submit"
//                 className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
//             >
//                 {isSubmitting ? 'Verify...' :'Verify OTP'}
              
//             </button>

//             <IoIosCloseCircle
//                 onClick={onClose}
//                 className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
//             />
//         </form>
//     );
// };


// import axios from "axios";
// import React, { useState, useRef } from "react";
// import { IoIosCloseCircle } from "react-icons/io";

// interface OtpVerifyProps {
//     onNext: () => void;
//     onClose: () => void;
// }

// export const OtpVerify: React.FC<OtpVerifyProps> = ({ onNext, onClose }) => {
//     const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
//     const [error, setError] = useState<boolean>(false);
//     const totalInputs = 6;
//     const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [apiError, setApiError] = useState<string | null>(null);
//     const mobileno = sessionStorage.getItem("mobileNumber");

//     const handleChange = (index: number, value: string) => {
//         if (/^\d$/.test(value) || value === "") {
//             const newOtpValues = [...otpValues];
//             newOtpValues[index] = value;
//             setOtpValues(newOtpValues);
//             setError(false);

//             if (index < totalInputs - 1 && value !== "") {
//                 inputRefs.current[index + 1]?.focus();
//             }
//         }
//     };

//     const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Backspace") {
//             const newOtpValues = [...otpValues];
//             newOtpValues[index] = "";
//             setOtpValues(newOtpValues);

//             if (index > 0) {
//                 inputRefs.current[index - 1]?.focus();
//             }
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         const isValid = otpValues.every((value) => value !== "");
//         if (isValid) {
//             const otp = otpValues.join("");
//             try {
//                 const response = await axios.post('http://103.214.132.20:8000/auth/Login_verifyotp/', {
//                     Mobile_no: mobileno,
//                     Otp: otp
//                 });

//                 if (response.data.status === 1) {
//                     sessionStorage.setItem('token', response.data.token);
//                     onNext();
//                 } else {
//                     setApiError(response.data.message || 'Verification failed');
//                 }
//             } catch (error) {
//                 setApiError('An error occurred. Please try again.');
//             }
//         } else {
//             setError(true);
//         }
//         setIsSubmitting(false);
//     };

//     const handleResendOtp = async () => {
//         try {
//             await axios.post('http://103.214.132.20:8000/auth/Get_resend_otp/', {
//                 Mobile_no: mobileno
//             });
//             setApiError('OTP resent successfully.');
//         } catch (error) {
//             setApiError('Failed to resend OTP. Please try again.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="mb-5">
//                 <h2 className="text-primary text-[24px] font-semibold mb-2">Mobile Verification</h2>
//                 <p className="text-ash text-[16px]">
//                     Please verify your mobile number to proceed.
//                 </p>
//             </div>

//             <div className="text-center mb-4">
//                 <h2 className="text-ash text-[23px] font-semibold">OTP Verification</h2>
//                 <p className="text-primary">
//                     We have sent a verification code to {mobileno}
//                 </p>
//             </div>

//             <div className="flex justify-center items-center gap-x-2 mb-8">
//                 {Array.from({ length: totalInputs }).map((_, index) => (
//                     <input
//                         key={index}
//                         type="text"
//                         maxLength={1}
//                         className={`outline-none px-2 text-primary w-10 h-10 border ${error && !otpValues[index] ? 'border-red-500' : 'border-footer-text-gray'} rounded-md text-center`}
//                         value={otpValues[index]}
//                         onChange={(e) => handleChange(index, e.target.value)}
//                         onKeyDown={(e) => handleBackspace(index, e)}
//                         ref={(el) => (inputRefs.current[index] = el)}
//                     />
//                 ))}
//             </div>

//             {apiError && (
//                 <div className="text-center text-red-500 mb-4">
//                     {apiError}
//                 </div>
//             )}

//             <div className="text-center mb-4">
//                 <p className="text-primary">
//                     Didn&apos;t receive OTP?{" "}
//                     <span
//                         className="text-main font-semibold hover:cursor-pointer"
//                         onClick={handleResendOtp}
//                     >
//                         Resend OTP
//                     </span>
//                 </p>
//             </div>

//             <button
//                 type="submit"
//                 className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
//                 disabled={isSubmitting}
//             >
//                 {isSubmitting ? 'Verifying...' : 'Verify OTP'}
//             </button>

//             <IoIosCloseCircle
//                 onClick={onClose}
//                 className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
//             />
//         </form>
//     );
// };



// import axios from "axios";
// import React, { useState, useRef, useEffect } from "react";
// import { IoIosCloseCircle } from "react-icons/io";

// interface OtpVerifyProps {
//     onNext: () => void;
//     onClose: () => void;
// }

// export const OtpVerify: React.FC<OtpVerifyProps> = ({ onNext, onClose }) => {
//     const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
//     const [error, setError] = useState<boolean>(false);
//     const totalInputs = 6;
//     const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [apiError, setApiError] = useState<string | null>(null);
//     const [resendTimer, setResendTimer] = useState(60);
//     const [canResend, setCanResend] = useState(false);
//     const mobileno = sessionStorage.getItem("mobileNumber");

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setResendTimer((prevTimer) => {
//                 if (prevTimer > 0) {
//                     return prevTimer - 1;
//                 } else {
//                     clearInterval(timer);
//                     setCanResend(true);
//                     return 0;
//                 }
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     const handleChange = (index: number, value: string) => {
//         if (/^\d$/.test(value) || value === "") {
//             const newOtpValues = [...otpValues];
//             newOtpValues[index] = value;
//             setOtpValues(newOtpValues);
//             setError(false);

//             if (index < totalInputs - 1 && value !== "") {
//                 inputRefs.current[index + 1]?.focus();
//             }
//         }
//     };

//     const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Backspace") {
//             const newOtpValues = [...otpValues];
//             newOtpValues[index] = "";
//             setOtpValues(newOtpValues);

//             if (index > 0) {
//                 inputRefs.current[index - 1]?.focus();
//             }
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         const isValid = otpValues.every((value) => value !== "");
//         if (isValid) {
//             const otp = otpValues.join("");
//             try {
//                 const response = await axios.post('http://103.214.132.20:8000/auth/Login_verifyotp/', {
//                     Mobile_no: mobileno,
//                     Otp: otp
//                 });

//                 if (response.data.status === 1) {
//                     sessionStorage.setItem('token', response.data.token);
//                     onNext();
//                 } else {
//                     setApiError(response.data.message || 'Verification failed');
//                 }
//             } catch (error) {
//                 setApiError('An error occurred. Please try again.');
//             }
//         } else {
//             setError(true);
//         }
//         setIsSubmitting(false);
//     };

//     const handleResendOtp = async () => {
//         if (canResend) {
//             try {
//                 await axios.post('http://103.214.132.20:8000/auth/Get_resend_otp/', {
//                     Mobile_no: mobileno
//                 });
//                 setApiError('OTP resent successfully.');
//                 setCanResend(false);
//                 setResendTimer(60);
//                 const timer = setInterval(() => {
//                     setResendTimer((prevTimer) => {
//                         if (prevTimer > 0) {
//                             return prevTimer - 1;
//                         } else {
//                             clearInterval(timer);
//                             setCanResend(true);
//                             return 0;
//                         }
//                     });
//                 }, 1000);
//             } catch (error) {
//                 setApiError('Failed to resend OTP. Please try again.');
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="mb-5">
//                 <h2 className="text-primary text-[24px] font-semibold mb-2">Mobile Verification</h2>
//                 <p className="text-ash text-[16px]">
//                     Please verify your mobile number to proceed.
//                 </p>
//             </div>

//             <div className="text-center mb-4">
//                 <h2 className="text-ash text-[23px] font-semibold">OTP Verification</h2>
//                 <p className="text-primary">
//                     We have sent a verification code to {mobileno}
//                 </p>
//             </div>

//             <div className="flex justify-center items-center gap-x-2 mb-8">
//                 {Array.from({ length: totalInputs }).map((_, index) => (
//                     <input
//                         key={index}
//                         type="text"
//                         maxLength={1}
//                         className={`outline-none px-2 text-primary w-10 h-10 border ${error && !otpValues[index] ? 'border-red-500' : 'border-footer-text-gray'} rounded-md text-center`}
//                         value={otpValues[index]}
//                         onChange={(e) => handleChange(index, e.target.value)}
//                         onKeyDown={(e) => handleBackspace(index, e)}
//                         ref={(el) => (inputRefs.current[index] = el)}
//                     />
//                 ))}
//             </div>

//             {apiError && (
//                 <div className="text-center text-red-500 mb-4">
//                     {apiError}
//                 </div>
//             )}

//             <div className="text-center mb-4">
//                 <p className="text-primary">
//                     Didn&apos;t receive OTP?{" "}
//                     <span
//                         className={`text-main font-semibold ${!canResend ? 'cursor-not-allowed text-gray-400' : 'hover:cursor-pointer'}`}
//                         onClick={handleResendOtp}
//                     >
//                         {canResend ? 'Resend OTP' : `Resend OTP in ${resendTimer}s`}
//                     </span>
//                 </p>
//             </div>

//             <button
//                 type="submit"
//                 className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
//                 disabled={isSubmitting}
//             >
//                 {isSubmitting ? 'Verifying...' : 'Verify OTP'}
//             </button>

//             <IoIosCloseCircle
//                 onClick={onClose}
//                 className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
//             />
//         </form>
//     );
// };

import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface OtpVerifyProps {
    onNext: () => void;
    onClose: () => void;
}

export const OtpVerify: React.FC<OtpVerifyProps> = ({ onNext, onClose }) => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState<boolean>(false);
    const totalInputs = 6;
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const mobileno = sessionStorage.getItem("mobileNumber");

    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (/^\d$/.test(value) || value === "") {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);
            setError(false);

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
        setIsSubmitting(true);
        const isValid = otpValues.every((value) => value !== "");
        if (isValid) {
            const otp = otpValues.join("");
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Login_verifyotp/', {
                    Mobile_no: mobileno,
                    Otp: otp
                });

                if (response.data.status === 1) {
                    sessionStorage.setItem('token', response.data.token);
                    onNext();
                } else {
                    setApiError(response.data.message || 'Verification failed');
                }
            } catch (error) {
                setApiError('An error occurred. Please try again.');
            }
        } else {
            setError(true);
        }
        setIsSubmitting(false);
    };

    const handleResendOtp = async () => {
        if (canResend) {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Login_with_mobileno/', {
                    Mobile_no: mobileno
                });

                if (response.data.status === 1) {
                    setApiError(response.data.message || 'OTP sent successfully.');
                    setCanResend(false);
                    setResendTimer(60);
                    const timer = setInterval(() => {
                        setResendTimer((prevTimer) => {
                            if (prevTimer > 0) {
                                return prevTimer - 1;
                            } else {
                                clearInterval(timer);
                                setCanResend(true);
                                return 0;
                            }
                        });
                    }, 1000);
                } else {
                    setApiError('Failed to resend OTP. Please try again.');
                }
            } catch (error) {
                setApiError('Failed to resend OTP. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <h2 className="text-primary text-[24px] font-semibold mb-2">Mobile Verification</h2>
                <p className="text-ash text-[16px]">
                    Please verify your mobile number to proceed.
                </p>
            </div>

            <div className="text-center mb-4">
                <h2 className="text-ash text-[23px] font-semibold">OTP Verification</h2>
                <p className="text-primary">
                    We have sent a verification code to {mobileno}
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

            {apiError && (
                <div className="text-center text-red-500 mb-4">
                    {apiError}
                </div>
            )}

            <div className="text-center mb-4">
                <p className="text-primary">
                    Didn&apos;t receive OTP?{" "}
                    <span
                        className={`text-main font-semibold ${!canResend ? 'cursor-not-allowed text-gray-400' : 'hover:cursor-pointer'}`}
                        onClick={handleResendOtp}
                    >
                        {canResend ? 'Resend OTP' : `Resend OTP in ${resendTimer}s`}
                    </span>
                </p>
            </div>

            <button
                type="submit"
                className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </button>

            <IoIosCloseCircle
                onClick={onClose}
                className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
            />
        </form>
    );
};
