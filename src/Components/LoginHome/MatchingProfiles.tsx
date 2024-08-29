import { useState, useEffect, useRef, useContext } from "react";
import { FiFilter } from "react-icons/fi";
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
import { AdvancedSearchPopup } from "./MatchingProfiles/FilterPopup/AdvancedSearchPopup";
import { ProfileContext } from "../../ProfileContext";
import { fetchProfiles } from "../../commonapicall";
// const items = [
//     { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//     { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//     { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
//   ];

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
    sortOrder
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
  const [showAdvancedSearchPopup, setShowAdvancedSearchPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleAdvancedSearchPopup = () => {
    setShowAdvancedSearchPopup(!showAdvancedSearchPopup);
  };

  const closeAdvancedSearchPopup = () => {
    setShowAdvancedSearchPopup(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      closeAdvancedSearchPopup();
    }
  };

  useEffect(() => {
    if (showAdvancedSearchPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAdvancedSearchPopup]);
  const handlePrevious = () => {
    setMatchingProfilePageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setMatchingProfilePageNumber((prev) => Math.min(prev + 1, noOfPages));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (loginuser_profileId) {
        try {
          const data = await fetchProfiles(
            loginuser_profileId,
            MatchingProfilepageNumber,
            MatchingProfileperPage,
            sortOrder
          );

          setMatchingProfileTotalCount(data.total_count);
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      } else {
        console.log("Failed to fetch: No profile ID found");
      }
    };

    fetchData();
  }, [MatchingProfilepageNumber, MatchingProfileperPage, sortOrder]);

  return (
    <div className="">
      <div className="container mx-auto my-10">
        <div>
          <h4 className="text-[24px] text-vysyamalaBlack font-bold">
            Matching Profiles
            <span className="text-sm text-primary font-bold"> (234)</span>
          </h4>
        </div>

        <div className="bg-white flex justify-center items-center rounded-lg space-x-5 shadow-lg my-5 px-3 py-3 md:flex-row sm:flex-col">
          <div className="relative md:w-[150rem] sm:w-full">
            <input
              type="text"
              placeholder="Search Profile ID on Matching Profiles"
              className="w-full bg-white border-r-2 border-gray pl-10 py-3 focus-visible:outline-0"
            />
            <HiOutlineSearch className="absolute top-4 text-[22px] text-ashSecondary" />
          </div>

          <div className="relative md:w-[100rem] sm:w-full">
            <select
              name=""
              id=""
              className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
            >
              <option value="" selected disabled>
                Profession
              </option>
              <option value="doctor">Doctor</option>
              <option value="engineer">Engineer</option>
              <option value="it">IT Professional</option>
            </select>
            <FaSuitcase className="absolute top-3 text-[22px] text-ashSecondary" />
          </div>

          <div className="relative w-full">
            <select
              name=""
              id=""
              className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
            >
              <option value="" selected disabled>
                Age
              </option>
              <option value="two">Twenty Five</option>
              <option value="three">Twenty Six</option>
              <option value="four">Twenty Six</option>
            </select>
            <IoCalendar className="absolute top-3 text-[22px] text-ashSecondary" />
            <div className="absolute top-0 left-[-12px]  w-0.5 h-full bg-gray"></div>
            <div className="absolute top-0 right-[-12px]  w-0.5 h-full bg-gray"></div>
          </div>

          <div className="relative w-full">
            <select
              name=""
              id=""
              className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
            >
              <option value="" selected disabled>
                Location
              </option>
              <option value="two">Andhra Pradesh</option>
              <option value="three">Telangana</option>
              <option value="four">Karnataka</option>
              <option value="five">Pondicherry</option>
              <option value="six">TamilNadu</option>
            </select>
            <FaLocationDot className="absolute top-3 text-[22px] text-ashSecondary" />
            <div className="absolute top-0 right-[-12px]  w-0.5 h-full bg-gray"></div>
          </div>

          <div onClick={handleAdvancedSearchPopup} className="w-fit">
            <FiFilter className="text-[22px] text-secondary mx-5 my-3 cursor-pointer" />
            {showAdvancedSearchPopup && (
              <div
                ref={popupRef}
                onClick={(e) => e.stopPropagation()}
                className="relative"
              >
                <AdvancedSearchPopup closePopup={closeAdvancedSearchPopup} />
              </div>
            )}
          </div>

          <div className="w-full">
            <button className="w-full bg-gradient text-white rounded-r-[6px] font-semibold px-8 py-3">
              Find Match
            </button>
          </div>
        </div>

        {/* Icon Sort */}
        <div className="flex justify-between items-center">
          {/* View icons */}
          <div className="flex justify-start items-start">
            <div
              className={`border-[1px] border-ashSecondary rounded-l-md p-2 cursor-pointer
                ${currentView === "gridlist" ? "" : ""}`}
              title="Gridlist View"
              onClick={() => setCurrentView("gridlist")}
            >
              <HiMiniViewColumns
                className={`text-[22px] 
                    ${currentView === "gridlist"
                    ? "text-secondary"
                    : "text-ashSecondary"
                  } hover:text-secondary}`}
              />
            </div>
            <div
              className={`border-[1px] border-ashSecondary p-2 cursor-pointer 
                ${currentView === "list" ? "" : ""}}`}
              title="List View"
              onClick={() => setCurrentView("list")}
            >
              <ImMenu
                className={`text-[22px] ${currentView === "list"
                    ? "text-secondary"
                    : "text-ashSecondary"
                  } hover:text-secondary}`}
              />
            </div>
            <div
              className={`border-[1px] border-ashSecondary rounded-r-md p-2 cursor-pointer
                 ${currentView === "grid" ? "" : ""}}`}
              title="Grid View"
              onClick={() => setCurrentView("grid")}
            >
              <BsFillGrid3X3GapFill
                className={`text-[22px] ${currentView === "grid"
                    ? "text-secondary"
                    : "text-ashSecondary"
                  } hover:text-secondary}`}
              />
            </div>
          </div>

          {/* Sort my date */}
          <button onClick={toggleSortOrder} className="flex justify-start items-center">
            <BsSortDown className="text-[22px] text-ashSecondary cursor-pointer hover:text-secondary mr-2" />
            {/* <BsSortUp /> */}
            <p className="text-vysyamalaBlack font-semibold">Sort by date</p>
          </button>
        </div>

        <div>
          {/* Conditionally render views based on currentView state */}
          {currentView === "gridlist" && <GridListView />}
          {currentView === "list" && <ListView />}
          {currentView === "grid" && <GridView />}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
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
                <button
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-secondary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {/* {/ Generate Page Numbers Dynamically /} */}
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
                </button>

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
      </div>
    </div>
  );
};
