import BrideIcon from "../../assets/images/BrideIcon.png";
import MenIcon from "../../assets/icons/men.png"
import { FaRegCalendar } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
// import { IoTriangle } from "react-icons/io5";
import { justRegistered } from "../../commonapicall";
import { useEffect, useState } from "react";
import './TrustedPeople.css'; // Import CSS for sliding animations

const TrustedPeople = () => {
  const [activeProfile, setActiveProfile] = useState<number>();
  const [happyCustomers, setHappyCustomers] = useState<number>(0);
  const [cardData, setCardData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSliding, setIsSliding] = useState<boolean>(false); // State to handle sliding effect

  const fetchGalleryItems = async () => {
    try {
      const response = await justRegistered();
      setHappyCustomers(response?.data.happy_customers_count);
      setActiveProfile(response?.data.active_profiles_count);
      setCardData(response?.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Rotate through cardData every 2 seconds with sliding effect
  useEffect(() => {
    if (cardData.length > 0) {
      const interval = setInterval(() => {
        setIsSliding(true); // Start sliding out
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length); // Update card data
          setIsSliding(false); // Start sliding in
        }, 500); // Match sliding animation duration
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [cardData]);

  const currentCard = cardData[currentIndex];

  return (
    <div className="bg-trustedWhite   overflow-hidden max-2xl:px-5 ">
      <div className="container  mt-28 mb-36 max-lg:mt-24 max-lg:mb-28 max-md:mt-14 max-mb-15 max-sm:mt-8 max-sm:mb-8 ">
        <div className="flex flex-col justify-center items-center mb-20 max-md:mb-4">
          <h1 className="text-secondary text-3xl font-bold mb-4 max-lg:text-[30px] max-md:text-[28px] max-sm:text-[24px] max-sm:mb-2">
            Trusted by 32K people
          </h1>
          <p className="text-xl text-ash text-center max-md:text-medium max-sm:text-base">
            Most trusted online matrimonial exclusive for Arya Vysya Community
            since 2008.
          </p>
        </div>

        <div className="mt-16 max-md:mt-16 max-sm:mt-10 relative">
          <div className=" bg-white flex justify-between items-center px-20 py-10 rounded-xl shadow-trustedBoxShadow  max-lg:px-10 max-md:px-5 max-md:py-15 max-sm:flex-col max-sm:gap-y-80 max-sm:py-8 max-sm:px-5 max-sm:w-[70%] max-sm:mx-auto">

            <div className="text-center">
              <h1 className="text-secondary text-4xl font-bold mb-2 max-lg:text-4xl max-md:text-4xl max-sm:text-center">
                {activeProfile}
              </h1>
              <p className="text-base font-semibold text-ash max-sm:text-center">Active Profiles</p>
            </div>

            {/* card field with sliding effect */}
            {currentCard && (
              <div
                className={`absolute bg-white left-0 right-0 z-[0] mx-auto w-[25%] flex-col justify-center items-center py-10 px-10 text-primary rounded-md shadow-trustedBoxShadow transition-all duration-500 max-xl:w-[40%]  max-lg:w-[45%] max-md:w-[45%] max-sm:w-[100%] max-sm:top-[28%] max-sm:py-10 max-sm:px-4 ${isSliding ? 'slide-out' : 'slide-in'
                  }`}
              >


                {/* <div className="absolute -left-3 top-0 z-[-1] ">
                  <IoTriangle className="text-2xl" />
                </div> */}
                <div className="absolute top-0 left-0 right-0 w-fit mx-auto bg-ash text-xs px-3 py-0.5 text-white rounded-b">
                  <h1>Just registered</h1>
                </div>
                {/* <div className="absolute -right-2 top-0 z-[-1]">
                  <IoTriangle className="text-2xl" />
                </div> */}


                <div>
                  <img src={currentCard.gender === "male" ? MenIcon : BrideIcon} alt="brideicon" className="size-12 mx-auto" />
                </div>
                <div className="mt-3 flex flex-col justify-between items-center space-x-3 gap-y-2">
                  <p className="text-xl text-secondary font-semibold">Harini</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <FaRegCalendar />
                    </div>
                    <h1>{currentCard.age} yrs</h1>
                    <span>|</span>
                    <div>
                      <MdStars />
                    </div>
                    <h1>{currentCard.birthstar}</h1>
                  </div>
                  <div>
                    <div className=" flex items-center space-x-3">
                      <IoSchool />
                      <p>{currentCard.education}</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* card field */}
            <div className="text-center">
              <h1 className="text-secondary text-4xl font-bold mb-2 max-lg:text-4xl max-md:text-4xl max-sm:text-center">{happyCustomers}</h1>
              <p className="text-base font-semibold text-ash max-sm:text-center">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedPeople;
