import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialSlick from "./ReviewTestimonial/TestimonialSlick";
import TestimonialAvatar from "../../assets/images/TestimonialAvatar.png";
import { FaArrowRight } from "react-icons/fa6";

interface SlickArrowProps {
  onClick: () => void;
}

const SlickNextArrow: React.FC<SlickArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute -right-6 top-[80px] z-10 bg-secondary p-4 rounded-full shadow-lg hover:cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight className="text-white" />
    </div>
  );
};

const SlickPrevArrow: React.FC<SlickArrowProps> = ({ onClick }) => {
  return <div onClick={onClick} />;
};

const ReviewsTestimonial = () => {
  const settings = {
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
    nextArrow: <SlickNextArrow onClick={function (): void {
      throw new Error("Function not implemented.");
    }} />,
    prevArrow: <SlickPrevArrow onClick={function (): void {
      throw new Error("Function not implemented.");
    }} />,

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

  return (
    <div className="">
      <div className="container pt-14 pb-20">
        <div>
          <h2 className="text-main mb-1 tracking-wide font-semibold">
            What customers says
          </h2>
          <h1 className="text-3xl font-bold">Recent Reviews</h1>
        </div>

        <div className="mt-10 slider-container relative">
          <Slider {...settings}>
            <TestimonialSlick
              desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis enim velit mollit exercitation veniam."
              img={TestimonialAvatar}
              name="Kristin Watson"
              datedOn="Jun 27, 2020 · 6 min read"
            />
            <TestimonialSlick
              desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis enim velit mollit exercitation veniam."
              img={TestimonialAvatar}
              name="Kristin Watson"
              datedOn="Jun 27, 2020 · 6 min read"
            />
            <TestimonialSlick
              desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis enim velit mollit exercitation veniam."
              img={TestimonialAvatar}
              name="Kristin Watson"
              datedOn="Jun 27, 2020 · 6 min read"
            />
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTestimonial;
