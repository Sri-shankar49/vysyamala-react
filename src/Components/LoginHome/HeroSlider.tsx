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
    autoplay: false,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,

    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
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
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            }
        }
    ]
};

export const HeroSlider = () => {
    return (
        <section className="bg-heroSliderBgImg bg-no-repeat bg-cover w-full">

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
