import React, { useState } from 'react';
import { AccountSetup } from './AccountSetup';
import { OtpVerification } from './OtpVerification';
import { BasicDetails } from './BasicDetails';

interface PopupModalProps {
    onClose: () => void;
}

export const PopupModal: React.FC<PopupModalProps> = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState<"accountSetup" | "otpVerification" | "basicDetails">("accountSetup");
    const [mobileNumber, setMobileNumber] = useState<string>("");

    const accountSetupNext = (mobile: string) => {
        setMobileNumber(mobile);
        setShowPopup("otpVerification");
    };

    const otpVerificationNext = () => {
        setShowPopup("basicDetails");
    };

    const basicDetailsNext = () => {
        console.log('User registered');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-1/4 relative">
                {showPopup === "accountSetup" && (
                    <AccountSetup onNext={accountSetupNext} onClose={onClose} />
                )}
                {showPopup === "otpVerification" && (
                    <OtpVerification onNext={otpVerificationNext} onClose={onClose} mobileNumber={mobileNumber} />
                )}
                {showPopup === "basicDetails" && (
                    <BasicDetails onNext={basicDetailsNext} onClose={onClose} />
                )}
            </div>
        </div>
    );
};
