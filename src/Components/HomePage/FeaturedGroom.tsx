// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { GroomSlick } from "./Featured/GroomSlick";
// import "./Featured/FeaturedSlickStyle.css";

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 5000,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   initialSlide: 0,
//   autoplay: true,
//   // autoplaySpeed: 5000,
//   cssEase: "linear",
//   pauseOnHover: true,
//   rtl: true,

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
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         initialSlide: 2,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

// export const FeaturedGroom: React.FC = () => {
//   return (
//     <div className="bg-vysyamalaSandal p-2">
//       <div className="container mx-auto mt-10 mb-20">
//         <div className="text-center">
//           <h4 className="text-primary text-[36px] font-semibold">
//             Featured Groom
//           </h4>
//           <p className="text-primary text-[20px]">
//             Searching for a companion? Someone who understands you and grow with
//             you? Well, your search ends here! Look for some of our grooms in the
//             spotlight below{" "}
//           </p>
//         </div>

//         {/* Groom Slick */}
//         <div className="slider-container featuredStyle">
//           <Slider {...settings}>
//             <GroomSlick profileId={"VM32787"} age={"28"} />
//             <GroomSlick profileId={"VM32787"} age={"28"} />
//             <GroomSlick profileId={"VM32787"} age={"28"} />
//             <GroomSlick profileId={"VM32787"} age={"28"} />
//             <GroomSlick profileId={"VM32787"} age={"28"} />
//             <GroomSlick profileId={"VM32787"} age={"28"} />
//             <GroomSlick profileId={"VM32787"} age={"28"} />
//             <GroomSlick profileId={"VM32787"} age={"28"} />
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GroomSlick } from "./Featured/GroomSlick";
import "./Featured/FeaturedSlickStyle.css";
import axios from "axios";
import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal";
 // Assuming you have this component

const settings = {
  dots: true,
  infinite: true,
  speed: 5000,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
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

export const FeaturedGroom: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_featured_profiles/?",
          {
            gender: "male",
          }
        );
        if (response.data.Status === 1) {
          setProfiles(response.data.profiles);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Error fetching profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleImageClick = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsLoginPopupOpen(true);
    } else {
      // Handle the logic when the user is logged in
      console.log("User is logged in, proceed with navigation or action.");
    }
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
    console.log("Closing Login PopupModal popup"); // Debug log
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-vysyamalaSandal p-2">
      <div className="container mx-auto mt-10 mb-20">
        <div className="text-center">
          <h4 className="text-primary text-[36px] font-semibold">
            Featured Groom
          </h4>
          <p className="text-primary text-[20px]">
            Searching for a companion? Someone who understands you and grow with
            you? Well, your search ends here! Look for some of our grooms in the
            spotlight below{" "}
          </p>
        </div>

        {/* Groom Slick */}
        <div className="slider-container featuredStyle">
          <Slider {...settings}>
            {profiles.map((profile) => (
              <GroomSlick
                key={profile.profile_id}
                profileImage={profile.profile_img}
                profileId={profile.profile_id}
                age={profile.profile_age.toString()}
                onClick={handleImageClick} // Handle image click
              />
            ))}
          </Slider>
        </div>
      </div>

      {isLoginPopupOpen && (
        <LoginPopupModal
          onClose={handleCloseLoginPopup}
          onForgetPassword={() => {
            console.log("Forgot password clicked.");
          }}
        />
      )}
    </div>
  );
};
