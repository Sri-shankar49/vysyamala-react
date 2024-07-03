import React, { useState, useEffect } from "react";
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import MatchingStars from "../Components/PartnerPreference/MatchingStars";
import axios from "axios";

// API CALL
const PARTNER_API_URL = 'http://103.214.132.20:8000/auth/Partner_pref_registration/'


// Define validation schema with zod
const schema = zod.object({
  age: zod.string().nonempty("Age is required"),
  heightFrom: zod.string().min(1, "Height From is required"),
  heightTo: zod.string().min(1, "Height To is required"),
  education: zod.array(zod.string()).min(1, "Education is required"),
  annualIncome: zod.array(zod.string()).min(1, "Annual Income is required"),
  chevvai: zod.string().min(1, "Chevvai option is required"),
  rehu: zod.string().min(1, "Rehu/Kethu option is required"),
}).required();

interface PartnerSettingsInputs {
  age: string;
  heightFrom: string;
  heightTo: string;
  education: string[];
  annualIncome: string[];
  chevvai: string;
  rehu: string;
  profession: string[];
  maritalStatus: string[];
  foreignInterest: string[];
  nativeState?: string[];
  profilePhoto?: boolean;
  ageFrom?: string;
  ageTo?: string;
}

interface EduPref {
  Edu_Pref_id: number;
  Edu_name: string;
}

interface MaritalStatus {
  marital_sts_id: number;
  marital_sts_name: string;
}

interface AnnualIncome {
  income_id: number;
  income_description: string;
}

interface BirthStar {
  birth_id: number;
  birth_star: string;
}

interface MatchingStar {
  dest_rasi_id: number;
  dest_star_id: number;
  id: number;
  match_count: number;
  matching_porutham: string;
  matching_starname: string;
  matching_rasiname: string;
  protham_names: null | string[];
  source_star_id: number;
}

