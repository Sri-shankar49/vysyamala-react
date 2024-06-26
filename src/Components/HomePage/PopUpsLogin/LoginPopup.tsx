import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// ZOD Schema with updated regex validations
const schema = zod.object({
    profileID: zod.string().min(1, 'Profile ID is required'),
    password: zod.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/, 'Password must contain at least one uppercase letter and one special character'),
}).required();

interface LoginPopUpProps {
    onNext: () => void;
    onPhoneLogin: () => void; // Add this prop to handle phone login
    onClose: () => void;
    onForgetPassword: () => void; // Add this prop to handle forget password
}

interface FormInputs {
    profileID: string;
    password: string;
}

export const LoginPopup: React.FC<LoginPopUpProps> = ({ onNext, onPhoneLogin, onForgetPassword, onClose }) => {

    // Toggle the Password field
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // React Hook form
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    // Handle form submission
    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
        onNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p className="text-[16px] text-primary">Welcome Back</p>
                <h5 className="text-[24px] text-primary font-semibold mb-5">Login to your account</h5>
            </div>

            <div className="mb-5">
                <input
                    type="text"
                    id="profileID"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Profile ID"
                    {...register("profileID", { required: true })}
                />
                {errors.profileID && <span className="text-red-500">{errors.profileID.message}</span>}
            </div>

            <div className="mb-5">
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        placeholder="Create Password"
                        {...register("password", { required: true })}
                    />
                    <div onClick={handleShowPassword} className="absolute inset-y-1.5 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                    </div>
                </div>
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <div className="flex justify-between items-center mb-5">
                <div>
                    <input type="checkbox" name="rememberMe" id="rememberMe" />
                    <label htmlFor="rememberMe" className="text-ash ml-2">Remember Me</label>
                </div>

                <div>
                    <p onClick={onForgetPassword} className="text-secondary hover:underline cursor-pointer">Forget Password?</p>
                </div>
            </div>

            <button type="submit" className="w-full bg-gradient flex justify-center items-center py-[10px] px-[24px] rounded-[6px] space-x-2 cursor-pointer">
                <div className="text-[16px] text-white font-semibold">Login</div>
                <FaArrowRightLong className="text-white text-[22px]" />
            </button>

            <p className="text-ash font-semibold text-center my-5">or</p>

            <button
                onClick={onPhoneLogin}
                className="w-full py-[10px] px-[24px] bg-white text-main font-semibold border-2 rounded-[6px] mt-2"
            >
                Login with Phone Number
            </button>

            <p className="text-center text-[16px] text-ash mt-5">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={onClose}
                    className="text-secondary hover:underline"
                >
                    Register Now
                </button>
            </p>

            <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
        </form>
    );
};
