import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import HeroBanner from "../../assets/images/HeroBanner.webp";
import { FaArrowRightLong } from "react-icons/fa6";
import axios, { AxiosResponse } from 'axios';
import { PopupModal } from "./PopupModal";
import config from '../../API'; // Import the configuration file
import apiClient from '../../API';


const schema = z.object({
  profileFor: z.string().nonempty("Profile selection is required"),
  gender: z.string().nonempty("Gender is required"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/, 'Password must contain at least one uppercase letter and one special character')
});

type ProfileOption = {
  owner_id: number;
  owner_description: string;
};

interface HeroSectionProps {
  onNext: (mobile: string) => void;
}

type FormData = z.infer<typeof schema>;

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [profileOptions, setProfileOptions] = useState<ProfileOption[]>([]);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const fetchProfileOptions = async () => {
      try {
        const response: AxiosResponse<{ [key: string]: ProfileOption }> =  await apiClient.post(`/auth/Get_Profileholder/`);
        const data = response.data;
        const options = Object.values(data).map(item => ({
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

  const onSubmit = async (data: FormData) => {
    try {
      const response =  await apiClient.post(`/auth/Registrationstep1/`, {
        Profile_for: data.profileFor,
        Gender: data.gender,
        Mobile_no: data.mobileNumber,
        EmailId: data.email,
        Password: data.password,
      });

      console.log('Registration successful:', response.data);

      // Set profile_id and profile_owner in session storage
      sessionStorage.setItem('profile_id', response.data.profile_id);
      sessionStorage.setItem('profile_owner', response.data.profile_owner);
      sessionStorage.setItem('gender', response.data.gender);

      setMobileNumber(data.mobileNumber); // Set mobile number
      setShowOtpPopup(true); // Show OTP popup after successful registration

    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${HeroBanner})` }}>
        <div className="absolute bottom-[100px] container mx-auto p-[24px] bg-gloss-black rounded-[8px]">
          <h5 className="text-[20px] font-semibold text-white">A Platform to</h5>
          <h3 className="text-[36px] font-bold text-secondary">Find your perfect partner and family</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <select {...register("profileFor")} className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0">
                <option value="" hidden className="text-white">Select Profile for</option>
                {profileOptions.map(option => (
                  <option key={option.owner_id} value={option.owner_id} className="text-white">{option.owner_description}</option>
                ))}
              </select>
              {errors.profileFor && <p className="text-red-500">{errors.profileFor.message}</p>}
            </div>

            <div>
              <select {...register("gender")} className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0">
                <option value="" hidden className="text-white">Select Gender</option>
                <option value="male" className="text-white">Male</option>
                <option value="female" className="text-white">Female</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>

            <div>
              <input
                type="tel"
                {...register("mobileNumber")}
                placeholder="Mobile Number"
                className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold"
                style={{ WebkitBoxShadow: '0 0 0 1000px #000 inset', WebkitTextFillColor: 'white' }}
              />
              {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}
            </div>

            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold"
                // Add inline styles to prevent autofill changing background
                style={{ WebkitBoxShadow: '0 0 0 1000px #000 inset', WebkitTextFillColor: 'white' }}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Create Password"
                className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div className="bg-gradient flex justify-center items-center py-[13px] px-[24px] rounded-[6px] space-x-2">
              <button type="submit" className="text-[16px] text-white font-semibold">Register</button>
              <FaArrowRightLong className="text-white text-[22px]" />
            </div>
          </form>
        </div>
      </section>

      {/* Render PopupModal conditionally */}
      {showOtpPopup && <PopupModal mobileNumber={mobileNumber} onClose={() => setShowOtpPopup(false)} />}
    </div>
  );
};
