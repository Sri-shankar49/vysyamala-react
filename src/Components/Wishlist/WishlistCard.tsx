import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileListImg from "../../assets/images/ProfileListImg.png";
import { MdVerifiedUser } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { MdStars } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import MatchingScore from "../DashBoard/ProfileDetails/MatchingScore";

// Define the shape of your wishlist profile
interface WishlistProfile {
  height: string;
  degree: string;
  profession: string;
  location: string;
  wishlist_profileid: string;
  wishlist_profile_name: string;
  wishlist_Profile_img: string;
  wishlist_profile_age: number;
}

export const WishlistCard: React.FC = () => {
  const navigate = useNavigate();

  // State to hold the profiles data
  const [wishlistProfiles, setWishlistProfiles] = useState<WishlistProfile[]>([]);


  // Fetch data from API
  const fetchWishlistProfiles = async (profileId: string) => {
    try {
      const response = await axios.post('http://103.214.132.20:8000/auth/Get_profile_wishlist/', {
        profile_id: profileId // Include the profile_id in the request body
      });

      if (response.data.Status === 1) {
        // Assuming you have a state to store the profiles
        setWishlistProfiles(response.data.data.profiles);
      } else {
        console.error("Failed to fetch wishlist profiles:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching wishlist profiles:", error);
    }
  };


  useEffect(() => {
    // Retrieve profile_id from sessionStorage
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

    if (loginuser_profileId) {
      fetchWishlistProfiles(loginuser_profileId);
    } else {
      console.error("Profile ID not found in sessionStorage.");
    }
  }, []);


  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}`);
  };

  return (
    <div>
      <div>
        {wishlistProfiles.length === 0 ? (
          <p>No profiles in wishlist.</p>
        ) : (
          <div>
            {wishlistProfiles.map((profile) => (
              <div key={profile.wishlist_profileid} className="flex justify-start items-center space-x-5 relative rounded-xl shadow-md px-3 py-3 mb-5">
                <div className="w-full flex justify-between items-center">
                  <div className="flex justify-between items-center space-x-5">
                    {/* Profile Image */}
                    <div className="relative">
                      <img src={profile.wishlist_Profile_img || ProfileListImg} alt="Profile-image" />

                      {/* No Bookmark icon functionality here */}
                    </div>

                    {/* Profile Details */}
                    <div className="">
                      {/* Name & Profile ID */}

                      {/* <div className="relative mb-2">
                        <h5
                          onClick={() => handleProfileClick(profile.wishlist_profileid)}
                          className="text-[20px] text-secondary font-semibold cursor-pointer">
                          {profile.wishlist_profile_name || 'Unknown'}{" "}
                          <span className="text-sm text-ashSecondary">({profile.wishlist_profileid || 'N/A'})</span>
                          <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                        </h5>
                      </div> */}

                      <div className="relative mb-2">
                        <div className="flex items-center">
                          <h5
                            onClick={() => handleProfileClick(profile.wishlist_profileid)}
                            className="text-[20px] text-secondary font-semibold cursor-pointer">
                            {profile.wishlist_profile_name || 'Unknown'} {" "}
                            <span className="text-sm text-ashSecondary">
                              ({profile.wishlist_profileid || 'N/A'})
                            </span>
                          </h5>
                          <MdVerifiedUser className=" text-[20px] text-checkGreen ml-2" />
                        </div>
                      </div>

                      {/* Years & Height */}
                      <div className="flex items-center space-x-3 mb-2">
                        <p className="flex items-center text-ashSecondary font-semibold">
                          <IoCalendar className="mr-2" />
                          {profile.wishlist_profile_age || 'N/A'} yrs
                        </p>

                        <p className="text-gray font-semibold">|</p>

                        <p className="flex items-center text-ashSecondary font-semibold">
                          <FaPersonArrowUpFromLine className="mr-2" />
                          {profile.height || 'N/A'}
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
                          {profile.degree || 'N/A'}
                        </p>
                      </div>

                      {/* Employed */}
                      <div className="mb-2">
                        <p className="flex items-center text-ashSecondary font-semibold">
                          <FaSuitcase className="mr-2" />
                          {profile.profession || 'N/A'}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="mb-2">
                        <p className="flex items-center text-ashSecondary font-semibold">
                          <FaLocationDot className="mr-2" />
                          {profile.location || 'N/A'}
                        </p>
                      </div>

                      <div className="flex justify-start items-center space-x-3">
                        {/* Horoscope Available */}
                        <div>
                          <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                            <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                          </p>
                        </div>

                        {/*  Active User */}
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

                        {/* views */}
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
                      {/* <img
                    src={MatchingScoreImg}
                    alt="Matching Score"
                    className="w-full"
                  /> */}
                      <MatchingScore />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
