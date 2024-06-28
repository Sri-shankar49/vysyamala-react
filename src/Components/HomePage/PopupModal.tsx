import React, { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import axios from 'axios';
import { BasicDetails } from "./PopUpsReg/BasicDetails"; // Adjust import path as per your file structure

interface PopupModalProps {
  mobileNumber: string;
  onClose: () => void;
}

export const PopupModal: React.FC<PopupModalProps> = ({ onClose, mobileNumber }) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<boolean>(false); // State to track validation error
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to store error message
  const totalInputs = 6;
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));
  const [profileId, setProfileId] = useState<string>(''); // State to store profile ID
  const [openNextPopup, setOpenNextPopup] = useState<boolean>(false); // State to control opening next popup

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
        const payload = {
          Otp: otp,
          ProfileId: profileId
        };
        console.log('Payload to be sent:', payload);

        const response = await axios.post('http://103.214.132.20:8000/auth/Otp_verify/', payload);

        console.log('OTP Verification Response:', response.data);

        // Check the response for success or failure
        if (response.data.message === "OTP verified successfully.") {
          // Proceed to the next step upon successful OTP verification
          setOpenNextPopup(true); // Show the next popup for basic details
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

  const handleNext = () => {
    // Handle the action to proceed to the next step
    console.log('Proceeding to the next step...');
    setOpenNextPopup(false); // Close the basic details popup
    // You can add more logic here to navigate to the next step
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
     
        {!openNextPopup ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-primary text-2xl font-semibold mb-4 text-center">OTP Verification</h2>
            <p className="text-primary text-lg mb-6 text-center">We have sent a verification code to<br />{mobileNumber}</p>

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
              <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>
            )}

            <div className="text-center mb-4">
              <p className="text-primary text-lg">
                Didn&apos;t receive OTP?{" "}
                <span className="text-main font-semibold cursor-pointer">Resend OTP</span>
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
        ) : (
          <BasicDetails onClose={onClose} onNext={handleNext} />
        )}
      </div>
    </div>
  );
};

export default PopupModal;
