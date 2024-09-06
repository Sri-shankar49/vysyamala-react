import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroSliderContent } from "../LoginHome/HeroSlider/HeroSliderContent";
import "./HeroSlider/HeroSlickStyle.css";

const defaultSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: false,
  autoplaySpeed: 2000,
  cssEase: "linear",
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

export const HeroSlider = () => {
  const [profileCount, setProfileCount] = useState<number>(0);

  useEffect(() => {
    // Fetch the profile count from the server
    const fetchProfileCount = async () => {
      const response = await fetch(
        "http://103.214.132.20:8000/auth/Get_profile_intrests_list/",
        {
          method: "POST",
          body: JSON.stringify({
            profile_id: sessionStorage.getItem("loginuser_profile_id"),
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data, "data");
      if (data.Status !== 0) {
        setProfileCount(data.data.profiles.length);
      }
    };

    fetchProfileCount();
  }, []);

  // Conditionally set the dots property
  const settings = {
    ...defaultSettings,
    dots: profileCount > 1,
    infinite: profileCount > 1,
    autoplay: profileCount > 1,
  };

  return (
    <section className="bg-heroSliderBgImg bg-no-repeat bg-cover w-full">
      <div className="container mx-auto heroSlickStyle">
        <div className="slider-container">
          <HeroSliderContent settings={settings} />
        </div>
      </div>
    </section>
  );
};
