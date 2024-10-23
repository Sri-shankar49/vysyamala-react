
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { IoPersonCircle, IoCalendar } from "react-icons/io5";
// import { FaSuitcase } from "react-icons/fa";
// import { MdOutlineSearch } from "react-icons/md";
// import FindSomeoneIcon from "../../assets/images/FindSomeone.png";
// import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal"; // Assuming this is the component for the login popup

// interface Profession {
//   Profes_Pref_id: number;
//   Profes_name: string;
// }

// interface Profile {
//   profile_id: string;
//   profile_name: string;
//   profile_age: number;
//   profile_img: string;
//   profile_height: string;
//   profession: string;
//   location: string;
// }

// const FindSomeone = () => {
//   const [professions, setProfessions] = useState<Profession[]>([]);
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searching, setSearching] = useState<boolean>(false);
//   const [isLoginPopupOpen, setIsLoginPopupOpen] = useState<boolean>(false); // For login popup state

//   const [formData, setFormData] = useState({
//     gender: "",
//     profession: "",
//     ageRange: "",
//   });

//   useEffect(() => {
//     // Fetch profession preferences from API
//     const fetchProfessions = async () => {
//       try {
//         const response = await axios.post<Record<string, Profession>>(
//           "http://103.214.132.20:8000/auth/Get_Profes_Pref/"
//         );
//         const professionData = Object.values(response.data);
//         setProfessions(professionData);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch profession preferences");
//         setLoading(false);
//       }
//     };

//     fetchProfessions();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSearch = async () => {
//     setSearching(true);
//     setError(null);
//     try {
//       const [fromAge, toAge] = formData.ageRange.split("-");
//       const response = await axios.post(
//         "http://103.214.132.20:8000/auth/Searchbeforelogin/",
//         {
//           from_age: fromAge.trim(),
//           to_age: toAge.trim(),
//           gender: formData.gender,
//           native_state: "Tamilnadu",
//           city: "Trichy",
//           profession: formData.profession,
//           received_per_page: "2",
//           received_page_number: "1",
//         }
//       );
//       setProfiles(response.data.data);
//       setSearching(false);
//     } catch (err) {
//       setError("Failed to fetch search results");
//       setSearching(false);
//     }
//   };

//   const handleViewProfileClick = () => {
//     const token = sessionStorage.getItem("token");

//     if (!token) {
//       setIsLoginPopupOpen(true); // Open login popup if not logged in
//     } else {
//       // Handle logged-in behavior, such as navigating to the profile page
//       console.log("User is logged in, proceed with profile view.");
//     }
//   };

//   const handleCloseLoginPopup = () => {
//     setIsLoginPopupOpen(false); // Close the login popup
//   };

//   return (
//     <div className="bg-[#FFCCCC]">
//       <div className="container flex flex-col py-14">
//         <div>
//           <img
//             src={FindSomeoneIcon}
//             alt="find someone special"
//             className="size-28 mx-auto"
//           />
//         </div>
//         <div>
//           <h1 className="text-ash text-center text-3xl font-bold">
//             Find that someone special
//           </h1>
//         </div>

//         <div className="mt-8 flex items-center">
//           <div className="bg-white grid grid-cols-3 px-5 py-3 text-ashSecondary divide-x-2 divide-gray w-full rounded-l-md">
//             <div className="pr-3">
//               <label htmlFor="gender" className="block mb-1">
//                 <IoPersonCircle className="text-[22px]" />
//               </label>
//               <select
//                 name="gender"
//                 id="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 className="outline-none py-1.5 rounded w-full"
//               >
//                 <option value="" disabled>
//                   Gender
//                 </option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="others">Others</option>
//               </select>
//             </div>

//             <div className="px-3">
//               <label htmlFor="profession" className="block mb-1">
//                 <FaSuitcase className="text-[22px]" />
//               </label>
//               <select
//                 name="profession"
//                 id="profession"
//                 value={formData.profession}
//                 onChange={handleInputChange}
//                 className="outline-none py-1.5 rounded w-full"
//               >
//                 <option value="" disabled>
//                   {loading ? "Loading..." : error ? error : "Profession"}
//                 </option>
//                 {!loading &&
//                   !error &&
//                   professions.map((profession) => (
//                     <option
//                       key={profession.Profes_Pref_id}
//                       value={profession.Profes_name}
//                     >
//                       {profession.Profes_name}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             <div className="px-3">
//               <label htmlFor="age" className="block mb-1">
//                 <IoCalendar className="text-[22px]" />
//               </label>
//               <select
//                 name="ageRange"
//                 id="age"
//                 value={formData.ageRange}
//                 onChange={handleInputChange}
//                 className="outline-none py-1.5 rounded w-full"
//               >
//                 <option value="" disabled>
//                   Age
//                 </option>
//                 <option value="18 - 21">18 - 21</option>
//                 <option value="22 - 25">22 - 25</option>
//                 <option value="26 - 30">26 - 30</option>
//               </select>
//             </div>
//           </div>

