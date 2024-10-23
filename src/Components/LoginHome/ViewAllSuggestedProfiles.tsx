
import React, { useEffect, useState, useContext  } from 'react';
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
import Pagination from "../../Components/Pagination";
import { ProfileContext } from "../../ProfileContext";
// Define the shape of your profile data
interface Profile {
  profile_id: string;
  profile_name: string;
  profile_age: number;
  profile_img: string;
  profile_height: string;
  degree: string;
  profession: string;
  location: string;
  star: string;
  matching_score: number;
}

export const ViewAllSuggestedProfiles: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(ProfileContext);


  if (!context) {
    throw new Error("ViewAllSuggestedProfiles must be used within a ProfileProvider");
  }

  const { setTotalPage, setTotalRecords, totalPage, TotalRecords } = context;

  // State to hold the profiles data
  const [profiles, setProfiles] = useState<Profile[]>([]);
 const [page, setPage] = useState<number>(1);
  const perPage = 10;

  // Fetch data from API
  const fetchProfiles = async (profileId: string) => {
    try {
      const response = await axios.post('http://103.214.132.20:8000/auth/Get_Suggested_List/', {
        profile_id: profileId,
        page_number: page,
      });
      
      if (response.data.status === "success") {
        // Assuming the API response returns an array of profiles in 'data'
        setProfiles(response.data.data);
        setTotalRecords(response.data.total_count);
        setTotalPage(Math.ceil(response.data.total_count / perPage));
      } else {
        console.error("Failed to fetch profiles:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    // Retrieve profile_id from sessionStorage
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');
    
    if (loginuser_profileId) {
      fetchProfiles(loginuser_profileId);
    } else {
      console.error("Profile ID not found in sessionStorage.");
    }
  }, [page]);

  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}`);
  };

  return (
    <div>
      <div>
        {profiles.length === 0 ? (
          <p>No suggested profiles available.</p>
        ) : (
          <div>
            {profiles.map((profile) => (
              <div key={profile.profile_id} className="flex justify-start items-center space-x-5 relative rounded-xl shadow-md px-3 py-3 mb-5">
                <div className="w-full flex justify-between items-center">
                  <div className="flex justify-between items-center space-x-5">
                    {/* Profile Image */}
                    <div className="relative">
                      <img src={profile.profile_img || ProfileListImg} alt="Profile-image" />
                    </div>

                    {/* Profile Details */}
                    <div className="">
                      {/* Name & Profile ID */}
                      <div className="relative mb-2">
                        <h5
                          onClick={() => handleProfileClick(profile.profile_id)}
                          className="text-[20px] text-secondary font-semibold cursor-pointer">
                          {profile.profile_name || 'Unknown'}{" "}
                          <span className="text-sm text-ashSecondary">({profile.profile_id || 'N/A'})</span>
                          <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                        </h5>
                      </div>

                      {/* Age & Height */}
                      <div className="flex items-center space-x-3 mb-2">
                        <p className="flex items-center text-ashSecondary font-semibold">
                          <IoCalendar className="mr-2" />
                          {profile.profile_age || 'N/A'} yrs
                        </p>

                        <p className="text-gray font-semibold">|</p>

                        <p className="flex items-center text-ashSecondary font-semibold">
                          <FaPersonArrowUpFromLine className="mr-2" />
                          {profile.profile_height || 'N/A'}
                        </p>
                      </div>

                      {/* Star */}
                      <div className="mb-2">
                        <p className="flex items-center text-ashSecondary font-semibold">
                          <MdStars className="mr-2" />
                          {profile.star || 'N/A'}
                        </p>
                      </div>

                      {/* Degree */}
                      <div className="mb-2">
                        <p className="flex items-center text-ashSecondary font-semibold">
                          <IoSchool className="mr-2" />
                          {profile.degree || 'N/A'}
                        </p>
                      </div>

                      {/* Profession */}
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
                    <MatchingScore />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
         <Pagination
          pageNumber={page}
          setPageNumber={setPage}
          totalRecords={TotalRecords}
          dataPerPage={perPage}
          toptalPages={totalPage}
        />
      </div>
    </div>
  );
};
