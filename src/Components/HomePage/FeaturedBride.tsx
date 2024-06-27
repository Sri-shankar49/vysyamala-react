import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Bride from "../../assets/images/Bride.png";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
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

export const FeaturedBride: React.FC = () => {
    return (
        <div className="my-10">
            <div className="text-center">
                <h4 className="text-primary text-[36px] font-semibold">Featured Brides</h4>
                <p className="text-primary text-[20px]">Dreaming of your partner? Is she a singer? Dancer? It’s time to turn this dream into reality! Find some of our brides in the spotlight below</p>
            </div>

            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <div>
                            <img src={Bride} alt="Bride image" />
                        </div>
                        <div className="bg-white flex justify-between items-center ">
                            <h5 className="text-secondary font-semibold">VM32787</h5>
                            <p>28 yrs</p>
                        </div>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                    <div>
                        <h3>7</h3>
                    </div>
                    <div>
                        <h3>8</h3>
                    </div>
                </Slider>
            </div>
        </div>
    );
};