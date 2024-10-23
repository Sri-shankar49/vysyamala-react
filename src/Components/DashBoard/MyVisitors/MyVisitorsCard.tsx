import { useState, useEffect } from "react";
import axios from "axios";
import ProfileListImg from "../../../assets/images/ProfileListImg.png";
import {
  MdVerifiedUser,
  MdBookmark,
  MdBookmarkBorder,
  MdOutlineGrid3X3,
  MdStars,
} from "react-icons/md";
import { IoCalendar, IoSchool } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import MatchingScore from "../ProfileDetails/MatchingScore";
import {
  FaLocationDot,
  FaPersonArrowUpFromLine,
  FaSuitcase,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ProfileNotFound } from "../../LoginHome/MatchingProfiles/ProfileNotFound";

// Define the profile and API response types
interface Profile {
  viwed_profileid: string;
  viwed_profile_name: string;
  viwed_Profile_img: string;
  viwed_profile_age: number;
  viwed_verified: number;
  viwed_height: number;
  viwed_star: string;
  viwed_profession: string;
  viwed_city: string;
  viwed_degree: string;
  viwed_match_score?: number;
  viwed_views: number;
  viwed_lastvisit: string;
  viwed_userstatus: string;
  viwed_horoscope: string;
  viwed_profile_wishlist: number;
}

interface ApiResponse {
  Status: number;
  message: string;
  data: {
    profiles: Profile[];
  };
}

export const MyVisitorsCard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]); // Store multiple profiles
  const [isBookmarked, setIsBookmarked] = useState<{ [key: string]: boolean }>(
    {}
  );
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const navigate = useNavigate();

  // Function to handle the bookmark toggle
  const handleBookmark = (profileId: string) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [profileId]: !prev[profileId],
    }));
  };

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post<ApiResponse>(
          "http://103.214.132.20:8000/auth/My_profile_visit/",
          {
            profile_id: loginuser_profileId,
          }
        );

        // Check if response is successful and contains profiles
        if (response.data.Status === 1 && response.data.data.profiles.length > 0) {
          setProfiles(response.data.data.profiles); // Store all profiles
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [loginuser_profileId]);

  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}&page=5`);
  };

  if (profiles.length === 0) {
    return (
      <div className="py-20">
            <ProfileNotFound />
            </div>
    );
  }

  return (
    <div>
      {profiles.map((profile) => (
        <div
          key={profile.viwed_profileid}
          className="border-b-[1px] border-footer-text-gray mb-4"
        >
          <div className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5">
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-between items-center space-x-5">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={profile.viwed_Profile_img || ProfileListImg}
                    alt="Profile-image"
                  />

                  {isBookmarked[profile.viwed_profileid] ? (
                    <MdBookmark
                      onClick={() => handleBookmark(profile.viwed_profileid)}
                      className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                    />
                  ) : (
                    <MdBookmarkBorder
                      onClick={() => handleBookmark(profile.viwed_profileid)}
                      className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                    />
                  )}
                </div>

                {/* Profile Details */}
                <div>
                  {/* Name & Profile ID */}
                  <div className="relative mb-2">
                    <h5
                      className="text-[20px] text-secondary font-semibold cursor-pointer"
                      onClick={() => handleProfileClick(profile.viwed_profileid)}
                    >
                      {profile.viwed_profile_name}
                      <span className="text-sm text-ashSecondary">
                        ({profile.viwed_profileid})
                      </span>
                      {profile.viwed_verified === 1 && (
                        <MdVerifiedUser className="absolute top-1.5 left-[155px] text-checkGreen" />
                      )}
                    </h5>
                  </div>

                  {/* Years & Height */}
                  <div className="flex items-center space-x-3 mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <IoCalendar className="mr-2" />
                      {profile.viwed_profile_age} yrs
                    </p>
                    <p className="text-gray font-semibold">|</p>
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <FaPersonArrowUpFromLine className="mr-2" />
                      {profile.viwed_height}ft
                    </p>
                  </div>

                  {/* Star */}
                  <div className="mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <MdStars className="mr-2" />
                      {profile.viwed_star}
                    </p>
                  </div>

                  {/* Degree */}
                  <div className="mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <IoSchool className="mr-2" />
                      {profile.viwed_degree}
                    </p>
                  </div>

                  {/* Profession */}
                  <div className="mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <FaSuitcase className="mr-2" />
                      {profile.viwed_profession}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <FaLocationDot className="mr-2" />
                      {profile.viwed_city}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex justify-start items-center space-x-3">
                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <MdOutlineGrid3X3 className="mr-2" />{" "}
                        {profile.viwed_horoscope}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <FaUser className="mr-2" />
                        {profile.viwed_userstatus}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <IoCalendar className="mr-2" /> Last visit on{" "}
                        {profile.viwed_lastvisit}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <IoEye className="mr-2" /> {profile.viwed_views} views
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matching Score */}
              <div>
                <MatchingScore scorePercentage={profile.viwed_match_score} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
