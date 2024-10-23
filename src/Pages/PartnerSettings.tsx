

/* eslint-disable @typescript-eslint/no-explicit-any */
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
// import axios from "axios";
import apiClient from "../API";
import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../Components/Toast/ToastNotification";

// const PARTNER_API_URL = await apiClient.post(`/auth/Partner_pref_registration/`);

const schema = zod
  .object({
    age: zod.string().nonempty("Age is required"),
    heightFrom: zod.string().min(1, "Height From is required"),
    heightTo: zod.string().min(1, "Height To is required"),
    // education: zod.array(zod.string()).min(1, "Education is required"),
    // annualIncome: zod.array(zod.string()).min(1, "Annual Income is required"),
    chevvai: zod.string().min(1, "Chevvai option is required"),
    rehu: zod.string().min(1, "Rehu/Kethu option is required"),
  })
  .required();

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
  foreignInterest: string;
  nativeState?: string[];
  profilePhoto?: boolean;
  ageFrom?: string;
  ageTo?: string;
}

interface EduPref {
  Edu_Pref_id: number;
  Edu_name: string;
}

interface Profession {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface MaritalStatus {
  marital_sts_id: number;
  marital_sts_name: string;
}

interface AnnualIncome {
  income_id: number;
  income_description: string;
}

// interface BirthStar {
//   birth_id: number;
//   birth_star: string;
// }

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

export interface StarAndRasiItem {
  id: string;
  matching_starId: string;
  matching_starname: string;
  matching_rasiId: string;
  matching_rasiname: string;
}

// Type for selectedStarIds
export interface SelectedStarIdItem {
  id: string;
  rasi: string;
  star: string;
  label: string;
}

const PartnerSettings: React.FC = () => {
  const [eduPref, setEduPref] = useState<EduPref[]>([]);
  const [ProfPref, setProfPref] = useState<Profession[]>([]);

  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [matchStars, setMatchStars] = useState<MatchingStar[][]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [selectedStarIds, setSelectedStarIds] = React.useState<SelectedStarIdItem[]>([]);
  // const [selectedStarId, setSelectedStarId] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<
    string[]
  >([]);
  // const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>(
    []
  );

