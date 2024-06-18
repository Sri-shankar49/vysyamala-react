import React from "react";
import { IoIosCloseCircle } from "react-icons/io";


interface OtpVerificationProps {
    onNext: () => void;
    onClose: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({ onNext, onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
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
                    We have sent a verification code to<br></br>
                    +234-1234567
                </p>
            </div>

            <div className="flex justify-center items-center gap-x-2 mb-8">

                <input type="number" min={0} className="arrowDisabled outline-none px-2 text-primary w-10 h-10 border border-footer-text-gray rounded-md " />
                <input type="number" min={0} className="arrowDisabled outline-none px-2 text-primary w-10 h-10 border border-footer-text-gray rounded-md" />
                <input type="number" min={0} className="arrowDisabled outline-none px-2 text-primary w-10 h-10 border border-footer-text-gray rounded-md" />
                <input type="number" min={0} className="arrowDisabled outline-none px-2 text-primary w-10 h-10 border border-footer-text-gray rounded-md" />
                <input type="number" min={0} className="arrowDisabled outline-none px-2 text-primary w-10 h-10 border border-footer-text-gray rounded-md" />
                <input type="number" min={0} className="arrowDisabled outline-none px-2 text-primary w-10 h-10 border border-footer-text-gray rounded-md" />

            </div>

            <div className="text-center mb-4">
                <p className="text-primary">Didn&apos;t receive  OTP?  <span className="text-main font-semibold hover:cursor-pointer">
                    Resend OTP</span></p>
            </div>



            <button
                type="submit"
                className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
            >
                Verify OTP
            </button>
            
            <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
        </form>


    )
}