//           <div className="w-1/5">
//             <button
//               className="bg-primary flex justify-center items-center py-7 w-full text-lg tracking-wide text-white rounded-r-md"
//               onClick={handleSearch}
//               disabled={searching}
//             >
//               <MdOutlineSearch className="text-3xl mr-3" />
//               {searching ? "Searching..." : "Find Match"}
//             </button>
//           </div>
//         </div>

//         <div className="mt-8">
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {profiles.length > 0 ? (
//             <div className="grid grid-cols-3 gap-6">
//               {profiles.map((profile) => (
//                 <div
//                   key={profile.profile_id}
//                   className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
//                 >
//                   <img
//                     src={profile.profile_img}
//                     alt={profile.profile_name}
//                     className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
//                   />
//                   <h3 className="text-xl font-bold mt-4">
//                     {profile.profile_name}
//                   </h3>
//                   <p className="text-gray-600 mt-1">{profile.profession}</p>
//                   <p className="text-gray-600 mt-1">{profile.location}</p>
//                   <div className="flex items-center mt-2">
//                     <span className="text-sm text-gray-600">
//                       Age: {profile.profile_age}
//                     </span>
//                   </div>
//                   <div className="flex items-center mt-2">
//                     <span className="text-sm text-gray-600">
//                       Height: {profile.profile_height}
//                     </span>
//                   </div>
//                   <button
//                     className="bg-primary mt-4 px-4 py-2 text-white rounded-full hover:bg-primary-dark"
//                     onClick={handleViewProfileClick} // Show login popup if not logged in
//                   >
//                     View Profile
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center mt-8 text-gray-600">
//               {searching ? "Searching for profiles..." : "No profiles found."}
//             </p>
//           )}
//         </div>
//       </div>

//       {isLoginPopupOpen && (
//         <LoginPopupModal isopen={isLoginPopupOpen} onClose={handleCloseLoginPopup} onForgetPassword={function (): void {
//           throw new Error("Function not implemented.");
//         } } />
//       )}
//     </div>
//   );
// };

// export default FindSomeone;



import { useState, useEffect } from "react";
import axios from "axios";
import { IoPersonCircle, IoCalendar } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import { useForm } from "react-hook-form";
import FindSomeoneIcon from "../../assets/images/FindSomeone.png";
// import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal";
import { useNavigate } from "react-router-dom";



interface Profession {
  Profes_Pref_id: number;
  Profes_name: string;
}

// interface Profile {
//   profile_id: string;
//   profile_name: string;
//   profile_age: number;
//   profile_img: string;
//   profile_height: string;
//   profession: string;
//   location: string;
// }


const FindProfessionals = () => {
  const [professions, setProfessions] = useState<Profession[]>([]);
  // const [profiles, setProfiles] = useState<Profile[]>([]);
  // const [isLoginPopupOpen, setIsLoginPopupOpen] = useState<boolean>(false); // State for login popup

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Validation will trigger on every change
  });

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await axios.post<Record<string, Profession>>(
          "http://103.214.132.20:8000/auth/Get_Profes_Pref/"
        );
        setProfessions(Object.values(response.data));
      } catch (err) {
        console.error("Failed to fetch profession preferences");
      }
    };

    fetchProfessions();
  }, []);
  const navigate = useNavigate(); // Hook to navigate to the next page

  const handleSearch = async (data: any) => {
    const { gender, profession, ageRange } = data;
    const [fromAge, toAge] = ageRange.split("-");

    try {
      console.log(fromAge);
      console.log(toAge);
      console.log(gender);
      console.log(profession);
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Searchbeforelogin/",
        {
          from_age: fromAge.trim(),
          to_age: toAge.trim(),
          gender: gender,
          profession: profession,
          native_state: "Tamilnadu",
          city: "Trichy",
          received_per_page: "2",
          received_page_number: "1",
        }
      );
      // setProfiles(response.data.data);
      const profiles = response.data.data;
      // Navigate to the FindSomeOneCard page and pass the profiles data via state
      navigate("/FindSomeOneSpecial", { state: { profiles } });
    } catch (err) {
      console.error("Failed to fetch search results");
    }
  };

  // const handleViewProfileClick = () => {
  //   setIsLoginPopupOpen(true); // Open login popup
  // };

  // const handleCloseLoginPopup = () => {
  //   setIsLoginPopupOpen(false); // Close login popup
  // };

  return (
    <div className="bg-[#FFCCCC] max-2xl:px-5">
  <div className="container flex flex-col py-14 max-md:py-10 max-sm:py-8">
    <div>
      <img
        src={FindSomeoneIcon}
        alt="find someone"
        className="size-28 mx-auto max-md:size-16"
      />
    </div>
    <div>
      <h1 className="text-ash text-center text-3xl font-bold max-lg:text-2xl max-md:text-xl max-sm:text-lg">
        Find Professional Matches
      </h1>
    </div>

    {/* {/ Form section /} */}
    <form onSubmit={handleSubmit(handleSearch)} className="mt-8 flex  max-sm:mt-4 max-sm:flex-col">
      <div className="bg-white grid grid-cols-3 px-5 py-3 text-ashSecondary divide-x-2 divide-gray w-full rounded-l-md max-lg:px-4 max-lg:py-2 max-sm:grid-cols-1 max-sm:rounded-none max-sm:rounded-tl-md max-sm:rounded-tr-md max-sm:divide-x-0">
        
        {/* {/ Gender selection /} */}
        <div className="pr-3 flex flex-col items-start justify-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:p-0 max-sm:py-2 max-sm:border-b-[1px] border-gray">
          <label htmlFor="gender" className="block mb-1">
            <IoPersonCircle className="text-[22px]" />
          </label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className="outline-none py-1.5 rounded w-full  max-sm:py-2"
          >
            <option value="" disabled selected>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm ">{String(errors.gender.message)}</p>
          )}
        </div>

        {/* {/ Profession selection /} */}
        <div className="px-3 flex flex-col items-start justify-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:p-0 max-sm:py-2 max-sm:border-b-[1px] border-gray">
          <label htmlFor="profession" className="block mb-1">
            <FaSuitcase className="text-[22px]" />
          </label>
          <select
            id="profession"
            {...register("profession", { required: "Profession is required" })}
            className="outline-none py-1.5 rounded w-full  max-sm:py-2"
          >
            <option value="" disabled selected>
              Profession
            </option>
            {professions.map((profession) => (
              <option
                key={profession.Profes_Pref_id}
                value={profession.Profes_Pref_id}
              >
                {profession.Profes_name}
              </option>
            ))}
          </select>
          {errors.profession && (
            <p className="text-red-500 text-sm">{String(errors.profession.message)}</p>
          )}
        </div>

        {/* {/ Age range selection /} */}
        <div className="px-3 flex flex-col items-start justify-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:p-0 max-sm:py-2">
          <label htmlFor="ageRange" className="block mb-1">
            <IoCalendar className="text-[22px]" />
          </label>
          <select
            id="ageRange"
            {...register("ageRange", { required: "Age range is required" })}
            className="outline-none py-1.5 rounded w-full max-sm:py-2"
          >
            <option value="" disabled selected>
              Age
            </option>
            <option value="18 - 21">18 - 21</option>
            <option value="22 - 25">22 - 25</option>
            <option value="26 - 30">26 - 30</option>
          </select>
          {errors.ageRange && (
            <p className="text-red-500 text-sm ">{String(errors.ageRange.message)}</p>
          )}
        </div>
      </div>

      {/* {/ Search button /} */}
      <div className="w-1/5 max-sm:w-full">
        <button
          className="bg-primary flex justify-center items-center  py-[38px] w-full h-full text-lg  tracking-wide text-white rounded-r-md max-lg:text-[16px]  max-lg:flex-col max-lg:items-start max-lg:px-4 max-lg:py-[10px] max-md:py-[10px] max-md:px-[5px] max-md:flex-col max-md:items-start max-sm:flex-row max-sm:rounded-none max-sm:rounded-bl-md max-sm:rounded-br-md"
          type="submit"
        >
          <MdOutlineSearch className="text-3xl mr-3 max-lg:mr-1" />
          Find Match
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default FindProfessionals;
