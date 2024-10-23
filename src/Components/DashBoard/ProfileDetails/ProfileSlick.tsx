import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "./ProfileSlickStyle.css";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import {
  NotifySuccess,
  ToastNotification,
} from "../../Toast/ToastNotification";

export const ProfileSlick = () => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);
  const [images, setImages] = useState<
    { id: number | null; imageUrl: string | null }[]
  >(Array(10).fill({ id: null, imageUrl: null }));
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [removePhotoIndicator, setRemovePhotoIndicator] =
    useState<boolean>(false);

  const defaultImageUrl =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";

  const handleMouseEnter = (imageUrl: string | null) => {
    if (imageUrl) setZoomImage(imageUrl);
  };

  const handleMouseLeave = () => {
    setZoomImage(null);
  };

  const fetchImages = async () => {
    try {
      const loginUserProfileId = sessionStorage.getItem("loginuser_profile_id");
      if (!loginUserProfileId) throw new Error("Profile ID not found");

      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Get_profile_images/",
        {
          profile_id: loginUserProfileId,
        }
      );

      console.log("Fetched images response:", response.data);

      if (response.data.Status === 1) {
        const imageObjects = response.data.data.map((img: any) => ({
          id: img.id,
          imageUrl: `http://103.214.132.20:8000${
            img.image
          }?t=${new Date().getTime()}`, // Add timestamp to avoid caching
        }));

        const filledImages = [
          ...imageObjects,
          ...Array(10 - imageObjects.length).fill({
            id: null,
            imageUrl: defaultImageUrl,
          }),
        ];

        console.log("Processed images:", filledImages);
        setImages(filledImages);
      } else {
        console.error("Failed to fetch images:", response.data.message);
        setImages(Array(10).fill({ id: null, imageUrl: defaultImageUrl }));
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages(Array(10).fill({ id: null, imageUrl: defaultImageUrl }));
    }
  };

  useEffect(() => {
    fetchImages();
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, [removePhotoIndicator]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && currentEditIndex !== null) {
      const file = files[0];
      const validFileTypes = ["image/jpeg", "image/png"];

      if (!validFileTypes.includes(file.type)) {
        alert("Only JPG and PNG files are allowed");
        return;
      }

      const newImages = [...images];
      const imageToReplace = newImages[currentEditIndex];

      // Update the image preview immediately
      newImages[currentEditIndex] = {
        ...imageToReplace,
        imageUrl: URL.createObjectURL(file),
      };
      setImages(newImages);

      // Determine API parameters based on whether the image is mapped with an ID or not
      try {
        const loginUserProfileId = sessionStorage.getItem(
          "loginuser_profile_id"
        );
        if (!loginUserProfileId) throw new Error("Profile ID not found");

        const formData = new FormData();
        formData.append("profile_id", loginUserProfileId);

        if (imageToReplace.id !== null) {
          // If the image has an ID, replace it
          formData.append("replace_image_ids", imageToReplace.id.toString());
          formData.append("replace_image_files", file, file.name);
        } else {
          // If the image doesn't have an ID, upload it as a new image
          formData.append("new_image_files", file, file.name);
        }

        const response = await axios.post(
          "http://103.214.132.20:8000/auth/ImageSetEdit/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        NotifySuccess("Image uploaded successfully");
        console.log("Image processed successfully:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error processing image:",
            error.response?.data || error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }

      setShowOptions(false); // Hide options after processing the image
    } else {
      console.warn("No files selected or no index set");
    }
  };
  const handleRemoveImage = async () => {
    if (currentEditIndex !== null) {
      // Show confirmation dialog
      // const isConfirmed = window.confirm(
      //   "Are you sure you want to delete this image?"
      // );
      // if (!isConfirmed) return; // Exit if the user cancels

      try {
        const loginUserProfileId = sessionStorage.getItem(
          "loginuser_profile_id"
        );
        if (!loginUserProfileId) throw new Error("Profile ID not found");

        const imageToRemove = images[currentEditIndex];

        if (imageToRemove.id !== null) {
          console.log(
            "Attempting to remove image with the following details:",
            {
              profile_id: loginUserProfileId,
              image_id: imageToRemove.id,
            }
          );

          const formData = new FormData();
          formData.append("profile_id", loginUserProfileId);
          formData.append("image_id", imageToRemove.id.toString());

          const response = await axios.post(
            "http://103.214.132.20:8000/auth/Remove_profile_img/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("Server response:", response.data);

          if (response.data.success === 1) {
            NotifySuccess("Image removed successfully");
            setRemovePhotoIndicator(!removePhotoIndicator);
            // Re-fetch images to update UI

            setShowOptions(false);
          } else {
            console.error("Failed to remove image:", response.data.message);
          }
        } else {
          console.warn(
            "Image does not have an ID, cannot be removed from server."
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error removing image:",
            error.response?.data || error.message
          );
          alert("Error removing image. Please try again.");
        } else {
          console.error("Unexpected error:", error);
          alert("Unexpected error occurred. Please try again.");
        }
      } finally {
        fetchImages();
      }
    } else {
      console.warn("No image selected for removal.");
    }
  };

  const handleEditClick = (index: number) => {
    setCurrentEditIndex(index);
    setShowOptions(true);
  };

  return (
    <div>
      <ToastNotification />
      <div className="slider-container profileSliderStyle">
        <Slider
          customPaging={(i: number) => (
            <a>
              <img
                src={images[i]?.imageUrl || ""}
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
          asNavFor={nav2 as never}
          ref={(slider) => setNav1(slider)}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative profile-slider-img-container"
              onMouseEnter={() => handleMouseEnter(image.imageUrl || "")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={image.imageUrl || ""}
                className="w-full rounded-lg profile-slider-img  max-lg:w-2/4 max-sm:w-full"
                alt={`Slide ${index + 1}`}
              />
              <div
                className="absolute bottom-0 right-0 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
                onClick={() => handleEditClick(index)}
              >
                <MdModeEdit className="text-2xl text-main" />
              </div>
              {showOptions && currentEditIndex === index && (
                <div className="absolute bottom-0 left-0 bg-white p-3 rounded-tr-lg z-30">
                  {images[index].id !== null && (
                    <button onClick={handleRemoveImage} className="block mb-2">
                      Remove Current Image
                    </button>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="block"
                  >
                    Upload New Image
                  </button>
                </div>
              )}
            </div>
          ))}
        </Slider>

        <Slider
          dots={false}
          slidesToShow={5}
          swipeToSlide={true}
          focusOnSelect={true}
          asNavFor={nav1 as never}
          ref={(slider) => setNav2(slider)}
          className="connectingSlick"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="profile-slider-img-container "
              onMouseEnter={() => handleMouseEnter(image.imageUrl || "")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={image.imageUrl || ""}
                className="w-20 mx-auto my-5 rounded-lg "
                alt={`Slide ${index + 1}`}
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
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};
