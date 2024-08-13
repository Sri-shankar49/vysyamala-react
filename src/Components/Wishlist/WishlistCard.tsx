import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile, ProfileContext } from '../../ProfileContext'; // Adjust the path as needed
import { MdVerifiedUser, MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { IoCalendar, IoSchool } from "react-icons/io5";
import { FaPersonArrowUpFromLine, FaSuitcase, FaLocationDot, FaUser } from "react-icons/fa6";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { IoEye } from "react-icons/io5";
// import MatchingScoreImg from "../../assets/images/MatchingScore.png";
import ProfileListImg from "../../assets/images/ProfileListImg.png";
import MatchingScore from '../DashBoard/ProfileDetails/MatchingScore';

export const WishlistCard: React.FC = () => {
  const navigate = useNavigate();

  const { selectedProfiles, bookmarkedProfiles, addBookmark, removeBookmark } = useContext(ProfileContext) || {
    selectedProfiles: [],
    bookmarkedProfiles: [],
    addBookmark: () => { },
    removeBookmark: () => { }
  };

  const handleBookmark = (profile: Profile) => {
    if (bookmarkedProfiles.find(bp => bp.profile_id === profile.profile_id)) {
      removeBookmark(profile.profile_id);
    } else {
      addBookmark(profile);
    }
  };

  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}`);
  };



  return (
    <div className="w-full p-4 overflow-y-auto max-h-screen">
      {selectedProfiles.length === 0 ? (
        <p>No profiles selected.</p>
      ) : (
        <div className="space-y-4">
          {selectedProfiles.map((profile: Profile) => (
            <div key={profile.profile_id} className="relative flex items-start bg-white p-4 rounded-lg shadow-md w-full">
              <div className="flex-shrink-0">
                <img
                  src={profile.profile_image || ProfileListImg}
                  alt="Profile Image"
                  className="w-48 h-48 object-cover rounded-lg"
                />
                {bookmarkedProfiles.find(bp => bp.profile_id === profile.profile_id) ? (
                  <MdBookmark
                    onClick={() => handleBookmark(profile)}
                    className="absolute top-2 right-2 text-white text-[22px] cursor-pointer z-20"
                  />
                ) : (
                  <MdBookmarkBorder
                    onClick={() => handleBookmark(profile)}
                    className="absolute top-2 right-2 text-white text-[22px] cursor-pointer z-20"
                  />
                )}
              </div>

              <div className="ml-4 flex-1">
                <div className="relative mb-2">
                  <h5
                    className="text-[20px] text-secondary font-semibold cursor-pointer flex items-center"
                    onClick={() => handleProfileClick(profile.profile_id)}
                  >
                    {profile.profile_name || 'Unknown'}{" "}
                    <span className="text-sm text-ashSecondary">({profile.profile_id || 'N/A'})</span>
                    <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                  </h5>
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoCalendar className="mr-2" />
                    {profile.profile_age || 'N/A'} yrs
                  </p>

                  <p className="text-gray font-semibold">|</p>

                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaPersonArrowUpFromLine className="mr-2" />
                    {profile.height || 'N/A'}
                  </p>
                </div>

                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoSchool className="mr-2" />
                    {profile.degree || 'N/A'}
                  </p>
                </div>

                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaSuitcase className="mr-2" />
                    {profile.profession || 'N/A'}
                  </p>
                </div>

                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaLocationDot className="mr-2" />
                    {profile.location || 'N/A'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <div>
                    <p className="flex items-center bg-gray-300 px-3 py-1 rounded-md text-ashSecondary font-semibold">
                      <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                    </p>
                  </div>

                  <div>
                    <p className="flex items-center bg-gray-300 px-3 py-1 rounded-md text-ashSecondary font-semibold">
                      <FaUser className="mr-2" /> Active user
                    </p>
                  </div>

                  <div>
                    <p className="flex items-center bg-gray-300 px-3 py-1 rounded-md text-ashSecondary font-semibold">
                      <IoEye className="mr-2" /> {profile.user_profile_views || 0} Profile Views
                    </p>
                  </div>
                </div>

                {/* <div className="absolute top-3 right-3">
                  <div className="relative">
                    <img src={MatchingScoreImg} alt="Matching Score" />
                    <span className="absolute top-2.5 left-3 text-white font-semibold">95%</span>
                  </div>
                </div> */}
                <div>
                  <MatchingScore />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
