import { useState, useEffect, useRef, useContext } from "react";

import { HiOutlineSearch } from "react-icons/hi";
import { FaSuitcase } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniViewColumns } from "react-icons/hi2";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
import { BsSortDown } from "react-icons/bs";
// import { BsSortUp } from "react-icons/bs";
import { GridView } from "./MatchingProfiles/GridView";
import { ListView } from "./MatchingProfiles/ListView";
import { GridListView } from "./MatchingProfiles/GridListView";
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";

import { Profile, ProfileContext } from "../../ProfileContext";
import { fetchProfiles, fetchSearchProfiles } from "../../commonapicall";
import axios from "axios";
// import { AdvancedSearchPopup } from "./MatchingProfiles/FilterPopup/AdvancedSearchPopup";
import { FiFilter } from "react-icons/fi";
// import { number } from "zod";
import { SearchCard } from "../SearchCard";

// const items = [
//     { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//     { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//     { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
//   ];

// export interface SearchResultProps {
//   profile_name: string;
//   profile_id: any;
//   profile_age: any;
//   height: any;
//   profile_img: string;
//   searchResult: any; // Replace 'any' with the appropriate type if you know the structure
// }
interface ProfesPrefType {
  Profes_Pref_id: number;
  Profes_name: string;
}


interface State {
  State_Pref_id: string;
  State_id: string; // Adjust the type if it's a number or another type
  State_name: string;
}
export interface SearchResultProps {
  profile_name: string;
  profile_id: string;
  profile_age: string;
  height: string;
  profile_img?: string;
  matching_score?: number; 

}

const defaultProfile: Profile = {
  profile_id: "0",
  profile_name: "No Profile",
  profile_img: "N/A", // Use a default or placeholder image
  profile_age: 0,
  height: "N/A",
  profile: undefined,
  verified: 0,
  matching_score: 50,

};



sessionStorage.removeItem("photolock");
sessionStorage.removeItem("photolockval");


