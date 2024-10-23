// // import React, { useState } from "react";
// import { IoChevronForwardOutline } from "react-icons/io5";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { SuggestedCard } from "./SuggestedProfiles/SuggestedCard";
// import GridProfileImg from "../../assets/images/GridProfileImg.png";
// import "./SuggestedProfiles/SuggestedStyle.css";

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 5000,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   initialSlide: 0,
//   autoplay: true,
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

// export const SuggestedProfiles = () => {
//   return (
//     <div className="bg-vysyamalaSandal py-5">
//       <div className="container mx-auto my-10">
//         <div className="flex justify-between items-center">
//           <div>
//             <h4 className="text-[24px] text-vysyamalaBlack font-bold">
//               Suggested Profiles{" "}
//               <span className="text-sm text-primary font-bold">(234)</span>
//             </h4>
//           </div>
//           <div>
//             <button className="flex items-center text-sm text-secondary font-semibold">
//               View All <IoChevronForwardOutline className="ml-2" />
//             </button>
//           </div>
//         </div>

//         {/* Suggested Profile Slick */}
//         <div className="slider-container suggestedStyle">
//           <Slider {...settings}>
//             <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
//             <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
//             <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
//             <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
//             <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
//             <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
//             <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
//             <SuggestedCard profileImg={GridProfileImg} profileId={"VM32787"} age={"28"} height={"5ft 10in (177 cms)"} />
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// };





import React, { useState, useEffect } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SuggestedCard } from "./SuggestedProfiles/SuggestedCard";
import axios from "axios";
import "./SuggestedProfiles/SuggestedStyle.css";
import { useNavigate } from "react-router-dom";

// Define the interface for the profile data
interface Profile {
  profile_id: string;
  profile_img: string;
  profile_age: number;
  profile_height: number;
}

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

export const SuggestedProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]); // Typing the state as an array of Profile objects
  const [totalCount,setTotalCount]=useState<number>(0)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.post("http://103.214.132.20:8000/auth/Get_Suggested_List/", {
          profile_id: sessionStorage.getItem('loginuser_profile_id'),
        });
        if (response.data.status === "success") {
          setProfiles(response.data.data);
          setTotalCount(response.data.total_count || response.data.data.length);
        } else {
          console.error("Failed to fetch profiles");
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleNavigate = () => {
    navigate('/ViewAllSuggestedProfiles'); // Replace with your target path
  };
  return (
    <div className="bg-vysyamalaSandal overflow-hidden py-5 px-5 max-xl:py-4 max-lg:py-3">
    <div className="container mx-auto my-10 max-lg:my-8 max-md:my-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-[24px] text-vysyamalaBlack font-bold  max-xl:text-[22px] max-lg:text-[20px] max-md:text-[18px]">
            Suggested Profiles{" "}
            <span className="text-sm text-primary font-bold">({totalCount})</span>
          </h4>
        </div>
        <div>
          <button className="flex items-center text-sm text-secondary font-semibold max-md:text-[14px]"
           onClick={handleNavigate}
          >
            View All <IoChevronForwardOutline className="ml-2" />
          </button>
        </div>
      </div>

        {/* Suggested Profile Slick */}
        <div  className="slider-container suggestedStyle" >
          <Slider {...settings}>
            {profiles.map((profile) => (
              <SuggestedCard
                key={profile.profile_id}
                profileImg={profile.profile_img}
                profileId={profile.profile_id}
                age={profile.profile_age.toString()}
                height={`${Math.floor(profile.profile_height / 30.48)}ft ${Math.round((profile.profile_height % 30.48) / 2.54)}in`}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

