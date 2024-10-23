// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import {
//   MdVerifiedUser,
//   // MdOutlineGrid3X3,
//   MdBookmark,
//   MdBookmarkBorder,
//   MdStars,
// } from "react-icons/md";
// import { IoCalendar, IoSchool } from "react-icons/io5";
// import {
//   FaPersonArrowUpFromLine,
//   FaSuitcase,
//   FaLocationDot,
//   // FaUser,
// } from "react-icons/fa6";
// import ProfileListImg from "../../../../assets/images/ProfileListImg.png";
// // import MatchingScoreImg from '../../../../assets/images/MatchingScore.png';
// import { ProfileContext, Profile } from "../../../../ProfileContext"; // Adjust the path as needed
// import { Link } from "react-router-dom";
// import MatchingScore from "../../../DashBoard/ProfileDetails/MatchingScore";
// import Spinner from "../../../Spinner";


// interface ListCardProps {
//   profile: Profile;
//   searchvalues: string;
// }

// export const ListCard: React.FC<ListCardProps> = ({ profile }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const { addBookmark, removeBookmark, setSelectedProfiles } = useContext(
//     ProfileContext
//   ) || {
//     addBookmark: () => {},
//     removeBookmark: () => {},
//     setSelectedProfiles: () => {},
//   };

//   useEffect(() => {
//     const bookmarkedProfiles = JSON.parse(
//       localStorage.getItem("bookmarkedProfiles") || "[]"
//     );
//     const isBookmarked = bookmarkedProfiles.some(
//       (item: Profile) => item.profile_id === profile.profile_id
//     );
//     setIsBookmarked(isBookmarked);
//   }, [profile.profile_id]);

//   const handleBookmark = async (
//     e: React.MouseEvent<SVGElement, MouseEvent>
//   ) => {
//     e.stopPropagation(); // Prevent triggering card click

//     let updatedBookmarks = JSON.parse(
//       localStorage.getItem("bookmarkedProfiles") || "[]"
//     );

//     if (isBookmarked) {
//       // Remove bookmark
//       updatedBookmarks = updatedBookmarks.filter(
//         (item: Profile) => item.profile_id !== profile.profile_id
//       );
//       removeBookmark(profile.profile_id);
//       setSelectedProfiles(updatedBookmarks);
//     } else {
//       // Add bookmark
//       updatedBookmarks.push(profile);
//       addBookmark(profile);
//       setSelectedProfiles(updatedBookmarks);
//     }

//     localStorage.setItem(
//       "bookmarkedProfiles",
//       JSON.stringify(updatedBookmarks)
//     );
//     setIsBookmarked(!isBookmarked);
//   };

//   const handleCardClick = async (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     e.stopPropagation();
//     const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

//     try {
//       const response = await axios.post(
//         "http://103.214.132.20:8000/auth/Create_profile_visit/",
//         {
//           profile_id: loginuser_profileId,
//           viewed_profile: profile.profile_id,
//         }
//       );

//       if (response.data.Status === 1) {
//         console.log("Profile visit created successfully:", response.data);
//       } else {
//         console.error("Failed to create profile visit:", response.statusText);
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error(
//           "Error creating profile visit:",
//           error.response ? error.response.data : error.message
//         );
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);


//   if (!profile)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spinner />
//       </div>
//     ); 

//   const {
//     profile_img,
//     profile_name,
//     profile_id,
//     profile_age,
//     height,
//     degree,
//     profession,
//     location,
//     // user_profile_views,
//     verified,
//   } = profile;

//   return (
//     // <Link to="/ProfileDetails" target="_blank">
//     <div
//       className="flex justify-between items-start space-x-5 relative rounded-xl shadow-md px-3 py-3 mb-5"
//       onClick={handleCardClick}
//     >
//       <div className="w-full flex justify-between items-center">
//         <div className="flex justify-between md:items-center space-x-5">
//           {/* Profile Image */}
//           <div className="relative">
//             <img
//               src={profile_img || ProfileListImg}
//               alt="Profile-image"
//               className="w-[200px] rounded-[6px]"
//             />
//             {isBookmarked ? (
//               <MdBookmark
//                 onClick={handleBookmark}
//                 // className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
//                 className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
//               />
//             ) : (
//               <MdBookmarkBorder
//                 onClick={handleBookmark}
//                 // className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
//                 className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
//               />
//             )}
//           </div>

//           {/* Profile Details */}
//           <div className="">
//             {/* Name & Profile ID */}
//             <div className="relative mb-2">
//               <Link to={`/ProfileDetails?id=${profile_id}`}>
//                 <div className="flex items-center">
//                   <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
//                     {profile_name || "Unknown"}{" "}
//                     <span className="text-sm text-ashSecondary">
//                       ({profile_id || "N/A"})
//                     </span>
//                   </h5>
//                   {verified === 1 && (
//                     <MdVerifiedUser className="ml-2 text-checkGreen text-[20px]" />
//                   )}
//                 </div>
//               </Link>
//             </div>

//             {/* Years & Height */}
//             <div className="flex items-center space-x-3 mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <IoCalendar className="mr-2" />
//                 {profile_age || "N/A"} yrs
//               </p>

//               <p className="text-gray font-semibold">|</p>

//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <FaPersonArrowUpFromLine className="mr-2" />
//                 {height || "N/A"}
//               </p>
//             </div>

//             {/* Uthiram */}
//             <div className="mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <MdStars className="mr-2" />
//                 Uthiram
//               </p>
//             </div>

