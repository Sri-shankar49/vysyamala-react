import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import SideContent from "../Components/RegistrationForm/SideContent";
import UploadFile from "../Components/UploadImages/UploadFile";
import uploadfile from "../assets/icons/uploadfile.png";
import closebtn from "../assets/icons/closebtn.png";
import arrow from "../assets/icons/arrow.png";

interface UploadImagesProps {}

const UploadImages: React.FC<UploadImagesProps> = () => {
  const [selectedFile, setSelectedFile] = useState("file name");
  // const [progress, setProgress] = useState(0);
  const [fileSize, setFileSize] = useState("file size");
  const [showPassword, setShowPassword] = useState(false);

  // Event handler for button click
  const handleButtonClick = () => {
    const fileInput = document.getElementById("uploadImg") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // Event handler for file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file.name);
      const size = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(size);
      console.log("Selected file:", file);
    }
  };

  // Event handler to clear file input
  const clearFileInput = () => {
    setSelectedFile("file name");
    setFileSize("file size");
    // setProgress(0);
  };

  // Event handler to toggle password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pb-20">
      <ContentBlackCard
        heading="Upload Images"
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis "
      />

      <div className="container mt-8 flex justify-between space-x-24 space-y-7">
        <div className="w-full">
          <div>
            <h1 className="font-semibold text-primary text-xl mb-4">
              Upload daughter Images/ family images
            </h1>

            <UploadFile
              heading="Select a file or drag and drop here"
              desc="JPG, PNG file size no more than 10MB"
              name="uploadImg"
              onChange={handleFileUpload}
              onClick={handleButtonClick}
            />
          </div>

          <div className="mt-7">
            <div className="flex justify-between items-center">
              <h1 className="text-primary text-xl font-semibold">
                Files Uploaded (5/10)
              </h1>

              <div className="relative">
                <h1>
                  Total Available Space
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;50%
                </h1>
                <span className="absolute top-7 bg-blue-500 w-20 h-1 rounded"></span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-between items-center space-x-16 px-8">
            <div>
              <img src={uploadfile} alt="uploadfile" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1>{selectedFile}</h1>
                <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                <button className="text-blue-500">Preview</button>
              </div>

              {/* Dynamic Progress Bar use API */}
              <div
                className={`mt-3 w-full h-1 bg-blue-500 rounded transition-all`}
              ></div>
            </div>

            <div>{fileSize} MB</div>
            <button onClick={clearFileInput}>
              <img
                src={closebtn}
                alt="close"
                className="hover:cursor-pointer"
              />
            </button>
          </div>
          <hr className="mt-8 text-gray" />

          <div className="mt-7 text-lg">
            <input
              type="checkbox"
              name="passwordCheckbox"
              id="passwordCheckbox"
              className="accent-main w-4 h-4 mr-2"
            />
            <label htmlFor="passwordCheckbox">
              Protect my images with password (only people you share the
              password can view the images)
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="password" className="block text-lg mb-2">
              Enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              />

              <div
                onClick={handleShowPassword}
                className="absolute inset-y-1.5 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </div>
            </div>
          </div>

          <div className="mt-7">
            <h1 className="font-semibold text-primary text-xl mb-4">
              Upload daughter horoscope image
            </h1>

            <UploadFile
              heading="Select a file or drag and drop here"
              desc="JPG, PNG file size no more than 10MB"
              name="uploadHoroscopeImage"
              onChange={handleFileUpload}
              onClick={handleButtonClick}
            />
          </div>

          <div className="mt-7">
            <h1 className="font-semibold text-primary text-xl mb-4">
              Upload Your Videos
            </h1>

            <div>
              <label htmlFor="youtubeurl" className="block text-lg mb-2">
                Upload Youtube Video URL
              </label>

              <input
                type="text"
                name="youtubeurl"
                id="youtubeurl"
                placeholder="URL"
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              />
            </div>
            <p className="mt-3 text-ash">
              Note: If youtube URL is not available send your video and your
              Profile ID on Whatsapp to +1234567890. Our admin will moderate and
              upload
            </p>
          </div>

          <div className="mt-7">
            <h1 className="font-semibold text-primary text-xl mb-4">
              Upload Daughter ID Proof
            </h1>

            <UploadFile
              heading="Select a file or drag and drop here"
              desc="JPG, PNG file size no more than 10MB"
              name="uploadIDProof"
              onChange={handleFileUpload}
              onClick={handleButtonClick}
            />
          </div>

          <div className="mt-7 flex justify-between">
            <div className="">
              <Link to={"/ThankYou/ContactDetails"}>
                <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                  Back
                </button>
              </Link>
            </div>

            <div className="flex space-x-4">
              <button className="py-[10px] px-14 bg-white text-main font-semibold rounded-[6px] mt-2">
                Skip
              </button>
              <Link to="/FamilyDetails">
                <button className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">
                  Next
                  <span>
                    <img src={arrow} alt="next arrow" className="ml-2" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <SideContent />
      </div>
    </div>
  );
};

export default UploadImages;
