import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroSliderContent } from "./HeroSlider/HeroSliderContent";
import "./HeroSlider/HeroSlickStyle.css";

const settings = {
    dots: true,
    infinite: true,
    // speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,

    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export const HeroSlider = () => {
    return (
        <section className="bg-heroSliderBgImg bg-repeat bg-cover w-full h-full ">

            <div className="container mx-auto heroSlickStyle">
                <div className="slider-container">
                    <Slider {...settings}>
                        <HeroSliderContent />
                        <HeroSliderContent />
                        <HeroSliderContent />
                        <HeroSliderContent />
                    </Slider>
                </div>
            </div>
        </section>
    )
}
