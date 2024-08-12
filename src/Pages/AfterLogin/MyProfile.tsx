import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdVerifiedUser, MdLocalPrintshop, MdArrowDropDown } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ProfileSlick } from "../../Components/DashBoard/ProfileDetails/ProfileSlick";
import { ProfileDetailsSettings } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsSettings";

interface GetProfileDetMatch {
  profile_id: string;
  profile_name: string;
  age: string;
  weight: string;
  height: string;
  star: string;
  profession: string;
  education: string;
  about: string;
  gothram: string;
  horoscope_available: string;
  matching_score: string;
}

export const MyProfile = () => {
  const [Get_profile_det_match, setGet_profile_det_match] = useState<GetProfileDetMatch | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');


  useEffect(() => {
    const fetchGet_profile_det_match = async () => {
      setLoading(true); // Start loading when fetch begins
      try {
        const response = await axios.post("http://103.214.132.20:8000/auth/Get_profile_det_match/", {
          profile_id: loginuser_profileId,
          user_profile_id: loginuser_profileId
        });

        console.log("API Response:", response.data);

        // Ensure the response contains `basic_details` before setting it
        if (response.data && response.data.basic_details) {
          setGet_profile_det_match(response.data.basic_details);
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

    fetchGet_profile_det_match();
  }, [loginuser_profileId]); // Add `loginuser_profileId` to the dependency array if it's dynamic




  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const getMatchingScorePercentage = () => {
    if (Get_profile_det_match?.matching_score) {
      return parseInt(Get_profile_det_match.matching_score.replace('%', '')) || 0;
    }
    return 0;
  };

  const percentage = getMatchingScorePercentage();

  return (
    <div>
      <div className="bg-grayBg pt-10">
        <div className="container mx-auto">
          <div className="mb-5">
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">My Profile</h4>
          </div>

          <div className="grid grid-rows-1 grid-cols-3 justify-start items-start space-x-10">
            <div>
              <ProfileSlick />
            </div>

            <div className="col-span-2">
              {loading ? (
                <p>Loading profile...</p>
              ) : error ? (
                <p>{error}</p>
              ) : Get_profile_det_match ? (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2">
                        {Get_profile_det_match.profile_name}
                        <MdVerifiedUser className="text-checkGreen ml-2" />
                      </h4>
                    </div>

                    <div className="flex justify-center items-center space-x-10"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <div className="relative">
                        <p className="flex items-center text-ash cursor-pointer">
                          <MdLocalPrintshop className="text-[22px] mr-2" />Print Horoscope
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
                                onClick={() => handleSelectLanguage('Tamil')}
                              >
                                Tamil
                              </li>
                              <li
                                className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                onClick={() => handleSelectLanguage('English')}
                              >
                                English
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      {selectedLanguage && <p className="ml-4 text-ash">Selected: {selectedLanguage}</p>}
                    </div>
                  </div>

                  <p className="text-[20px] text-primary font-bold mb-2">{Get_profile_det_match.profile_id}</p>

                  <div className="flex items-center space-x-5 mb-2">
                    <p className="w-fit bg-gradientGold text-primary font-semibold rounded-md px-3 py-0.5 ">Gold</p>
                    <p className="text-primary">Valid Upto : 16-July-2024</p>
                  </div>

                  <div className="my-3">
                    <button className="flex items-center text-lg text-main font-semibold">Add-On-Packages
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>

                  <div className="w-1/2 mb-16">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">Age :
                          <span className="font-normal"> {Get_profile_det_match.age}</span></h5>

                        <h5 className="text-[18px] text-ash font-semibold">Height :
                          <span className="font-normal"> {Get_profile_det_match.height}</span></h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">Weight :
                          <span className="font-normal"> {Get_profile_det_match.weight}</span></h5>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">Star :
                          <span className="font-normal"> {Get_profile_det_match.star}</span></h5>

                        <h5 className="text-[18px] text-ash font-semibold">Gothram :
                          <span className="font-normal"> {Get_profile_det_match.gothram}</span></h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">Profession :
                          <span className="font-normal"> {Get_profile_det_match.profession}</span></h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">Education :
                          <span className="font-normal"> {Get_profile_det_match.education}</span></h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold">About :
                          <span className="font-normal"> {Get_profile_det_match.about}</span></h5>
                      </div>
                    </div>
                  </div>

                  <div className="bg-vysyamalaLightSandal px-5 py-7 border-2 border-vysyamalaYellow border-dashed rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-lg text-primary font-semibold">Your profile is now {percentage}% complete</h5>
                        <p className="text-sm text-primary">Complete your profile to receive profile suggestions based on your preferences.</p>

                        <button className="flex items-center text-lg text-main font-semibold my-3">Complete Your Profile <FaArrowRight className="ml-2" /></button>
                      </div>
                      <div className="w-24 h-24 text-primary font-semibold">
                        <CircularProgressbar value={percentage} text={`${percentage}%`}
                          styles={buildStyles({
                            pathColor: `rgba(47, 189, 18, ${percentage / 100})`,
                            textColor: '#535665',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
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
      <ProfileDetailsSettings />
    </div>
  );
};
