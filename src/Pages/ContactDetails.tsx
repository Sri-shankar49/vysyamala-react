import React, { useState, useEffect } from "react";
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useNavigate } from "react-router-dom";
import apiClient from "../API";
import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../Components/Toast/ToastNotification";

import "react-phone-input-2/lib/style.css";
import axios from "axios";
import PhoneInput from "react-phone-input-2";

// API call URLs
// const COUNTRY_API_URL = await apiClient.post(`/auth/Get_Country/`);
// const STATE_API_URL = await apiClient.post(`/auth/Get_State/`);
// const CONTACT_REGISTRATION_API_URL = await apiClient.post(`/auth/Contact_registration/`);
// const COUNTRY_DATA_API_URL = await apiClient.post(`/auth/Get_save_details/`);

// ZOD Schema
const schema = zod
  .object({
    address: zod.string().min(3, "Address is required"),
    country: zod.string().min(1, "Country is required"),
    state: zod.string().min(1, "State is required"),
    city: zod.string().min(1, "City is required"),
    district: zod.string().min(1, "district is required"),
    pincode: zod.string().min(6, "Pincode is required"),
    // alternatemobileNumber: zod
    //   .string()
    //   .min(10, "Mobile number must be exactly 10 characters")
    //   .max(10, "Mobile number must be exactly 10 characters")
    //   .optional(),
    // whatsappNumber: zod
    //   .string()
    //   .min(10, "Whatsapp number must be exactly 10 characters")
    //   .max(10, "Whatsapp number must be exactly 10 characters")
    //   .optional(),
    daughterMobileNumber: zod.string().optional(),
    daughterEmail: zod.string().optional(),
  })
  .required();

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
  district?: string;
}

