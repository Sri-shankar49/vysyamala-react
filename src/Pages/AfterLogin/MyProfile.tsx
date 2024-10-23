import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  MdVerifiedUser,
  MdLocalPrintshop,
  MdArrowDropDown,
} from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ProfileSlick } from "../../Components/DashBoard/ProfileDetails/ProfileSlick";
import { ProfileDetailsSettings } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsSettings";
import Spinner from "../../Components/Spinner";
import { ProfileContext } from "../../ProfileContext";
// import { useNavigate } from "react-router-dom";

interface GetProfileDetMatch {
profile_id: string;
//   profile_name: string;
//   age: string;
//   weight: string;
//   height: string;
//   star: string;
//   profession: string;
//   education: string;
//   about: string;
//   gothram: string;
//   horoscope_available: string;
//   matching_score: string;
//   verified: number;


personal_profile_name: string;
personal_age: number;
personal_profile_height: string;
personal_profile_marital_status_name: string;
personal_about_self: string;
personal_weight: string;
personal_verify: number;
package_name: string;
valid_upto: string;
profile_completion: string;
star:string;
gothram:string;
prosession:string;
heightest_education:string;
 }

export const MyProfile = () => {



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
    setAdvanceSearchData
  } = context;

  useEffect(() => {
    setFromAge(0);
    setToAge(0);
    setFromHeight(0);
    setToHeight(0);
    setWorkLocation("");
    setAdvanceSelectedProfessions([]);
    Set_Maritial_Status([]);
    setAdvanceSelectedEducation("");
    setSelectedIncomes("");
    setChevvai_dhosam("no");
    setRehuDhosam("no");
    setAdvanceSelectedBirthStar("");
    setNativeState([]);
    setPeopleOnlyWithPhoto(0);
    setAdvanceSearchData([]);
  }, []);





  sessionStorage.removeItem('selectedProfileId');





  // const [Get_profile_det_match, setGet_profile_det_match] =
  //   useState<GetProfileDetMatch | null>(null);

  const [get_myprofile_personal, setGetMyProfilePersonal] =
  useState<GetProfileDetMatch | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const [percentage, setPercentage] = useState<number>(0); // Initialize with 0 or any default value


  // const scrollToProfileDetailsSettings = () => {
  //   const element = document.getElementById('ProfileDetailsSettings');
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };
  // const navigate = useNavigate(); // Initialize navigate



  // useEffect(() => {
  //   const fetchGet_profile_det_match = async () => {
  //     setLoading(true); // Start loading when fetch begins
  //     try {
  //       const response = await axios.post(
  //         "http://103.214.132.20:8000/auth/get_myprofile_personal/",
  //         {
  //           profile_id: loginuser_profileId,
  //           user_profile_id: loginuser_profileId,
  //         }
  //       );

  //       console.log("API Response:", response.data);

  //       // Ensure the response contains `basic_details` before setting it
  //       if (response.data && response.data.basic_details) {
  //         setGet_profile_det_match(response.data.basic_details);
  //       } else {
  //         console.error("Unexpected response structure:", response.data);
  //         setError("Unexpected response structure");
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error("Axios error:", error.response?.data || error.message);
  //         setError(`Axios error: ${error.response?.data || error.message}`);
  //       } else {
  //         console.error("Unexpected error:", error);
  //         setError("Unexpected error occurred");
  //       }
  //     } finally {
  //       setLoading(false); // Stop loading when fetch is complete
  //     }
  //   };

  //   fetchGet_profile_det_match();
  // }, [loginuser_profileId]); // Add `loginuser_profileId` to the dependency array if it's dynamic


  useEffect(() => {
    const fetchGetMyProfilePersonal = async () => {
      setLoading(true); // Start loading when fetch begins
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/get_myprofile_personal/",
          {
            profile_id: loginuser_profileId,
            user_profile_id: loginuser_profileId,
          }
        );

        console.log("API Response:", response.data);

        // Ensure the response contains `data` before setting it
        if (response.data && response.data.data) {
          setGetMyProfilePersonal(response.data.data);

          // Assuming profile_completion is in percentage form like "85%" or "85"
        const completionValue = parseInt(response.data.data.profile_completion) || 0;
        setPercentage(completionValue); // Set the dynamic percentage
        } else {
          console.error("Unexpected response structure:", response.data);
          setError("Unexpected response structure");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
          setError(`Axios error: ${error.response?.data || error.message}`);
        } else {
          console.error("Unexpected error:", error);
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false); // Stop loading when fetch is complete
      }
    };

    fetchGetMyProfilePersonal();
  }, [loginuser_profileId]); // Add `loginuser_profileId` to the dependency array if it's dynamic
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };
  const handleDownloadPdf = () => {
    const link = document.createElement("a");
    // link.href = `https://apiupg.rainyseasun.com/auth/generate-pdf/${loginuser_profileId}/${Get_profile_det_match?.profile_id}`;
    // link.download = `pdf_${Get_profile_det_match?.profile_id}.pdf`; // Customize the file name

    link.href = `https://apiupg.rainyseasun.com/auth/generate-pdf/${loginuser_profileId}/${get_myprofile_personal?.profile_id}`;
    link.download = `pdf_${get_myprofile_personal?.profile_id}.pdf`; // Customize the file name

    link.click();
  };
  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    handleDownloadPdf();
  };

  // const getMatchingScorePercentage = () => {
  //   if (Get_profile_det_match?.matching_score) {
  //     return parseInt(Get_profile_det_match.matching_score.replace('%', '')) || 0;
  //   }
  //   return 0;
  // };

  // const percentage = getMatchingScorePercentage();
  // const percentage = 85;
  console.log(get_myprofile_personal, "Get_profile_det_match");
  return (
    <div className="">
      <div className="bg-grayBg px-5 py-20 max-lg:py-14 max-md:py-10 max-sm:py-10">
        <div className="container mx-auto">
          <div className="mb-5">
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
              My Profile
            </h4>
          </div>

          <div className="grid grid-rows-1 grid-cols-3 justify-start items-start space-x-10 max-lg:grid-cols-1 max-lg:space-x-0">
            <div>
              <ProfileSlick />
            </div>

            <div className="col-span-2">
              {loading ? (
                <Spinner />
              ) : error ? (
                <p>{error}</p>
              ) : get_myprofile_personal ? (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2 max-lg:text-[28px] max-md:text-[24px]">
                        {get_myprofile_personal.personal_profile_name}
                        {get_myprofile_personal.personal_verify === 1 && (
                          <MdVerifiedUser className="text-checkGreen ml-2" />
                        )}
                      </h4>
                    </div>

                    <div
                      className="flex justify-center items-center space-x-10 max-sm:flex-wrap"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <div className="relative">
                        <p className="flex items-center text-ash cursor-pointer">
                          <MdLocalPrintshop className="text-[22px] mr-2" />
                          Print Horoscope
                          <MdArrowDropDown className="text-[22px] ml-2" />
                        </p>

                        {(isHovered || isOpen) && (
                          <div
                            className="absolute top-4 right-0 mt-2 w-40 bg-white rounded-md shadow-lg"
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                          >
                            <ul>
                              <li
                                className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                onClick={() => handleSelectLanguage("Tamil")}
                              >
                                Tamil
                              </li>
                              <li
                                className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                onClick={() => handleSelectLanguage("English")}
                              >
                                English
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      {selectedLanguage && (
                        <p className="ml-4 text-ash">
                          Selected: {selectedLanguage}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-[20px] text-primary font-bold mb-2">
                    {get_myprofile_personal.profile_id}
                  </p>

                  <div className="flex items-center space-x-5 mb-2 max-sm:flex-wrap max-sm:space-x-0 max-sm:gap-y-3">
                    <p className="w-fit bg-gradientGold text-primary font-semibold rounded-md px-3 py-0.5 ">
                    {get_myprofile_personal.package_name}
                    </p>
                    <p className="text-primary">Valid Upto :  {get_myprofile_personal.valid_upto}</p>
                  </div>

                  <div className="my-3">
                    <button className="flex items-center text-lg text-main font-semibold">
                      Add-On-Packages
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>

                  <div className="w-1/2 mb-16 max-sm:w-full">
                    <div>
                      <div className="flex justify-between items-center mb-3  max-lg:flex-wrap max-sm:gap-3">
                        <h5 className="text-[18px] text-ash font-semibold">
                          Age :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.personal_age}
                          </span>
                        </h5>

                        <h5 className="text-[18px] text-ash font-semibold">
                          Height :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.personal_profile_height} cms
                          </span>
                        </h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">
                          Weight :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.personal_weight} kg
                          </span>
                        </h5>
                      </div>

                      <div className="flex justify-between items-center mb-3 max-lg:flex-wrap max-sm:gap-3">
                        <h5 className="text-[18px] text-ash font-semibold">
                          Star :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.star}
                          </span>
                        </h5>

                        <h5 className="text-[18px] text-ash font-semibold">
                          Gothram :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.gothram}
                          </span>
                        </h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">
                          Profession :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.prosession}
                          </span>
                        </h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">
                          Education :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.heightest_education}
                          </span>
                        </h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">
                          About :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.personal_about_self}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="bg-vysyamalaLightSandal px-5 py-7 border-2 border-vysyamalaYellow border-dashed rounded-xl ">
                    <div className="flex justify-between items-start max-lg:flex-wrap">
                      <div>
                        <h5 className="text-lg text-primary font-semibold">
                          Your profile is now {percentage}% complete
                        </h5>
                        <p className="text-sm text-primary">
                          Complete your profile to receive profile suggestions
                          based on your preferences.
                        </p>

                        {/* <button className="flex items-center text-lg text-main font-semibold my-3">
                          Complete Your Profile{" "}
                          <FaArrowRight className="ml-2" />
                        </button> */}
                        <button
                          className="flex items-center text-lg text-main font-semibold my-3"
                          // onClick={() => navigate("/PersonalDetails")} // Navigate to PersonalDetails page
                        >
                          Complete Your Profile
                          <FaArrowRight className="ml-2" />
                        </button>
                      </div>
                      <div className="w-24 h-24 text-primary font-semibold">
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          styles={buildStyles({
                            pathColor: `rgba(47, 189, 18, ${percentage / 100})`,
                            textColor: "#535665",
                            trailColor: "#d6d6d6",
                            backgroundColor: "#3e98c7",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p>No profile details available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="ProfileDetailsSettings">
        <ProfileDetailsSettings />
      </div>
    </div>
  );
};
