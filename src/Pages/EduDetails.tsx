/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import apiClient from "../API";
import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../Components/Toast/ToastNotification";
import axios from "axios";

// Define validation schema with zod
const schema = zod.object({
  highestEducationLevel: zod
    .string()
    .min(1, "Highest education level is required"),
  ugDegree: zod.string().optional(),
  aboutYourEducation: zod.string().min(3, "About your education is required"),
  profession: zod.string().min(1, "Profession count is required"),
  annualIncome: zod.string().min(1, "Annual income is required"),
  actualIncome: zod.string().min(1, "Actual income is required"),
  country: zod.string().min(1, "Country is required"),
  // state: zod.string().min(1, "State is required"),
  pincode: zod.string().min(1, "Pincode is required"),
  careerPlans: zod.string().min(1, "Career plans are required"),
  // workCity: zod.string().min(1, "Work city is required"),
});

// API call
// const COUNTRY_API_URL = await apiClient.post(`/auth/Get_Country/`);
// const STATE_API_URL = await apiClient.post(`/auth/Get_State/`);

interface EduDetailsInputs {
  highestEducationLevel: string;
  ugDegree?: string;
  aboutYourEducation: string;
  profession: string;
  annualIncome: string;
  actualIncome: string;
  country: string;
  state: string;
  pincode: string;
  careerPlans: string;
  workCity: string;
  Workplace: string;
  selectedDistrict: string;
}

interface EduDetailsProps {}

interface HighesEducation {
  education_id: number;
  education_description: string;
}

interface Ugdegree {
  degree_id: number;
  degree_description: string;
}

interface AnnualIncome {
  income_id: number;
  income_description: string;
}

interface CountryOption {
  country_id: number;
  country_name: string;
}

interface StateOption {
  state_id: number;
  state_name: string;
}



interface ProfessionOption {
  Profes_Pref_id: number;
  Profes_name: string;
}