interface ContactDetailsProps {
  heading?: string;
  desc?: string;
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormInputs>({ resolver: zodResolver(schema) });

  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileowner, setProfileOwner] = useState<string | null>(null);
  const [cities, setCities] = useState<any>([]);
  const [district, getDistrict] = useState<any>([]);
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");
  const [alterNativeNumber, setAlterNativeNumber] = useState<string>("");
  const selectedStateId = watch("state");
  const selectedDistrictId = watch("district");

  const fetchDistrict = async () => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Get_District/",
        {
          state_id: selectedStateId,
        }
      );

      getDistrict(Object.values(response.data));
    } catch (error) {
      console.error("distric:", error);
    }
  };
  console.log(district, "district");
  useEffect(() => {
    if (selectedStateId) {
      fetchDistrict();
    }
  }, [selectedStateId]);
  useState(() => {});
  const fetchCities = async () => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Get_City/",
        {
          district_id: selectedDistrictId?.toString(),
        }
      );

      setCities(Object.values(response.data));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (selectedDistrictId) {
      fetchCities();
    }
  }, [selectedDistrictId]);

  const profileId =
    sessionStorage.getItem("profile_id_new") ||
    sessionStorage.getItem("loginuser_profile_id");
  console.log(profileId);
  console.log(stateOptions, "stateOptions");
  useEffect(() => {
    const fetchCountryData = async () => {
      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 1,
          };

          const response = await apiClient.post(
            `/auth/Get_save_details/`,
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("API Response:", response.data); // Log the entire API response

          const profileData = response.data.data; // Access the 'data' object directly

          console.log("Profile Data:", profileData); // Log the profile data

          // Set form values here after fetching data
          setValue("address", profileData.Profile_address);
          setValue("country", profileData.Profile_country);
          setValue("state", profileData.Profile_state);
          setValue("city", profileData.Profile_city);
          setValue("pincode", profileData.Profile_pincode);
          setValue("district", profileData.Profile_district);
          setAlterNativeNumber(profileData.Profile_alternate_mobile);
          setWhatsAppNumber(profileData.Profile_whatsapp);
          setValue("daughterMobileNumber", profileData.Profile_mobile_no);
        } catch (error) {
          console.error("Error fetching country data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };

    fetchCountryData();
  }, [profileId, setValue]);

  useEffect(() => {
    const profileowner = sessionStorage.getItem("profile_owner");
    setProfileOwner(profileowner);
  }, []);
  const profileName = profileowner === "Ownself" ? "Your" : profileowner;
  useEffect(() => {
    const fetchCountryStatus = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Country/`);
        const options = Object.values(response.data) as CountryOption[];
        setCountryOptions(options);
      } catch (error) {
        console.error("Error fetching country options:", error);
      }
    };
    fetchCountryStatus();
  }, []);

  const selectedCountryId = watch("country");

  useEffect(() => {
    if (selectedCountryId) {
      const fetchStateStatus = async () => {
        try {
          const response = await apiClient.post(`/auth/Get_State/`, {
            country_id: selectedCountryId,
          });
          const options = Object.values(response.data) as StateOption[];
          setStateOptions(options);
        } catch (error) {
          console.error("Error fetching state options:", error);
        }
      };
      fetchStateStatus();
    }
  }, [selectedCountryId, countryOptions]);

  const validateDaughterMobileNumber = (value: string) => {
    const regex = /^\d{10}$/;
    if (value && !regex.test(value)) {
      setError("daughterMobileNumber", {
        type: "manual",
        message: "Mobile number must be exactly 10 digits",
      });
    } else {
      clearErrors("daughterMobileNumber");
    }
  };

  const validateDaughterEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !regex.test(value)) {
      setError("daughterEmail", {
        type: "manual",
        message: "Invalid email format",
      });
    } else {
      clearErrors("daughterEmail");
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);

    try {
      const profileId = sessionStorage.getItem("profile_id_new");
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }

      const postData = {
        ProfileId: profileId,
        Profile_address: data.address,
        Profile_country: data.country,
        Profile_state: data.state,
        Profile_city: data.city,
        Profile_pincode: data.pincode,
        Profile_alternate_mobile: alterNativeNumber,
        Profile_whatsapp: whatsAppNumber,
        Profile_mobile_no: whatsAppNumber,
        Profile_district: data.district,
      };

      console.log(" postData:", postData);

      const response = await apiClient.post(
        `/auth/Contact_registration/`,
        postData
      );
      // if (response.data.Status === 1) {
      //   NotifySuccess("Contact details saved successful");
      //   setTimeout(() => {
      //     navigate('/UploadImages');
      //   }, 2000)
      // } else {
      //   console.log("Registration unsuccessful:", response.data);
      // }

      if (response.data.Status === 1) {
        NotifySuccess("Contact details saved successfully");

        // Get quick_reg value from sessionStorage
        const quickreg = sessionStorage.getItem("quick_reg") || "0"; // Default to "0" if not found

        setTimeout(() => {
          if (quickreg === "1") {
            navigate("/FamilyDetails"); // Redirect to ThankYouReg page
          } else {
            navigate("/UploadImages"); // Redirect to UploadImages page
          }
        }, 2000);
      } else {
        console.log("Registration unsuccessful:", response.data);
      }
    } catch (error) {
      if (whatsAppNumber === "") {
        setError("whatsappNumber", {
          type: "manual",
          message: "WhatsApp number is required",
        });
      } else if (whatsAppNumber.length < 10) {
        setError("whatsappNumber", {
          type: "manual",
          message: "WhatsApp number must be at least 10 digits",
        });
      }

      if (alterNativeNumber === "") {
        setError("alternatemobileNumber", {
          type: "manual",
          message: "Alternate mobile number is required",
        });
      } else if (alterNativeNumber.length < 10) {
        setError("alternatemobileNumber", {
          type: "manual",
          message: "Alternate mobile number must be at least 10 digits",
        });
      }

      NotifyError("Error submitting contact details");
      console.error("Error submitting contact details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const token = sessionStorage.getItem("token");
  const isIncognito =
    navigator.userAgent.includes("Incognito") ||
    navigator.userAgent.includes("Private");

  console.log("Token:", token); // Debugging line
  console.log("Is Incognito:", isIncognito); // Debugging line

  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Contact Information"}
        desc="Please provide accurate contact details to ensure smooth communication with potential matches.
"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          <div>
            <InputField
              label="Address"
              {...register("address", { setValueAs: (value) => value.trim() })}
              required
            />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
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
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </div>
          {selectedCountryId === "1" ? (
            <div>
              <label htmlFor="state" className="block mb-1">
                State <span className="text-main">*</span> (Based on country
                selection)
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
              {errors.state && (
                <span className="text-red-500">{errors.state.message}</span>
              )}
            </div>
          ) : (
            <div>
              <InputField
                label="State"
                {...register("state", { setValueAs: (value) => value.trim() })}
                required
              />
              {errors.address && (
                <span className="text-red-500">{errors.state?.message}</span>
              )}
            </div>
          )}

          {selectedCountryId === "1" ? (
            <div>
              <h1>District</h1>
              <select
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                {...register("district")}
              >
                <option value="" selected disabled>
                  -- Select District --
                </option>
                {district.map((option: any) => (
                  <option key={option.disctict_id} value={option.disctict_id}>
                    {option.disctict_name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <InputField
              label="District"
              required
              {...register("district", { setValueAs: (value) => value.trim() })}
            />
          )}
          {selectedCountryId === "1" ? (
            <>
              <div>
                <h1>City</h1>
                <select
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                  {...register("city")}
                >
                  <option value="" selected disabled>
                    Select city
                  </option>
                  {cities?.map((city: any) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <InputField
                label="City"
                required
                {...register("city", { setValueAs: (value) => value.trim() })}
              />
            </>
          )}
          <div>
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </div>

          <div>
            <InputField
              label="Pincode (Based on country selection)"
              type="number"
              required
              {...register("pincode", { setValueAs: (value) => value.trim() })}
            />
            {errors.pincode && (
              <span className="text-red-500">{errors.pincode.message}</span>
            )}
          </div>
          {/* 
          <div>
            <InputField
              label="Alternate Mobile Number"
              type="tel"
              required
              {...register("alternatemobileNumber", {
                setValueAs: (value) => value.trim(),
              })}
            />
            {errors.alternatemobileNumber && (
              <span className="text-red-500">
                {errors.alternatemobileNumber.message}
              </span>
            )}
          </div> */}
          <div>
            <label>Alternate Mobile Number</label>
            <PhoneInput
              value={alterNativeNumber}
              onChange={(value: string) => setAlterNativeNumber(value)}
              inputProps={{
                autoFocus: true,
                autoFormat: true,
                className: "input-style",
              }}
              country={"in"}
            />
            {errors.alternatemobileNumber && (
              <span className="text-red-500">
                {errors.alternatemobileNumber.message}
              </span>
            )}
          </div>
          <div>
            <label>Whatsapp Number</label>
            <PhoneInput
              value={whatsAppNumber}
              onChange={(value: string) => setWhatsAppNumber(value)}
              inputProps={{
                autoFocus: true,
                autoFormat: true,
                className: "input-style",
              }}
              country={"in"}
            />
            {errors.whatsappNumber && (
              <span className="text-red-500">
                {errors.whatsappNumber.message}
              </span>
            )}
          </div>
          {/* <div>
            <InputField
              label="Whatsapp Number"
              type="tel"
              required
              {...register("whatsappNumber", {
                setValueAs: (value) => value.trim(),
              })}
            /> */}

          {/* </div> */}

          <div className="!mt-12">
            <h1 className="font-bold text-xl text-primary mb-3">
              For Admin Verification
            </h1>

            <div className="space-y-5">
              <div>
                <InputField
                  label={`${profileName} Mobile Number`}
                  type="text"
                  {...register("daughterMobileNumber", {
                    setValueAs: (value) => value.trim(),
                  })}
                  onChange={(e) => {
                    validateDaughterMobileNumber(e.target.value);
                  }}
                />
                {errors.daughterMobileNumber && (
                  <span className="text-red-500">
                    {errors.daughterMobileNumber.message}
                  </span>
                )}
              </div>

              <div>
                <InputField
                  label={`${profileName} Email`}
                  type="email"
                  {...register("daughterEmail", {
                    setValueAs: (value) => value.trim(),
                  })}
                  onChange={(e) => {
                    validateDaughterEmail(e.target.value);
                  }}
                />
                {errors.daughterEmail && (
                  <span className="text-red-500">
                    {errors.daughterEmail.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Next"}
                <span>
                  <img src={arrow} alt="next arrow" className="ml-2" />
                </span>
              </button>
            </div>
          </div>
        </form>

        <SideContent />
      </div>
      <ToastNotification />
    </div>
  );
};

export default ContactDetails;