const PartnerSettings: React.FC = () => {
  const [eduPref, setEduPref] = useState<EduPref[]>([]);
  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [matchStars, setMatchStars] = useState<MatchingStar[][]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PartnerSettingsInputs>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  // const onSubmit: SubmitHandler<PartnerSettingsInputs> = async (data) => {
  //   setIsSubmitting(true);
  //   console.log(data);
  //   try {
  //     const profileId = sessionStorage.getItem("profile_id_new");
  //     if (!profileId) {
  //       throw new Error("ProfileId not found in sessionStorage");
  //     }

  //     console.log("Form Data: ", data);

  //     const postData = {
  //       ProfileId: profileId,
  //       pref_age_differences: data.age,
  //       pref_height_from: data.heightFrom,
  //       pref_height_to: data.heightTo,
  //       education: data.education,
  //       annualIncome: data.annualIncome,
  //       chevvai: data.chevvai,
  //       rehu: data.rehu,
  //       profession: data.profession,
  //       maritalStatus: data.maritalStatus,
  //       foreignInterest: data.foreignInterest,
  //       nativeState: data.nativeState,
  //       profilePhoto: data.profilePhoto,
  //       status: 1
  //     };

  //     console.log("Post Data: ", postData);

  //     const response = await axios.post('http://103.214.132.20:8000/auth/Partner_pref_registration/', postData);
  //     console.log("Registration successful:", response.data);
  //     if (response.data.Status === 1) {
  //       navigate('/UploadImages');
  //     } else {
  //       setIsSubmitting(false);
  //       console.log("Registration unsuccessful:", response.data);
  //     }
  //   } catch (error) {
  //     setIsSubmitting(false);
  //     console.error("Error submitting contact details:", error);
  //   }
  // };


  const profileId = sessionStorage.getItem('profile_id_new');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 6
          };

          const response = await axios.post("http://103.214.132.20:8000/auth/Get_save_details/", requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log("API Response:", response.data); // Log the entire API response

          const profileData = response.data.data; // Access the 'data' object directly

          console.log("Profile Data:", profileData); // Log the profile data

          // Set form values here after fetching data
          setValue("age", profileData.pref_age_differences);
          setValue("heightFrom", profileData.pref_height_from);
          setValue("heightTo", profileData.pref_height_to);
          setValue("maritalStatus", profileData.pref_marital_status);
          setValue("profession", profileData.pref_profession);
          setValue("education", profileData.pref_education);
          setValue("annualIncome", profileData.pref_anual_income);
          setValue("chevvai", profileData.pref_chevvai);
          setValue("rehu", profileData.pref_ragukethu);
          setValue("foreignInterest", profileData.pref_foreign_intrest);


        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };

    fetchProfileData();
  }, [profileId, setValue]);







  const onSubmit: SubmitHandler<PartnerSettingsInputs> = async (data) => {
    setIsSubmitting(true);
    console.log('Form data:', data);

    try {
      const profileId = sessionStorage.getItem("profile_id_new");
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }

      const postData = {
        profile_id: profileId,
        pref_age_differences: data.age,
        pref_height_from: data.heightFrom,
        pref_height_to: data.heightTo,
        // education: data.education,
        // annualIncome: data.annualIncome,
        // chevvai: data.chevvai,
        // rehu: data.rehu,
        // profession: data.profession,
        // maritalStatus: data.maritalStatus,
        // foreignInterest: data.foreignInterest,
        // nativeState: data.nativeState,
        // profilePhoto: data.profilePhoto,
        status:"1"
      };

      console.log("Post Data:", postData);

      const response = await axios.post(PARTNER_API_URL, postData);
      console.log("Registration response:", response.data);

      if (response.data.Status === 1) {
        navigate('/MembershipPlan');
      } else {
        setIsSubmitting(false);
        console.log("Registration unsuccessful:", response.data);
        // Handle other status codes or error conditions if needed
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting contact details:", error);
      // Handle specific errors or display user-friendly messages
    }
  };


  useEffect(() => {
    const fetchMaritalStatuses = async () => {
      try {
        const response = await axios.post<{ [key: string]: MaritalStatus }>('http://103.214.132.20:8000/auth/Get_Marital_Status/');
        const options = Object.values(response.data);
        setMaritalStatuses(options);
      } catch (error) {
        console.error('Error fetching marital statuses:', error);
      }
    };

    fetchMaritalStatuses();
  }, []);

  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Edu_Pref/');
        const options = Object.values(response.data) as EduPref[];
        console.log(options)
        setEduPref(options);
      } catch (error) {
        console.error('Error fetching Edu Pref options:', error);
      }
    };
    fetchEduPref();
  }, []);

  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Annual_Income/');
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error('Error fetching Annual Income options:', error);
      }
    };
    fetchAnnualIncome();
  }, []);

  const storedBirthStar = sessionStorage.getItem("selectedstar");
  const storedGender = sessionStorage.getItem("gender");

  console.log(storedBirthStar);
  console.log(storedGender);

  useEffect(() => {
    if (storedBirthStar && storedGender) {
      const fetchMatchingStars = async () => {
        try {
          const response = await axios.post('http://103.214.132.20:8000/auth/Partner_pref_registration/', {
            birth_star_id: storedBirthStar,
            gender: storedGender,
          });

          const matchCountArrays: MatchingStar[][] = Object.values(response.data).map((matchCount: any) => matchCount);
          setMatchStars(matchCountArrays);
          console.log('Response from server:', matchCountArrays);
        } catch (error) {
          console.error('Error fetching matching star options:', error);
        }
      };
      fetchMatchingStars();
    }
  }, [storedBirthStar, storedGender]);

  useEffect(() => {
    const storedHeight = sessionStorage.getItem("userHeight");

    if (storedHeight) {
      if (storedGender === 'male') {
        setValue("heightFrom", storedHeight);
      } else {
        setValue("heightTo", storedHeight);
      }
    }
  }, [setValue]);
  // useEffect(() => {
  //   const storedHeight = sessionStorage.getItem("userHeight");
  //  // const storedAge = sessionStorage.getItem("userAge");

  //   if (storedHeight) {
  //     setHeight(storedHeight);
  //     if (storedGender === 'male') {
  //       setValue("heightFrom", storedHeight);
  //     } else {
  //       setValue("heightTo", storedHeight);
  //     }
  //   }
  //   if (storedGender) {
  //     setGender(storedGender);
  //   }
  //   // if (storedAge) {
  //   //   if (storedGender === 'male') {
  //   //     setValue("ageFrom", storedAge);
  //   //   } else {
  //   //     setValue("ageTo", storedAge);
  //   //   }
  //   // }
  // }, [setValue]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Partner Preference"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mb-5">
          <h5 className="text-[24px] font-semibold">Advanced Search</h5>

          <div className="flex justify-between items-center">

            <div>
              {/* <h5 className="text-[18px] text-primary font-semibold">Age</h5> */}
              <div className="flex items-center space-x-5">
                {/* <InputField label={""} name={""} placeholder="From" />
                <InputField label={""} name={""} placeholder="To" /> */}

                <div>
                  <label htmlFor="nativeState" className="block mb-1">
                    Age Difference
                  </label>
                  <select
                    id="age"
                    className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                    {...register("age")}
                  >
                    <option value="" selected disabled>
                      -- Select your Age --
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  {errors.age && <span className="text-red-500">{errors.age.message}</span>}
                </div>
              </div>
            </div>



            {/* 
            <div>
              <h5 className="text-[18px] text-primary font-semibold">Age</h5>
              <div className="flex items-center space-x-5">
                <div>
                  <InputField label={""} placeholder="From" {...register("ageFrom")} />
                  {errors.ageFrom && <span className="text-red-500">{errors.ageFrom.message}</span>}
                </div>
                <div>
                  <InputField label={""} placeholder="To" {...register("ageTo")} />
                  {errors.ageTo && <span className="text-red-500">{errors.ageTo.message}</span>}
                </div>
              </div>
            </div> */}





            <div>
              <h5 className="text-[18px] text-primary font-semibold">Height</h5>
              <div className="flex items-center space-x-5">
                <div>
                  <InputField label={""} placeholder="From" {...register("heightFrom")} />
                  {errors.heightFrom && <span className="text-red-500">{errors.heightFrom.message}</span>}
                </div>
                <div>
                  <InputField label={""} placeholder="To" {...register("heightTo")} />
                  {errors.heightTo && <span className="text-red-500">{errors.heightTo.message}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">Marital Status</h5>
            <div className="flex justify-between items-center">
              {maritalStatuses.map(status => (
                <div key={status.marital_sts_id}>
                  <input
                    type="checkbox"
                    id={`maritalStatus-${status.marital_sts_id}`}
                    value={status.marital_sts_id}
                    {...register("maritalStatus")}
                  />
                  <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>{status.marital_sts_name}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Profession
            </h5>

            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="employed"
                  value="employed"
                  {...register("profession")}
                />
                <label htmlFor="employed" className="pl-1">
                  Employed
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="business"
                  value="business"
                  {...register("profession")}
                />
                <label htmlFor="business" className="pl-1">
                  Business
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="student"
                  value="student"
                  {...register("profession")}
                />
                <label htmlFor="student" className="pl-1">
                  Student
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="notWorking"
                  value="notWorking"
                  {...register("profession")}
                />
                <label htmlFor="notWorking" className="pl-1">
                  Not Working
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="notMentioned"
                  value="notMentioned"
                  {...register("profession")}
                />
                <label htmlFor="notMentioned" className="pl-1">
                  Not Mentioned
                </label>
              </div>
            </div>
            {errors.profession && (
              <span className="text-red-500">{errors.profession.message}</span>
            )}
          </div>


          {/* <InputField label={"Education"} name={"education"} /> */}
          {/* <div>
            <label className="text-[18px] text-primary font-semibold mb-2">Education</label>
            <div className="flex justify-between items-center">
              {eduPref.map((option) => (
                <div key={option.Edu_Pref_id}>
                  <input
                    type="checkbox"
                    id={`education-${option.Edu_Pref_id}`}
                    value={option.Edu_Pref_id}
                    {...register("education")}
                  />
                  <label htmlFor={`education-${option.Edu_Pref_id}`} className="pl-1">
                    {option.Edu_name}
                  </label>
                </div>
              ))}
            </div>
            {errors.education && <span className="text-red-500">{errors.education.message}</span>}
          </div> */}
          <div>
            <label className="text-[18px] text-primary font-semibold mb-2">Education</label>
            <div className="flex flex-wrap gap-4">
              {eduPref.map((option) => (
                <div key={option.Edu_Pref_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`education-${option.Edu_Pref_id}`}
                    value={option.Edu_name}
                    {...register("education", { setValueAs: v => (v ? [...v] : []) })}
                  />
                  <label htmlFor={`education-${option.Edu_Pref_id}`} className="pl-1">
                    {option.Edu_name}
                  </label>
                </div>
              ))}
            </div>
            {errors.education && <span className="text-red-500">{errors.education.message}</span>}
          </div>

          {/* <InputField label={"Income"} name={"income"} /> */}
          {/* Annual Income */}
          <div>
            <label className="text-[18px] text-primary font-semibold mb-2">Annual Income</label>
            <div className="grid grid-rows-1 grid-cols-5">
              {annualIncome.map((option) => (
                <div key={option.income_id} className="mb-2">
                  <input
                    type="checkbox"
                    id={`annualIncome-${option.income_id}`}
                    value={option.income_id}
                    {...register("annualIncome", { setValueAs: v => (v ? [...v] : []) })}
                  />
                  <label htmlFor={`annualIncome-${option.income_id}`} className="pl-1">
                    {option.income_description}
                  </label>
                </div>
              ))}
            </div>
            {errors.annualIncome && (
              <span className="text-red-500">{errors.annualIncome.message}</span>
            )}
          </div>

          {/* Dhosam */}
          {/* <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">Dhosam</h5>
            <select
              id="dhosam"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("dhosam")}
              defaultValue="unknown" // Set default value to "unknown"
            >
              <option value="chevvai">Chevvai</option>
              <option value="rehu">Rehu / Ketu</option>
              <option value="unknown">Unknown</option>
            </select>
            {errors.dhosam && <span className="text-red-500">{errors.dhosam.message}</span>}
          </div> */}
          <div>
            <label htmlFor="chevvaiDhosam" className="block mb-1">
              Chevvai
            </label>
            <select
              id="chevvaiDhosam"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("chevvai")}
            >
              <option value="" selected disabled>
                -- Select Chevvai --
              </option>
              {["UnKnown", "Yes", "No"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.chevvai && (
              <span className="text-red-500">{errors.chevvai.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="Rehu" className="block mb-1">  Rehu / Ketu
            </label>
            <select
              id="Rehu"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("rehu")}
            >
              <option value="" selected disabled>
                -- Select Rehu / Ketu  --
              </option>
              {["UnKnown", "Yes", "No"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.rehu && (
              <span className="text-red-500">{errors.rehu.message}</span>
            )}
          </div>

          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">Foreign Interest</h5>
            <select
              id="foreignInterest"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("foreignInterest")}
              defaultValue="both" // Set default value to "both"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="both" selected>Both</option>
            </select>
            {errors.foreignInterest && <span className="text-red-500">{errors.foreignInterest.message}</span>}
          </div>


          {/* <div>
            <label htmlFor="birthStar" className="block mb-1">
              Birth Star
            </label>
            <select
              id="birthStar"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("birthStar")}
            >
              <option value="" selected disabled>
                -- Select your Birth Star --
              </option>
              {birthStar.map((option) => (
                <option key={option.birth_id} value={option.birth_id}>
                  {option.birth_star}
                </option>
              ))}
            </select>
          </div> */}

          {/* Native State */}

          {/* Matching Star */}
          {/* <div>
            <label htmlFor="education" className="block mb-1">
              Matching Star
            </label>
            <select
              name="star"
              id="star"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Matching Star --
              </option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Kerela">Kerela</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div> */}



          <div className="justify-start items-center gap-x-5">
            {matchStars.sort((a, b) => b[0].match_count - a[0].match_count).map((matchCountArray, index) => {
              const starAndRasi = matchCountArray.map(star => ({
                star: star.matching_starname,
                rasi: star.matching_rasiname,
              }));

              // Assuming matchCountArray has the structure [{ matchCount: number, otherProperties: ... }]
              const matchCountValue = matchCountArray[0].match_count; // Adjust according to the structure

              return (
                <MatchingStars
                  key={index}
                  initialPoruthas={`No of porutham ${matchCountValue}`}
                  starAndRasi={starAndRasi}
                />
              );
            })}
          </div>




          <div className="mt-7 flex justify-between">
            <div className="">
              {/* <Link to={"/"}>
                <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                  Back
                </button>
              </Link> */}
            </div>

            <div className="flex space-x-4">

              <button className="py-[10px] px-14 bg-white text-main font-semibold  rounded-[6px] mt-2">
                Cancel
              </button>

              {/* <button type="submit" className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">
                Find Match
                <span>
                  <img src={arrow} alt="next arrow" className="ml-2" />
                </span>
              </button> */}
              <button type="submit" className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Find Match'}
                {!isSubmitting && <span><img src={arrow} alt="next arrow" className="ml-2" /></span>}
              </button>
            </div>
          </div>

        </form>
        <SideContent />
      </div>
    </div>
  );
};

export default PartnerSettings;

