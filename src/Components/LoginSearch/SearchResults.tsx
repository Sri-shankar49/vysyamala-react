import React, { useState, useContext } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { HiMiniViewColumns } from "react-icons/hi2";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
// import { BsSortDown } from "react-icons/bs";
// import { BsSortUp } from "react-icons/bs";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { GridView } from "../LoginHome/MatchingProfiles/GridView";
import { ListView } from "../LoginHome/MatchingProfiles/ListView";
import { GridListView } from "../LoginHome/MatchingProfiles/GridListView";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { SuggestedProfiles } from "../LoginHome/SuggestedProfiles";
import { ProfileContext } from "../../ProfileContext";

interface SearchResultsProps {
  onSearchAgain: () => void; // Call back function to trigger search again when user clicks on search again button
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  onSearchAgain,
}) => {
  // View state changed
  const [currentView, setCurrentView] = useState("gridlist");

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const { setPageNumber, perPage, totalCount, pageNumber } = context;

  const noOfPages = Math.ceil(totalCount / perPage);

  const handlePrevious = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPageNumber((prev) => Math.min(prev + 1, noOfPages));
  };

  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline
            className="text-[24px] mr-2 cursor-pointer"
            onClick={onSearchAgain}
          />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
            {" "}
            Search results
            <span className="text-sm text-primary"> (234)</span>
          </h4>
        </div>

        <div className="relative flex justify-center items-center bg-white rounded-lg p-1.5 shadow-md">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search by Profile ID"
            className="w-full rounded-l-lg px-10 py-3 focus-visible:outline-none"
          />
          <HiOutlineSearch className="absolute left-3 top-5 text-[22px] text-ashSecondary" />

          <button className="w-[200px] bg-gradient text-white rounded-r-[6px] font-semibold px-8 py-3">
            Find Match
          </button>
        </div>

        {/* Icon Sort */}
        <div className="flex justify-between items-center mt-10">
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
                    ${
                      currentView === "gridlist"
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
                className={`text-[22px] ${
                  currentView === "list"
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
                className={`text-[22px] ${
                  currentView === "grid"
                    ? "text-secondary"
                    : "text-ashSecondary"
                } hover:text-secondary}`}
              />
            </div>
          </div>

          {/* Sort my date */}
          <div className="flex justify-start items-center">
            <HiAdjustmentsVertical className="text-[22px] text-ashSecondary cursor-pointer hover:text-secondary mr-2" />
            {/* <BsSortUp /> */}
            <p className="text-vysyamalaBlack font-semibold">Advanced Filter</p>
          </div>
        </div>

        <div>
          {/* Conditionally render views based on currentView state */}
          {currentView === "gridlist" && (
            <GridListView
              profile_name={""}
              profile_id={undefined}
              profile_age={undefined}
              height={undefined}
              searchResult={undefined}
            />
          )}
          {currentView === "list" && (
            <ListView
              profile_name={""}
              profile_id={undefined}
              profile_age={undefined}
              height={undefined}
              searchResult={undefined}
            />
          )}
          {currentView === "grid" && (
            <GridView
              profile_name={""}
              profile_id={undefined}
              profile_age={undefined}
              height={undefined}
              searchResult={undefined}
            />
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray  px-4 py-3 sm:px-6">
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
                Showing{" "}
                <span className="font-medium">
                  {(pageNumber - 1) * perPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(pageNumber * perPage, totalCount)}
                </span>{" "}
                of <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={handlePrevious}
                  disabled={pageNumber === 1} // Disable if on the first page
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    pageNumber === 1 ? "cursor-not-allowed" : ""
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <IoChevronBackOutline
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </button>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                {/* {/ Generate Page Numbers Dynamically /} */}
                {[...Array(noOfPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPageNumber(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      pageNumber === index + 1
                        ? "bg-secondary text-white"
                        : "text-primary hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={handleNext}
                  disabled={pageNumber === noOfPages} // Disable if on the last page
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    pageNumber === noOfPages ? "cursor-not-allowed" : ""
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <IoChevronForwardOutline
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <SuggestedProfiles />
    </div>
  );
};
