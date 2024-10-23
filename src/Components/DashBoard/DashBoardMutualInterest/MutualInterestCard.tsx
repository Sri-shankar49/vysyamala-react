// import { useState, useEffect } from "react";
// import axios from "axios";
// import ProfileListImg from "../../../assets/images/ProfileListImg.png";
// import { MdVerifiedUser, MdBookmark, MdBookmarkBorder, MdOutlineGrid3X3, MdStars } from "react-icons/md";
// import { IoCalendar, IoEye, IoSchool } from "react-icons/io5";
// import { FaUser, FaSuitcase } from "react-icons/fa";
// // import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
// import { Link } from "react-router-dom";
// import { FaLocationDot, FaPersonArrowUpFromLine } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import MatchingScore from "../ProfileDetails/MatchingScore";
// // Define the Profile interface
// export interface Profile {
//   mutint_Profile_img: string;
//   mutint_profile_name: string;
//   mutint_profileid: string;
//   mutint_profile_age: number;
//   mutint_verified?:number;
//   mutint_height:number;
//   mutint_star:string;
//   mutint_profession:string;
//   mutint_city:string;
//   mutint_degree:string;
//   mutint_views:number;
//   mutint_lastvisit:string;
//   mutint_userstatus:string;
//   mutint_horoscope:string;
//   mutint_match_score?: number
//   mutint_profile_wishlist:number;
// }

// export const MutualInterestCard: React.FC = () => {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [isBookmarked, setIsBookmarked] = useState<{ [key: string]: boolean }>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const response = await axios.post("http://103.214.132.20:8000/auth/Get_mutual_intrests/", {
//           profile_id: loginuser_profileId
//         });

//         if (response.data.Status === 1) {
//           const profilesArray = response.data.data.profiles;
//           setProfiles(profilesArray);
//         } else {
//           setError("No Data Found");
//         }
//         setLoading(false);
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           setError(error.message);
//         } else {
//           setError("Unexpected error occurred");
//         }
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, [loginuser_profileId]);

//   const handleBookmarkToggle = (profileId: string) => {
//     setIsBookmarked((prev) => ({
//       ...prev,
//       [profileId]: !prev[profileId],
//     }));
//   };

//   if (loading) {
//     return <p>Loading profiles...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!profiles.length) {
//     return <p>No profiles available.</p>;
//   }

//   return (
//     <div className="border-b-[1px] border-footer-text-gray">
//       {profiles.map((profile) => (
//         <ProfileCard
//           key={profile.mutint_profileid}
//           profile={profile}
//           isBookmarked={isBookmarked[profile.mutint_profileid] || false}
//           onBookmarkToggle={() => handleBookmarkToggle(profile.mutint_profileid)}
//         />
//       ))}
//     </div>
//   );
// };

// interface ProfileCardProps {
//   profile: Profile;
//   isBookmarked: boolean;
//   onBookmarkToggle: () => void;
// }

// const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isBookmarked, onBookmarkToggle }) => {
//   const navigate = useNavigate();
//   const handleProfileClick = (profileId: string) => {
//     navigate(`/ProfileDetails?id=${profileId}&page=1`);
//   };
//   return (
//     <div className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5"
//       onClick={() => handleProfileClick(profile.mutint_profileid)}
//     >
//       <Link to="/ProfileDetails" className="w-full flex justify-between items-center">
//         <div className="flex justify-between items-center space-x-5">
//           {/* Profile Image */}
//           <div className="relative">
//             <img src={profile.mutint_Profile_img || ProfileListImg} alt="Profile image" />
//             {isBookmarked ? (
//               <MdBookmark
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onBookmarkToggle();
//                 }}
//                 className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
//               />
//             ) : (
//               <MdBookmarkBorder
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onBookmarkToggle();
//                 }}
//                 className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
//               />
//             )}
//           </div>

//           {/* Profile Details */}
//           <div>

//             {/* Name & Profile ID */}
//             <div className="relative mb-2">
//               <div className="flex items-center">
//                 <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
//                   {profile.mutint_profile_name || "N/A"}

//                   <span className="text-sm text-ashSecondary">
//                     ({profile.mutint_profileid || "N/A"})
//                   </span>
//                 </h5>

//                 {profile.mutint_verified === 1 && (
//                             <MdVerifiedUser className=" text-[20px] text-checkGreen ml-2" />
//                           )}
//               </div>
//             </div>

//             {/* Age */}
//             <div className="flex items-center space-x-3 mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <IoCalendar className="mr-2" />
//                 {profile.mutint_profile_age || "N/A"} yrs
//               </p>
//               <p className="text-gray font-semibold">|</p>

//             <p className="flex items-center text-ashSecondary font-semibold">
//               <FaPersonArrowUpFromLine className="mr-2" />
//               {profile.mutint_height} ft
//             </p>
//             </div>

//             {/* Other Details */}
//             <div className="mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <MdStars className="mr-2" />
//                 {profile.mutint_star} ft
//               </p>
//             </div>
//             <div className="mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <IoSchool className="mr-2" />
//                 {profile.mutint_degree} 
//               </p>
//             </div>
//             <div className="mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <FaSuitcase className="mr-2" />
//                 {profile.mutint_profession} 
//               </p>
//             </div>
//             <div className="mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <FaLocationDot className="mr-2" />
//                 {profile.mutint_city}
//               </p>
//             </div>

