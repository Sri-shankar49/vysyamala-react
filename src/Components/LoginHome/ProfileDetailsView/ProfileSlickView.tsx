import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import ProfileDetailsImg from "../../../assets/images/ProfileDetailsImg.png";
import "./ProfileSlickStyleView.css";

const images = [
    ProfileDetailsImg,
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
    'https://swiperjs.com/demos/images/nature-6.jpg',
    'https://swiperjs.com/demos/images/nature-7.jpg',
    'https://swiperjs.com/demos/images/nature-8.jpg',
    'https://swiperjs.com/demos/images/nature-9.jpg',
    'https://swiperjs.com/demos/images/nature-10.jpg',
];


export const ProfileSlickView = () => {

    // React Slick Settings
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);
    const sliderRef1 = useRef<Slider | null>(null);
    const sliderRef2 = useRef<Slider | null>(null);

    // Image Zoom Effect
    const [zoomImage, setZoomImage] = useState(null);

    const handleMouseEnter = (image) => {
        setZoomImage(image);
    };

    const handleMouseLeave = () => {
        setZoomImage(null);
    };

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);
    return (
        <div>
            {/* Image Carousel */}
            <div className="slider-container profileSliderStyle">
                <Slider
                    customPaging={(i: number) => (
                        <a>
                            <img src={images[i]} alt={`Thumbnail ${i + 1}`} className="rounded-lg" />
                        </a>
                    )}
                    dots={false}
                    arrows={false}
                    dotsClass="slick-dots slick-thumb"
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    asNavFor={nav2 as any}
                    ref={slider => (sliderRef1.current = slider)}
                >
                    {images.map((image, index) => (
                        <div key={index}
                            className="profile-slider-img-container"
                            onMouseEnter={() => handleMouseEnter(image)}
                            onMouseLeave={handleMouseLeave}>
                            <img src={image} className="w-full rounded-lg profile-slider-img" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </Slider>
                <Slider
                    dots={false}
                    slidesToShow={5}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    asNavFor={nav1 as any}
                    ref={slider => (sliderRef2.current = slider)}
                    className="connectingSlick"
                >
                    {images.map((image, index) => (
                        <div key={index}
                            className="profile-slider-img-container"
                            onMouseEnter={() => handleMouseEnter(image)}
                            onMouseLeave={handleMouseLeave}>
                            <img src={image} className="w-20 mx-auto my-5 rounded-lg" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>
            {zoomImage && (
                <div className="zoomed-image-container zoomed-visible">
                    <img src={zoomImage} className="zoomed-image" alt="Zoomed" />
                </div>
            )}
        </div>
    )
}
