import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

// ZOD Schema
const schema = zod.object({
    profileFor: zod.string().min(1, 'Profile for is required'),
    mobile: zod.string().min(10, 'Mobile number must be exactly 10 characters').max(10, 'Mobile number must be exactly 10 characters'),
    email: zod.string().email('Invalid email address'),
    password: zod.string().min(6, 'Password must be at least 6 characters'),
}).required();

interface AccountSetupProps {
    onNext: () => void;
    onClose: () => void;
}

// React Hook Form input type props
interface FormInputs {
    profileFor: string;
    mobile: string;
    email: string;
    password: string;
}

export const AccountSetup: React.FC<AccountSetupProps> = ({ onNext, onClose }) => {

    // Toggle the Password field
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // React Hook form
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({ resolver: zodResolver(schema), });

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
        onNext();
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("profileFor")}
                >
                    <option value="Select your Matrimony Profile for">Select your Matrimony Profile for</option>
                    <option value="Myself">Myself</option>
                    <option value="Son / Daughter">Son / Daughter</option>
                    <option value="Relatives">Relatives</option>
                    <option value="Friends">Friends</option>
                </select>
                {errors.profileFor && <span className="text-red-500">{errors.profileFor.message}</span>}
            </div>

            <div className="mb-5">
                {/* <label className="block text-ash text-sm mb-2" htmlFor="mobile">
                    Mobile number
                </label> */}
                <input
                    type="number"
                    id="mobile"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Mobile Number"
                    {...register("mobile")}
                />
                {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
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
                    {...register("email")}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
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
                        {...register("password")}
                    />

                    <div onClick={handleShowPassword} className="absolute inset-y-1.5 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                    </div>
                </div>
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
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
        </form >
    );
};

