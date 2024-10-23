import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import HeroBanner from "../../assets/images/HeroBanner.webp";
import { FaArrowRightLong } from "react-icons/fa6";
import { AxiosResponse } from 'axios';
import { PopupModal } from "./PopupModal";
// import config from '../../API'; // Import the configuration file
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
        const response: AxiosResponse<{ [key: string]: ProfileOption }> = await apiClient.post(`/auth/Get_Profileholder/`);
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
      const response = await apiClient.post(`/auth/Registrationstep1/`, {
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
      <section className=" mt-20 h-screen bg-cover bg-center flex items-end justify-center pb-28 max-sm:pb-6 max-lg:mt-10"
        style={{ backgroundImage: `url(${HeroBanner})` }}>
        <div className=" container mx-auto p-[24px] bg-gloss-black rounded-[8px] max-2xl:w-[95%] max-sm:bottom-[25px]">
          <h5 className="text-[20px] font-semibold text-white pb-2 max-md:text-[18px] max-sm:text-[16px]">A Platform to</h5>
          <h3 className="text-[36px] font-bold text-secondary pb-8 leading-8 max-xl:text-[34px] max-lg:text-[30px] max-md:text-[28px] max-sm:text-[24px] max-sm:leading-7 max-sm:font-semibold">Find your <br className="max-sm:hidden" /> perfect partner and family</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="flex items-start justify-between flex-wrap gap-4 max-2xl:gap-x-2 max-lg:justify-start max-lg:gap-x-7">
            <div className="max-xl:w-[18%] max-lg:w-[30%] max-sm:w-full">
              <select {...register("profileFor")} className="w-full bg-transparent text-[16px] text-white font-semibold py-[13px] px-[24px] border-[1px] border-[white] rounded-[5px] focus-visible:outline-0 max-xl:px-2 max-lg:py-[12px] max-sm:font-normal max-sm:border-[1px]">
                <option value="" hidden className="text-white">Select Profile for</option>
                {profileOptions.map(option => (
                  <option key={option.owner_id} value={option.owner_id} className="text-white">{option.owner_description}</option>
                ))}
              </select>
              {errors.profileFor && <p className="text-red-500">{errors.profileFor.message}</p>}
            </div>

            <div className="max-xl:w-[18%] max-lg:w-[30%] max-sm:w-full">
              <select {...register("gender")} className=" w-full bg-transparent text-[16px] text-white font-semibold py-[13px] px-[24px] border-[1px] border-[white] rounded-[5px] focus-visible:outline-0 max-xl:px-2 max-lg:py-[12px] max-sm:font-normal max-sm:border-[1px]">
                <option value="" hidden className="text-white">Select Gender</option>
                <option value="male" className="text-white">Male</option>
                <option value="female" className="text-white">Female</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
            </div>

            <div className="max-xl:w-[18%] max-lg:w-[30%] max-sm:w-full">
              <input
                type="tel"
                {...register("mobileNumber")}
                placeholder="Mobile Number"
                className="w-full bg-transparent text-[16px] text-white font-semibold py-[13px] px-[24px] border-[1px] border-[white] rounded-[5px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold max-xl:px-2 max-lg:py-[12px] max-sm:placeholder:font-normal max-sm:font-normal max-sm:border-[1px]"
                // style={{ WebkitBoxShadow: '0 0 0 1000px #000 inset', WebkitTextFillColor: 'white' }}
              />
              {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}
            </div>

            <div className="max-xl:w-[18%] max-lg:w-[30%] max-sm:w-full">
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="w-full bg-transparent text-[16px] text-white font-semibold py-[13px] px-[24px] border-[1px] border-[white] rounded-[5px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold max-xl:px-2 max-lg:py-[12px] max-sm:font-normal max-sm:border-[1px]"
                style={{ WebkitBoxShadow: '0 0 0 1000px #000 inset', WebkitTextFillColor: 'white' }}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="max-xl:w-[18%] max-lg:w-[30%] max-sm:w-full">
              <input
                type="password"
                {...register("password")}
                placeholder="Create Password"
                className="w-full bg-transparent text-[16px] text-white font-semibold py-[13px] px-[24px] border-[1px] border-[white] rounded-[5px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold max-xl:px-2 max-lg:py-[12px] max-sm:placeholder:font-medium max-sm:font-normal max-sm:border-[1px]"
                style={{ WebkitBoxShadow: '0 0 0 1000px #000 inset', WebkitTextFillColor: 'white' }}
              
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div className="max-lg:w-[30%] max-sm:w-full bg-gradient flex justify-center items-center py-[13px] px-[35px] rounded-[6px] space-x-2">
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