export const MatchingProfiles = () => {
  const context = useContext(ProfileContext);

  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    MatchingProfileperPage,
    MatchingProfilepageNumber,
    MatchingProfiletotalCount,
    setMatchingProfilePageNumber,
    setMatchingProfileTotalCount,
    toggleSortOrder,
    sortOrder,
  } = context;
  const startResult =
    (MatchingProfilepageNumber - 1) * MatchingProfileperPage + 1;
  const endResult = Math.min(
    MatchingProfilepageNumber * MatchingProfileperPage,
    MatchingProfiletotalCount
  );

  const noOfPages = Math.ceil(
    MatchingProfiletotalCount / MatchingProfileperPage
  );

  // View state changed
  const [currentView, setCurrentView] = useState("gridlist");

  // Function to sort profiles by name and toggle order

  // Advanced Popup Show
  let showAdvancedSearchPopup;
  // const [showAdvancedSearchPopup, setShowAdvancedSearchPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [Get_Profes_Pref, setGet_Profes_Pref] = useState<ProfesPrefType[]>([]);
  const [profession, setProfession] = useState<string>("");



  const handleAdvancedSearchPopup = () => {
    setProfession('');
    setSelectAge('');
    setSelectedLocation('');
    setSelectedLocation('');
    sessionStorage.removeItem("searchvalue");
  };

  const [states, setStates] = useState<State[]>([]); // Adjust the State type according to the response structure
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectAge, setSelectAge] = useState<string>("");
  console.log(selectedLocation);

  // const closeAdvancedSearchPopup = () => {
  //   setShowAdvancedSearchPopup(false);
  // };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
  //     closeAdvancedSearchPopup();
  //   }
  // };

  const [searchProfileId, setSearchProfileId] = useState("");
  const [, setSearchStatus] = useState<number>();
  const [searchResult, setSearchResult] = useState<any[]>([]);

  // useEffect(() => {
  //   if (showAdvancedSearchPopup) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showAdvancedSearchPopup]);
  const handlePrevious = () => {
    setMatchingProfilePageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setMatchingProfilePageNumber((prev) => Math.min(prev + 1, totalPageCount));
  };

  const handleMatchingPrevious = () => {
    setPaginationValue((prev) => Math.max(prev - 1, 1));
  };

  const handleMatchingNext = () => {
    setPaginationValue((prev) => Math.min(prev + 1, noOfPages));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfiles(
          loginuser_profileId,
          MatchingProfilepageNumber,
          MatchingProfileperPage,
          sortOrder,

        );

        setMatchingProfileTotalCount(data.total_count);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchData();
  }, [loginuser_profileId, MatchingProfilepageNumber, MatchingProfileperPage, sortOrder, setMatchingProfileTotalCount]);


  const pegeDataCount = 20
  const totalCount = sessionStorage.getItem("searchCount");

  const totalPageCount = Math.ceil(Number(totalCount) / pegeDataCount) || 0;
  const [paginationValue, setPaginationValue] = useState(1)

  const handleFindMatch = async () => {
    console.log("valuessss",searchProfileId, profession, selectAge, selectedLocation);
    try {
      const result = await fetchSearchProfiles(searchProfileId, profession, selectAge, selectedLocation, paginationValue);
      console.log("Search result:", result.profiles);
      console.log("Search value:", result.search_result);
      console.log("Search status:", result.Status);
      sessionStorage.setItem("searchvalue", result.search_result);

      sessionStorage.setItem("searchCount", result.total_count);
      setSearchStatus(result.Status);
      // Set the response data in the state
      setSearchResult(result.profiles);
    } catch (error) {
      console.error("Search failed:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    if (paginationValue > 1) {
      handleFindMatch()
    }
  }, [paginationValue])
  //console.log(searchResult);
  //console.log(matchingProfileSearchId, "matchingProfileSearchId");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchProfileId(value || '');
    sessionStorage.removeItem("searchvalue");

    if (value.trim() === "") {
      // Clear the session storage when the input field is empty
      sessionStorage.removeItem("searchvalue");
    }
  };
  const searchvalue = sessionStorage.getItem("searchvalue") || " ";

  useEffect(() => {
    const fetchProfesPref = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Profes_Pref/"
        );

        // Assuming response.data is an object, transform it to an array
        const profesPrefArray = Object.values(
          response.data
        ) as ProfesPrefType[];

        setGet_Profes_Pref(profesPrefArray);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchProfesPref();
  }, []);



  //state

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_State_Pref/"
        );

        // Assuming response.data is an object, transform it to an array of State
        const statesArray = Object.values(response.data) as State[];

        setStates(statesArray);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchStates();
  }, []);

  return (
    <div className="">
      <div className="container mx-auto my-10">
        <div>
          <h4 className="text-[24px] text-vysyamalaBlack font-bold">
            Matching Profiles
            <span className="text-sm text-primary font-bold">
              {" "}
              ({MatchingProfiletotalCount})
            </span>
          </h4>
        </div>

        <div className="bg-white flex justify-center items-center rounded-lg space-x-5 shadow-lg my-5 px-3 py-3 md:flex-row sm:flex-col">
          <div className="relative md:w-[150rem] sm:w-full">
            <input
              type="text"
              placeholder="Search Profile ID on Matching Profiles"
              className="w-full bg-white border-r-2 border-gray pl-10 py-3 focus-visible:outline-0"
              value={searchProfileId}
              onChange={handleInputChange}
            />
            <HiOutlineSearch className="absolute top-4 text-[22px] text-ashSecondary" />
          </div>

          <div className="relative md:w-[100rem] sm:w-full">
            <select
              value={profession} // Bind the value of the select to the profession state
              onChange={(e) => setProfession(e.target.value)}
              name=""
              id=""
              className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
            >
              <option value="" selected disabled>
                Profession
              </option>
              {Get_Profes_Pref.map((profession) => (
                <option
                  key={profession.Profes_Pref_id}
                  value={profession.Profes_Pref_id}
                >
                  {profession.Profes_name}
                </option>
              ))}
            </select>
            <FaSuitcase className="absolute top-3 text-[22px] text-ashSecondary" />
          </div>

          <div className="relative w-full">
            <select
              value={selectAge}
              onChange={(e) => setSelectAge(e.target.value)}
              name=""
              id=""
              className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
            >
              <option value="" selected disabled>
                Age
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <IoCalendar className="absolute top-3 text-[22px] text-ashSecondary" />
            <div className="absolute top-0 left-[-12px]  w-0.5 h-full bg-gray"></div>
            <div className="absolute top-0 right-[-12px]  w-0.5 h-full bg-gray"></div>
          </div>

          <div className="relative w-full">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              name=""
              id=""
              className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
            >
              <option value="" selected disabled>
                Location
              </option>
              {states.map((state) => (
                <option key={state.State_Pref_id} value={state.State_Pref_id}>
                  {state.State_name}
                </option>
              ))}
            </select>
            <FaLocationDot className="absolute top-3 text-[22px] text-ashSecondary" />
            <div className="absolute top-0 right-[-12px]  w-0.5 h-full bg-gray"></div>
          </div>

          <div onClick={handleAdvancedSearchPopup} className="w-fit" >
            <FiFilter className="text-[22px] text-secondary mx-5 my-3 cursor-pointer" />
            {showAdvancedSearchPopup && (
              <div
                ref={popupRef}
                onClick={(e) => e.stopPropagation()}
                className="relative"
              >
                {/* <AdvancedSearchPopup closePopup={closeAdvancedSearchPopup} /> */}
              </div>
            )}
          </div>

          <div className="w-full">
            <button
              // disabled={!searchProfileId}
              className="w-full bg-gradient text-white rounded-r-[6px] font-semibold px-8 py-3 mt-4"
              onClick={handleFindMatch}
            >
              Find Match
            </button>
          </div>
        </div>


        {/* Icon Sort */}
        <div className="flex justify-between items-center">
          {/* View icons */}
          {searchvalue !== "1" && (
            <div className="flex justify-start items-start">
              <div
                className={`border-[1px] border-ashSecondary rounded-l-md p-2 cursor-pointer
        ${currentView === "gridlist" ? "bg-lightGray" : ""}`}
                title="Gridlist View"
                onClick={() => setCurrentView("gridlist")}
              >
                <HiMiniViewColumns
                  className={`text-[22px] 
          ${currentView === "gridlist" ? "text-secondary" : "text-ashSecondary"} 
          hover:text-secondary`}
                />
              </div>
              <div
                className={`border-[1px] border-ashSecondary p-2 cursor-pointer
        ${currentView === "list" ? "bg-lightGray" : ""}`}
                title="List View"
                onClick={() => setCurrentView("list")}
              >
                <ImMenu
                  className={`text-[22px] 
          ${currentView === "list" ? "text-secondary" : "text-ashSecondary"} 
          hover:text-secondary`}
                />
              </div>
              <div
                className={`border-[1px] border-ashSecondary rounded-r-md p-2 cursor-pointer
        ${currentView === "grid" ? "bg-lightGray" : ""}`}
                title="Grid View"
                onClick={() => setCurrentView("grid")}
              >
                <BsFillGrid3X3GapFill
                  className={`text-[22px] 
          ${currentView === "grid" ? "text-secondary" : "text-ashSecondary"} 
          hover:text-secondary`}
                />
              </div>
            </div>
          )}

          {searchvalue !== "1" && (
            // Sort by date button
            <button
              onClick={toggleSortOrder}
              className="flex justify-start items-center"
            >
              <BsSortDown className="text-[22px] text-ashSecondary cursor-pointer hover:text-secondary mr-2" />
              {/* You can uncomment this if you have an alternative sorting direction */}
              {/* <BsSortUp /> */}
              <p className="text-vysyamalaBlack font-semibold">Sort by date</p>
            </button>
          )}

        </div>
        {searchvalue !== "1" && (

          <div className="jhjgj">
            {/* Conditionally render views based on currentView state */}
            {/* {currentView === "gridlist" && <GridListView />}
          {currentView === "list" && <ListView />}
          {currentView === "grid" && <GridView />} */}


            {currentView === "gridlist" && (
              <GridListView
                searchResult={searchResult}
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                profile_img={""}
              />
            )}
            {currentView === "grid" && (
              <GridView
                searchResult={searchResult}
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                profile_img={""}
              />

            )}


            {currentView === "list" && (
              <ListView
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                profile_img={""}
              />
            )}
          </div>
        )}

        {searchvalue === "1" && (
        <div>
          <SearchCard profile={defaultProfile} searchvalues={searchResult} />
        </div>
        )}
        {/* Pagination */}
        <>
          {!Array.isArray(searchResult) && (
            <div className="flex items-center justify-between border-t border-gray bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  onClick={handlePrevious}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  onClick={handleNext}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-primary">
                    Showing <span className="font-medium">{startResult}</span> to{" "}
                    <span className="font-medium">{endResult}</span> of{" "}
                    <span className="font-medium">{MatchingProfiletotalCount}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={handlePrevious}
                      disabled={MatchingProfilepageNumber === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <IoChevronBackOutline
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    {[...Array(noOfPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setMatchingProfilePageNumber(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${MatchingProfilepageNumber === index + 1
                          ? "bg-secondary text-white"
                          : "text-primary hover:bg-gray-50"
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={handleNext}
                      disabled={MatchingProfilepageNumber === noOfPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <IoChevronForwardOutline
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
        {/* {} */}
        <>
          {Array.isArray(searchResult) && (
            <div className="flex items-center justify-between border-t border-gray bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={handleMatchingPrevious}
                >
                  Previous
                </button>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={handleMatchingNext}
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-primary">
                    Showing <span className="font-medium">{startResult}</span> to{" "}
                    <span className="font-medium">{endResult}</span> of{" "}
                    <span className="font-medium">{MatchingProfiletotalCount}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={handleMatchingPrevious}
                      disabled={paginationValue === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <IoChevronBackOutline
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                    {[...Array(totalPageCount)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setPaginationValue(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${paginationValue === index + 1
                          ? "bg-secondary text-white"
                          : "text-primary hover:bg-gray-50"
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}


                    <button
                      onClick={handleMatchingNext}
                      disabled={paginationValue === noOfPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <IoChevronForwardOutline
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};