//             {/* Tags */}
//             <div className="flex justify-start items-center space-x-3">
//               <div>
//                 <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
//                   <MdOutlineGrid3X3 className="mr-2" /> {profile.mutint_horoscope}
//                 </p>
//               </div>
//               <div>
//                 <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
//                   <FaUser className="mr-2" /> {profile.mutint_userstatus}
//                 </p>
//               </div>
//               <div>
//                 <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
//                   <IoCalendar className="mr-2" /> Last visit on {profile.mutint_lastvisit}
//                 </p>
//               </div>
//               <div>
//                 <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
//                   <IoEye className="mr-2" /> {profile.mutint_views} views
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Matching Score */}
//         <div>
//           {/* <img
//             src={MatchingScoreImg}
//             alt="Matching Score"
//             className="w-full"mutint_profile_wishlist
//           /> */}
//           <MatchingScore scorePercentage={profile.mutint_match_score} />
//         </div>
//       </Link>
//     </div>
//   );
// };



import { useState, useEffect, SetStateAction, Dispatch } from "react";
import axios from "axios";
import ProfileListImg from "../../../assets/images/ProfileListImg.png";
import { MdVerifiedUser, MdBookmark, MdBookmarkBorder, MdOutlineGrid3X3, MdStars } from "react-icons/md";
import { IoCalendar, IoEye, IoSchool } from "react-icons/io5";
import { FaUser, FaSuitcase } from "react-icons/fa";
// import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import MatchingScore from "../ProfileDetails/MatchingScore";
import { ProfileNotFound } from "../../LoginHome/MatchingProfiles/ProfileNotFound";
// Define the Profile interface
export interface Profile {
  mutint_Profile_img: string;
  mutint_profile_name: string;
  mutint_profileid: string;
  mutint_profile_age: number;
  horoscope_available: boolean;
  user_status: string;
  last_visit: string;
  profile_views: number;
  mutint_match_score?: number
}
interface MutualInterestCardProps {
  setCount: React.Dispatch<React.SetStateAction<number>>; // Type for setState function
  setTotalRecords: Dispatch<SetStateAction<number>>;
  setViewCount: Dispatch<SetStateAction<number>>;
  setDataPerPage: Dispatch<SetStateAction<number>>;
}


export const MutualInterestCard:React.FC<MutualInterestCardProps> = ({setDataPerPage,setViewCount, setCount,setTotalRecords }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isBookmarked, setIsBookmarked] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.post("http://103.214.132.20:8000/auth/Get_mutual_intrests/", {
          profile_id: loginuser_profileId
        });
        setCount(response.data.mut_int_count)
        setTotalRecords(response.data.data.total_records || 0)
        setDataPerPage(response.data.data.per_page || 0);
        setViewCount(response.data.viewed_count || 0)
console.log('MutualIntrestCard',response.data.mut_int_count)
        if (response.data.Status === 1) {
          const profilesArray = response.data.data.profiles;
          setProfiles(profilesArray);
        } else {
          setError("No Data Found");
        }
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("Unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [loginuser_profileId]);

  const handleBookmarkToggle = (profileId: string) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [profileId]: !prev[profileId],
    }));
  };

  if (loading) {
    return <p>Loading profiles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profiles.length) {
    return (
      <div className="py-20">
            <ProfileNotFound />
          </div>
    );
  }

  return (
    <div className="border-b-[1px] border-footer-text-gray">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.mutint_profileid}
          profile={profile}
          isBookmarked={isBookmarked[profile.mutint_profileid] || false}
          onBookmarkToggle={() => handleBookmarkToggle(profile.mutint_profileid)}
        />
      ))}
    </div>
  );
};

interface ProfileCardProps {
  profile: Profile;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isBookmarked, onBookmarkToggle }) => {
  const navigate = useNavigate();
  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}`);
  };
  return (
    <div className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5"
      onClick={() => handleProfileClick(profile.mutint_profileid)}
    >
      <Link to="/ProfileDetails" className="w-full flex justify-between items-center">
        <div className="flex justify-between items-center space-x-5">
          <div className="relative">
            <img src={profile.mutint_Profile_img || ProfileListImg} alt="Profile image" />
            {isBookmarked ? (
              <MdBookmark
                onClick={(e) => {
                  e.preventDefault();
                  onBookmarkToggle();
                }}
                className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
              />
            ) : (
              <MdBookmarkBorder
                onClick={(e) => {
                  e.preventDefault();
                  onBookmarkToggle();
                }}
                className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
              />
            )}
          </div>

          <div>

            <div className="relative mb-2">
              <div className="flex items-center">
                <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                  {profile.mutint_profile_name || "Unknown"}{" "}

                  <span className="text-sm text-ashSecondary">
                    ({profile.mutint_profileid || "N/A"})
                  </span>
                </h5>

                <MdVerifiedUser className="text-[20px] text-checkGreen ml-2" />
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <IoCalendar className="mr-2" />
                {profile.mutint_profile_age || "N/A"} yrs
              </p>
            </div>

            <div className="mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <MdStars className="mr-2" />
                Uthiram
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <IoSchool className="mr-2" />
                Bachelors - Arts/Science/Commerce/B Phil
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <FaSuitcase className="mr-2" />
                Employed
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <FaLocationDot className="mr-2" />
                Chennai
              </p>
            </div>

            <div className="flex justify-start items-center space-x-3">
              <div>
                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                  <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                </p>
              </div>
              <div>
                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                  <FaUser className="mr-2" /> {profile.user_status}
                </p>
              </div>
              <div>
                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                  <IoCalendar className="mr-2" /> Last visit on {profile.last_visit}
                </p>
              </div>
              <div>
                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                  <IoEye className="mr-2" /> {profile.profile_views} views
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* <img
            src={MatchingScoreImg}
            alt="Matching Score"
            className="w-full"
          /> */}
          <MatchingScore scorePercentage={profile.mutint_match_score} />
        </div>
      </Link>
    </div>
  );
};