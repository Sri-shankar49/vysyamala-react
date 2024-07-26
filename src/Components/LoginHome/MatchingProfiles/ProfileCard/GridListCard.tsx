import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { showInterest } from "../../../../redux/slices/interestSlice";
import ProfileListImg from "../../../../assets/images/./ProfileListImg.png";
import { MdVerifiedUser } from "react-icons/md";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { Link } from "react-router-dom";

interface GridListCardProps {
  // onExpressInterest: () => void;
}

export const GridListCard: React.FC<GridListCardProps> = () => {
  // Redux
  // const dispatch = useDispatch();

  // State to track if the card is bookmarked or not
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // const handleCardClick = () => {
  //   dispatch(showInterest());
  // };

  return (
    <Link to="/ProfileDetails" target="_blank">
      <div className="flex justify-start items-center space-x-5 relative rounded-xl shadow-md px-3 py-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-between items-center space-x-5">
            {/* Profile Image */}
            <div className="relative">
              <img src={ProfileListImg} alt="Profile-image" />

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
                <h5
                  // onClick={handleCardClick}
                  className="text-[20px] text-secondary font-semibold cursor-pointer">
                  Harini{" "}
                  <span className="text-sm text-ashSecondary">(VM32787)</span>
                  <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                </h5>
              </div>

              {/* Years & Height */}
              <div className="flex items-center space-x-3 mb-2">
                <p className="flex items-center text-ashSecondary">
                  {/* <IoCalendar className="mr-2" /> */}
                  28 yrs
                </p>

                <p className="text-gray">|</p>

                <p className="flex items-center text-ashSecondary">
                  {/* <FaPersonArrowUpFromLine className="mr-2" /> */}
                  5ft 10in (177 cms)
                </p>
              </div>

              {/* Uthiram */}
              <div className="mb-2">
                <p className="flex items-center text-ashSecondary">
                  {/* <MdStars className="mr-2" /> */}
                  Uthiram
                </p>
              </div>

              {/* Bachelors */}
              <div className="mb-2">
                <p className="flex items-center text-ashSecondary">
                  {/* <IoSchool className="mr-2" /> */}
                  MBA.,
                </p>
              </div>

              {/* Employed */}
              <div className="mb-2">
                <p className="flex items-center text-ashSecondary">
                  {/* <FaSuitcase className="mr-2" /> */}
                  Employed
                </p>
              </div>

              {/* Location */}
              <div className="mb-2">
                <p className="flex items-center text-ashSecondary">
                  {/* <FaLocationDot className="mr-2" /> */}
                  Chennai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
