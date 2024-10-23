import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import InputField from "../../Components/RegistrationForm/InputField";
import { HiOutlineSearch } from "react-icons/hi";
import { ProfileContext } from "../../ProfileContext";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileIdSchema = z.object({
  profile_id: z
    .string()
    .min(1, "Profile ID is required")
    .regex(/^VY\d{6}$/, "Profile ID must start with 'VY' followed by 6 digits"),
});

// Define the type for the form inputs based on the schema
type ProfileIdForm = z.infer<typeof profileIdSchema>;

interface MaritalStatus {
  marital_sts_id: number;
  marital_sts_name: string;
}

interface Profession {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface Education {
  education_id: number;
  education_description: string;
}

interface BirthStar {
  birth_id: number;
  birth_star: string;
}

interface Income {
  income_id: number;
  income_description: string;
}

interface AdvancedSearchProps {
  onFindMatch: () => void;
  handle_Get_advance_search: () => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  handle_Get_advance_search,
  onFindMatch,
}) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileIdForm>({
    resolver: zodResolver(profileIdSchema),
  });

  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [educationOptions, setEducationOptions] = useState<Education[]>([]);
  const [birthStars, setBirthStars] = useState<BirthStar[]>([]);
  const [incomeOptions, setIncomeOptions] = useState<Income[]>([]);
  const loginuser_profile_id = sessionStorage.getItem("loginuser_profile_id");
  // const [searchProfile, setSearchProfile] = useState<string>("");
  // const [maritialStatus, SetMaritualStatus] = useState<number[]>([]);
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    setFromAge,
    setToAge,
    setFromHeight,
    setToHeight,
    setWorkLocation,
    setAdvanceSelectedProfessions,
    Set_Maritial_Status,
    setAdvanceSelectedEducation,
    setSelectedIncomes,
    setChevvai_dhosam,
    setRehuDhosam,
    setAdvanceSelectedBirthStar,
    setNativeState,
    setPeopleOnlyWithPhoto,
    pageNumber,

    fromHeight, toHeight,
    selectedIncomes,
    setAdvanceSearchData,
    chevvai_dhosam,

    rehuDhosam,

    // workLocation,

    peopleOnlyWithPhoto,
  } = context;

  useEffect(() => {
    handle_Get_advance_search();
  }, [pageNumber]); // Add pageNumber as a dependency

  const handleEducationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAdvanceSelectedEducation(event.target.value);
  };

  const handleSearch = () => {

    handle_Get_advance_search();
    onFindMatch();

  };

  const handlePeopleWithPhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.checked ? 1 : 0;
    setPeopleOnlyWithPhoto(value);
    console.log("Checked value:", value);
  };

  const handleMaritalStatusChange = (statusId: number, isChecked: boolean) => {
    if (isChecked) {
      Set_Maritial_Status((prev) => [...prev, statusId]);
    } else {
      Set_Maritial_Status((prev) => prev.filter((id) => id !== statusId));
    }
  };
  const handleCheckboxChange = (id: number) => {
    setAdvanceSelectedProfessions((prevSelected) => {
      if (prevSelected.includes(id)) {
        // If the ID is already selected, remove it from the array
        return prevSelected.filter((professionId) => professionId !== id);
      } else {
        // If the ID is not selected, add it to the array
        return [...prevSelected, id];
      }
    });
  };

  const handleBirthStarChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAdvanceSelectedBirthStar(event.target.value);
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the selected value to the array
      setNativeState((prevState) => [...prevState, value]);
    } else {
      // Remove the unselected value from the array
      setNativeState((prevState) => prevState.filter((item) => item !== value));
    }
  };
  const handleCheckDhosam = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    if (id === "chevvai") {
      setChevvai_dhosam(checked ? "yes" : "no");
    } else if (id === "rehu") {
      setRehuDhosam(checked ? "yes" : "no");
    }
  };
  const handleIncomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncomes(event.target.value);
  };

  console.log(selectedIncomes, " selectedIncomes");
  const Search_By_profileId = async (searchProfile: string) => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Search_byprofile_id/",
        {
          profile_id: loginuser_profile_id,
          search_profile_id: searchProfile,
        }
      );

      if (response.status === 200) {
        sessionStorage.setItem("searchProfile", searchProfile);
        console.log(response.data.data, "search profile");
        // setSearchProfileData(response.data.data);
        setAdvanceSearchData(response.data.data);
        setTimeout(() => {
          onFindMatch();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setError("profile_id", {
        type: "manual",
        message: "Profile not found. Please check the profile ID.",
      });
    }
  };
  useEffect(() => {
    const fetchMaritalStatuses = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Marital_Status/"
        );
        const status = Object.values(response.data) as MaritalStatus[];
        setMaritalStatuses(status);
      } catch (error) {
        console.error("Error fetching marital statuses", error);
      }
    };

    const fetchProfessions = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Profes_Pref/"
        );
        const professionList = Object.values(response.data) as Profession[];
        setProfessions(professionList);
      } catch (error) {
        console.error("Error fetching professions", error);
      }
    };

    const fetchEducationOptions = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Highest_Education/"
        );
        const educationList = Object.values(response.data) as Education[];
        setEducationOptions(educationList);
      } catch (error) {
        console.error("Error fetching education options", error);
      }
    };
    const fetchBirthStars = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Birth_Star/",
          {
            state_id: "", // or `null` depending on what the API expects
          }
        );
        const starList = Object.values(response.data) as BirthStar[];
        setBirthStars(starList);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching birth stars:",
            error.response?.data || error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    const fetchIncomeOptions = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Annual_Income/"
        );
        const incomeList = Object.values(response.data) as Income[];
        setIncomeOptions(incomeList);
      } catch (error) {
        console.error("Error fetching income options", error);
      }
    };

    fetchIncomeOptions();
    fetchBirthStars();
    fetchEducationOptions();
    fetchMaritalStatuses();
    fetchProfessions();
  }, []);

  const onSubmit = (data: ProfileIdForm) => {
  
      // Proceed with the search if no errors
      Search_By_profileId(data.profile_id);
    
  };



  const storedGender = sessionStorage.getItem("gender");
  const storedHeight = sessionStorage.getItem("userheightfromapi") || 0;

  console.log(storedHeight, "adv height");
  console.log(storedGender, "adv gender");
  useEffect(() => {
    // If the stored gender is 'male', set the height as the value to the input
    if (storedGender === 'male') {

      setToHeight(Number(storedHeight));
    }
    if (storedGender === 'female') {
      setFromHeight(Number(storedHeight));
    }
  }, []);

  



  return (
    <div>
      <div className="container mx-auto py-10 max-md:px-3">
        <div className="w-8/12 mx-auto rounded-lg p-10 bg-white shadow-lg max-lg:w-4/5 max-md:w-full  max-sm:p-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex justify-center items-center rounded-lg p-1 border-2 border-footer-text-gray max-sm:flex-col"
          >
            <input
              // onChange={(e) => setSearchProfile(e.target.value)}
              {...register("profile_id")}
              type="text"
              placeholder="Search by Profile ID"
              className="w-full px-10 focus-visible:outline-none max-sm:p-4 max-sm:pl-10"
            />
            <HiOutlineSearch className="absolute left-3 top-4 text-[22px] text-ashSecondary max-sm:top-6" />
            <button
              type="submit"
              className="w-fit bg-gradient text-white rounded-r-[6px] font-semibold px-8 py-3 max-sm:w-full max-sm:rounded-md"
            >
              Search
            </button>
          </form>
          {errors.profile_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profile_id.message}
            </p>
          )}

          {/* advance search */}
          <hr className="text-footer-text-gray mt-10 mb-5 max-md:my-5" />

          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5 max-md:text-[20px]">
            Advanced Search
          </h4>

          <form action="" method="post" className="space-y-5">
            {/* {/ Age & Height /} */}
            <div className="flex justify-between items-center gap-4 max-2xl:gap-4 max-sm:flex-col max-sm:items-start">
              {/* {/ Age /} */}
              <div className="w-full">
                <label htmlFor="age" className="text-secondary font-semibold">
                  Age
                </label>
                <div className="w-full flex justify-between items-center space-x-5 mt-2 max-sm:flex-col max-sm:gap-4 max-sm:space-x-0">
                  <div className="w-full">
                    <input

                      type="text"
                      onChange={(e) => {
                        const value = e.target.value;
                          // Only allow digits
                          setFromAge(Number(value));
                        
                      }}
                      
                      id="age"
                      name="age"
                      placeholder="From"
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"

                      onChange={(e) => {

                        const value = e.target.value;
                          // Only allow digits
                          setToAge(Number(value));
                        
                      }}
                     
                      placeholder="To"
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                    />
                  </div>
                </div>
              </div>

              {/* {/ Height /} */}
              <div className="w-full">
                <label htmlFor="height" className="text-secondary font-semibold">Height</label>
                <div className="w-full flex justify-between items-center space-x-5 mt-2  max-sm:flex-col max-sm:gap-4 max-sm:space-x-0">
                  <div className="w-full">
                    <input
                      type="text"
                      id="fromHeight"
                      value={fromHeight}
                      onChange={(e) => {
                        const value = e.target.value; // Allow only digits
                        setFromHeight(Number(value)); // Update context state, default to 0 if empty
                      }}
                      placeholder="From"
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                    />

                  </div>

                  <div className="w-full">
                    <input
                      type="text"
                      id="toHeight"
                      value={toHeight}
                      onChange={(e) => {
                        const value = e.target.value; // Allow only digits
                        setToHeight(Number(value)); // Update context state, default to 0 if empty
                      }}
                      placeholder="To"
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                    />

                  </div>

                </div>
              </div>
            </div>

            {/* {/ Marital Status /} */}
            <div>
              <h5 className="text-[18px] text-secondary font-semibold mb-2">
                Marital Status
              </h5>
              <div className="flex flex-wrap gap-4">
                {maritalStatuses.map((status) => (
                  <div key={status.marital_sts_id}>
                    <input
                      onChange={(e) =>
                        handleMaritalStatusChange(
                          status.marital_sts_id,
                          e.target.checked
                        )
                      }
                      type="checkbox"
                      id={`maritalStatus-${status.marital_sts_id}`}
                      value={status.marital_sts_name}
                    />
                    <label
                      htmlFor={`maritalStatus-${status.marital_sts_id}`}
                      className="pl-1"
                    >
                      {status.marital_sts_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* {/ Profession /} */}
            <div>
              <h5 className="text-[18px] text-secondary font-semibold mb-2">
                Profession
              </h5>
              <div className="flex flex-wrap gap-4">
                {professions.map((profession) => (
                  <div key={profession.Profes_Pref_id}>
                    <input
                      type="checkbox"
                      id={`profession-${profession.Profes_Pref_id}`}
                      value={profession.Profes_name}
                      onChange={() =>
                        handleCheckboxChange(profession.Profes_Pref_id)
                      }
                    />
                    <label
                      htmlFor={`profession-${profession.Profes_Pref_id}`}
                      className="pl-1"
                    >
                      {profession.Profes_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* {/ Education /} */}
            <div>
              <label htmlFor="education" className="block mb-1">
                Education
              </label>
              <select
                id="education"
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                onChange={handleEducationChange}
              >
                <option value="" disabled selected>
                  -- Select your Education --
                </option>
                {educationOptions.map((option) => (
                  <option key={option.education_id} value={option.education_id}>
                    {option.education_description}
                  </option>
                ))}
              </select>
            </div>

            {/* {/ Annual Income /} */}
            <div>
              <label htmlFor="income" className="block mb-1">
                Income
              </label>
              <select
                id="income"
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                onChange={handleIncomeChange}
              >
                <option value="" selected disabled>
                  -- Select your Income Range --
                </option>
                {incomeOptions.map((option) => (
                  <option key={option.income_id} value={option.income_id}>
                    {option.income_description}
                  </option>
                ))}
              </select>
            </div>

            {/* {/ Dhosam /} */}
            <div>
              <h5 className="text-[18px] text-secondary font-semibold mb-2">
                Dhosam
              </h5>
              <div className="w-full flex justify-start gap-4 items-center max-sm:flex-wrap">
                <div>
                  <input
                    type="checkbox"
                    id="chevvai"
                    value="chevvai"
                    checked={chevvai_dhosam === "yes"}
                    onChange={handleCheckDhosam}
                  />
                  <label htmlFor="chevvai" className="pl-1">
                    Chevvai
                  </label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="rehu"
                    value="rehu"
                    checked={rehuDhosam === "yes"}
                    onChange={handleCheckDhosam}
                  />
                  <label htmlFor="rehu" className="pl-1">
                    Rehu / Ketu
                  </label>
                </div>
              </div>
            </div>

            {/* {/ Birth Star /} */}
            <div>
              <label htmlFor="birthStar" className="block mb-1">
                Birth Star
              </label>
              <select
                onChange={handleBirthStarChange}
                id="birthStar"
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              >
                <option value="" selected disabled>
                  -- Select your Birth Star --
                </option>
                {birthStars.map((star) => (
                  <option key={star.birth_id} value={star.birth_id}>
                    {star.birth_star}
                  </option>
                ))}
              </select>
            </div>

            {/* {/ Native State /} */}
            <div>
              <h5 className="text-[18px] text-primary font-semibold mb-2">
                Native State
              </h5>
              <div className="flex flex-wrap gap-4">
                <div>
                  <input
                    onChange={handleStateChange}
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
                    onChange={handleStateChange}
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
                    onChange={handleStateChange}
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
                    onChange={handleStateChange}
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
                    onChange={handleStateChange}
                    type="checkbox"
                    id="kerala"
                    name="kerala"
                    value="kerala"
                  />
                  <label htmlFor="kerala" className="pl-1">
                    Kerala
                  </label>
                </div>

                <div>
                  <input
                    onChange={handleStateChange}
                    type="checkbox"
                    id="others"
                    name="others"
                    value="others"
                  />
                  <label htmlFor="others" className="pl-1">
                    Others
                  </label>
                </div>
              </div>
            </div>

            {/* {/ Work Location /} */}
            <InputField
              onChange={(e) => setWorkLocation(e.target.value)}
              label={"Work Location"}
              name={"workLocation"}
            />

            {/* {/ Profile Photo /} */}
            <div>
              <h5 className="text-[18px] text-primary font-semibold mb-2">
                Profile Photo
              </h5>
              <input
                onChange={handlePeopleWithPhotoChange}
                type="checkbox"
                id="profilePhoto"
                value={peopleOnlyWithPhoto}
              // {...register("profilePhoto")}
              />
              <label htmlFor="profilePhoto" className="pl-1">
                People only with photo
              </label>
            </div>

            {/* {/ Buttons /} */}
            <div className="flex justify-end space-x-4 max-sm:flex-col max-sm:items-center">
              <button type="button" className="py-[10px] px-14 bg-white text-main font-semibold  rounded-[6px] mt-2 ">
                Cancel
              </button>
              <button
                onClick={() => handleSearch()}
                // disabled={disableFindMatch}
                type="submit"
                className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2"
              >
                Find Match
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
