/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import apiClient from "../API";
import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../Components/Toast/ToastNotification";

// Define validation schema with zod
const schema = zod
  .object({
    fathername: zod.string().min(3, "Father name is required"),
    fatherOccupation: zod.string().min(3, "Father's Occupation is required"),
    mothername: zod.string().min(3, "Mother name is required"),
    // familyname: zod.string().min(3, "Family name is required"),
    aboutmyself: zod.string().min(3, "Required"),
    myhobbies: zod.string().min(1, "Required"),

    // Modify the weight validation to allow only 3-digit numbers
    //  weight: zod.number()
    //  .min(1, "Weight is required")
    //  .max(999, "Weight must be a 3-digit number"),

    bloodGroup: zod.string().min(3, "Blood Group Required"),
    motherOccupation: zod.string().min(3, "Mother's Occupation is required"),
    brother: zod.number().min(0, "Brother count is required"),
    marriedBrother: zod.number().optional(),
    sister: zod.number().min(0, "Sister count is required"),
    marriedSister: zod
      .number()
      .min(0, "Married Sister count is required")
      .optional(),
    familyType: zod.string().min(1, "Family Type is required"),
    familyValue: zod.string().min(1, "Family Value is required"),
    familyStatus: zod.string().min(1, "Family Status is required"),
    propertyDetails: zod.string().optional(),
    propertyWorth: zod.string().optional(),
    suyaGothram: zod.string().optional(),
    uncleGothram: zod.string().optional(),
    ancestorOrigin: zod.string().optional(),
    aboutMyFamily: zod.string().optional(),
  })
  .refine(
    (data) =>
      data.brother === 0 ||
      (data.brother > 0 && data.marriedBrother !== undefined),
    {
      message: "Married Brother count is required if there are brothers",
      path: ["marriedBrother"],
    }
  )
  .refine(
    (data) =>
      data.sister === 0 ||
      (data.sister > 0 && data.marriedSister !== undefined),
    {
      message: "Married Sister count is required if there are sisters",
      path: ["marriedSister"],
    }
  );

interface FamilyDetailsInputs {
  fathername: string;
  fatherOccupation: string;
  mothername?: string;
  familyname?: string;
  aboutmyself?: string;
  myhobbies?: string;

  weight?: number;
  bodytype?: string;
  eyewear?: string;
  motherOccupation?: string;
  familyType?: string;
  familyValue?: string;
  familyStatus?: string;
  propertyDetails?: string;
  propertyWorth?: string;
  suyaGothram?: string;
  uncleGothram?: string;
  ancestorOrigin?: string;
  aboutMyFamily?: string;
  brother: number;
  marriedBrother: number;
  sister: number;
  marriedSister: number;
  bloodGroup?: string;
  physicallyChallenged?: string;
  defectDetails?: string;
}

interface Occupation {
  occupation_id: number;
  occupation_description: string;
}

interface PropertyWorth {
  property_id: number;
  property_description: string;
}

// interface FamilyType {
//   family_id: number;
//   family_description: string;
// }

interface FamilyStatus {
  family_status_id: number;
  family_status_name: string;
  family_status_description: string;
}

interface FamilyValue {
  family_value_id: number;
  family_value_name: string;
}



interface FamilyType {
  family_id: number;
  family_description: string;
}

