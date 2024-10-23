// import React, { useState, useContext, useEffect } from "react";

// import { IoCalendar } from "react-icons/io5";
// import { FaPersonArrowUpFromLine } from "react-icons/fa6";
// import { MdBookmark, MdBookmarkBorder, MdVerifiedUser } from "react-icons/md";
// import axios from "axios";
// import { ProfileContext, Profile } from "../../../../ProfileContext";
// import { Link } from "react-router-dom";
// import Spinner from "../../../Spinner";


// interface GridCardProps {
//   profile: Profile; // Use Profile type here
//   searchvalues:string;
// }

// export const GridCard: React.FC<GridCardProps> = ({ profile }) => {
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


    
//   return (
//     // <div onClick={() => handleCardClick(profile.profile_id)}
//     // <div onClick={handleCardClick}
//     //   className="relative sm:w-fit md:w-11/12 rounded-xl shadow-md px-3 py-3 mx-auto">
//     //   {/* <Link to={`/ProfileDetails?id=${profile.profile_id}`} target="_blank"> */}

//     //   <div className="mb-3">
//     //     <img src={profile.profile_img || GridProfileImg} alt={profile.profile_name || "default"} className="w-[275px] rounded-[6px]" />
//     //   </div>

//     //   <div>
//     //     <Link to={`/ProfileDetails?id=${profile.profile_id}`}>
//     //       <h4 className="text-secondary text-[20px] font-semibold cursor-pointer">
//     //         {profile.profile_name}{" "}
//     //         <span className="text-sm text-ashSecondary font-semibold">
//     //           ({profile.profile_id})
//     //         </span>
//     //       </h4>
//     //     </Link>

//     //     <div className="flex justify-between items-center">
//     //       <p className="text-primary flex items-center">
//     //         <IoCalendar className="mr-2" /> {profile.profile_age} yrs
//     //       </p>
//     //       <p className="text-primary flex items-center">
//     //         <FaPersonArrowUpFromLine className="mr-2" /> {profile.height}
//     //       </p>
//     //     </div>
//     //   </div>

//     //   {isBookmarked ? (
//     //     <MdBookmark
//     //       onClick={handleBookmark}
//     //       className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
//     //     />
//     //   ) : (
//     //     <MdBookmarkBorder
//     //       onClick={handleBookmark}
//     //       className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
//     //     />
//     //   )}
//     // </div>

//     <div
//       onClick={handleCardClick}
//       className="relative sm:w-fit md:w-11/12 rounded-xl shadow-md px-3 py-3 mx-auto"
//     >
//       <div className="mb-3">
//         <img
//           src={profile.profile_img}
//           alt={profile.profile_name}
//           className="w-[275px] rounded-[6px]"
//         />
//       </div>

//       <div>
//         <Link to={`/ProfileDetails`}>
//           <div className="flex">
//             <h4 className="text-secondary text-[20px] font-semibold cursor-pointer">
//               {profile.profile_name}{" "}
//               <span className="text-sm text-ashSecondary font-semibold">
//                 ({profile.profile_id})
//               </span>
//             </h4>
//             {profile.verified === 1 && (
//               <MdVerifiedUser className="ml-2 mt-2 text-checkGreen text-[20px]" />
//             )}
//           </div>
//         </Link>

//         <div className="flex justify-between items-center">
//           <p className="text-primary flex items-center">
//             <IoCalendar className="mr-2" /> {profile.profile_age} yrs
//           </p>
//           <p className="text-primary flex items-center">
//             <FaPersonArrowUpFromLine className="mr-2" /> {profile.height}
//           </p>
//         </div>
//       </div>

//       {isBookmarked ? (
//         <MdBookmark
//           onClick={handleBookmark}
//           className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
//         />
//       ) : (
//         <MdBookmarkBorder
//           onClick={handleBookmark}
//           className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
//         />
//       )}
//     </div>
//   );
// };



import React, { useState, useContext, useEffect } from "react";

import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { MdBookmark, MdBookmarkBorder, MdVerifiedUser } from "react-icons/md";
import axios from "axios";
import { ProfileContext, Profile } from "../../../../ProfileContext";
import { Link } from "react-router-dom";
import Spinner from "../../../Spinner";
// import { toast } from "react-toastify";


interface GridCardProps {
  profile: Profile; // Use Profile type here
  searchvalues:string;
}

export const GridCard: React.FC<GridCardProps> = ({ profile }) => {
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
     // toast.success("Bookmarke Removed successfully")
    } else {
      // Add bookmark
      updatedBookmarks.push(profile);
      addBookmark(profile);
      setSelectedProfiles(updatedBookmarks);
     // toast.success("Bookmarke Added successfully")
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


    
  return (
    // <div onClick={() => handleCardClick(profile.profile_id)}
    // <div onClick={handleCardClick}
    //   className="relative sm:w-fit md:w-11/12 rounded-xl shadow-md px-3 py-3 mx-auto">
    //   {/ <Link to={`/ProfileDetails?id=${profile.profile_id}`} target="_blank"> /}

    //   <div className="mb-3">
    //     <img src={profile.profile_img || GridProfileImg} alt={profile.profile_name || "default"} className="w-[275px] rounded-[6px]" />
    //   </div>

    //   <div>
    //     <Link to={`/ProfileDetails?id=${profile.profile_id}`}>
    //       <h4 className="text-secondary text-[20px] font-semibold cursor-pointer">
    //         {profile.profile_name}{" "}
    //         <span className="text-sm text-ashSecondary font-semibold">
    //           ({profile.profile_id})
    //         </span>
    //       </h4>
    //     </Link>

    //     <div className="flex justify-between items-center">
    //       <p className="text-primary flex items-center">
    //         <IoCalendar className="mr-2" /> {profile.profile_age} yrs
    //       </p>
    //       <p className="text-primary flex items-center">
    //         <FaPersonArrowUpFromLine className="mr-2" /> {profile.height}
    //       </p>
    //     </div>
    //   </div>

    //   {isBookmarked ? (
    //     <MdBookmark
    //       onClick={handleBookmark}
    //       className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
    //     />
    //   ) : (
    //     <MdBookmarkBorder
    //       onClick={handleBookmark}
    //       className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
    //     />
    //   )}
    // </div>

    <div
      onClick={handleCardClick}
      className="relative sm:w-fit md:w-11/12 rounded-xl shadow-md px-3 py-3 mx-auto"
    >
      <div className="mb-3">
        <img
          src={profile.profile_img}
          alt={profile.profile_name}
          className="w-[275px] rounded-[6px]"
        />
      </div>

      <div>
        <Link to={`/ProfileDetails?id=${profile.profile_id}&rasi=1`}>
          <div className="flex">
            <h4 className="text-secondary text-[20px] font-semibold cursor-pointer">
              {profile.profile_name}{" "}
              <span className="text-sm text-ashSecondary font-semibold">
                ({profile.profile_id})
              </span>
            </h4>
            {profile.verified === 1 && (
              <MdVerifiedUser className="ml-2 mt-2 text-checkGreen text-[20px]" />
            )}
          </div>
        </Link>

        <div className="flex justify-between items-center">
          <p className="text-primary flex items-center">
            <IoCalendar className="mr-2" /> {profile.profile_age} yrs
          </p>
          <p className="text-primary flex items-center">
            <FaPersonArrowUpFromLine className="mr-2" /> {profile.height}
          </p>
        </div>
      </div>

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
    
  );
};

