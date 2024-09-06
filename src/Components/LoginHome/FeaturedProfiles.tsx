// // import { useState } from "react";
// import { IoChevronForwardOutline } from "react-icons/io5";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FeaturedProfileCard } from "./FeaturedProfiles/FeaturedProfileCard";
// import "./FeaturedProfiles/FeaturedProfileStyle.css";

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 5000,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   initialSlide: 0,
//   autoplay: false,
//   // autoplaySpeed: 5000,
//   cssEase: "linear",
//   pauseOnHover: true,

//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         infinite: true,
//         dots: true,
//         arrows: false,
//       },
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         initialSlide: 2,
//         arrows: false,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//       },
//     },
//   ],
// };

// export const FeaturedProfiles = () => {
//   return (
//     <div className="bg-vysyamalaBlackSecondary py-5">
//       <div className="container mx-auto my-10">
//         <div className="flex justify-between items-center">
//           <div>
//             <h4 className="text-[24px] text-white font-bold">
//               Featured Profiles{" "}
//               <span className="text-sm text-white font-bold">(34)</span>
//             </h4>
//           </div>
//           <div>
//             <button className="flex items-center text-sm text-white font-semibold">
//               View All <IoChevronForwardOutline className="ml-2" />
//             </button>
//           </div>
//         </div>

//         {/* Featured Profile Slick */}
//         <div className="slider-container featuredProfileStyle">
//           <Slider {...settings}>
//             <FeaturedProfileCard profileName="Harini" profileId={"VM32787"} age={"28"} height={"5ft 10inches"} />
//             <FeaturedProfileCard profileName="Harini" profileId={"VM32787"} age={"28"} height={"5ft 10inches"} />
//             <FeaturedProfileCard profileName="Harini" profileId={"VM32787"} age={"28"} height={"5ft 10inches"} />
//             <FeaturedProfileCard profileName="Harini" profileId={"VM32787"} age={"28"} height={"5ft 10inches"} />
//             <FeaturedProfileCard profileName="Harini" profileId={"VM32787"} age={"28"} height={"5ft 10inches"} />
//             <FeaturedProfileCard profileName="Harini" profileId={"VM32787"} age={"28"} height={"5ft 10inches"} />
//             <FeaturedProfileCard profileName="Harini" profileId={"VM32787"} age={"28"} height={"5ft 10inches"} />
//             <FeaturedProfileCard profileName="Harini" profileId={"VM32787"} age={"28"} height={"5ft 10inches"} />
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FeaturedProfileCard } from "./FeaturedProfiles/FeaturedProfileCard";
import "./FeaturedProfiles/FeaturedProfileStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const settings = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: false,
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
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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

export const FeaturedProfiles = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetching data from the API
    const fetchProfiles = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Featured_List/",
          {
            profile_id: sessionStorage.getItem("loginuser_profile_id"),
            from_age: 20,
            to_age: 40,
            from_height: 100,
            to_height: 200,
            per_page: 4,
            page_number: 1,
          }
        );
        setProfiles(response.data.data);
        setTotalCount(response.data.total_count || response.data.data.length);
        console.log("featured profilese response", response.data.data);
      } catch (error) {
        console.error("Error fetching featured profiles", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleNavigate = () => {
    navigate("/ViewAllFeaturedProfiles");
  };
  return (
    <div className="bg-vysyamalaBlackSecondary py-5">
      <div className="container mx-auto my-10">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-[24px] text-white font-bold">
              Featured Profiles{" "}
              <span className="text-sm text-white font-bold">
                {" "}
                ({totalCount})
              </span>
            </h4>
          </div>
          <div>
            <button
              className="flex items-center text-sm text-white font-semibold"
              onClick={handleNavigate}
            >
              View All <IoChevronForwardOutline className="ml-2" />
            </button>
          </div>
        </div>

        {/* Featured Profile Slick */}
        <div className="slider-container featuredProfileStyle">
          <Slider {...settings}>
            {profiles.map((profile) => (
              <FeaturedProfileCard
                key={profile.profile_id}
                profileName={profile.profile_name}
                profileId={profile.profile_id}
                age={profile.profile_age.toString()}
                height={`${profile.profile_height} cm`} // Adjust if needed
                profileImage={profile.profile_img} // Fallback image
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
