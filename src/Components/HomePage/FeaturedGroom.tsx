import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GroomSlick } from "./Featured/GroomSlick";

const settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
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

export const FeaturedGroom: React.FC = () => {
    return (
        <div className="bg-vysyamalaSandal p-2">
            <div className="container mx-auto mt-10 mb-20">
                <div className="text-center">
                    <h4 className="text-primary text-[36px] font-semibold">Featured Groom</h4>
                    <p className="text-primary text-[20px]">Searching for a companion? Someone who understands you and grow with you? Well, your search ends here! Look for some of our grooms in the spotlight below </p>
                </div>

                {/* Groom Slick */}
                <div className="slider-container">
                    <Slider {...settings}>
                        <GroomSlick profileId={"VM32787"} age={"28"} />
                        <GroomSlick profileId={"VM32787"} age={"28"} />
                        <GroomSlick profileId={"VM32787"} age={"28"} />
                        <GroomSlick profileId={"VM32787"} age={"28"} />
                        <GroomSlick profileId={"VM32787"} age={"28"} />
                        <GroomSlick profileId={"VM32787"} age={"28"} />
                        <GroomSlick profileId={"VM32787"} age={"28"} />
                        <GroomSlick profileId={"VM32787"} age={"28"} />
                    </Slider>
                </div>
            </div>
        </div>
    );
};