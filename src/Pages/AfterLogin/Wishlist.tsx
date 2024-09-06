// import { ListCard } from '../../Components/LoginHome/MatchingProfiles/ProfileCard/ListCard'
import { useContext, useEffect, useState } from "react";
import { SuggestedProfiles } from "../../Components/LoginHome/SuggestedProfiles";
import { WishlistCard } from "../../Components/Wishlist/WishlistCard";
import { ProfileContext } from "../../ProfileContext";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export const Wishlist = () => {
  useEffect(() => {
    sessionStorage.removeItem("searchvalue");
  }, []);

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const { TotalRecords, totalPage } = context;
  const [page, setPage] = useState<number>(1);
  const perPage = 10


  const startResult = (page - 1) * perPage + 1;

  // Ensure endResult doesn't exceed TotalRecords
  const endResult = Math.min(page * perPage, TotalRecords);


  return (
    <div className="bg-grayBg">
      <div className="container mx-auto py-10">
        <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5">
          Wishlist
          <span className="text-sm text-primary">
            {" "}
            ({TotalRecords?.toString()})
          </span>
        </h4>

        {/* WishlistCard */}
        <div>
          <WishlistCard perPage={perPage} page={page} />
          {/* <WishlistCard />
                    <WishlistCard /> */}
        </div>
      </div>
      {/* Suggested Profiles */}
      <div className="flex items-center justify-between border-t border-gray bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
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
              <span className="font-medium">{TotalRecords}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <IoChevronBackOutline className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {[...Array(totalPage)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === index + 1
                    ? "bg-secondary text-white"
                    : "text-primary hover:bg-gray-50"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={page === totalPage}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
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
      <SuggestedProfiles />
    </div>
  );
};