const FamilyDetails: React.FC = () => {
  const bloodGroups = [
    { type: "A+", abbreviation: "A positive" },
    { type: "A-", abbreviation: "A negative" },
    { type: "B+", abbreviation: "B positive" },
    { type: "B-", abbreviation: "B negative" },
    { type: "AB+", abbreviation: "AB positive" },
    { type: "AB-", abbreviation: "AB negative" },
    { type: "O+", abbreviation: "O positive" },
    { type: "O-", abbreviation: "O negative" },
  ];

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FamilyDetailsInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      physicallyChallenged: "no", // Set "no" as the default value
    },
  });

  const [selectedBrother, setSelectedBrother] = useState<number | null>(null);
  const [selectedMarriedBrother, setSelectedMarriedBrother] = useState<
    number | null
  >(null);
  const [selectedSister, setSelectedSister] = useState<number | null>(null);
  const [selectedMarriedSister, setSelectedMarriedSister] = useState<
    number | null
  >(null);
  // const [selectedFamilyValue, setSelectedFamilyValue] = useState<string | null>(
  //   null
  // );
  // const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<
  //   string | null
  // >(null);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  console.log(occupations);
  const [propertyworth, setPropertyworth] = useState<PropertyWorth[]>([]);
  // const [familyTypes, setFamilyTypes] = useState<FamilyType[]>([]);
  // const [familyStatus, setFamilyStatus] = useState<FamilyStatus[]>([]);
  // const [familyValue, setFamilyValue] = useState<FamilyValue[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const marriedBrotherContainerRef = useRef<HTMLDivElement>(null);
  const sisterContainerRef = useRef<HTMLDivElement>(null);
  const familyTypeRef = useRef<HTMLDivElement>(null);
  const familyValueRef = useRef<HTMLDivElement>(null);
  const familyStatusRef = useRef<HTMLDivElement>(null);

  const [familyType, setfamilyType] = useState<FamilyType[]>([]);
  const [selectedfamilyTypeId, setSelectedfamilyTypeId] = useState<number | null>(null);
  const [selectedFamilyType, setSelectedFamilyType] = useState<string | null>(
    null
  );



  const [familyValue, setfamilyValue] = useState<FamilyValue[]>([]);
  const [selectedfamilyValueId, setSelectedfamilyValueId] = useState<number | null>(null);
  const [selectedfamilyValueType, setSelectedfamilyValue] = useState<string | null>(
    null
  );

  const [familyStatus, setfamilyStatus] = useState<FamilyStatus[]>([]);
  const [selectedfamilyStatusId, setSelectedfamilyStatusId] = useState<number | null>(null);
  const [selectedfamilyStatusType, setSelectedfamilyStatus] = useState<string | null>(
    null
  );

  const handleFamilyTypeChange = (id: number, name: string) => {
    setSelectedFamilyType(name);
    setSelectedfamilyTypeId(id);  // Store the Profes_Pref_id in state
    setValue("familyType", name, { shouldValidate: true });
  };


  const handleFamilyValueChange = (id: number, name: string) => {
    setSelectedfamilyValue(name);
    setSelectedfamilyValueId(id);  // Store the Profes_Pref_id in state
    setValue("familyValue", name, { shouldValidate: true });
  };


  const handleFamilyStatusChange = (id: number, name: string) => {
    setSelectedfamilyStatus(name);
    setSelectedfamilyStatusId(id);  // Store the Profes_Pref_id in state
    setValue("familyStatus", name, { shouldValidate: true });
  };


  useEffect(() => {
    const fetchFamilyTypeData = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_FamilyType/"
        );
        setfamilyType(Object.values(response.data));
        console.log('Get_FamilyType',response.data)
      } catch (error) {
        console.error("Error fetching familytype :", error);
      }
    };
  
    fetchFamilyTypeData();
  }, []);


  useEffect(() => {
    const fetchFamilyValue = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_FamilyValue/"
        );
        setfamilyValue(Object.values(response.data));
        console.log('Get_FamilyValue',response.data)
      } catch (error) {
        console.error("Error fetching familytype :", error);
      }
    };
  
    fetchFamilyValue();
  }, []);

  useEffect(() => {
    const fetchFamilyStatus = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_FamilyStatus/"
        );
        setfamilyStatus(Object.values(response.data));
        console.log('Get_FamilyStatus',response.data)
      } catch (error) {
        console.error("Error fetching familytype :", error);
      }
    };
  
    fetchFamilyStatus();
  }, []);



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
    handleFocus(marriedBrotherContainerRef, errors.marriedBrother);
    handleFocus(buttonContainerRef, errors.brother);
    handleFocus(sisterContainerRef, errors.sister);
    handleFocus(familyTypeRef, errors.familyType);
    handleFocus(familyValueRef, errors.familyValue);
    handleFocus(familyStatusRef, errors.familyStatus);
  }, [
    errors.brother,
    errors.marriedBrother,
    errors.sister,
    errors.familyType,
    errors.familyValue,
    errors.familyStatus,
  ]);

  const physicallyChallengedValue = watch("physicallyChallenged");

  const profileId = sessionStorage.getItem("profile_id_new");
  const [weight, setWeight] = useState<number>(0);
  const [familyName, setFamilyName] = useState<string>("");
  useEffect(() => {
    const fetchFamilyData = async () => {
      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 3,
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

          console.log("Profile Data:", profileData);

          // Set form values here after fetching data
          setValue("fathername", profileData.father_name);
          setValue("fatherOccupation", profileData.father_occupation);
          setValue("mothername", profileData.mother_name);
          setValue("motherOccupation", profileData.mother_occupation);
          setFamilyName(profileData.family_name);
          setValue("aboutmyself", profileData.about_self);
          setValue("myhobbies", profileData.hobbies);
          setWeight(profileData.weight);
          setValue("bodytype", profileData.bodytype);
          setValue("eyewear", profileData.eyewear);

          setValue("bloodGroup", profileData.blood_group);

          // Handle radio button for physically challenged
          setValue(
            "physicallyChallenged",
            profileData.Pysically_changed === "yes" ? "yes" : "no"
          );

          // Set brother and sister values based on the fetched data

          const numberOfBrothers = parseInt(profileData.no_of_brother);
          const numberOfSisters = parseInt(profileData.no_of_sister);
          const numberOfMarriedSisters = parseInt(
            profileData.no_of_sis_married
          );
          const numberOfMarriedBrother = parseInt(
            profileData.no_of_bro_married
          );

          setValue("brother", numberOfBrothers);
          setValue("sister", numberOfSisters);
          setValue("marriedSister", numberOfMarriedSisters);
          setValue("marriedBrother", numberOfMarriedBrother);

          setSelectedBrother(numberOfBrothers);
          setSelectedSister(numberOfSisters);
          setSelectedMarriedSister(numberOfMarriedSisters);
          setSelectedMarriedBrother(numberOfMarriedBrother);

          // Set family type, value, and status
          setValue("familyType", profileData.family_type);
          setSelectedFamilyType(profileData.family_type);

          setValue("familyValue", profileData.family_value);
          setSelectedfamilyValue(profileData.family_value);

          setValue("familyStatus", profileData.family_status);
          setSelectedfamilyStatus(profileData.family_status);

          // Set property details, suya gothram, uncle gothram, ancestor origin, about family
          setValue("propertyDetails", profileData.property_details);
          setValue("propertyWorth", profileData.property_worth);
          setValue("suyaGothram", profileData.suya_gothram);
          setValue("uncleGothram", profileData.uncle_gothram);
          setValue("ancestorOrigin", profileData.ancestor_origin);
          setValue("aboutMyFamily", profileData.about_family);
        } catch (error) {
          console.error("Error fetching family data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };

    fetchFamilyData();
  }, [profileId, setValue]);

  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Parent_Occupation/`);
        const options = Object.values(response.data) as Occupation[];
        setOccupations(options);
      } catch (error) {
        console.error("Error fetching marital status options:", error);
      }
    };
    fetchOccupations();
  }, []);

  useEffect(() => {
    const fetchPropertyworth = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Property_Worth/`);
        const options = Object.values(response.data) as PropertyWorth[];
        setPropertyworth(options);
      } catch (error) {
        console.error("Error fetching property worth options:", error);
      }
    };
    fetchPropertyworth();
  }, []);

  // useEffect(() => {
  //   const fetchFamilyTypes = async () => {
  //     try {
  //       const response = await apiClient.post(`/auth/Get_FamilyType/`);
  //       const data = response.data;
  //       const familyTypesArray = Object.values(data) as FamilyType[];
  //       setFamilyTypes(familyTypesArray);
  //     } catch (error) {
  //       console.error("Error fetching family types:", error);
  //     }
  //   };

  //   fetchFamilyTypes();
  // }, []);

  // useEffect(() => {
  //   const fetchFamilyStatus = async () => {
  //     try {
  //       const response = await apiClient.post(`/auth/Get_FamilyStatus/`);
  //       const data = response.data;
  //       const familyTypesArray = Object.values(data) as FamilyStatus[];
  //       setFamilyStatus(familyTypesArray);
  //     } catch (error) {
  //       console.error("Error fetching family status:", error);
  //     }
  //   };

  //   fetchFamilyStatus();
  // }, []);

  // useEffect(() => {
  //   const fetchFamilyValue = async () => {
  //     try {
  //       const response = await apiClient.post(`/auth/Get_FamilyValue/`);
  //       const data = response.data;
  //       const familyTypesArray = Object.values(data) as FamilyValue[];
  //       setFamilyValue(familyTypesArray);
  //       console.log(familyTypesArray, "familyTypesArray");
  //     } catch (error) {
  //       console.error("Error fetching family value:", error);
  //     }
  //   };

  //   fetchFamilyValue();
  // }, []);

  const buttonClass = (isSelected: boolean) =>
    isSelected
      ? "bg-secondary text-white"
      : "border-gray hover:bg-secondary hover:text-white";

  // const handleFamilyTypeChange = (value: string) => {
  //   setSelectedFamilyType(value);
  //   setValue("familyType", value, { shouldValidate: true });
  // };

  // const handleFamilyValueChange = (value: string) => {
  //   setSelectedFamilyValue(value);
  //   setValue("familyValue", value, { shouldValidate: true });
  // };

  // const handleFamilyStatusChange = (value: string) => {
  //   setSelectedFamilyStatus(value);
  //   setValue("familyStatus", value, { shouldValidate: true });
  // };

  const handleBrotherChange = (value: number) => {
    setSelectedBrother(value);
    setValue("brother", value, { shouldValidate: true });
    setSelectedMarriedBrother(null); // Reset married brother selection when brother selection changes
  };

  const handleMarriedBrotherChange = (value: number) => {
    setSelectedMarriedBrother(value);
    setValue("marriedBrother", value, { shouldValidate: true });
  };

  const handleSisterChange = (value: number) => {
    setSelectedSister(value);
    setValue("sister", value, { shouldValidate: true });
    setSelectedMarriedSister(null); // Reset married sister selection when sister selection changes
  };

  const handleMarriedSisterChange = (value: number) => {
    setSelectedMarriedSister(value);
    setValue("marriedSister", value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FamilyDetailsInputs> = async (data) => {
    try {
      // Format the data as expected by the backend
      const profileId =
        sessionStorage.getItem("profile_id_new") ||
        sessionStorage.getItem("loginuser_profile_id");
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }
      const formattedData = {
        profile_id: profileId, // Replace with actual profile ID
        father_name: data.fathername,
        father_occupation: data.fatherOccupation,
        mother_name: data.mothername,
        mother_occupation: data.motherOccupation,
        family_name: familyName.trim(),
        about_self: data.aboutmyself,
        hobbies: data.myhobbies,

        weight: weight,
        bodytype: data.bodytype,
        eyewear: data.eyewear,
        blood_group: data.bloodGroup,
        Pysically_changed: physicallyChallengedValue,
        no_of_brother: data.brother,
        no_of_bro_married: data.marriedBrother || 0,
        no_of_sister: data.sister,
        no_of_sis_married: data.marriedSister || 0,
        family_type: selectedfamilyTypeId,
        family_value: selectedfamilyValueId,
        family_status: selectedfamilyStatusId,
        about_family: data.aboutMyFamily,
        property_worth: data.propertyWorth,
        property_details: data.propertyDetails,

        // Include other fields as necessary
      };

      console.log("FamilyDetails:", formattedData);

      // console.log("Formatted Data:", formattedData);

      setIsSubmitting(true);
      const response = await apiClient.post(
        `/auth/Family_registration/`,
        formattedData
      );
      setIsSubmitting(false);

      if (response.data.Status === 1) {
        NotifySuccess("Family details saved successfully");

        setTimeout(() => {
          navigate("/EduDetails");
        }, 2000);
      } else {
        // Handle error or show message to the user
        console.error("Error: Response status is not 1", response.data);
      }
    } catch (error) {
      NotifyError("Failed to upload Family details");
      console.error("Error submitting form data:", error);
      setIsSubmitting(false);
    } finally {
      setWeight(0);
      setFamilyName("");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const owner = sessionStorage.getItem("profile_owner");
  const ProfileName = owner === "Ownself" ? "MySelf" : owner;
  console.log(owner, "owner");

  const aboutmyselfValue = watch("aboutmyself", "");

  const myhobbiesValue = watch("myhobbies", "");

  const aboutMyFamilyValue = watch("aboutMyFamily", "");

  // Type annotations for the handleKeyDown function
  // const handleKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   value: any
  // ) => {
  //   // Prevent space if input is empty
  //   if (e.key === " " && value.trim() === "") {
  //     e.preventDefault();
  //   }
  // };
  const handleKeyDownTextArea = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    value: any
  ) => {
    // Prevent space if input is empty
    if (e.key === " " && value.trim() === "") {
      e.preventDefault();
    }
  };

  return (
    <div className="pb-20">
      <ContentBlackCard
        heading="Family Details"
        desc="Please provide details about your family to help potential matches understand your values and lifestyle"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5 mb-5"
        >
          {/* Input fields for Father and Mother details */}
          <div>
            <InputField
              label="Father name"
              required
              {...register("fathername", {
                setValueAs: (value) => value.trim(),
              })}
            />
            {errors.fathername && (
              <span className="text-red-500">{errors.fathername.message}</span>
            )}
          </div>

          <div>
            <InputField
              label="Father Occupation"
              required
              {...register("fatherOccupation", {
                setValueAs: (value) => value.trim(),
              })}
            />
            {errors.fatherOccupation && (
              <span className="text-red-500">
                {errors.fatherOccupation.message}
              </span>
            )}
          </div>

          <div>
            <InputField
              label="Mother name"
              required
              {...register("mothername", {
                setValueAs: (value) => value.trim(),
              })}
            />
            {errors.mothername && (
              <span className="text-red-500">{errors.mothername.message}</span>
            )}
          </div>

          <div>
            <InputField
              label=" Mother Occupation"
              required
              {...register("motherOccupation", {
                setValueAs: (value) => value.trim(),
              })}
            />
            {errors.motherOccupation && (
              <span className="text-red-500">
                {errors.motherOccupation.message}
              </span>
            )}
          </div>

          <div>
            <InputField
              label="Family name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="aboutmyself">
              About {ProfileName} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="aboutmyself"
              className="outline-none px-3 py-2 w-full text-primary border border-footer-text-gray rounded"
              {...register("aboutmyself", {
                setValueAs: (value) => value.trim(),
              })}
              onKeyDown={(e) => handleKeyDownTextArea(e, aboutmyselfValue)}
            />
            {errors.aboutmyself && (
              <span className="text-red-500">{errors.aboutmyself.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="myhobbies">
              {owner === "Ownself" ? "My Hobbies" : `${owner} Hobbies`}{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="myhobbies"
              className="outline-none px-3 py-2 w-full text-primary border border-footer-text-gray rounded"
              {...register("myhobbies")}
              onKeyDown={(e) => handleKeyDownTextArea(e, myhobbiesValue)}
            />
            {errors.myhobbies && (
              <span className="text-red-500">{errors.myhobbies.message}</span>
            )}
          </div>

         

          <div>
            <InputField
              label="Weight (kg)"
              type="number"
              value={String(weight)}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
            {errors.weight && (
              // <span className="text-red-500">{errors.weight.message}</span>
              <span className="text-red-500">Required</span>
            )}
          </div>

          <div>
            <label htmlFor="bodytype">Body Type </label>
            <select
              id="bodytype"
              className="outline-none px-3 py-2 w-full text-primary border border-footer-text-gray rounded"
              {...register("bodytype", {
                required: true,
                setValueAs: (value) => value.trim(),
              })}
            >
              <option value="">Select Body Type</option>
              <option value="Slim">Slim</option>
              <option value="Fat">Fat</option>
              <option value="Normal">Normal</option>
            </select>
            {errors.bodytype && (
              <span className="text-red-500">{errors.bodytype.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="">Eye Wear </label>
            <select
              id=""
              className="outline-none px-3 py-2 w-full text-primary border border-footer-text-gray rounded"
              {...register("eyewear", {
                required: true,
                setValueAs: (value) => value.trim(),
              })}
            >
              <option value="">Select Eye Wear</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.eyewear && (
              <span className="text-red-500">{errors.eyewear.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="bloodGroup" className="block mb-1">
              Blood Group <span className="text-main">*</span>
            </label>
            <select
              id="bloodGroup"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("bloodGroup", {
                setValueAs: (value) => value.trim(), // Ensure the value is trimmed
                required: "Blood group is required", // Validation rule
              })}
            >
              <option value="" disabled selected>
                -- Select your Blood Group --
              </option>
              {bloodGroups.map((group, index) => (
                <option key={index} value={group.abbreviation}>
                  {group.abbreviation}
                </option>
              ))}
            </select>
            {errors.bloodGroup && (
              <span className="text-red-500">{errors.bloodGroup.message}</span>
            )}
          </div>

          

          <div>
            <label>Physically Challenged</label>
            <div style={{ marginTop: "8px" }}>
              <label style={{ marginRight: "16px" }}>
                <input
                  type="radio"
                  value="yes"
                  {...register("physicallyChallenged", { required: true })}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  {...register("physicallyChallenged", { required: true })}
                />
                No
              </label>
            </div>
            {errors.physicallyChallenged && <span>This field is required</span>}
          </div>

          {physicallyChallengedValue === "yes" && (
            <div>
              <InputField label="challenged detail" />
            </div>
          )}

          {/* Brother and Sister selection */}
          <div className="mt-3 flex items-center space-x-48">
            <div>
              <h1 className="mb-3">
                Brother <span className="text-red-500">*</span>
              </h1>
              <div className="flex flex-col">
                <div ref={buttonContainerRef} className="inline-flex rounded">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`px-5 py-3 text-sm font-medium border ${buttonClass(
                        selectedBrother === num
                      )}`}
                      onClick={() => handleBrotherChange(num)}
                    >
                      {num === 5 ? "5+" : num}
                    </button>
                  ))}
                </div>
                {errors.brother && (
                  <span className="text-red-500">{errors.brother.message}</span>
                )}
              </div>
            </div>

            {selectedBrother !== null && selectedBrother > 0 && (
              <div>
                <h1 className="mb-3">
                  Married <span className="text-red-500">*</span>
                </h1>
                <div className="flex flex-col">
                  <div
                    ref={marriedBrotherContainerRef}
                    className="inline-flex rounded"
                  >
                    {[...Array(Math.min(selectedBrother + 1, 6)).keys()].map(
                      (num) => (
                        <button
                          key={num}
                          type="button"
                          className={`px-10 py-3 text-sm font-medium border ${buttonClass(
                            selectedMarriedBrother === num
                          )}`}
                          onClick={() => handleMarriedBrotherChange(num)}
                        >
                          {num === 5 ? "5+" : num}
                        </button>
                      )
                    )}
                  </div>
                  {errors.marriedBrother && (
                    <span className="text-red-500">
                      {errors.marriedBrother.message}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center space-x-48">
            <div>
              <h1 className="mb-3">
                Sister <span className="text-red-500">*</span>
              </h1>
              <div className="flex flex-col">
                <div ref={sisterContainerRef} className="inline-flex rounded">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`px-5 py-3 text-sm font-medium border ${buttonClass(
                        selectedSister === num
                      )}`}
                      onClick={() => handleSisterChange(num)}
                    >
                      {num === 5 ? "5+" : num}
                    </button>
                  ))}
                </div>
                {errors.sister && (
                  <span className="text-red-500">{errors.sister.message}</span>
                )}
              </div>
            </div>

            {selectedSister !== null && selectedSister > 0 && (
              <div>
                <h1 className="mb-3">
                  Married <span className="text-red-500">*</span>
                </h1>
                <div className="flex flex-col">
                  <div className="inline-flex rounded">
                    {[...Array(Math.min(selectedSister + 1, 6)).keys()].map(
                      (num) => (
                        <button
                          key={num}
                          type="button"
                          className={`px-10 py-3 text-sm font-medium border ${buttonClass(
                            selectedMarriedSister === num
                          )}`}
                          onClick={() => handleMarriedSisterChange(num)}
                        >
                          {num === 5 ? "5+" : num}
                        </button>
                      )
                    )}
                  </div>
                  {errors.marriedSister && (
                    <span className="text-red-500">
                      {errors.marriedSister.message}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Family Type Section */}
          <div className="mt-3">
            <h1 className="mb-3">
              Family Type <span className="text-red-500">*</span>
            </h1>
            <div className="flex flex-col">
              {/* <div ref={familyTypeRef} className="w-full inline-flex rounded">
               
                {familyTypes.map((type) => (
                  <button
                    key={type.family_id}
                    type="button"
                    title={type.family_description}
                    className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
                      selectedFamilyType === type.family_description
                    )}`}
                    onClick={() =>
                      handleFamilyTypeChange(type.family_description)
                    }
                  >
                    {type.family_description}
                  </button>
                ))}
                  
                
              </div> */}

<div ref={familyTypeRef} className="w-full inline-flex rounded">
  {familyType.map((option) => (
    <button
      key={option.family_id}
      type="button"
      className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
        selectedFamilyType === option.family_description
      )}`}
      onClick={() => handleFamilyTypeChange(option.family_id,option.family_description)}
      {...register("familyType")}
    >
      {option.family_description}
    </button>
  ))}
</div>
              {errors.familyType && (
                <span className="text-red-500">
                  {errors.familyType.message}
                </span>
              )}
            </div>
          </div>

          {/* Family Value Section */}
          <div className="mt-3">
            <h1 className="mb-3">
              Family Value <span className="text-red-500">*</span>
            </h1>
            <div className="flex flex-col">
              {/* <div ref={familyValueRef} className="w-full inline-flex rounded">
                {familyValue.map((type) => (
                  <button
                    key={type.family_value_id}
                    type="button"
                    title={type.family_value_name}
                    className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
                      selectedFamilyValue === type.family_value_name
                    )}`}
                    onClick={() =>
                      handleFamilyValueChange(type.family_value_name)
                    }
                  >
                    {type.family_value_name}
                  </button>
                ))}
              </div> */}


<div ref={familyValueRef} className="w-full inline-flex rounded">
  {familyValue.map((option) => (
    <button
      key={option.family_value_id}
      type="button"
      className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
        selectedfamilyValueType === option.family_value_name
      )}`}
      onClick={() => handleFamilyValueChange(option.family_value_id,option.family_value_name)}
      {...register("familyType")}
    >
      {option.family_value_name}
    </button>
  ))}
</div>

              {errors.familyValue && (
                <span className="text-red-500">
                  {errors.familyValue.message}
                </span>
              )}
            </div>
          </div>

          {/* Family Status Section */}
          <div className="mt-3">
            <h1 className="mb-3">
              Family Status <span className="text-red-500">*</span>
            </h1>
            <div className="flex flex-col">
              {/* <div ref={familyStatusRef} className="w-full inline-flex rounded">
                {familyStatus.map((type) => (
                  <button
                    key={type.family_status_id}
                    type="button"
                    title={type.family_status_description}
                    className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
                      selectedFamilyStatus === type.family_status_name
                    )}`}
                    onClick={() =>
                      handleFamilyStatusChange(type.family_status_name)
                    }
                  >
                    {type.family_status_name}
                  </button>
                ))}
              </div> */}

<div ref={familyStatusRef} className="w-full inline-flex rounded">
  {familyStatus.map((option) => (
    <button
      key={option.family_status_id}
      type="button"
      className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(
        selectedfamilyStatusType === option.family_status_name
      )}`}
      onClick={() => handleFamilyStatusChange(option.family_status_id,option.family_status_name)}
      {...register("familyType")}
    >
      {option.family_status_name}
    </button>
  ))}
</div>

              {errors.familyStatus && (
                <span className="text-red-500">
                  {errors.familyStatus.message}
                </span>
              )}
            </div>
          </div>

          {/* Additional Input Fields */}
          <div>
            <InputField
              label="Property Details"
              {...register("propertyDetails", {
                setValueAs: (value) => value.trim(),
              })}
              title="Enter details about the property here."
            />
          </div>

          <div>
            <label htmlFor="propertyWorth" className="block mb-1">
              Property Worth
            </label>
            <select
              id="propertyWorth"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              defaultValue=""
              {...register("propertyWorth", {
                setValueAs: (value) => value.trim(),
              })}
            >
              <option value="" disabled>
                -- Select Property Worth --
              </option>
              {propertyworth.map((property) => (
                <option key={property.property_id} value={property.property_id}>
                  {property.property_description}
                </option>
              ))}
            </select>
            {/* {errors.motherOccupation && <span className="text-red-500">{errors.motherOccupation.message}</span>} */}
          </div>

          <div>
            <InputField
              label="Suya Gothram"
              {...register("suyaGothram", {
                setValueAs: (value) => value.trim(),
              })}
            />
          </div>

          <div>
            <InputField
              label="Uncle Gothram"
              {...register("uncleGothram", {
                setValueAs: (value) => value.trim(),
              })}
            />
          </div>

          <div>
            <InputField
              label="Ancestor Origin"
              {...register("ancestorOrigin", {
                setValueAs: (value) => value.trim(),
              })}
              title="Enter details about the ancestorOrgin here."
            />
          </div>

          <div>
            <label htmlFor="aboutMyFamily" className="block mb-1">
              About my Family
            </label>
            <textarea
              id="aboutMyFamily"
              rows={5}
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("aboutMyFamily", {
                setValueAs: (value) => value.trim(),
              })}
              onKeyDown={(e) => handleKeyDownTextArea(e, aboutMyFamilyValue)}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="mt-7 flex justify-between">
            <div className="">
              <Link to="/ContactDetails">
                <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                  Back
                </button>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link to="/EduDetails">
                <button className="py-[10px] px-14 bg-white text-main font-semibold rounded-[6px] mt-2">
                  Skip
                </button>
              </Link>

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
        </form>
        <SideContent />
      </div>
      <ToastNotification />
    </div>
  );
};

export default FamilyDetails;
