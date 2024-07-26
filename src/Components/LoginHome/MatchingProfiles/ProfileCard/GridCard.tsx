import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { showInterest } from "../../../../redux/slices/interestSlice";
import GridProfileImg from "../../../../assets/images/GridProfileImg.png";
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { Link } from "react-router-dom";

export const GridCard = () => {
  // Redux
  // const dispatch = useDispatch();

  // const handleCardClick = () => {
  //   dispatch(showInterest());
  // };

  // State to track if the card is bookmarked or not
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };



  return (

    <div className="relative w-11/12 rounded-xl shadow-md px-3 py-3 mx-auto">
      <Link to="/ProfileDetails" target="_blank">

        <div className="mb-3">
          <img src={GridProfileImg} alt="" className="w-full" />
        </div>
        <div>
          <h4
            //  onClick={handleCardClick}
            className="text-secondary text-[20px] font-semibold cursor-pointer">
            Harini{" "}
            <span className="text-vysyamalaBlack text-[12px] font-bold">
              (VM32787)
            </span>
          </h4>
          <div className="flex justify-between items-center">
            <p className="text-primary flex items-center">
              {" "}
              <IoCalendar className="mr-2" /> 28 yrs
            </p>
            <p className="text-primary flex items-center">
              {" "}
              <FaPersonArrowUpFromLine className="mr-2" /> 5ft 10in (177 cms)
            </p>
          </div>
        </div>
        {isBookmarked ? (
          <MdBookmark
            onClick={handleBookmark}
            className="absolute top-5 right-5 text-white text-[22px] cursor-pointer"
          />
        ) : (
          <MdBookmarkBorder
            onClick={handleBookmark}
            className="absolute top-5 right-5 text-white text-[22px] cursor-pointer"
          />
        )}
      </Link>

    </div>
  );
};
