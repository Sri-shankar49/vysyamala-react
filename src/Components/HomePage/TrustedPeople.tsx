import BrideIcon from "../../assets/images/BrideIcon.png";
import { FaRegCalendar } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { IoTriangle } from "react-icons/io5";

const TrustedPeople = () => {
  return (
    <div className="bg-gray z-50">
      <div className="container mt-14 pt-10 pb-24">
        <div className="flex flex-col justify-center items-center">
          <h1 className="mb-1 text-secondary text-3xl font-bold">
            Trusted by 32K people
          </h1>
          <p>
            Most trusted online matrimonial exclusive for Arya Vysya Community
            since 2008.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative bg-white flex justify-between items-center px-20 py-14 rounded-md">
            <div>
              <h1 className="text-secondary text-3xl font-bold">4308</h1>
              <p className="text-base font-semibold text-ash">
                Active Profiles
              </p>
            </div>

            <div className="absolute bg-white left-[540px] flex-col justify-center items-center py-12 px-10 text-primary rounded-md shadow-lg">
              <div className="absolute -left-3 bottom-48">
                <IoTriangle className="text-2xl" />
              </div>
              <div className="absolute top-0 left-[155px] bg-ash text-xs px-3 py-0.5 text-white rounded-b">
                <h1>Just registered</h1>
              </div>
              <div className="absolute -right-3 bottom-48">
                <IoTriangle className="text-2xl" />
              </div>
              <div>
                <img
                  src={BrideIcon}
                  alt="brideicon"
                  className="size-12 mx-auto"
                />
              </div>
              <div className="mt-3 flex justify-center items-center space-x-3 ">
                <div>
                  <FaRegCalendar />
                </div>
                <h1>28 yrs</h1>
                <span>|</span>
                <div>
                  <MdStars />
                </div>
                <h1>Uthiram</h1>
              </div>
              <div className="mt-3 flex items-center space-x-3">
                <IoSchool />
                <p>Bachelors - Arts/Science/Commerce/B Phil</p>
              </div>
            </div>

            <div>
              <h1 className="text-secondary text-3xl font-bold">32272</h1>
              <p className="text-base font-semibold text-ash">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedPeople;
