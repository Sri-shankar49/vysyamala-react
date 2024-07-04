import FeaturedProfileImg from "../../../assets/images/FeaturedProfileImg.png";
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";

interface FeaturedProfileCardProps {
  profileName: string;
  profileId: string,
  age: string,
  height: string,
}

export const FeaturedProfileCard: React.FC<FeaturedProfileCardProps> = ({ profileName, profileId, age, height }) => {
  return (
    <div>
      <div className="w-10/12 relative fade-bottom mx-auto my-5 cursor-grab">
        <img src={FeaturedProfileImg} alt="" className="w-full" />

        <div className="w-full absolute bottom-0 px-2 py-3 z-10">
          <h5 className="text-white font-semibold">
            {profileName} <span>({profileId})</span>
          </h5>
          <div className="flex justify-between items-center">
            <p className="text-white font-normal flex items-center">
              {" "}
              <IoCalendar className="mr-2" /> {age}
            </p>
            <p className="text-white font-normal flex items-center">
              <FaPersonArrowUpFromLine className="mr-2" /> {height}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
