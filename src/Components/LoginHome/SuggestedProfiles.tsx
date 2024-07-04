// import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SuggestedCard } from "./SuggestedProfiles/SuggestedCard";
import GridProfileImg from "../../assets/images/GridProfileImg.png";
import "./SuggestedProfiles/SuggestedStyle.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: 4,
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

export const SuggestedProfiles = () => {
  return (
    <div className="bg-vysyamalaSandal py-5">
      <div className="container mx-auto my-10">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-[24px] text-vysyamalaBlack font-bold">
              Suggested Profiles{" "}
              <span className="text-sm text-primary font-bold">(234)</span>
            </h4>
          </div>
          <div>
            <button className="flex items-center text-sm text-secondary font-semibold">
              View All <IoChevronForwardOutline className="ml-2" />
            </button>
          </div>
        </div>

        {/* Suggested Profile Slick */}
        <div className="slider-container suggestedStyle">
          <Slider {...settings}>
            <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
            <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
            <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
            <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
            <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
            <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
            <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
            <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
          </Slider>
        </div>
      </div>
    </div>
  );
};