const EduDetails: React.FC<EduDetailsProps> = () => {
  // Navigate to next page
  const navigate = useNavigate();

  // React Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    setError,
  } = useForm<EduDetailsInputs>({
    resolver: zodResolver(schema),
  });

  // Profession State
  const [selectedProfession, setSelectedProfession] = useState<string | null>(
    null
  );
  const [highestEdu, setHighestEdu] = useState<HighesEducation[]>([]);
  const [ugdegree, setUgdegree] = useState<Ugdegree[]>([]);
  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const [workPlace, setWorkPlace] = useState<string>("");
  const [workCity, setWorkCity] = useState<string>("");
  const [workCityList, setWorkCityList] = useState<any>([]);
  const [state, setState] = useState<string>("");
  const professionRef = useRef<HTMLDivElement>(null);
  // const selectedStateId = watch("state");
  const [district, getDistrict] = useState<any>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [professionOptions, setProfessionOptions] = useState<ProfessionOption[]>([]);
  const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(null);


  const handleProfessionChange = (id: number, name: string) => {
    setSelectedProfession(name);
    setSelectedProfessionId(id);  // Store the Profes_Pref_id in state
    setValue("profession", name, { shouldValidate: true });
  };
  
  
  
    useEffect(() => {
      const fetchProfessionData = async () => {
        try {
          const response = await axios.post(
            "http://103.214.132.20:8000/auth/Get_Profes_Pref/"
          );
          setProfessionOptions(Object.values(response.data));
          console.log('profession',response.data)
        } catch (error) {
          console.error("Error fetching profession options:", error);
        }
      };
    
      fetchProfessionData();
    }, []);

    
  console.log(state, "state");
  const fetchDistrict = async () => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Get_District/",
        {
          state_id: state,
        }
      );

      getDistrict(Object.values(response.data));
    } catch (error) {
      console.error("distric:", error);
    }
  };
  useEffect(() => {
    if (state) {
      fetchDistrict();
    }
  }, [state]);

  useState(() => {});
  const fetchCities = async () => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Get_City/",
        {
          district_id: selectedDistrict,
        }
      );
      console.log(response.data, "work");
      setWorkCityList(Object.values(response.data));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (selectedDistrict) {
      fetchCities();
    }
  }, [selectedDistrict]);

  console.log(workCityList, "district");
  useEffect(() => {
    // Function to handle scrolling and focusing
    const handleFocus = (ref: React.RefObject<HTMLDivElement>, error: any) => {
      if (error && ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        const firstButton = ref.current.querySelector("button");
        if (firstButton) {
          firstButton.focus();
        }
      }
    };

    // Handle focus for each error condition
    handleFocus(professionRef, errors.profession);
  }, [errors.profession]);

  const profileId = sessionStorage.getItem("profile_id_new");

  useEffect(() => {
    const fetchProfileData = async () => {
      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 4,
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
          setValue("highestEducationLevel", profileData.highest_education);
          setValue("ugDegree", profileData.ug_degeree);
          setValue("aboutYourEducation", profileData.about_edu);
          setValue("profession", profileData.profession);
          setValue("annualIncome", profileData.anual_income);
          setValue("actualIncome", profileData.actual_income);
          setValue("country", profileData.work_country);
          setValue("state", profileData.work_state);
          setValue("pincode", profileData.work_pincode);
          setValue("careerPlans", profileData.career_plans);

          setWorkPlace(profileData.work_place);
          // Set the initial state for selected profession
          setSelectedProfession(profileData.profession);
          setWorkCity(profileData.work_city);
          setState(profileData.work_state);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };

    fetchProfileData();
  }, [profileId, setValue]);

  useEffect(() => {
    const fetchHighestEdu = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Highest_Education/`);
        const options = Object.values(response.data) as HighesEducation[];
        setHighestEdu(options);
      } catch (error) {
        console.error("Error fetching Highest Education options:", error);
      }
    };
    fetchHighestEdu();
  }, []);

  useEffect(() => {
    const fetchUgDegree = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Ug_Degree/`);
        const options = Object.values(response.data) as Ugdegree[];
        setUgdegree(options);
      } catch (error) {
        console.error("Error fetching UG Degree  options:", error);
      }
    };
    fetchUgDegree();
  }, []);

  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Annual_Income/`);
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error("Error fetching Annual Income  options:", error);
      }
    };
    fetchAnnualIncome();
  }, []);

  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);

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

  const selectedCountry = watch("country");

  useEffect(() => {
    if (selectedCountry) {
      const fetchStateStatus = async () => {
        try {
          const response = await apiClient.post(`/auth/Get_State/`, {
            country_id: selectedCountry,
          });
          const options = Object.values(response.data) as StateOption[];
          setStateOptions(options);
        } catch (error) {
          console.error("Error fetching state options:", error);
        }
      };
      fetchStateStatus();
    }
  }, [selectedCountry]);

  // Background getting selected
  const buttonClass = (isSelected: boolean) =>
    isSelected
      ? "bg-secondary text-white"
      : "border-gray hover:bg-secondary hover:text-white";

  // const handleProfessionChange = (value: string) => {
  //   setSelectedProfession(value);
  //   setValue("profession", value, { shouldValidate: true });
  // };

  const onSubmit: SubmitHandler<EduDetailsInputs> = async (data) => {
    try {
      // Format the data as expected by the backend
      const profileId =
        sessionStorage.getItem("profile_id_new") ||
        sessionStorage.getItem("loginuser_profile_id");
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }
      const formattedData = {
        profile_id: profileId,
        highest_education: data.highestEducationLevel,
        ug_degeree: data.ugDegree,
        about_edu: data.aboutYourEducation,
        // profession: data.profession,
        profession: selectedProfessionId, // Optional: you can send the profession name
        anual_income: data.annualIncome,
        actual_income: data.actualIncome,
        work_country: data.country,
        work_state: state.trim() ,
        work_pincode: data.pincode,
        career_plans: data.careerPlans,
        status: "1",
        work_city: workCity.trim() ,
        work_place: workPlace.trim(),
        Profile_district: selectedDistrict,
      };

      console.log("EducationDetails:", formattedData);
      setIsSubmitting(true);
      const response = await apiClient.post(
        `/auth/Education_registration/`,
        formattedData
      );
      setIsSubmitting(false);

      if (response.data.Status === 1) {
        NotifySuccess("Education details saved successfully");

        setTimeout(() => {
          navigate("/HoroDetails");
        }, 2000);
      } else {
        // Handle error or show message to the user
        console.error("Error: Response status is not 1", response.data);
      }
    } catch (error) {
      NotifyError("Failed to upload Education Details");
      console.error("Error submitting form data:", error);
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (selectedCountry === "1" && !state) {
      setError("state", {
        type: "manual",
        message: "State is required",
      });
    }
    if (selectedCountry === "1" && !workCity) {
      setError("workCity", {
        type: "manual",
        message: "work city is required",
      });
    }
    if (selectedCountry === "1" && !selectedDistrict) {
      setError("selectedDistrict", {
        type: "manual",
        message: "District is required",
      });
    }
    if (selectedCountry === "1" && state) {
      clearErrors("state");
    }
    if (selectedCountry === "1" && selectedDistrict) {
      clearErrors("selectedDistrict");
    }
    if (selectedCountry === "1" && workCity) {
      clearErrors("workCity");
    }
  }, [selectedCountry, selectedDistrict, workCity, state]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const careerPlansValue = watch("careerPlans", "");
  const handleKeyDownTextArea = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    value: any
  ) => {
    // Prevent space if input is empty
    if (e.key === " " && value.trim() === "") {
      e.preventDefault();
    }
  };
  // useEffect(() => {
  //   if (selectedCountry === "1" && state === "") {
  //     setError("state", {
  //       type: "manual",
  //       message: "State is required",
  //     });
  //   }
  //   if (selectedCountry === "1" && workCity === "") {
  //     setError("workCity", {
  //       type: "manual",
  //       message: "work city is required",
  //     });
  //   }
  // }, [selectedCountry, setError, clearErrors, state, workCity]);
  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Education Details"}
        desc="Please share your educational background to help potential matches understand your values and aspirations better."
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 mb-5"
        >
          <div>
            <label htmlFor="HighestEducationLevel" className="block mb-1">
              Highest Education Level <span className="text-main">*</span>
            </label>
            <select
              id="HighestEducationLevel"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("highestEducationLevel")}
            >
              <option value="" disabled selected>
                -- Select your Highest Education Level --
              </option>
              {highestEdu.map((option) => (
                <option key={option.education_id} value={option.education_id}>
                  {option.education_description}
                </option>
              ))}
            </select>
            {errors.highestEducationLevel && (
              <span className="text-red-500">
                {errors.highestEducationLevel.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="ugDegree" className="block mb-1">
              UG Degree (Only if masters selected in highest education)
            </label>
            <select
              id="ugDegree"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("ugDegree")}
            >
              <option value="" disabled selected>
                -- Select your UG Degree --
              </option>
              {ugdegree.map((option) => (
                <option key={option.degree_id} value={option.degree_id}>
                  {option.degree_description}
                </option>
              ))}
            </select>
            {errors.ugDegree && (
              <span className="text-red-500">{errors.ugDegree.message}</span>
            )}
          </div>

          <div>
            <InputField
              label={"About your Education"}
              required
              {...register("aboutYourEducation", {
                setValueAs: (value) => value.trim(),
              })}
            />
            {errors.aboutYourEducation && (
              <span className="text-red-500">
                {errors.aboutYourEducation.message}
              </span>
            )}
          </div>

          <div className="mt-3">
            <h1 className="mb-3">Profession</h1>

            <div ref={professionRef} className="w-full inline-flex rounded">
  {professionOptions.map((option) => (
    <button
      key={option.Profes_Pref_id}
      type="button"
      className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
        selectedProfession === option.Profes_name
      )}`}
      onClick={() => handleProfessionChange(option.Profes_Pref_id,option.Profes_name)}
      {...register("profession")}
    >
      {option.Profes_name}
    </button>
  ))}
