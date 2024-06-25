import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import SideContent from "../Components/RegistrationForm/SideContent";
import UploadFile from "../Components/UploadImages/UploadFile";
import uploadfile from "../assets/icons/uploadfile.png";
import closebtn from "../assets/icons/closebtn.png";
import arrow from "../assets/icons/arrow.png";


interface UploadImagesProps { }

const UploadImages: React.FC<UploadImagesProps> = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRefs = {
    images: useRef<HTMLInputElement>(null),
    horoscope: useRef<HTMLInputElement>(null),
    idProof: useRef<HTMLInputElement>(null),
  };

  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      handleFiles(files);
    }
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove("border-blue-500");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add("border-blue-500");
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add("border-blue-500");
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove("border-blue-500");
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const clearFileInput = () => {
    setSelectedFiles([]);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFiles = (files: FileList) => {
    const newFiles: File[] = Array.from(files);
    if (selectedFiles.length + newFiles.length > 10) {
      const remainingSpace = 10 - selectedFiles.length;
      setSelectedFiles([...selectedFiles, ...newFiles.slice(0, remainingSpace)]);
    } else {
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
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

            <div
              onClick={() => handleButtonClick(fileInputRefs.images)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              ref={dropAreaRef}
            >
              <UploadFile
                heading="Select a file or drag and drop here"
                desc="JPG, PNG file size no more than 10MB"
                name="uploadImg"
                onChange={handleFileUpload}
                onClick={() => handleButtonClick(fileInputRefs.images)}
                multiple // Set to true if you want to allow multiple file selection
                //ref={fileInputRefs.images}
              />
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-7">
              <div className="flex justify-between items-center">
                <h1 className="text-primary text-xl font-semibold">
                  Files Uploaded ({selectedFiles.length}/10)
                </h1>

                {/* <div className="relative">
                  <h1>
                    Total Available Space
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;50%
                  </h1>
                  <span className="absolute top-7 bg-blue-500 w-20 h-1 rounded"></span>
                </div> */}
              </div>
            </div>
          )}

          {selectedFiles.length > 0 && (
            <div className="mt-10 space-y-6">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
                  <div className="flex items-center space-x-3">
                    <img src={uploadfile} alt="uploadfile" className="h-8 w-8" />
                    <div>
                      <h1 className="text-lg font-semibold">{file.name}</h1>
                      <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button onClick={() => removeFile(index)}>
                    <img src={closebtn} alt="close" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

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

            <div
              onClick={() => handleButtonClick(fileInputRefs.horoscope)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              ref={dropAreaRef}
            >
              <UploadFile
                heading="Select a file or drag and drop here"
                desc="JPG, PNG file size no more than 10MB"
                name="uploadHoroscope"
                onChange={handleFileUpload}
                onClick={() => handleButtonClick(fileInputRefs.horoscope)}
                multiple={true} // Set to true if you want to allow multiple file selection
                //ref={fileInputRefs.horoscope}
              />
            </div>
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

            <div
              onClick={() => handleButtonClick(fileInputRefs.idProof)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              ref={dropAreaRef}
            >
              <UploadFile
                heading="Select a file or drag and drop here"
                desc="JPG, PNG file size no more than 10MB"
                name="uploadIDProof"
                onChange={handleFileUpload}
                onClick={() => handleButtonClick(fileInputRefs.idProof)}
                multiple={true} // Set to true if you want to allow multiple file selection
                //ref={fileInputRefs.idProof}
              />
            </div>
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
              <button className="py-[10px] px-14 bg-white text-main font-semibold rounded-[6px] mt-2" onClick={clearFileInput}>
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
