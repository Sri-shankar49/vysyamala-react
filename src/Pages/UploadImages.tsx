
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import SideContent from "../Components/RegistrationForm/SideContent";
import UploadFile from "../Components/UploadImages/UploadFile";
import uploadfile from "../assets/icons/uploadfile.png";
import closebtn from "../assets/icons/closebtn.png";
import arrow from "../assets/icons/arrow.png";
import axios from "axios";


interface UploadImagesProps { }

const UploadImages: React.FC<UploadImagesProps> = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedHoroscopeFiles, setSelectedHoroscopeFiles] = useState<File[]>([]);
  const [selectedIDProofFiles, setSelectedIDProofFiles] = useState<File[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [profileowner, setProfileOwner] = useState<string | null>(null);

  useEffect(() => {
    const profileowner = sessionStorage.getItem("profile_owner");
    setProfileOwner(profileowner);
  }, []);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files, setFiles);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      handleFiles(files, setFiles);
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

  const removeFile = (index: number, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFiles = (files: FileList, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    const newFiles: File[] = Array.from(files);
    setFiles((prevFiles) => {
      if (prevFiles.length + newFiles.length > 10) {
        const remainingSpace = 10 - prevFiles.length;
        return [...prevFiles, ...newFiles.slice(0, remainingSpace)];
      } else {
        return [...prevFiles, ...newFiles];
      }
    });
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const handleSubmit = () => {
    const uploadImages = async (files: File[], endpoint: string) => {
      try {
        const profile_id = sessionStorage.getItem("profile_id_new"); // Get the profile_id from session storage
        const formData = new FormData();
        formData.append("profile_id", profile_id as string);
  
        files.forEach((file) => {
          formData.append("images", file);
        });
  
        const response = await axios.post(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log('UploadImageResponse',response.data);
        
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    };
    // Upload selected files
    uploadImages(selectedFiles, "http://192.168.1.12:8000/auth/ImageSetUpload/");
    uploadImages(selectedHoroscopeFiles, "http://192.168.1.12:8000/auth/ImageSetUpload/");
    uploadImages(selectedIDProofFiles, "http://192.168.1.12:8000/auth/ImageSetUpload/");
    
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
              Upload {profileowner} Images/ family images
            </h1>

            <div
              onClick={() => handleButtonClick(fileInputRefs.images)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(event) => handleDrop(event, setSelectedFiles)}
              ref={dropAreaRef}
            >
              <UploadFile
                heading="Select a file or drag and drop here"
                desc="JPG, PNG file size no more than 10MB"
                name="uploadImg"
                onChange={(event) => handleFileUpload(event, setSelectedFiles)}
                onClick={() => handleButtonClick(fileInputRefs.images)}
                multiple
              />
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-7">
              <div className="flex justify-between items-center">
                <h1 className="text-primary text-xl font-semibold">
                  Files Uploaded ({selectedFiles.length}/10)
                </h1>
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
                  <button onClick={() => removeFile(index, setSelectedFiles)}>
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
              Upload {profileowner} horoscope image
            </h1>

            <div
              onClick={() => handleButtonClick(fileInputRefs.horoscope)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(event) => handleDrop(event, setSelectedHoroscopeFiles)}
              ref={dropAreaRef}
            >
              <UploadFile
                heading="Select a file or drag and drop here"
                desc="JPG, PNG file size no more than 10MB"
                name="uploadHoroscope"
                onChange={(event) => handleFileUpload(event, setSelectedHoroscopeFiles)}
                onClick={() => handleButtonClick(fileInputRefs.horoscope)}
                multiple={true}
              />
            </div>
          </div>

          {selectedHoroscopeFiles.length > 0 && (
            <div className="mt-7">
              <div className="flex justify-between items-center">
                <h1 className="text-primary text-xl font-semibold">
                  Horoscope Files Uploaded ({selectedHoroscopeFiles.length}/10)
                </h1>
              </div>
            </div>
          )}

          {selectedHoroscopeFiles.length > 0 && (
            <div className="mt-10 space-y-6">
              {selectedHoroscopeFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
                  <div className="flex items-center space-x-3">
                    <img src={uploadfile} alt="uploadfile" className="h-8 w-8" />
                    <div>
                      <h1 className="text-lg font-semibold">{file.name}</h1>
                      <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button onClick={() => removeFile(index, setSelectedHoroscopeFiles)}>
                    <img src={closebtn} alt="close" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-7">
            <h1 className="font-semibold text-primary text-xl mb-4">
              Upload {profileowner} ID Proof
            </h1>

            <div
              onClick={() => handleButtonClick(fileInputRefs.idProof)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(event) => handleDrop(event, setSelectedIDProofFiles)}
              ref={dropAreaRef}
            >
              <UploadFile
                heading="Select a file or drag and drop here"
                desc="JPG, PNG file size no more than 10MB"
                name="uploadIDProof"
                onChange={(event) => handleFileUpload(event, setSelectedIDProofFiles)}
                onClick={() => handleButtonClick(fileInputRefs.idProof)}
                multiple={true}
              />
            </div>
          </div>

          {selectedIDProofFiles.length > 0 && (
            <div className="mt-7">
              <div className="flex justify-between items-center">
                <h1 className="text-primary text-xl font-semibold">
                  ID Proof Files Uploaded ({selectedIDProofFiles.length}/10)
                </h1>
              </div>
            </div>
          )}

          {selectedIDProofFiles.length > 0 && (
            <div className="mt-10 space-y-6">
              {selectedIDProofFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
                  <div className="flex items-center space-x-3">
                    <img src={uploadfile} alt="uploadfile" className="h-8 w-8" />
                    <div>
                      <h1 className="text-lg font-semibold">{file.name}</h1>
                      <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button onClick={() => removeFile(index, setSelectedIDProofFiles)}>
                    <img src={closebtn} alt="close" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

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

          <div className="mt-7 flex justify-between">
            <div className="">
              <Link to={"/ContactDetails"}>
                <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                  Back
                </button>
              </Link>
            </div>

            <div className="flex space-x-4">
              <Link to="/FamilyDetails">
                <button className="py-[10px] px-14 bg-white text-main font-semibold rounded-[6px] mt-2">
                  Skip
                </button>
              </Link>
              <Link to="/FamilyDetails">
                <button className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2"
                  onClick={handleSubmit}
                >
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
