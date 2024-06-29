import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrideSlick } from "./Featured/BrideSlick";
import "./Featured/FeaturedSlickStyle.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 3000,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  // autoplaySpeed: 5000,
  cssEase: "linear",
  pauseOnHover: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const FeaturedBride: React.FC = () => {
  return (
    <div className="">
      <div className="container mx-auto mt-10 mb-20">
        <div className="text-center">
          <h4 className="text-primary text-[36px] font-semibold">
            Featured Brides
          </h4>
          <p className="text-primary text-[20px]">
            Dreaming of your partner? Is she a singer? Dancer? It’s time to turn
            this dream into reality! Find some of our brides in the spotlight
            below
          </p>
        </div>

        {/* Bride Slick */}
        <div className="slider-container featuredStyle">
          <Slider {...settings}>
            <BrideSlick profileId={"VM32787"} age={"28"} />
            <BrideSlick profileId={"VM32787"} age={"28"} />
            <BrideSlick profileId={"VM32787"} age={"28"} />
            <BrideSlick profileId={"VM32787"} age={"28"} />
            <BrideSlick profileId={"VM32787"} age={"28"} />
            <BrideSlick profileId={"VM32787"} age={"28"} />
            <BrideSlick profileId={"VM32787"} age={"28"} />
            <BrideSlick profileId={"VM32787"} age={"28"} />
          </Slider>
        </div>
      </div>
    </div>
  );
};
