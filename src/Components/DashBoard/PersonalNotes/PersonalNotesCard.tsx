import { useState, useEffect } from "react";
import axios from "axios";
import ProfileListImg from "../../../assets/images/ProfileListImg.png";
import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
import {
  MdVerifiedUser,
  MdStars,
  MdOutlineGrid3X3,
  MdBookmark,
  MdBookmarkBorder,
} from "react-icons/md";
import { IoCalendar, IoSchool, IoEye } from "react-icons/io5";
import { FaPersonArrowUpFromLine, FaSuitcase, FaLocationDot, FaUser } from "react-icons/fa6";

interface GetProfListMatch {
  profile_id: string;
  profile_name: string;
  age: number;
  height: string;
  weight: string;
  degree: string;
  profession: string;
  location: string;
  profile_image: string;
  wish_list: string;
  notes_details: string;
  notes_datetime: string;
}

export const PersonalNotesCard = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [profileData, setProfileData] = useState<GetProfListMatch | null>(null);

  const [statusMessage] = useState<string>(""); // State variable for the status message
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post("http://103.214.132.20:8000/auth/Get_personal_notes/", {
          profile_id: loginuser_profileId,
        });
        console.log(response.data);

        const profile = response.data.data.profiles[0];

        const transformedProfile: GetProfListMatch = {
          profile_id: profile.notes_profileid,
          profile_name: profile.notes_profile_name,
          age: profile.notes_profile_age,
          height: "N/A", // Add height if available
          weight: "N/A", // Add weight if available
          degree: "N/A", // Add degree if available
          profession: "N/A", // Add profession if available
          location: "N/A", // Add location if available
          profile_image: profile.notes_Profile_img || ProfileListImg,
          wish_list: "N/A", // Add wish_list status if available
          notes_details: profile.notes_details,
          notes_datetime: profile.notes_datetime,
        };

        setProfileData(transformedProfile);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };


  return (
    <div className="space-y-5 rounded-xl shadow-md p-5 mb-5">
      {profileData ? (
        <div className="flex justify-start items-center space-x-5 relative">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-between items-center space-x-5">
              {/* Profile Image */}
              <div className="relative">
                <img src={profileData.profile_image || ProfileListImg} alt="Profile" />
                {isBookmarked ? (
                  <MdBookmark
                    onClick={handleBookmark}
                    className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                  />
                ) : (
                  <MdBookmarkBorder
                    onClick={handleBookmark}
                    className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                  />
                )}
              </div>

              {/* Profile Details */}
              <div className="">
                {/* Name & Profile ID */}
                <div className="relative mb-2">
                  <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                    {profileData.profile_name}
                    <span className="text-sm text-ashSecondary ml-2">
                      ({profileData.profile_id})
                    </span>
                    <MdVerifiedUser className="inline-block ml-2 text-checkGreen" />
                  </h5>

                </div>

                {/* Years & Height */}
                <div className="flex items-center space-x-3 mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoCalendar className="mr-2" />
                    {profileData.age} yrs
                  </p>
                  <p className="text-gray font-semibold">|</p>
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaPersonArrowUpFromLine className="mr-2" />
                    {profileData.height} ft
                  </p>
                </div>

                {/* Uthiram */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <MdStars className="mr-2" />
                    Uthiram
                  </p>
                </div>

                {/* Bachelors */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoSchool className="mr-2" />
                    {profileData.degree}
                  </p>
                </div>

                {/* Employed */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaSuitcase className="mr-2" />
                    {profileData.profession}
                  </p>
                </div>

                {/* Location */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaLocationDot className="mr-2" />
                    {profileData.location}
                  </p>
                </div>

                <div className="flex justify-start items-center space-x-3">
                  {/* Horoscope Available */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                    </p>
                  </div>

                  {/* Active User */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <FaUser className="mr-2" /> Active user
                    </p>
                  </div>

                  {/* Last Visit */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoCalendar className="mr-2" /> Last visit on June 30, 2024
                    </p>
                  </div>

                  {/* Views */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoEye className="mr-2" /> 31 views
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Matching Score */}
            <div>
              <div>
                <img
                  src={MatchingScoreImg}
                  alt="Matching Score"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}

      {/* Notes */}
      <div className="bg-gray rounded-xl p-5 space-y-1">
        <h5 className="text-primary font-semibold">
          {profileData?.notes_details ?? "N/A"}
        </h5>
        <p className="text-sm text-primary">
          Last updated on {profileData?.notes_datetime ?? "N/A"}
        </p>
        {statusMessage && <p className="mt-2 text-sm">{statusMessage}</p>}
      </div>


    </div>
  );
};
