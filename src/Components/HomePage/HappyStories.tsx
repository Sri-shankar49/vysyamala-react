import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MarriedSlick from "./HappyStories/MarriedSlick";
import { PopupModal } from "./PopUpsReg/PopupModal";
import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

export interface HappyStoriesType {
  couple_name: string;
  details: string;
  photo: string;
}

const HappyStories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    arrows:false,
    pauseOnHover: true,
    rtl: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },

    ],
  };

  const [happyCouples, setHappyCouples] = useState<HappyStoriesType[]>([]);
  const [isAccountSetupOpen, setIsAccountSetupOpen] = useState(false);
  let isLoginPopupOpen

  const fetchHappyStories = async () => {
    try {
      const response = await axios.post("http://103.214.132.20:8000/auth/Success_stories/");
      setHappyCouples(response.data.data);
    } catch (error) {
      console.error("Error fetching happy stories:", error);
    }
  };

  useEffect(() => {
    fetchHappyStories();
  }, []);

  const handleRegisterClick = () => setIsAccountSetupOpen(true);
  const handleCloseAccountSetup = () => {
    setIsAccountSetupOpen(false);
    console.log("Closing PopupModal popup");
  };



  function handleCloseLoginPopup(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container py-10 max-2xl:px-5 overflow-hidden max-md:py-10 max-sm:py-4">
  <div>
    <h1 className="mb-2 text-primary text-3xl font-bold max-lg:text-2xl max-lg:pb-2 max-md:text-xl max-sm:text-xl">
      Happy Stories
    </h1>
    <p className="text-lg max-md:text-base">
      “Faith makes all things possible. Love makes all things easy.” Check out some of our soul mate unions
    </p>
  </div>

  <div className="mt-10 hover:cursor-grab">
    {happyCouples.length > 0 ? (
      <Slider {...settings}>
        {happyCouples.map((data, index) => (
          <MarriedSlick key={index} data={data} />
        ))}
      </Slider>
    ) : (
      <p>No stories available.</p>
    )}
  </div>

  <div className="mt-14 flex flex-col justify-center items-center space-y-8 max-lg:space-y-5 max-lg:mt-10 max-sm:mt-8 max-sm:space-y-4">
    <div>
      <h2 className="text-center text-primary text-lg font-semibold pb-2 max-md:text-base">
        Now it’s time to write your
      </h2>
      <h1 className="text-center text-primary text-3xl font-bold max-lg:text-2xl max-md:text-2xl max-sm:text-[20px]">
        Happy stories with us
      </h1>
    </div>
    <div>
      <button
        onClick={handleRegisterClick}
        className="bg-gradient flex items-center text-white px-10 py-3 rounded-md tracking-wide max-md:px-5 max-sm:px-3"
      >
        Register Free
        <FaArrowRightLong className="ml-3 text-white text-[22px]" />
      </button>
    </div>
  </div>

  <div className="relative px-60 pt-24 pb-16 max-lg:pt-10 max-lg:pb-8 max-lg:px-12 max-md:px-6 max-md:pb-0 max-sm:px-0 max-sm:py-8">
    <iframe
      width={"100%"}
      height={500}
      src="https://www.youtube.com/embed/-q00JIjstxo?si=kzNSDsMpSfef1BuY"
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="mx-auto rounded-3xl max-lg:h-80 max-md:h-80 "
    />
  </div>

  {isAccountSetupOpen && <PopupModal onClose={handleCloseAccountSetup} />}
  {isLoginPopupOpen && (
    <LoginPopupModal
      onClose={handleCloseLoginPopup}
      onForgetPassword={() => {
        // Placeholder for forget password functionality
        console.log("Forget password clicked");
      }}
      isopen={false}
    />
  )}
</div>

  );
};

export default HappyStories;
