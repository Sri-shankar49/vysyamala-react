import React, { useState, useEffect } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import axios from "axios";
import apiClient from "../../../API";

// ZOD Schema with updated regex validations
const schema = zod
    .object({
        profileFor: zod.string().min(1, "Profile for is required"),
        mobile: zod
            .string()
            .min(10, "Mobile number must be exactly 10 characters")
            .max(10, "Mobile number must be exactly 10 characters"),
        email: zod
            .string()
            .email("Invalid email address")
            .regex(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Invalid email format"
            ),
        password: zod
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                "Password must contain at least one uppercase letter and one special character"
            ),
    })
    .required();

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

export const AccountSetup: React.FC<AccountSetupProps> = ({
    onNext,
    onClose,
    handleLoginClick,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [profileOptions, setProfileOptions] = useState<
        { owner_id: number; owner_description: string }[]
    >([]);
    const [gender, setGender] = useState<string>("");
    // const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
    const [selectedProfile, setSelectedProfile] = useState<string>(""); // State to track selected profile

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const fetchProfileOptions = async () => {
            try {
                const response = await apiClient.post(`/auth/Get_Profileholder/`);
                const data = response.data;

                const options = Object.values(data).map((item: (typeof data)[0]) => ({
                    owner_id: item.owner_id,
                    owner_description: item.owner_description,
                }));
                setProfileOptions(options);
            } catch (error) {
                console.error("Error fetching profile options:", error);
                setProfileOptions([]);
            }
        };

        fetchProfileOptions();
    }, []);

    useEffect(() => {
        if (selectedProfile === "2") {
            setGender("male");
        } else if (selectedProfile === "1") {
            setGender("female");
        }
    }, [selectedProfile]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        watch,
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    const handleMobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("mobile", event.target.value);

    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setIsSubmitting(true); // Set isSubmitting to true when form submission starts

        const registrationData = {
            Profile_for: data.profileFor,
            Gender: gender,
            Mobile_no: data.mobile.trim(),
            EmailId: data.email.trim(),
            Password: data.password.trim(),
        };
        console.log(registrationData);
        try {
            const response = await apiClient.post(
                `/auth/Registrationstep1/`,
                registrationData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.Status === 0) {
                // Set errors returned by the API
                if (response.data.errors?.EmailId) {
                    setError("email", {
                        type: "manual",
                        message: response.data.errors.EmailId[0],
                    });
                }
                if (response.data.errors?.Mobile_no) {
                    setError("mobile", {
                        type: "manual",
                        message: response.data.errors.Mobile_no[0],
                    });
                }
            } else {
                const { profile_id, profile_owner, Gender } = response.data;

                sessionStorage.setItem("profile_id", profile_id);
                sessionStorage.setItem("profile_owner", profile_owner);
                sessionStorage.setItem("gender", Gender);

                onNext(data.mobile);
            }
        } catch (error: unknown) {
            setIsSubmitting(false); // Reset isSubmitting to false if there's an error
            if (
                axios.isAxiosError(error) &&
                error.response &&
                error.response.data &&
                error.response.data.Mobile_no
            ) {
                console.error("Error registering user:", error);
                // alert(error.response.data.Mobile_no[0]);
                // setErrorMessage(error.response.data.Mobile_no[0]);
            } else {
                console.error("Error registering user:", error);
                // setError('An error occurred. Please try again.');
                // setErrorMessage("An error occurred. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    const EmailValue = watch("email", "");
    const mobileValue = watch("mobile", "");
    const passwordValue = watch("password", "");
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        value: any
    ) => {
        // Prevent space if input is empty
        if (e.key === " " && value.trim() === "") {
            e.preventDefault();
        }
    };

    console.log(errors.email, errors.mobile, "kjhkjhkjjk")
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p className="text-[16px] text-primary">
                    While we find Matches for you
                </p>
                <h5 className="text-[24px] text-primary font-semibold mb-5">
                    Let's set up your account
                </h5>
            </div>

            <div className="mb-5">
                <select
                    id="profileFor"
                    className="text-ash font-medium block w-full px-3 py-2 border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    {...register("profileFor", { required: true })}
                    onChange={(e) => {
                        setValue("profileFor", e.target.value);
                        setSelectedProfile(e.target.value); // Set the selected profile option
                    }} // Set the selected profile option
                >
                    <option value="">Matrimony Profile for</option>
                    {profileOptions.map((option) => (
                        <option key={option.owner_id} value={option.owner_id}>
                            {option.owner_description}
                        </option>
                    ))}
                </select>
                {errors.profileFor && (
                    <span className="text-red-500">{errors.profileFor.message}</span>
                )}
            </div>

            <div className="w-36 flex justify-between items-center mb-5">
                <div>
                    <input
                        type="radio"
                        id="male"
                        {...register("gender", { required: true })}
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={handleGenderChange}
                    />
                    <label htmlFor="male" className="text-ash ml-1">
                        Male
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="female"
                        {...register("gender", { required: true })}
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={handleGenderChange}
                    />
                    <label htmlFor="female" className="text-ash ml-1">
                        Female
                    </label>
                </div>
            </div>

            {errors.gender && (
                <span className="text-red-500">Gender is required</span>
            )}

            <div className="mb-5">
                <input
                    type="tel"
                    id="mobile"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Mobile Number"
                    {...register("mobile", {
                        required: true,
                        setValueAs: (value) => value.trim(),
                    })}
                    onChange={handleMobileChange} // Add onChange handler to clear error message
                    onKeyDown={(e) => handleKeyDown(e, mobileValue)}
                />
                {errors.mobile && (
                    <span className="text-red-500">{errors.mobile.message}</span>
                )}

            </div>

            <div className="mb-5">
                <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                    placeholder="Email"
                    {...register("email", {
                        required: true,
                        setValueAs: (value) => value.trim(),
                    })}
                    onKeyDown={(e) => handleKeyDown(e, EmailValue)}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </div>

            <div className="mb-5">
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        placeholder="Create Password"
                        {...register("password", {
                            required: true,
                            setValueAs: (value) => value.trim(),
                        })}
                        onKeyDown={(e) => handleKeyDown(e, passwordValue)}
                    />
                    <div
                        onClick={handleShowPassword}
                        className="absolute inset-y-1.5 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer"
                    >
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                    </div>
                </div>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
                disabled={isSubmitting} // Disable the button when form is submitting
            >
                {isSubmitting ? "Submitting..." : "Register"}
            </button>

            <p className="text-center text-[16px] text-ash mt-5">
                Existing user?{" "}
                <button
                    type="button"
                    onClick={handleLoginClick}
                    className="text-secondary hover:underline"
                >
                    Login
                </button>
            </p>

            <IoIosCloseCircle
                onClick={onClose}
                className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
            />
        </form>
    );
};
