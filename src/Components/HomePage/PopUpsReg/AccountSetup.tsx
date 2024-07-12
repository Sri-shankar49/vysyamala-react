import React, { useState, useEffect } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import axios from 'axios';
import config from '../../../API'; // Import the configuration file



// ZOD Schema with updated regex validations
const schema = zod.object({
    profileFor: zod.string().min(1, 'Profile for is required'),
    mobile: zod
        .string()
        .min(10, 'Mobile number must be exactly 10 characters')
        .max(10, 'Mobile number must be exactly 10 characters'),
    email: zod
        .string()
        .email('Invalid email address')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    password: zod
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
            'Password must contain at least one uppercase letter and one special character'
        ),
}).required();

interface AccountSetupProps {
    onNext: (mobile: string) => void;
    onClose: () => void;
    handleLoginClick: () => void;
}

interface FormInputs {
    profileFor: string;
    mobile: string;
    email: string;
    password: string;
    gender: string;
}

export const AccountSetup: React.FC<AccountSetupProps> = ({ onNext, onClose, handleLoginClick }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [profileOptions, setProfileOptions] = useState<{ owner_id: number; owner_description: string }[]>([]);
    const [gender, setGender] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [error, setError] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

    // const handleLoginClick = () => {
    //     setIsLoginPopupOpen(true);
    // };

    // const handleCloseLoginPopup = () => {
    //     setIsLoginPopupOpen(false);
    //     console.log("Closing Login PopupModal popup");
    // };

    useEffect(() => {
        const fetchProfileOptions = async () => {
            try {
                const response = await axios.post(`${config.apiUrl}/auth/Get_Profileholder/`);
                const data = response.data;

                const options = Object.values(data).map((item: typeof data[0]) => ({
                    owner_id: item.owner_id,
                    owner_description: item.owner_description
                }));
                setProfileOptions(options);
            } catch (error) {
                console.error('Error fetching profile options:', error);
                setProfileOptions([]);
            }
        };

        fetchProfileOptions();
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setIsSubmitting(true); // Set isSubmitting to true when form submission starts

        const registrationData = {
            Profile_for: data.profileFor,
            Gender: gender,
            Mobile_no: data.mobile,
            EmailId: data.email,
            Password: data.password,
        };

        try {
            const response = await axios.post(`${config.apiUrl}/auth/Registrationstep1/`, registrationData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { profile_id, profile_owner, Gender } = response.data;

            sessionStorage.setItem('profile_id', profile_id);
            sessionStorage.setItem('profile_owner', profile_owner);
            sessionStorage.setItem('gender', Gender);

            console.log('API Response:', response.data);
            onNext(data.mobile);
        } catch (error: unknown) {
            setIsSubmitting(false); // Reset isSubmitting to false if there's an error
            if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.Mobile_no) {
                console.error('Error registering user:', error);
                // alert(error.response.data.Mobile_no[0]);
                setErrorMessage(error.response.data.Mobile_no[0]);
            } else {
                console.error('Error registering user:', error);
                // setError('An error occurred. Please try again.');
                setErrorMessage('An error occurred. Please try again.');
            }
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
                    <option value="">Matrimony Profile for</option>
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
                        {...register("gender", { required: true })}
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
                        {...register("gender", { required: true })}
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                        onChange={handleGenderChange}
                    />
                    <label htmlFor="female" className="text-ash ml-1">Female</label>
                </div>
            </div>

            {errors.gender && <span className="text-red-500">Gender is required</span>}

            <div className="mb-5">
                <input
                    type="tel"
                    id="mobile"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Mobile Number"
                    {...register("mobile", { required: true })}
                />
                {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
                {errorMessage && <span className="text-red-500">{errorMessage}</span>}
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
                disabled={isSubmitting} // Disable the button when form is submitting
            >
                {isSubmitting ? 'Submitting...' : 'Register'}
            </button>

            <p className="text-center text-[16px] text-ash mt-5">
                Existing user?{' '}
                <button
                    type="button"
                    onClick={handleLoginClick}
                    className="text-secondary hover:underline"
                >
                    Login
                </button>
            </p>

            {/* {isLoginPopupOpen && (
                <LoginPopupModal onClose={handleCloseLoginPopup} onForgetPassword={function (): void {
                    throw new Error("Function not implemented.");
                }} />
            )} */}

            <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
        </form>
    );
};
// function setErrorMessage(arg0: any) {
//     throw new Error('Function not implemented.');
// }

