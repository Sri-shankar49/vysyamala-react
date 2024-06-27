import React, { useState } from 'react';
import { LoginPopup } from './LoginPopup';
import { ForgetPassword } from './ForgetPassword';
import { PhoneLoginPopup } from '../PopUpsLogin/PhoneLoginPopup';
import { OtpVerify } from './OtpVerify';
import { EmailSent } from "./EmailSent";
import { useNavigate } from 'react-router-dom';



interface LoginPopupModalProps {
    onClose: () => void;
    onForgetPassword: () => void;
}

export const LoginPopupModal: React.FC<LoginPopupModalProps> = ({ onClose }) => {

    const navigate = useNavigate();


    const [showPopup, setShowPopup] = useState<"loginPopup" | "forgetPassword" | "phoneLoginPopup" | "otpVerify" | "emailSent">("loginPopup");

    const navigateToForgetPassword = () => {
        setShowPopup("forgetPassword");
    };

    const navigateToEmailSent = () => {
        setShowPopup("emailSent");
    };

    const navigateToLogin = () => {
        setShowPopup("loginPopup");
    };

    const navigateToPhoneLogin = () => {
        setShowPopup("phoneLoginPopup");
    };

    const navigateToOtpVerify = () => {
        setShowPopup("otpVerify");
    };

    const handleLogin = () => {
        console.log('Navigating to LoginHome');
        // window.location.href = '/LoginHome';   // Navigate to LoginHome page after successful login
        navigate('/LoginHome');  // Navigate to LoginHome page after successful login

    };

    const handleSendOtp = () => {
        console.log('Navigating to OtpVerify');
        navigateToOtpVerify();
    };

    const handleEmailSent = () => {
        console.log('Navigating to EmailSent');
        navigateToEmailSent();
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-1/4 relative">
                {showPopup === "loginPopup" && (
                    <LoginPopup onNext={handleLogin} onPhoneLogin={navigateToPhoneLogin} onForgetPassword={navigateToForgetPassword} onClose={onClose} />
                )}
                {showPopup === "forgetPassword" && (
                    <ForgetPassword onBackToLogin={navigateToLogin} onSubmit={handleEmailSent} onClose={onClose} />
                )}
                {showPopup === "phoneLoginPopup" && (
                    <PhoneLoginPopup onNext={handleSendOtp} onClose={onClose} />
                )}
                {showPopup === "otpVerify" && (
                    <OtpVerify onNext={handleLogin} onClose={onClose} />
                )}
                {showPopup === "emailSent" && (
                    <EmailSent onBackToLogin={navigateToLogin} onClose={onClose} onNext={handleLogin} />
                )}
            </div>
        </div>
    );
};
