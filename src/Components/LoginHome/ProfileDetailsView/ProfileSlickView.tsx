import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { fetchProfilesDetails } from '../../../commonapicall'; // Adjust the path as needed
import "./ProfileSlickStyleView.css";

// Define the types for your user images and profiles if known
interface UserImages {
  [key: string]: string; // Adjust based on actual structure
}

interface ProfileSlickViewProps {
  profileId?: string;
}

export const ProfileSlickView: React.FC<ProfileSlickViewProps> = ({ profileId }) => {
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id') || ''; // Ensure non-null value
  const [userImages, setUserImages] = useState<UserImages>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // React Slick Settings
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  // Image Zoom Effect
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const handleMouseEnter = (image: string) => {
    setZoomImage(image);
  };

  const handleMouseLeave = () => {
    setZoomImage(null);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Ensure profileId is defined before making the API call
        if (profileId) {
          const data = await fetchProfilesDetails(profileId);
          const { user_images } = data;
          setUserImages(user_images);
          setError(null);
        } else {
          setError('Profile ID is not defined.');
        }
      } catch (error: any) {
        setError('Error fetching profiles');
        console.error('Error fetching profiles:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    if (loginuser_profileId) {
      fetchProfileData();
    }
  }, [profileId, loginuser_profileId]);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const images = Object.values(userImages);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {/* Image Carousel */}
      <div className="slider-container profileSliderStyle">
        <Slider
          customPaging={(i: number) => (
            <a>
              <img src={images[i] || ''} alt={`Thumbnail ${i + 1}`} className="rounded-lg" />
            </a>
          )}
          dots={false}
          arrows={false}
          dotsClass="slick-dots slick-thumb"
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          asNavFor={nav2 as Slider}
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
          asNavFor={nav1 as Slider}
          ref={slider => (sliderRef2.current = slider)}
          className="connectingSlick"
        >
          {images.map((image, index) => (
            <div key={index}
              className="profile-slider-img-container"
              onMouseEnter={() => handleMouseEnter(image)}
              onMouseLeave={handleMouseLeave}>
              <img src={image} className="w-20 mx-auto my-5 rounded-lg" alt={`Thumbnail ${index + 1}`} />
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
  );
};
