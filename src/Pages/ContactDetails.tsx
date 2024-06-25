import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
// import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from "react";


// API call
const COUNTRY_API_URL = "http://103.214.132.20:8000/auth/Get_Country/";
const STATE_API_URL = "http://103.214.132.20:8000/auth/Get_State/";


// ZOD Schema
const schema = zod.object({
  address: zod.string().min(3, "Address is required"),
  country: zod.string().min(1, "Country is required"),
  state: zod.string().min(1, "State is required"),
  city: zod.string().min(3, "City is required"),
  pincode: zod.string().min(6, "Pincode is required"),
  alternatemobileNumber: zod.string().optional(),
  whatsappNumber: zod.string().min(10, 'Whatsapp number must be exactly 10 characters').max(10, 'Whatsapp number must be exactly 10 characters'),
  daughterMobileNumber: zod.string().min(10, "Daughter Mobile Number is required"),
  daughterEmail: zod.string().email('Invalid email address').optional(),
}).required();

interface FormInputs {
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  alternatemobileNumber?: string;
  whatsappNumber?: string;
  daughterMobileNumber?: string;
  daughterEmail?: string;
}

interface ContactDetailsProps {
  heading?: string;
  desc?: string;
  name?: string;
  label?: string;
  type?: string; // Make type optional with a default value
}

interface CountryOption {
  country_id: number;
  country_name: string;
}

interface StateOption {
  state_id: number;
  state_name: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = () => {

  // Navigate to next page
  const navigate = useNavigate();

  // React Hook form
  const { register, handleSubmit, formState: { errors },watch } = useForm<FormInputs>({ resolver: zodResolver(schema), });

  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);




  useEffect(() => {
    const fetchCountryStatus = async () => {
      try {
        const response = await axios.post(COUNTRY_API_URL);
        const options = Object.values(response.data) as CountryOption[];
        setCountryOptions(options);
      } catch (error) {
        console.error("Error fetching country options:", error);
      }
    };
    fetchCountryStatus();
  }, []);

  const selectedCountry = watch("country");

  useEffect(() => {
    if (selectedCountry) {
      const fetchStateStatus = async () => {
        try {
          const response = await axios.post(STATE_API_URL, { country_id: selectedCountry });
          const options = Object.values(response.data) as StateOption[];
          setStateOptions(options);
        } catch (error) {
          console.error("Error fetching state options:", error);
        }
      };
      fetchStateStatus();
    }
  }, [selectedCountry]);


  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
    navigate('/UploadImages');
  };


  // const [formData, setFormData] = useState({
  //   address: "",
  //   country: "",
  //   state: "",
  //   city: "",
  //   pincode: "",
  //   alternatemobileNumber: "",
  //   whatsappNumber: "",
  //   daughterMobileNumber: "",
  //   daughterEmail: "",
  // });

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Contact Information"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis "
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          <div>
            <InputField
              label="Address"
              {...register("address")}
              required />
            {errors.address && <span className="text-red-500">{errors.address.message}</span>}
          </div>

          <div>
            <label htmlFor="country" className="block mb-1">
              Country <span className="text-main">*</span>
            </label>
            <select
              id="country"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("country")}
            >
              <option value="" selected disabled>
                -- Select your Country --
              </option>
              {countryOptions.map((option) => (
                <option key={option.country_id} value={option.country_id}>
                  {option.country_name}
                </option>
              ))}
            </select>
            {errors.country && <span className="text-red-500">{errors.country.message}</span>}
          </div>

          <div>
            <label htmlFor="state" className="block mb-1">
              State <span className="text-main">*</span> (Based on country selection)
            </label>
            <select
              id="state"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("state")}
            >
              <option value="" selected disabled>
                -- Select State --
              </option>
              {stateOptions.map((option) => (
                <option key={option.state_id} value={option.state_id}>
                  {option.state_name}
                </option>
              ))}
            </select>
            {errors.state && <span className="text-red-500">{errors.state.message}</span>}
          </div>

          {/* <div>
            <label htmlFor="city" className="block mb-1">
              City * (Based on country selection )
            </label>
            <select
              id="city"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("city")}
            >
              <option value="" selected disabled>
                -- Select City --
              </option>
              <option value="Chennai">Chennai</option>
              <option value="Tirunelveli">Tirunelveli</option>
              <option value="Trichy">Trichy</option>
              <option value="Salem">Salem</option>
            </select>
            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
          </div> */}


          <div>
            <InputField
              label="City" required
              {...register("city")} />
            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
          </div>

          <div>
            <InputField
              label="Pincode (Based on country selection)"
              type="text"
              required
              {...register("pincode")}
            />
            {errors.pincode && <span className="text-red-500">{errors.pincode.message}</span>}

          </div>

          <div>
            <InputField
              label="Alternate Mobile Number"
              type="tel"
              {...register("alternatemobileNumber")}
            />
          </div>

          <div>
            <InputField
              label="Whatsapp Number"
              type="tel"
              {...register("whatsappNumber")}
            />
            {errors.whatsappNumber && <span className="text-red-500">{errors.whatsappNumber.message}</span>}

          </div>

          <div className="!mt-12">
            <h1 className="font-bold text-xl text-primary mb-3">
              For Admin Verification
            </h1>

            <div className="space-y-5">
              <div>
                <InputField
                  label="Daughter Mobile Number"
                  type="text"
                  {...register("daughterMobileNumber")}
                />
                {errors.daughterMobileNumber && <span className="text-red-500">{errors.daughterMobileNumber.message}</span>}

              </div>

              <div>
                <InputField
                  label="Daughter Email"
                  type="email"
                  {...register("daughterEmail")}
                />
                {errors.daughterEmail && <span className="text-red-500">{errors.daughterEmail.message}</span>}

              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">
                Next
                <span>
                  <img src={arrow} alt="next arrow" className="ml-2" />
                </span>
              </button>
            </div>
          </div>
        </form>

        <SideContent />
      </div>
    </div>
  );
};

export default ContactDetails;