//             {/* Degree */}
//             <div className="mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <IoSchool className="mr-2" />
//                 {degree || "N/A"}
//               </p>
//             </div>

//             {/* Profession */}
//             <div className="mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <FaSuitcase className="mr-2" />
//                 {profession || "N/A"}
//               </p>
//             </div>

//             {/* Location */}
//             <div className="mb-2">
//               <p className="flex items-center text-ashSecondary font-semibold">
//                 <FaLocationDot className="mr-2" />
//                 {location || "N/A"}
//               </p>
//             </div>

            
//           </div>
//         </div>

        
//         <div className="sm:hidden md:block">
//           <MatchingScore />
//         </div>
//       </div>
//     </div>
//     // </Link>
//   );
// };


import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  MdVerifiedUser,
  // MdOutlineGrid3X3,
  MdBookmark,
  MdBookmarkBorder,
  MdStars,
} from "react-icons/md";
import { IoCalendar, IoSchool } from "react-icons/io5";
import {
  FaPersonArrowUpFromLine,
  FaSuitcase,
  FaLocationDot,
  // FaUser,
} from "react-icons/fa6";
import ProfileListImg from "../../../../assets/images/ProfileListImg.png";
// import MatchingScoreImg from '../../../../assets/images/MatchingScore.png';
import { ProfileContext, Profile } from "../../../../ProfileContext"; // Adjust the path as needed
import { Link } from "react-router-dom";
import MatchingScore from "../../../DashBoard/ProfileDetails/MatchingScore";
import Spinner from "../../../Spinner";
// import { toast } from "react-toastify";


interface ListCardProps {
  profile: Profile;
  searchvalues: string;
}

export const ListCard: React.FC<ListCardProps> = ({ profile }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addBookmark, removeBookmark, setSelectedProfiles } = useContext(
    ProfileContext
  ) || {
    addBookmark: () => {},
    removeBookmark: () => {},
    setSelectedProfiles: () => {},
  };

  useEffect(() => {
    const bookmarkedProfiles = JSON.parse(
      localStorage.getItem("bookmarkedProfiles") || "[]"
    );
    const isBookmarked = bookmarkedProfiles.some(
      (item: Profile) => item.profile_id === profile.profile_id
    );
    setIsBookmarked(isBookmarked);
  }, [profile.profile_id]);

  const handleBookmark = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent triggering card click

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
      //toast.success("Bookmarked Removed successfully")
    } else {
      // Add bookmark
      updatedBookmarks.push(profile);
      addBookmark(profile);
      setSelectedProfiles(updatedBookmarks);
      //toast.success("Bookmarked Added successfully")
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
    const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Create_profile_visit/",
        {
          profile_id: loginuser_profileId,
          viewed_profile: profile.profile_id,
        }
      );

      if (response.data.Status === 1) {
        console.log("Profile visit created successfully:", response.data);
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
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);


  if (!profile)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    ); 

  const {
    profile_img,
    profile_name,
    profile_id,
    profile_age,
    height,
    star,
    degree,
    profession,
    location,
    matching_score,
    // user_profile_views,
    verified,
  } = profile;

  return (
    // <Link to="/ProfileDetails" target="_blank">
    <div
      className="flex justify-between items-start space-x-5 relative rounded-xl shadow-md px-3 py-3 mb-5 max-md:w-[400px] max-sm:w-[300px]"
      onClick={handleCardClick}
    >
      <div className="w-full flex justify-between items-center max-md:flex-col">
        <div className="flex justify-between md:items-center space-x-5 max-md:flex-col max-md:w-full">
          {/* {/ Profile Image /} */}
          <div className="relative max-md:w-full">
            <img
              src={profile_img || ProfileListImg}
              alt="Profile-image"
              className="w-[200px] rounded-[6px] h-full max-md:w-full max-md:h-[280px]"
            />
            {isBookmarked ? (
              <MdBookmark
                onClick={handleBookmark}
                // className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
              />
            ) : (
              <MdBookmarkBorder
                onClick={handleBookmark}
                // className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
              />
            )}
          </div>

          {/* {/ Profile Details /} */}
          <div className="max-md:w-full">
            {/* {/ Name & Profile ID /} */}
            <div className="relative mb-2 max-md:w-full">
              <Link to={`/ProfileDetails?id=${profile_id}&rasi=1`}>
                <div className="flex items-center">
                  <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
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

            {/* {/ Years & Height /} */}
            <div className="flex items-center space-x-3 mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <IoCalendar className="mr-2" />
                {profile_age || "N/A"} yrs
              </p>

              <p className="text-gray font-semibold">|</p>

              <p className="flex items-center text-ashSecondary font-semibold">
                <FaPersonArrowUpFromLine className="mr-2" />
                {height || "N/A"}
              </p>
            </div>

            {/* {/ Uthiram /} */}
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <MdStars className="mr-2" />
                {star}
              </p>
            </div>

            {/* {/ Degree /} */}
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <IoSchool className="mr-2" />
                {degree || "N/A"}
              </p>
            </div>

            {/* {/ Profession /} */}
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <FaSuitcase className="mr-2" />
                {profession || "N/A"}
              </p>
            </div>

            {/* {/ Location /} */}
            <div className="mb-2">
              <p className="flex items-center text-ashSecondary font-semibold">
                <FaLocationDot className="mr-2" />
                {location || "N/A"}
              </p>
            </div>

            
          </div>
        </div>

        
        <div className="sm:hidden md:block">
          <MatchingScore scorePercentage={matching_score} />
        </div>
      </div>
    </div>
    // </Link>
  );
};


