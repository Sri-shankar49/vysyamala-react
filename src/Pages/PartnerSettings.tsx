import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Checkbox from "../Components/PartnerPreference/CheckBox";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import MatchingStars from "../Components/PartnerPreference/MatchingStars"
import React, { useState, useEffect } from "react";
import axios from "axios";





// Define validation schema with zod
const schema = zod.object({
  age: zod.string().nonempty("Age is required"),
  heightFrom: zod.string().min(1, "Height From is required"),
  heightTo: zod.string().min(1, "Height To is required"),
  ageFrom: zod.string().min(1, "Age from is required"),
  ageTo: zod.string().min(1, "Age To is required"),
  education: zod.string().min(1, "Education is required"),
  annualIncome: zod.string().min(1, "Annual Income is required"),
  birthStar: zod.string().min(1, "Birth Star is required"),
  // maritalStatus: zod.array(zod.string()).min( "At least one marital status is required"),
  //profession: zod.array(zod.string()).min(1, "At least one profession is required"),
  //  dhosam: zod.array(zod.string()),
  //  foreignInterest: zod.array(zod.string()),
  //  nativeState: zod.array(zod.string()),
  //  profilePhoto: zod.boolean(),
}).required();

interface PartnerSettingsInputs {
  age: string;
  heightFrom: string;
  heightTo: string;
  education: string;
  annualIncome: string;
  birthStar: string;
  workLocation: string;
  maritalStatus: string[];
  profession: string[];
  dhosam: string[];
  foreignInterest: string[];
  nativeState: string[];
  profilePhoto: boolean;
  ageFrom: string;
  ageTo: string;
}

interface EduPref {
  Edu_Pref_id: number;
  Edu_name: string;
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
  const [birthStar, setBirthStar] = useState<BirthStar[]>([]);
  const [matchStars, setMatchStars] = useState<MatchingStar[][]>([]);
  const [height, setHeight] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<PartnerSettingsInputs>({
    resolver: zodResolver(schema),
  });


  const navigate = useNavigate();
  const onSubmit: SubmitHandler<PartnerSettingsInputs> = data => {
    console.log(data);
    navigate('/MembershipPlan');
  };

  const selectedStar = watch('birthStar');

  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Edu_Pref/');
        const options = Object.values(response.data) as EduPref[];
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
        console.error('Error fetching Annual Income  options:', error);
      }
    };
    fetchAnnualIncome();
  }, []);

  useEffect(() => {
    const fetchBirthStar = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Birth_Star/');
        const options = Object.values(response.data) as BirthStar[];
        setBirthStar(options);
      } catch (error) {
        console.error('Error fetching birth star options:', error);
      }
    };
    fetchBirthStar();
  }, []);

  const storedBirthStar = sessionStorage.getItem("selectedstar");
  const storedGender = sessionStorage.getItem("gender");

  console.log(storedBirthStar);
  console.log(storedGender);


  useEffect(() => {
    const fetchMatchingStars = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Matchstr_Pref/', {
          birth_star_id: storedBirthStar,
          gender: gender, // Replace 'male' with the actual value you want to pass
        });

        const matchCountArrays: MatchingStar[][] = Object.values(response.data).map((matchCount: any) => matchCount);
        setMatchStars(matchCountArrays);
        console.log('Response from server:', matchCountArrays);
      } catch (error) {
        console.error('Error fetching matching star options:', error);
      }
    };
    fetchMatchingStars();

  }, [selectedStar]);

  useEffect(() => {
    const storedHeight = sessionStorage.getItem("userHeight");
    const storedAge = sessionStorage.getItem("userAge");



    if (storedHeight) {
      setHeight(storedHeight);
      if (storedGender === 'male') {
        setValue("heightFrom", storedHeight);
      } else {
        setValue("heightTo", storedHeight);
      }
    }
    if (storedGender) {
      setGender(storedGender);
    }
    if (storedAge) {
      if (storedGender === 'male') {
        setValue("ageFrom", storedAge);
      } else {
        setValue("ageTo", storedAge);
      }
    }
  }, [setValue]);



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
            </div>





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
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Marital Status
            </h5>

            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="neverMarried"
                  value="neverMarried"
                  {...register("maritalStatus")}
                />
                <label htmlFor="neverMarried" className="pl-1">
                  Never Married
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="married"
                  value="married"
                  {...register("maritalStatus")}
                />
                <label htmlFor="married" className="pl-1">
                  Married
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="divorced"
                  value="divorced"
                  {...register("maritalStatus")}
                />
                <label htmlFor="divorced" className="pl-1">
                  Divorced
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="seperated"
                  value="seperated"
                  {...register("maritalStatus")}
                />
                <label htmlFor="seperated" className="pl-1">
                  Seperated
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="widow"
                  value="widow"
                  {...register("maritalStatus")}
                />
                <label htmlFor="widow" className="pl-1">
                  Widow / Widower
                </label>
              </div>
            </div>
            {errors.maritalStatus && (
              <span className="text-red-500">{errors.maritalStatus.message}</span>
            )}
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
          <div>
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
                    {...register("annualIncome")}
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
          <div>
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
              <option value="both">Both</option>
            </select>
            {errors.foreignInterest && <span className="text-red-500">{errors.foreignInterest.message}</span>}
          </div>


          <div>
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
          </div>

          {/* Native State */}
          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Native State
            </h5>

            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="tamilNadu"
                  name="tamilNadu"
                  value="tamilNadu"
                />
                <label htmlFor="tamilNadu" className="pl-1">
                  TamilNadu and Pondhicherry
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="karnataka"
                  name="karnataka"
                  value="karnataka"
                />
                <label htmlFor="karnataka" className="pl-1">
                  Karnataka
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="andhraPradesh"
                  name="andhraPradesh"
                  value="andhraPradesh"
                />
                <label htmlFor="andhraPradesh" className="pl-1">
                  Andhra Pradesh
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="telangana"
                  name="telangana"
                  value="telangana"
                />
                <label htmlFor="telangana" className="pl-1">
                  Telangana
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="kerala"
                  name="kerala"
                  value="kerala" />
                <label htmlFor="kerala" className="pl-1">
                  Kerala
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="others"
                  name="others"
                  value="others" />
                <label htmlFor="others" className="pl-1">
                  Others
                </label>
              </div>
            </div>
          </div>

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

          <InputField label={"Work Location"} name={"workLocation"} />

          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Profile Photo
            </h5>
            <input type="checkbox" id="profilePhoto" value="profilePhoto" {...register("profilePhoto")} />
            <label htmlFor="profilePhoto" className="pl-1">
              People only with photo
            </label>
          </div>

          <div className="justify-start items-center gap-x-5">
            {matchStars.map((matchCountArray, index) => (
              <MatchingStars
                key={index}
                initialPoruthas={`Matching Set ${index + 1}`}
                starAndRasi={matchCountArray.map(star => ({
                  star: star.matching_starname,
                  rasi: star.matching_rasiname
                }))}
              />
            ))}
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

              <button type="submit" className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">
                Find Match
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

export default PartnerSettings;