</div>
            {errors.profession && (
              <span className="text-red-500">{errors.profession.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="annualIncome" className="block mb-1">
              Annual Income
            </label>
            <select
              id="annualIncome"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("annualIncome")}
            >
              <option value="" disabled selected>
                -- Select your Annual Income --
              </option>
              {annualIncome.map((option) => (
                <option key={option.income_id} value={option.income_id}>
                  {option.income_description}
                </option>
              ))}
            </select>
            {errors.annualIncome && (
              <span className="text-red-500">
                {errors.annualIncome.message}
              </span>
            )}
          </div>

          <div>
            <InputField
              label={"Actual Income"}
              {...register("actualIncome", {
                setValueAs: (value) => value.trim(),
              })}
            />
            {errors.actualIncome && (
              <span className="text-red-500">
                {errors.actualIncome.message}
              </span>
            )}
          </div>

          <div className="!mt-12">
            <h1 className="font-bold text-xl text-primary mb-3">
              Work Location
            </h1>

            <div className="w-full space-y-5 mb-5">
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
              {selectedCountry == "1" ? (
                <>
                  <div>
                    <label htmlFor="state" className="block mb-1">
                      State <span className="text-main">*</span> (Based on
                      country selection)
                    </label>
                    <select
                      id="state"
                      value={state}
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                      onChange={(e) => setState(e.target.value)}
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
                      <span className="text-red-500">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                  <div>
                    {/* <InputField
                      id="workCity"
                      label={"Work City"}
                      value={workCity}
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                      onChange={(e) => setWorkCity(e.target.value)}
                    /> */}

                    <div>
                      <label htmlFor="District" className="block mb-1">
                        District <span className="text-main">*</span>
                      </label>
                      <select
                        id="District"
                        value={selectedDistrict}
                        className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                      >
                        <option value="" selected disabled>
                          -- Select State --
                        </option>
                        {district.map((option: any) => (
                          <option
                            key={option.disctict_id}
                            value={option.disctict_id}
                          >
                            {option.disctict_name}
                          </option>
                        ))}
                      </select>
                      {errors?.selectedDistrict && (
                        <span className="text-red-500">
                          {errors.selectedDistrict.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="Work City" className="block mb-1">
                        Work City <span className="text-main">*</span>
                      </label>
                      <select
                        id="Work City"
                        value={workCity}
                        className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                        onChange={(e) => setWorkCity(e.target.value)}
                      >
                        <option value="" selected disabled>
                          -- Select Work City --
                        </option>
                        {workCityList.map((option: any) => (
                          <option key={option.city_id} value={option.city_id}>
                            {option.city_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.workCity && (
                      <span className="text-red-500">
                        {errors.workCity.message}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <InputField
                    value={workPlace}
                    onChange={(e) => setWorkPlace(e.target.value)}
                    label={"Work place"}
                    
                  />
                </div>
              )}
              <InputField
                label={"Pincode (Based on Country Selection)"}
                {...register("pincode", {
                  setValueAs: (value) => value.trim(),
                })}
              />
              {errors.pincode && (
                <span className="text-red-500">{errors.pincode.message}</span>
              )}

              <div>
                <label htmlFor="careerPlans" className="block mb-1">
                  Career Plans / Notes
                </label>

                <textarea
                  id="careerPlans"
                  rows={5}
                  placeholder=" Enter your message here..."
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                  {...register("careerPlans", {
                    setValueAs: (value) => value.trim(),
                  })}
                  onKeyDown={(e) => handleKeyDownTextArea(e, careerPlansValue)}
                ></textarea>
                {errors.careerPlans && (
                  <span className="text-red-500">
                    {errors.careerPlans.message}
                  </span>
                )}
              </div>

              <div className="mt-7 flex justify-between">
                <div className="">
                  <Link to={"/FamilyDetails"}>
                    <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                      Back
                    </button>
                  </Link>
                </div>

                <div className="flex space-x-4">
                  {/* <button className="py-[10px] px-14 bg-white text-main font-semibold  rounded-[6px] mt-2">
                    Skip
                  </button> */}
                  <button
                    type="submit"
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
            </div>
          </div>
        </form>
        <SideContent />
      </div>
      <ToastNotification />
    </div>
  );
};

export default EduDetails;
// function clearErrors(arg0: string[]) {
//   throw new Error("Function not implemented.");
// }
