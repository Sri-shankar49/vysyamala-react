import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdVerifiedUser, MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { IoCalendar, IoSchool } from "react-icons/io5";
import {
  FaPersonArrowUpFromLine,
  FaSuitcase,
  FaLocationDot,
} from "react-icons/fa6";
import axios from "axios";
import ProfileListImg from "../../../../assets/images/ProfileListImg.png";
import { ProfileContext, Profile } from "../../../../ProfileContext"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { fetchProfiles } from "../../../../commonapicall"; // Import the API function
import Spinner from "../../../Spinner";

interface GridListCardProps {
  profileId: string;
}

export const GridListCard: React.FC<GridListCardProps> = ({ profileId }) => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const { MatchingProfilepageNumber, MatchingProfileperPage, sortOrder } =
    context;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { addBookmark, removeBookmark, setSelectedProfiles } = useContext(
    ProfileContext
  ) || {
    addBookmark: () => {},
    removeBookmark: () => {},
    setSelectedProfiles: () => {},
  };
  const navigate = useNavigate();
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  useEffect(() => {
    const loadProfile = async () => {
      if (!loginuser_profileId) {
        console.error("Login user profile ID is not available");
        return;
      }

      try {
        const data = await fetchProfiles(
          loginuser_profileId,
          MatchingProfilepageNumber,
          MatchingProfileperPage,
          sortOrder
        );
        console.log("Fetched profile data:", data);
        if (data && data.profiles) {
          const profileData = data.profiles.find(
            (profile: Profile) => profile.profile_id === profileId
          );
          setProfile(profileData || null);
        } else {
          console.error("No profile data found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    loadProfile();
  }, [loginuser_profileId, profileId, MatchingProfilepageNumber, sortOrder]);

  useEffect(() => {
    if (profile) {
      const bookmarkedProfiles = JSON.parse(
        localStorage.getItem("bookmarkedProfiles") || "[]"
      );
      const isBookmarked = bookmarkedProfiles.some(
        (item: Profile) => item.profile_id === profile.profile_id
      );
      setIsBookmarked(isBookmarked);
    }
  }, [profile]);

  const handleBookmark = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent triggering card click

    if (!profile) return;

    let updatedBookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProfiles") || "[]"
    );

    if (isBookmarked) {
      // Remove bookmark
      updatedBookmarks = updatedBookmarks.filter(
        (item: Profile) => item.profile_id !== profile.profile_id
      );
      removeBookmark(profile.profile_id);
      setSelectedProfiles(updatedBookmarks);
    } else {
      // Add bookmark
      updatedBookmarks.push(profile);
      addBookmark(profile);
      setSelectedProfiles(updatedBookmarks);
    }

    localStorage.setItem(
      "bookmarkedProfiles",
      JSON.stringify(updatedBookmarks)
    );
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const shouldNavigate = true; // Replace this with your actual condition

    if (shouldNavigate && profileId) {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Create_profile_visit/",
          {
            profile_id: loginuser_profileId,
            viewed_profile: profileId,
          }
        );

        if (response.data.Status === 1) {
          console.log("Profile visit created successfully:", response.data);
          navigate(`/ProfileDetails?id=${profileId}`);
        } else {
          console.error("Failed to create profile visit:", response.statusText);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error creating profile visit:",
            error.response ? error.response.data : error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  if (!profile) return <Spinner />;

  // useEffect(()=>{
  //   const count =0
  //   if(searchProfile){}
  // },[searchProfile])

  const {
    profile_img,
    profile_name,
    profile_id,
    profile_age,
    height,
    degree,
    profession,
    location,
    verified,
  } = profile;

  return (
    // <Link to="/ProfileDetails" target="_blank">

    <div
      className="flex justify-start items-center space-x-5 relative rounded-xl shadow-md px-3 py-3"
      onClick={handleCardClick}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-between items-center space-x-5">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={profile_img || ProfileListImg}
              alt="Profile-image"
              className="w-[180px] rounded-[6px]"
            />
            {isBookmarked ? (
              <MdBookmark
                onClick={handleBookmark}
                className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
              />
            ) : (
              <MdBookmarkBorder
                onClick={handleBookmark}
                className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
              />
            )}
          </div>

          {/* Profile Details */}
          <div>
            {/* Name & Profile ID */}
            <div className="relative mb-2">
              <Link to={`/ProfileDetails?id=${profile_id}`}>
                <div className="flex items-center">
                  <h5 className="text-secondary text-[20px] font-semibold cursor-pointer">
                    {profile_name || "Unknown"}{" "}
                    <span className="text-sm text-ashSecondary">
                      ({profile_id || "N/A"})
                    </span>
                  </h5>
                  {verified === 1 && (
                    <MdVerifiedUser className="ml-2 text-checkGreen text-[20px]" />
                  )}
                </div>
              </Link>
            </div>

            {/* Years & Height */}
            <div className="flex items-center space-x-3 mb-2">
              <p className="flex items-center text-ashSecondary">
                <IoCalendar className="mr-2" />
                {profile_age || "N/A"} yrs
              </p>
              <p className="text-gray">|</p>
              <p className="flex items-center text-ashSecondary">
                <FaPersonArrowUpFromLine className="mr-2" />
                {height || "N/A"}
              </p>
            </div>

            {/* Degree */}
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary">
                <IoSchool className="mr-2" />
                {degree || "N/A"}
              </p>
            </div>

            {/* Profession */}
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary">
                <FaSuitcase className="mr-2" />
                {profession || "N/A"}
              </p>
            </div>

            {/* Location */}
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary">
                <FaLocationDot className="mr-2" />
                {location || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
};
