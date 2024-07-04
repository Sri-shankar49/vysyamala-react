import React, { useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

interface SuggestedCardProps {
  profileImg?: string;
  profileId: string;
  age: string;
  height: string;
}

export const SuggestedCard: React.FC<SuggestedCardProps> = ({
  profileImg,
  profileId,
  age,
  height,
}) => {
  // State to track if the card is bookmarked or not
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  return (
    <div className="relative w-fit mx-auto bg-white rounded-xl shadow-md px-3 py-3 my-5 cursor-grab">
      <div className="mb-3">
        <img src={profileImg} alt="" className="w-full" />
      </div>
      <div>
        <h4 className="text-secondary text-[20px] font-semibold">
          Harini{" "}
          <span className="text-vysyamalaBlack text-[12px] font-bold">
            ({profileId})
          </span>
        </h4>
        <div className="flex justify-between items-center">
          <p className="text-primary flex items-center">
            <IoCalendar className="mr-2" /> {age} yrs{" "}
          </p>
          <p className="text-primary flex items-center">
            {" "}
            <FaPersonArrowUpFromLine className="mr-2" /> {height}
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
    </div>
  );
};
