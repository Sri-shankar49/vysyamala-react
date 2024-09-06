import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MarriedSlick from "./HappyStories/MarriedSlick";

// import Couple from "../../assets/images/Couple.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";

import axios from "axios";
// import { FaCirclePlay } from "react-icons/fa6";
// import { useState } from "react";

export interface happyStoriesType {
  couple_name: string;
  details: string;
  photo: string;
}

const HappyStories = () => {
  // const [videoUrl, setVideoUrl] = useState("insertvideourlhere");

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
    pauseOnHover: true,
    rtl: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
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
  const [happyCouples, setHappyCouples] = useState([]);
  const happyStories = async () => {
    
    const response = await axios.post(
      "http://103.214.132.20:8000/auth/Success_stories/"
    );

    setHappyCouples(response.data.data);
    return response.data
  };

  useEffect(() => {
    happyStories();
  }, []);


  return (
    <div className="container py-10">
      <div>
        <h1 className="mb-2 text-primary text-3xl font-bold">Happy Stories</h1>
        <p className="text-lg">
          “Faith makes all things possible. Love makes all things easy.” Check
          out some of our soul mate unions
        </p>
      </div>

      <div className="mt-10 hover:cursor-grab">
      <Slider {...settings}>
          {happyCouples.length > 0 ? (
            happyCouples.map((data, index) => (
              <MarriedSlick key={index} data={data} />
            ))
          ) : (
            <p>No stories available.</p> // Handle the case where there are no stories
          )}
        </Slider>
      </div>

      <div className="mt-14 flex flex-col justify-center items-center space-y-8">
        <div>
          <h2 className="text-center text-primary text-lg font-semibold">
            Now it’s time to write your
          </h2>
          <h1 className="text-center text-primary text-3xl font-bold">
            Happy stories with us
          </h1>
        </div>
        <div>
          <button className="bg-gradient flex items-center  text-white px-10 py-3 rounded-md tracking-wide">
            Register Free
            <FaArrowRightLong className="ml-3 text-white text-[22px]" />
          </button>
        </div>
      </div>

      <div className="relative px-48 pt-24 pb-16">
        {/* <img src={Couple} alt="couple" /> */}
        {/* <FaCirclePlay className="absolute top-[50%] left-[48%] text-white text-5xl hover:cursor-pointer" />  */}
        <iframe
          width={1000}
          height={500}
          src="https://www.youtube.com/embed/-q00JIjstxo?si=kzNSDsMpSfef1BuY"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default HappyStories;
