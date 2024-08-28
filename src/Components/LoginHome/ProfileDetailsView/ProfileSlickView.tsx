import { useState, useEffect, useRef } from "react";
import { IoMdLock } from "react-icons/io";
import Slider from "react-slick";
import { fetchProfilesDetails } from "../../../commonapicall"; // Adjust the path as needed
import "./ProfileSlickStyleView.css";
import ProfileViewPassWordInput from "../../DashBoard/ProfileDetails/ProfileViewPasswordInput";
import { Get_photo_bypassword } from "../../../commonapicall";
import axios from "axios";

interface UserImages {
  [key: string]: string;
}

interface ProfileSlickViewProps {
  profileId?: string;
  GetProfileDetMatch: () => void;
  ProtectedImg: string;
}

export const ProfileSlickView: React.FC<ProfileSlickViewProps> = ({ profileId, GetProfileDetMatch, ProtectedImg }) => {
  const loginuser_profileId =
    sessionStorage.getItem("loginuser_profile_id") || "";
  const [userImages, setUserImages] = useState<UserImages>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  // Image Zoom Effect
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Retrieve the stored image data from sessionStorage
  const storedProtectedImg = sessionStorage.getItem("userImages");
  const sessionImage: string[] = storedProtectedImg
    ? JSON.parse(storedProtectedImg)
    : [];

  const handleMouseEnter = (image: string) => {
    // Debounce to prevent flickering
    setTimeout(() => setZoomImage(image), 100);
  };

  const handleMouseLeave = () => {
    // Debounce to prevent flickering
    setTimeout(() => setZoomImage(null), 100);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        if (profileId) {
          const data = await fetchProfilesDetails(profileId);
          const { user_images } = data;
          setUserImages(user_images);
          setError(null);
        } else {
          setError("Profile ID is not defined.");
        }
      } catch (error: any) {
        setError("Error fetching profiles");
        console.error(
          "Error fetching profiles:",
          error.response ? error.response.data : error.message
        );
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

  // Determine which images to display

  const ShowImage = storedProtectedImg ? sessionImage : userImages;


  const images = Object.values(ShowImage);


  // Photo Password Popup
  const [GetProfileDetMatchData, SetGetProfileDetMatchData] = useState<any>({});

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const { photo_protection } = GetProfileDetMatchData;

  const GetPhotoByPassword = async (Password: string) => {
    try {
      const response = await axios.post(Get_photo_bypassword, {
        profile_id: loginuser_profileId,
        profile_to: id,
        photo_password: Password,
      });

      if (response.status === 200) {
        const userImages = response.data.data.user_images;
        sessionStorage.setItem(`userImages_${id}`, JSON.stringify(userImages));
        // sessionStorage.setItem("userImages", JSON.stringify(userImages));
      }
    } catch (error) {
      // NotifyError("Please Enter Correct Password");
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="slider-container profileSliderStyle">
        <Slider
          customPaging={(i: number) => (
            <a>
              <img
                src={images[i] || ""}
                alt={`Thumbnail ${i + 1}`}
                className="rounded-lg"
              />
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
          ref={(slider) => (sliderRef1.current = slider)}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="profile-slider-img-container fade-img-effect"
              onMouseEnter={() => handleMouseEnter(image)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={image}
                className="w-full rounded-lg profile-slider-img"
                alt={`Slide ${index + 1}`}
              />

              {/* Lock & fade Effect */}
              <div onClick={() => {
                if (!ProtectedImg) {
                  GetProfileDetMatch();
                }
              }} className="text-center lock-style">
                <IoMdLock className="w-fit mx-auto text-secondary text-[50px]" />
                <p className="text-sm text-white font-semibold">Click here to request password to view profile photo</p>
              </div>

              {/* Password Popup */}
              <div className="absolute top-0 left-0">
                {photo_protection && (
                  <ProfileViewPassWordInput
                    // PasswordModal={PasswordModal}
                    // setPassWordModal={setPassWordModal}
                    GetPhotoByPassword={GetPhotoByPassword}
                  />
                )}
              </div>
            </div>
          ))}
        </Slider>
        <Slider
          dots={false}
          slidesToShow={5}
          swipeToSlide={true}
          focusOnSelect={true}
          asNavFor={nav1 as Slider}
          ref={(slider) => (sliderRef2.current = slider)}
          className="connectingSlick"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="profile-slider-img-container"
              onMouseEnter={() => handleMouseEnter(image)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={image}
                className="w-20 mx-auto my-5 rounded-lg"
                alt={`Thumbnail ${index + 1}`}
              />
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
