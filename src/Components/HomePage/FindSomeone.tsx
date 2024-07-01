import FindSomeoneIcon from "../../assets/images/FindSomeone.png";
import { IoPersonCircle } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
// import { FaRegCalendar } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";

const FindSomeone = () => {
  return (
    <div className="bg-[#FFCCCC] ">
      <div className="container flex flex-col py-14">
        <div>
          <img
            src={FindSomeoneIcon}
            alt="findsomeone special"
            className="size-28 mx-auto"
          />
        </div>

        <div>
          <h1 className="text-ash text-center text-3xl font-bold">
            Find that someone special
          </h1>
        </div>

        <div className="mt-8 flex items-center">
          <div className="bg-white grid grid-cols-3 px-5 py-3 text-ashSecondary divide-x-2 divide-gray w-full rounded-l-md">
            <div className="pr-3">
              <label htmlFor="gender" className="block mb-1">
                <IoPersonCircle className="text-[22px]" />
              </label>
              <select
                name="gender"
                id="gender"
                className="outline-none py-1.5 rounded w-full"
              >
                <option value="" selected disabled>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="px-3">
              <label htmlFor="profession" className="block mb-1">
                <FaSuitcase className="text-[22px]" />
              </label>
              <select
                name="profession"
                id="profession"
                className="outline-none py-1.5 rounded w-full"
              >
                <option value="" selected disabled>
                  Profession
                </option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="px-3">
              <label htmlFor="age" className="block mb-1">
                <IoCalendar className="text-[22px]" />
              </label>
              <select
                name="age"
                id="age"
                className="outline-none py-1.5 rounded w-full"
              >
                <option value="" selected disabled>
                  Age
                </option>
                <option value="18 - 21">18 - 21</option>
                <option value="21 - 25">21 - 25</option>
                <option value="26 - 30">26 - 30</option>
              </select>
            </div>
          </div>

          <div className="w-1/5">
            <button className="bg-primary flex justify-center items-center py-7 w-full text-lg tracking-wide text-white rounded-r-md">
              <MdOutlineSearch className="text-3xl mr-3" />
              Find Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindSomeone;