  const [selectedProfession, setSelectedProfession] = useState<string[]>(
    []
  );
  // const [selectedBusiness, setSelectedBusiness] = useState(false);
  // const [selectedStudent, setSelectedStudent] = useState(false);
  // const [selectedNotWorking, setSelectedNotWorking] = useState(false);
  // const [selectedNotMentioned, setSelectedNotMentioned] = useState(false);
  // const [selectedStarRasiPairs, setSelectedStarRasiPairs] = useState<string[]>(
  //   []
  // );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }, setError, clearErrors,
    watch,
  } = useForm<PartnerSettingsInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      foreignInterest: "both", // Set default value here
    },
  });

  const [foreignInterestValue, setForeignInterestValue] = useState("both");
  const foreignInterest = watch("foreignInterest");

  useEffect(() => {
    setForeignInterestValue(foreignInterest);
  }, [foreignInterest]);

  const navigate = useNavigate();

 

  // const handleProfessionChange = (value: string, checked: boolean) => {
  //   setSelectedProfessions((prevProfessions) => {
  //     if (checked && !prevProfessions.includes(value)) {
  //       return [...prevProfessions, value];
  //     } else {
  //       return prevProfessions.filter((profession) => profession !== value);
  //     }
  //   });

    // Handle other checkboxes as needed
  //   if (value === "business") {
  //     setSelectedBusiness(checked);
  //   } else if (value === "student") {
  //     setSelectedStudent(checked);
  //   } else if (value === "notWorking") {
  //     setSelectedNotWorking(checked);
  //   } else if (value === "notMentioned") {
  //     setSelectedNotMentioned(checked);
  //   }
  // };

  const onSubmit: SubmitHandler<PartnerSettingsInputs> = async (data) => {
    setIsSubmitting(true);
    console.log("Form data:", data);

    const starArray = selectedStarIds.map(item => item.id);
    const starRasiArray = selectedStarIds.map(item => `${item.star}-${item.rasi}`);

    // Create a comma-separated string for each array
    const StarString = starArray.join(',');
    const combinedString = starRasiArray.join(',');

    console.log(StarString);
    console.log(combinedString);

    const MaritalValues = selectedMaritalStatuses.join(",");
    const EducationalValues = selectedEducations.join(",");
    console.log(EducationalValues);
    const IncomeValues = selectedAnnualIncomes.join(",");
    console.log(IncomeValues);
    // const prefProfessionString = [
    //   ...(selectedProfessions.includes("employed") ? ["employed"] : []),
    //   ...(selectedBusiness ? ["business"] : []),
    //   ...(selectedStudent ? ["student"] : []),
    //   ...(selectedNotWorking ? ["notWorking"] : []),
    //   ...(selectedNotMentioned ? ["notMentioned"] : []),
    // ].join(",");
    const ProfessionValues = selectedProfession.join(",");

    try {
      const profileId = sessionStorage.getItem("profile_id_new") || sessionStorage.getItem("loginuser_profile_id")
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }

      const postData = {
        profile_id: profileId,
        pref_age_differences: data.age,
        pref_height_from: data.heightFrom,
        pref_height_to: data.heightTo,
        pref_marital_status: MaritalValues,
        pref_profession: ProfessionValues,
        pref_education: EducationalValues,
        pref_anual_income: IncomeValues,
        pref_chevvai: data.chevvai,
        pref_ragukethu: data.rehu,
        pref_foreign_intrest: foreignInterestValue,
        pref_porutham_star: StarString,
        pref_porutham_star_rasi: combinedString,
        status: "1",
      };

      console.log("PartnerSettings:", postData);

      const response = await apiClient.post(
        `/auth/Partner_pref_registration/`,
        postData
      );
      console.log("Registration response:", response.data);

      if (response.data.Status === 1) {
        NotifySuccess("Partner details updated successfully");
      
        // Get quick_reg value from sessionStorage
        const quickreg = sessionStorage.getItem("quick_reg") || "0"; // Default to "0" if not found
        
        setTimeout(() => {
          if (quickreg === "1") {
            navigate("/ThankYouReg"); // Redirect to ThankYouReg page
          } else {
            navigate("/MembershipPlan"); // Redirect to MembershipPlan page
          }
        }, 2000);
        
      } else {
        setIsSubmitting(false);
        NotifyError("Registration unsuccessful");
        console.log("Registration unsuccessful:", response.data);
      }
      
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting contact details:", error);
    }
  };

  // const profileId = sessionStorage.getItem('profile_id_new');

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileId = sessionStorage.getItem("profile_id_new");

      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 6,
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

          console.log("API Response:", response.data);

          const profileData = response.data.data;

          // Parse and set form values
          const maritalStatusArray = profileData.pref_marital_status.split(",");
          const educationArray = profileData.pref_education.split(",");
          const annualIncomeArray = profileData.pref_anual_income.split(",");
          const poruthamStarIds = profileData.pref_porutham_star
            .split(",")
            .map((id: string) => id.trim());

          // Set form values
          setValue("age", profileData.pref_age_differences);
          setValue("heightFrom", profileData.pref_height_from);
          setValue("heightTo", profileData.pref_height_to);
          setValue("maritalStatus", maritalStatusArray);
          setValue("profession", profileData.pref_profession.split(","));
          setValue("education", educationArray);
          setValue("annualIncome", annualIncomeArray);
          setValue("chevvai", profileData.pref_chevvai);
          setValue("rehu", profileData.pref_ragukethu);
          setValue("foreignInterest", profileData.pref_foreign_intrest);

          // Set selected values for checkboxes and other states
          setSelectedMaritalStatuses(maritalStatusArray);
          setSelectedEducations(educationArray);
          setSelectedAnnualIncomes(annualIncomeArray);
          // setSelectedStarIds(poruthamStarIds); // Set selected stars for checkbox selection

          setSelectedStarIds(poruthamStarIds.map((id: any) => ({
            id,
            rasi: "",
            star: "",
            label: ""
          })));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };

    fetchProfileData();
  }, [setValue]);

  const handleMaritalStatusChange = (id: string, isChecked: boolean) => {
    setSelectedMaritalStatuses((prev) =>
      isChecked ? [...prev, id] : prev.filter((statusId) => statusId !== id)
    );
  };

  const handleEducationChange = (id: string, isChecked: boolean) => {
    setSelectedEducations((prev) =>
      isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id)
    );
  };


  const handleProfessionChange = (id: string, isChecked: boolean) => {
    setSelectedProfession((prev) =>
      isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id)
    );
  };

  const handleAnnualIncomeChange = (id: string, isChecked: boolean) => {
    setSelectedAnnualIncomes((prev) =>
      isChecked ? [...prev, id] : prev.filter((incId) => incId !== id)
    );
  };

  useEffect(() => {
    const fetchMaritalStatuses = async () => {
      try {
        // const response = await axios.post<{ [key: string]: MaritalStatus }>('/auth/Get_Marital_Status/');
        const response = await apiClient.post(`/auth/Get_Marital_Status/`);
        const options = Object.values(response.data) as MaritalStatus[];
        setMaritalStatuses(options);
      } catch (error) {
        console.error("Error fetching marital statuses:", error);
      }
    };

    fetchMaritalStatuses();
  }, []);

  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Edu_Pref/`);
        const options = Object.values(response.data) as EduPref[];
        console.log(options);
        setEduPref(options);
      } catch (error) {
        console.error("Error fetching Edu Pref options:", error);
      }
    };
    fetchEduPref();
  }, []);


  useEffect(() => {
    const fetchProfession = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Profes_Pref/`);
        const options = Object.values(response.data) as Profession[];
        console.log(options);
        setProfPref(options);
      } catch (error) {
        console.error("Error fetching Prof Pref options:", error);
      }
    };
    fetchProfession();
  }, []);

  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Annual_Income/`);
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error("Error fetching Annual Income options:", error);
      }
    };
    fetchAnnualIncome();
  }, []);


  useEffect(() => {
    const storedMaritalStatus = sessionStorage.getItem("maritalStatus");
    if (storedMaritalStatus) {
      // Set the stored marital status in the state
      setSelectedMaritalStatuses([storedMaritalStatus]);
    }
  }, []);


  const storedBirthStar = sessionStorage.getItem("selectedstar");
  const storedGender = sessionStorage.getItem("gender");
  // const storedMartialStatus = sessionStorage.getItem("maritalStatus");
  const storedHeight = sessionStorage.getItem("userHeight") || 0;
  // const quickreg = sessionStorage.getItem("quick_reg") || "0";

  // console.log(storedMartialStatus);
  console.log(storedBirthStar);
  console.log(storedGender);

  useEffect(() => {
    if (storedBirthStar && storedGender) {
      const fetchMatchingStars = async () => {
        try {
          const response = await apiClient.post(`/auth/Get_Matchstr_Pref/`, {
            birth_star_id: storedBirthStar,
            gender: storedGender,
          });

          const matchCountArrays: MatchingStar[][] = Object.values(
            response.data
          ).map((matchCount: any) => matchCount);
          setMatchStars(matchCountArrays);
          console.log("Response from server:", matchCountArrays);
        } catch (error) {
          console.error("Error fetching matching star options:", error);
        }
      };
      fetchMatchingStars();
    }
  }, [storedBirthStar, storedGender]);

  useEffect(() => {
    if (storedHeight) {
      if (storedGender === "male") {
        // Set heightTo and restrict heightFrom input
        setValue("heightTo", storedHeight);
        setValue("heightFrom", ""); // Reset heightFrom to avoid invalid data
      } else if (storedGender === "female") {
        // Set heightFrom and restrict heightTo input
        setValue("heightFrom", storedHeight);
        setValue("heightTo", ""); // Reset heightTo to avoid invalid data
      }
    }
  }, [storedHeight, storedGender, setValue]);


  const heightFrom = watch("heightFrom"); // Watch the value of heightFrom
  const heightTo = watch("heightTo");     // Watch the value of heightTo

  // console.log("sssssssssssssssssssss",heightTo);

  // Handle validation on change using useEffect
  useEffect(() => {
    // Ensure storedGender is female and heightTo is valid
    if (storedGender === "female" && heightTo && Number(heightTo) <= Number(storedHeight)) {
      setError("heightTo", {
        type: "manual",
        message: `Height To must be Greater than ${storedHeight} cm.`,
      });
    } else {
      clearErrors("heightTo");
    }
  }, [heightTo, storedHeight, storedGender, setError, clearErrors]);

  useEffect(() => {
    // Ensure storedGender is male and heightFrom is valid
    if (storedGender === "male" && heightFrom && Number(heightFrom) >= Number(storedHeight)) {
      setError("heightFrom", {
        type: "manual",
        message: `Height From must be less than ${storedHeight} cm.`,
      });
    } else {
      clearErrors("heightFrom");
    }
  }, [heightFrom, storedHeight, storedGender, setError, clearErrors]);

  




  const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
    setSelectedStarIds(updatedIds);
  };


  console.log(selectedStarIds);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Partner Preference"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 mb-5"
        >
         

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
                  {errors.age && (
                    <span className="text-red-500">{errors.age.message}</span>
                  )}
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
                  <InputField
                    label={""}
                    placeholder="From"
                    {...register("heightFrom", {
                      setValueAs: (value) => value.trim(),
                    })}
                  />
                  {errors.heightFrom && (
                    <span className="text-red-500">{errors.heightFrom.message}</span>
                  )}
                </div>

                <div>
                  <InputField
                    label={""}
                    placeholder="To"
                    {...register("heightTo", {
                      setValueAs: (value) => value.trim(),
                    })}
                  />
                  {errors.heightTo && (
                    <span className="text-red-500">{errors.heightTo.message}</span>
                  )}
                </div>
              </div>
            </div>



          </div>

          {/* Marital Status */}
          {/* Marital Status */}
          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Marital Status
            </h5>
            <div className="flex justify-between items-center">
              {maritalStatuses.map((status) => (
                <div key={status.marital_sts_id}>
                  <input
                    type="checkbox"
                    id={`maritalStatus-${status.marital_sts_id}`}
                    value={status.marital_sts_id.toString()}
                    checked={selectedMaritalStatuses.includes(
                      status.marital_sts_id.toString()
                    )}
                    onChange={(e) =>
                      handleMaritalStatusChange(
                        status.marital_sts_id.toString(),
                        e.target.checked
                      )
                    }
                  />
                  <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>
                    {status.marital_sts_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Profession */}
          {/* Profession */}
          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Profession
            </h5>
            <div className="flex flex-wrap gap-4">
              {ProfPref.map((option) => (
                <div key={option.Profes_Pref_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`profession-${option.Profes_Pref_id}`}
                    value={option.Profes_Pref_id.toString()}
                    checked={selectedProfession.includes(
                      option.Profes_Pref_id.toString()
                    )}
                    onChange={(e) =>
                      handleProfessionChange(
                        option.Profes_Pref_id.toString(),
                        e.target.checked
                      )
                    }
                  />
                  <label
                    htmlFor={`profession-${option.Profes_Pref_id}`}
                    className="pl-1"
                  >
                    {option.Profes_name}
                  </label>
                </div>
              ))}
            </div>
            {errors.profession && (
              <span className="text-red-500">{errors.profession.message}</span>
            )}
          </div>

          {/* Education */}
          <div>
            <label className="text-[18px] text-primary font-semibold mb-2">
              Education
            </label>
            <div className="flex flex-wrap gap-4">
              {eduPref.map((option) => (
                <div key={option.Edu_Pref_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`education-${option.Edu_Pref_id}`}
                    value={option.Edu_Pref_id.toString()}
                    checked={selectedEducations.includes(
                      option.Edu_Pref_id.toString()
                    )}
                    onChange={(e) =>
                      handleEducationChange(
                        option.Edu_Pref_id.toString(),
                        e.target.checked
                      )
                    }
                  />
                  <label
                    htmlFor={`education-${option.Edu_Pref_id}`}
                    className="pl-1"
                  >
                    {option.Edu_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Income */}
          <div>
            <label className="text-[18px] text-primary font-semibold mb-2">
              Annual Income
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {annualIncome.map((option) => (
                <div key={option.income_id} className="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    id={`annualIncome-${option.income_id}`}
                    value={option.income_id.toString()}
                    checked={selectedAnnualIncomes.includes(
                      option.income_id.toString()
                    )}
                    onChange={(e) =>
                      handleAnnualIncomeChange(
                        option.income_id.toString(),
                        e.target.checked
                      )
                    }
                  />
                  <label
                    htmlFor={`annualIncome-${option.income_id}`}
                    className="pl-1"
                  >
                    {option.income_description}
                  </label>
                </div>
              ))}
            </div>
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
            <label htmlFor="Rehu" className="block mb-1">
              {" "}
              Rehu / Ketu
            </label>
            <select
              id="Rehu"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("rehu")}
            >
              <option value="" selected disabled>
                -- Select Rehu / Ketu --
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
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Foreign Interest
            </h5>
            <select
              id="foreignInterest"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("foreignInterest", {
                required: "Foreign interest selection is required",
              })}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="both">Both</option>
            </select>
            {errors.foreignInterest && (
              <span className="text-red-500">
                {errors.foreignInterest.message}
              </span>
            )}
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

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Other input fields */}
              <div className="justify-start items-center gap-x-5">
                {
                  matchStars
                    .sort((a, b) => b[0].match_count - a[0].match_count) // Sort by match_count
                    .map((matchCountArray, index) => {
                      const starAndRasi = matchCountArray.map(star => ({
                        id: star.id.toString(),
                        matching_starId: star.dest_star_id.toString(),
                        matching_starname: star.matching_starname,
                        matching_rasiId: star.dest_rasi_id.toString(),
                        matching_rasiname: star.matching_rasiname,
                      }));

                      const matchCountValue = matchCountArray[0].match_count;

                      return (
                        <MatchingStars
                          key={index}
                          initialPoruthas={`No of porutham ${matchCountValue}`}
                          starAndRasi={starAndRasi}
                          selectedStarIds={selectedStarIds}
                          onCheckboxChange={handleCheckboxChange}
                        />
                      );
                    })
}
              </div>
            </form>
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
              <button
                type="submit"
                className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Find Match"}
                {!isSubmitting && (
                  <span>
                    <img src={arrow} alt="next arrow" className="ml-2" />
                  </span>
                )}
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

export default PartnerSettings;
