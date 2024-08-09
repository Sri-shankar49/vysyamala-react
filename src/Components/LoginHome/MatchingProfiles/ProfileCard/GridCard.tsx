import React, { useState } from "react";
import GridProfileImg from "../../../../assets/images/GridProfileImg.png";
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { Link } from "react-router-dom";

interface GridCardProps {
  profile: {
    profile_id: string;
    profile_name: string;
    profile_age: number;
    height: string;
    profile_img: string;
  };
}

export const GridCard: React.FC<GridCardProps> = ({ profile }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="relative w-11/12 rounded-xl shadow-md px-3 py-3 mx-auto">
      <Link to={`/ProfileDetails/${profile.profile_id}`} target="_blank">
        <div className="mb-3">
          <img
            src={profile.profile_img || GridProfileImg}
            alt={"default"}
            className="w-full"
          />
        </div>
        <div>
          <h4 className="text-secondary text-[20px] font-semibold cursor-pointer">
            {profile.profile_name}{" "}
            <span className="text-vysyamalaBlack text-[12px] font-bold">
              ({profile.profile_id})
            </span>
          </h4>
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
