// import  { useEffect, useState } from "react";
// import Award from "../../assets/icons/Award.png";
// import { AwardCard } from "./AwardGallery/AwardCard";

// import axios from "axios";

// export interface AwardType {
//   name: string;
//   image: string;
//   description: string;
// }

// export const AwardsGallery = () => {
//   const [awards, setAwards] = useState<AwardType[]>([]);

//   const happyStories = async () => {
//     const response = await axios.post(
//       "http://103.214.132.20:8000/auth/Awards_gallery/"
//     );

//     setAwards(response.data.data);
//     return response.data;
//   };
//   useEffect(() => {
//     happyStories();
//   },[]);
//   return (
//     <div>
//       <div className="container mx-auto">
//         <div className="text-center">
//           <div className="">
//             <img src={Award} alt="Award-icon" className="w-fit mx-auto" />
//           </div>
//           <h4 className="text-primary text-[36px] font-semibold">
//             Awards Gallery
//           </h4>
//         </div>

//         <div className="flex justify-between items-center my-8">
//           {awards.map((data) => (
//             <AwardCard
//               image={data.image}
//               awardName={data.name}
//               awardDesc={data.description}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };




import  { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Featured/FeaturedSlickStyle.css";
import axios from "axios";
import Award from "../../assets/icons/Award.png";
import { AwardCard } from "./AwardGallery/AwardCard";



export interface AwardType {
  name: string;
  image: string;
  description: string;
}

export const AwardsGallery = () => {
  const [awards, setAwards] = useState<AwardType[]>([]);

  const happyStories = async () => {
    const response = await axios.post(
      "http://103.214.132.20:8000/auth/Awards_gallery/"
    );

    setAwards(response.data.data);
    return response.data;
  };
  useEffect(() => {
    happyStories();
  }, []);

  // Assuming you have this component

  const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: true,
    arrows:false,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          autoplay: true,

        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          autoplay: true,

        },
      },
      
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          autoplay: true,

        },
      },
    ],
  };


  return (
    <div className="relative overflowx-hidden">
      <div className="container  px-2 mx-auto mt-10 mb-20 max-xl:my-8 max-lg:my-6">
        <div className="mx-auto max-2xl:px-5 max-sm:px-0">
          <div className="text-center">
            <div className="">
              <img src={Award} alt="Award-icon" className="w-fit mx-auto" />
            </div>
            <h4 className="text-primary text-[36px] font-bold max-xl:text-[34px] max-lg:text-[30px] max-sm:text-[24px]">
              Awards
            </h4>
          </div>

          {/* Groom Slick */}
          <div className="slider-container featuredStyle">
            <Slider {...settings}>
              {awards.map((data) => (

                <div className="flex justify-between items-center px-2 max-xl:gap-3 max-sm:flex-wrap max-sm:justify-center max-sm:mt-5">
                  <AwardCard
                    image={data.image}
                    awardName={data.name}
                    awardDesc={data.description}
                  />
                </div>

              ))}
            </Slider>
          </div>
           {/* view more */}
           {/* <div className="text-center pt-0 max-md:pt-4">
            <button className=" bg-main py-2 px-5 text-white text-lg font-medium rounded-md">View More</button>
          </div> */}
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-[-23%] mx-auto max-xl:bottom-[-15%] max-md:relative ">
            <div className="flex items-center justify-between bg-gradient w-[60%] rounded-2xl p-6 mx-auto max-xl:w-[80%] max-lg:w-[90%] max-md:w-[100%] max-md:rounded-none max-sm:flex-col max-sm:items-start max-sm:gap-6 max-sm:p-4">
              <div>
              <h5 className="text-white text-xl font-semibold pb-1 max-lg:text-[16px] max-sm:pb-0">Most trusted matrimonial portal</h5>
              <p className="text-white text-[26px] font-bold max-lg:text-xl">Find your dream soul mate in Vysyamala</p>
              </div>
              <button className="flex items-center gap-3 bg-white py-3 px-8 text-main text-lg font-medium rounded-md max-lg:px-6">
                Register
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-main text-[22px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path></svg>
                </button>
            </div>
        </div>
    </div>
  );
};
