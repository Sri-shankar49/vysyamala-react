import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {
  MdVerifiedUser,
  MdOutlineGrid3X3,
  MdBookmark,
  MdBookmarkBorder,
  MdStars
} from 'react-icons/md';
import {
  IoCalendar,
  IoSchool,
  IoEye
} from 'react-icons/io5';
import {
  FaPersonArrowUpFromLine,
  FaSuitcase,
  FaLocationDot,
  FaUser
} from 'react-icons/fa6';
import ProfileListImg from '../../../../assets/images/ProfileListImg.png';
import MatchingScoreImg from '../../../../assets/images/MatchingScore.png';
import { ProfileContext, Profile } from '../../../../ProfileContext'; // Adjust the path as needed
import { Link } from 'react-router-dom';
import { fetchProfiles } from '../../../../commonapicall'; // Adjust the path as needed

interface ListCardProps {
  profile: Profile;
}

export const ListCard: React.FC<ListCardProps> = ({ profile }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addBookmark, removeBookmark, setSelectedProfiles } = useContext(ProfileContext) || {
    addBookmark: () => { },
    removeBookmark: () => { },
    setSelectedProfiles: () => { }
  };

  useEffect(() => {
    const bookmarkedProfiles = JSON.parse(localStorage.getItem('bookmarkedProfiles') || '[]');
    const isBookmarked = bookmarkedProfiles.some((item: Profile) => item.profile_id === profile.profile_id);
    setIsBookmarked(isBookmarked);
  }, [profile.profile_id]);

  const handleBookmark = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent triggering card click

    let updatedBookmarks = JSON.parse(localStorage.getItem('bookmarkedProfiles') || '[]');

    if (isBookmarked) {
      // Remove bookmark
      updatedBookmarks = updatedBookmarks.filter((item: Profile) => item.profile_id !== profile.profile_id);
      removeBookmark(profile.profile_id);
      setSelectedProfiles((prevProfiles) => prevProfiles.filter(p => p.profile_id !== profile.profile_id));
    } else {
      // Add bookmark
      updatedBookmarks.push(profile);
      addBookmark(profile);
      setSelectedProfiles((prevProfiles) => [...prevProfiles, profile]);
    }

    localStorage.setItem('bookmarkedProfiles', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

    try {
      const response = await axios.post('http://103.214.132.20:8000/auth/Create_profile_visit/', {
        profile_id: loginuser_profileId,
        viewed_profile: profile.profile_id
      });

      if (response.data.Status === 1) {
        console.log('Profile visit created successfully:', response.data);
      } else {
        console.error('Failed to create profile visit:', response.statusText);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating profile visit:', error.response ? error.response.data : error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const { profile_img, profile_name, profile_id, profile_age, height, degree, profession, location, user_profile_views } = profile;

  return (
    <Link to="/ProfileDetails" target="_blank">
      <div className="flex justify-between items-start space-x-5 relative rounded-xl shadow-md px-3 py-3 mb-5"
        onClick={handleCardClick}>
        <div className="w-full flex justify-between items-center">

          <div className="flex justify-between items-center space-x-5">

            {/* Profile Image */}
            <div className="relative">
              <img src={profile_img || ProfileListImg} alt="Profile-image" className="w-[200px]" />
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

                <Link to={`/ProfileDetails?id=${profile_id}`}>
                  <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                    {profile_name || 'Unknown'} {" "}
                    <span className="text-sm text-ashSecondary">
                      ({profile_id || 'N/A'})
                    </span>
                    <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                  </h5>
                </Link>
              </div>

              {/* Years & Height */}
              <div className="flex items-center space-x-3 mb-2">
                <p className="flex items-center text-ashSecondary font-semibold">
                  <IoCalendar className="mr-2" />
                  {profile_age || 'N/A'} yrs
                </p>

                <p className="text-gray font-semibold">|</p>

                <p className="flex items-center text-ashSecondary font-semibold">
                  <FaPersonArrowUpFromLine className="mr-2" />
                  {height || 'N/A'}
                </p>
              </div>

              {/* Uthiram */}
              <div className="mb-2">
                <p className="flex items-center text-ashSecondary font-semibold">
                  <MdStars className="mr-2" />
                  Uthiram
                </p>
              </div>

              {/* Degree */}
              <div className="mb-2">
                <p className="flex items-center text-ashSecondary font-semibold">
                  <IoSchool className="mr-2" />
                  {degree || 'N/A'}
                </p>
              </div>

              {/* Profession */}
              <div className="mb-2">
                <p className="flex items-center text-ashSecondary font-semibold">
                  <FaSuitcase className="mr-2" />
                  {profession || 'N/A'}
                </p>
              </div>

              {/* Location */}
              <div className="mb-2">
                <p className="flex items-center text-ashSecondary font-semibold">
                  <FaLocationDot className="mr-2" />
                  {location || 'N/A'}
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
                    <IoEye className="mr-2" /> {user_profile_views || 0} Profile Views
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
          <div className="absolute top-3 right-3">
            <div className="relative">
              <img src={MatchingScoreImg} alt="Matching Score" />
              {/* <span className="absolute top-2.5 left-3 text-white font-semibold">95%</span> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
