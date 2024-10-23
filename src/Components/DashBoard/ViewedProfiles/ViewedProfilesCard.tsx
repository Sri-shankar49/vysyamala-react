import { useState, useEffect } from "react";
import axios from "axios";
import ProfileListImg from "../../../assets/images/ProfileListImg.png";
import { MdVerifiedUser } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
// import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
import MatchingScore from "../ProfileDetails/MatchingScore";
import { useNavigate } from "react-router-dom";
// Define types for API response
interface Profile {
  visited_profileid: string;
  visited_profile_name: string;
  visited_Profile_img: string;
  visited_profile_age: number;
  visited_verified: number;
  visited_height:number;
  visited_star:string;
  visited_profession:string;
  visited_city:string;
  visited_degree:string;
  visited_match_score: number;
  visited_views:number;
  visited_lastvisit:string;
  visited_userstatus:string;
  visited_horoscope:string;
  visited_profile_wishlist:number;
}

interface ApiResponse {
  Status: number;
  message: string;
  data: {
    profiles: Profile[];
  };
}
type ViewedProfilesCardProps = {
  pageNumber: number;
  dataPerPage: number;
};
export const ViewedProfilesCard: React.FC<ViewedProfilesCardProps> = ({ pageNumber }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({});
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the data from the API
    axios
      .post<ApiResponse>(
        "http://103.214.132.20:8000/auth/My_viewed_profiles/",
        {
          profile_id: loginuser_profileId, // Send profile_id in the request body
          page_number: pageNumber,
        }
      )
      .then((response) => {
        if (response.data.Status === 1) {
          setProfiles(response.data.data.profiles);
        }
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, [loginuser_profileId, pageNumber]); // Include profile_id in the dependency array if it can change

  const handleBookmark = (profileId: string) => {
    setIsBookmarked((prevState) => ({
      ...prevState,
      [profileId]: !prevState[profileId],
    }));
  };
  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}&page=4`);
  };

  console.log(profiles, "profilesssssss");
  return (
    <div className="border-b-[1px] border-footer-text-gray">
      {profiles.map((profile) => (
        <div
          key={profile.visited_profileid}
          className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5"
        >
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-between items-center space-x-5">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={profile.visited_Profile_img || ProfileListImg}
                  alt="Profile-image"
                  className="rounded-[6px]"
                />

                {isBookmarked[profile.visited_profileid] ? (
                  <MdBookmark
                    onClick={() => handleBookmark(profile.visited_profileid)}
                    className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                  />
                ) : (
                  <MdBookmarkBorder
                    onClick={() => handleBookmark(profile.visited_profileid)}
                    className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                  />
                )}
              </div>

              {/* Profile Details */}
              <div className="">
                {/* Name & Profile ID */}
                <div className="relative mb-2">
                  <div className="flex items-center">
                    <h5
                      className="text-[20px] text-secondary font-semibold cursor-pointer"
                      onClick={() =>
                        handleProfileClick(profile.visited_profileid)
                      }
                    >
                      {profile.visited_profile_name}
                      <span className="text-sm text-ashSecondary">
                        ({profile.visited_profileid})
                      </span>
                    </h5>
                    {profile.visited_verified === 1 && (
                      <MdVerifiedUser className="text-[20px] text-checkGreen ml-2" />
                    )}
                  </div>
                </div>

                {/* Age */}
                <div className="flex items-center space-x-3 mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoCalendar className="mr-2" />
                    {profile.visited_profile_age } yrs
                  </p>
                </div>

                {/* Other Details */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <MdStars className="mr-2" />
                    {profile.visited_star }
                  </p>
                </div>
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoSchool className="mr-2" />
                    {profile.visited_degree}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaSuitcase className="mr-2" />
                    {profile.visited_profession }
                  </p>
                </div>
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaLocationDot className="mr-2" />
                    {profile.visited_city }
                  </p>
                </div>

                {/* Tags */}
                <div className="flex justify-start items-center space-x-3">
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <MdOutlineGrid3X3 className="mr-2" /> {profile.visited_horoscope }
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <FaUser className="mr-2" /> {profile.visited_userstatus }
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoCalendar className="mr-2" /> Last visit on {profile.visited_lastvisit}
                      
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoEye className="mr-2" /> {profile.visited_views } views
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Matching Score */}
            <div>
              <div>
                {/* <img
                                    src={MatchingScoreImg}
                                    alt="Matching Score"
                                    className="w-full"
                                /> */}
                <MatchingScore scorePercentage={profile.visited_match_score} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
