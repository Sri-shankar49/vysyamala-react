import React, { useState, useEffect } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import axios from 'axios';

// ZOD Schema with updated regex validations
const schema = zod.object({
    profileFor: zod.string().min(1, 'Profile for is required'),
    mobile: zod.string().min(10, 'Mobile number must be exactly 10 characters').max(10, 'Mobile number must be exactly 10 characters'),
    email: zod.string()
        .email('Invalid email address')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    password: zod.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/, 'Password must contain at least one uppercase letter and one special character')
}).required();

interface AccountSetupProps {
    onNext: (mobile: string) => void; // Updated onNext to accept mobile number
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
    const [profileOptions, setProfileOptions] = useState<{ owner_id: number; owner_description: string; }[]>([]);
    const [gender, setGender] = useState<string>(''); // State for gender selection

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Fetch profile options from API
    useEffect(() => {
        const fetchProfileOptions = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_Profileholder/');
                const data = response.data;

                // Transform API response into options array for dropdown
                const options = Object.values(data).map((item: typeof data[0]) => ({
                    owner_id: item.owner_id,
                    owner_description: item.owner_description
                }));
                setProfileOptions(options);
            } catch (error) {
                console.error('Error fetching profile options:', error);
                // Handle error fetching data, e.g., show default options
                setProfileOptions([]);
            }
        };

        fetchProfileOptions();
    }, []); // Empty dependency array ensures this runs only once on component mount

    // React Hook form
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    // Function to handle gender selection
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        // Combine form data with selected gender
        const registrationData = {
            Profile_for: data.profileFor,
            Gender: gender, // Include gender from state
            Mobile_no: data.mobile,
            EmailId: data.email,
            Password: data.password
        };

        try {
            const response = await axios.post('http://103.214.132.20:8000/auth/Registrationstep1/', registrationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Extract profile_id and profile_owner from the response
            const { profile_id, profile_owner,Gender } = response.data;

            // Store profile_id and profile_owner in session storage
            sessionStorage.setItem('profile_id', profile_id);
            sessionStorage.setItem('profile_owner', profile_owner);
            sessionStorage.setItem('gender', Gender);


            console.log('API Response:', response.data);
            onNext(data.mobile); // Pass mobile number to onNext function
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle error (show error message, etc.)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p className="text-[16px] text-primary">While we find Matches for you</p>
                <h5 className="text-[24px] text-primary font-semibold mb-5">Let's set up your account</h5>
            </div>

            <div className="mb-5">
                <select
                    id="profileFor"
                    className="text-ash font-medium block w-full px-3 py-2 border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    {...register("profileFor", { required: true })}
                >
                    <option value="">Select your Matrimony Profile for</option>
                    {profileOptions.map(option => (
                        <option key={option.owner_id} value={option.owner_id}>{option.owner_description}</option>
                    ))}
                </select>
                {errors.profileFor && <span className="text-red-500">{errors.profileFor.message}</span>}
            </div>

            <div className="w-36 flex justify-between items-center mb-5">
                <div>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={handleGenderChange}
                    />
                    <label htmlFor="male" className="text-ash ml-1">Male</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                        onChange={handleGenderChange}
                    />
                    <label htmlFor="female" className="text-ash ml-1">Female</label>
                </div>
            </div>

            <div className="mb-5">
                <input
                    type="tel"
                    id="mobile"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Mobile Number"
                    {...register("mobile", { required: true })}
                />
                {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
            </div>

            <div className="mb-5">
                <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
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
                    onClick={onClose}
                    className="text-secondary hover:underline"
                >
                    Login
                </button>
            </p>

            <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
        </form>
    );
};
