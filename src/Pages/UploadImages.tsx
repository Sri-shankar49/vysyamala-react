import React, { useState, useRef, useEffect } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import UploadFile from "../Components/UploadImages/UploadFile";
import uploadfile from "../assets/icons/uploadfile.png";
import closebtn from "../assets/icons/closebtn.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";

import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../Components/Toast/ToastNotification";
interface UploadImagesProps {}

const UploadImages: React.FC<UploadImagesProps> = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedHoroscopeFiles, setSelectedHoroscopeFiles] = useState<File[]>(
    []
  );
  const [url, setUrl] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [selectedIDProofFiles, setSelectedIDProofFiles] = useState<File[]>([]);
  const [selectedDivorceProofFiles, setSelectedDivorceProofFiles] = useState<
    File[]
  >([]);
  const [showPassword, setShowPassword] = useState(false);
  const [profileOwner, setProfileOwner] = useState<string | null>(null);
  const [showPassWordNumber, setShowPassWordNumber] = useState<number>(0);
  const navigate = useNavigate();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassWordNumber(event.target.checked ? 1 : 0);
  };

  const fileInputRefs = {
    images: useRef<HTMLInputElement>(null),
    horoscope: useRef<HTMLInputElement>(null),
    idProof: useRef<HTMLInputElement>(null),
    divorceProof: useRef<HTMLInputElement>(null),
  };
  const dropAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const owner = sessionStorage.getItem("profile_owner");
    setProfileOwner(owner);
    window.scrollTo(0, 0);
  }, []);

  const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files, setFiles);
    }
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      handleFiles(files, setFiles);
    }
    dropAreaRef.current?.classList.remove("border-blue-500");
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropAreaRef.current?.classList.add("border-blue-500");
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropAreaRef.current?.classList.add("border-blue-500");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropAreaRef.current?.classList.remove("border-blue-500");
  };

  const removeFile = (
    index: number,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFiles = (
    files: FileList,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    const newFiles: File[] = Array.from(files);

    // Handle Images/Family Images differently
    if (setFiles === setSelectedFiles) {
      // Allow adding up to 10 files in total, including already selected ones
      const remainingSpace = 10 - selectedFiles.length;
      if (remainingSpace > 0) {
        setFiles((prevFiles) => [
          ...prevFiles,
          ...newFiles.slice(0, remainingSpace),
        ]);
      }
    } else {
      // For other file types, only allow one file at a time
      setFiles([newFiles[0]]);
    }
  };
  const maritalStatus = sessionStorage.getItem("maritalStatus");

  const handleSubmit = async () => {
    const uploadImages = async (
      files: File[],
      endpoint: string,
      fieldName: string
    ) => {
      try {
        const profile_id = sessionStorage.getItem("profile_id_new");
        const formData = new FormData();
        formData.append("profile_id", profile_id as string);
        files.forEach((file) => formData.append(fieldName, file));

        formData.append("photo_protection", showPassWordNumber.toString());
        formData.append("photo_password", password);
        formData.append("video_url", url);

        const response = await axios.post(endpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          NotifySuccess("Files uploaded successfully");
          setTimeout(() => {
            navigate("/FamilyDetails");
          }, 2000);
        }

        console.log("UploadImageResponse", response.data);
      } catch (error) {
        console.error("Error uploading files:", error);
        NotifyError("Error uploading files");
      }
    };

    await uploadImages(
      selectedFiles,
      "http://103.214.132.20:8000/auth/ImageSetUpload/",
      "image_files"
    );
    await uploadImages(
      selectedHoroscopeFiles,
      "http://103.214.132.20:8000/auth/Horoscope_upload/",
      "horoscope_file"
    );
    await uploadImages(
      selectedDivorceProofFiles,
      "http://103.214.132.20:8000/auth/Divorceproof_upload/",
      "divorcepf_file"
    );
    await uploadImages(
      selectedIDProofFiles,
      "http://103.214.132.20:8000/auth/Idproof_upload/",
      "idproof_file"
    );
  };

  const renderFileUploadSection = (
    title: string,
    fileInputRef: React.RefObject<HTMLInputElement>,
    selectedFiles: File[],
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>,
    fieldName: string
  ) => (
    <div className="mt-7">
      <h1 className="font-semibold text-primary text-xl mb-4">{title}</h1>
      <div
        onClick={() => handleButtonClick(fileInputRef)}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={(event) => handleDrop(event, setSelectedFiles)}
        ref={dropAreaRef}
      >
        <UploadFile
          heading="Select a file or drag and drop here"
          desc="JPG, PNG file size no more than 10MB"
          name={fieldName}
          onChange={(event) => handleFileUpload(event, setSelectedFiles)}
          onClick={() => handleButtonClick(fileInputRef)}
          multiple={title === `Upload ${profileOwner} Images/Family Images`}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-7">
          <div className="flex justify-between items-center">
            <h1 className="text-primary text-xl font-semibold">
              Files Uploaded ({selectedFiles.length}/
              {title === `Upload ${profileOwner} Images/Family Images` ? 10 : 1}
              )
            </h1>
          </div>
          <div className="mt-10 space-y-6">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-200 py-2"
              >
                <div className="flex items-center space-x-3">
                  <img src={uploadfile} alt="uploadfile" className="h-8 w-8" />
                  <div>
                    <h1 className="text-lg font-semibold">{file.name}</h1>
                    <p className="text-sm text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button onClick={() => removeFile(index, setSelectedFiles)}>
                  <img src={closebtn} alt="close" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="pb-20">
      <ContentBlackCard
        heading="Upload Images"
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis "
      />

      <div className="container mt-8 flex justify-between space-x-24 space-y-7">
        <div className="w-full">
          {renderFileUploadSection(
            `Upload ${profileOwner} Images/Family Images`,
            fileInputRefs.images,
            selectedFiles,
            setSelectedFiles,
            "uploadImg"
          )}

          <hr className="mt-8 text-gray" />

          <div className="mt-7 text-lg">
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              name="passwordCheckbox"
              // value={1}
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
                onChange={(e) => setPassword(e.target.value)}
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

          {maritalStatus === "2" &&
            renderFileUploadSection(
              `Upload ${profileOwner} Divorce Proof`,
              fileInputRefs.divorceProof,
              selectedDivorceProofFiles,
              setSelectedDivorceProofFiles,
              "uploadDivorceProof"
            )}
          {renderFileUploadSection(
            `Upload ${profileOwner} Horoscope Image`,
            fileInputRefs.horoscope,
            selectedHoroscopeFiles,
            setSelectedHoroscopeFiles,
            "uploadHoroscope"
          )}
          {renderFileUploadSection(
            `Upload ${profileOwner} ID Proof Image`,
            fileInputRefs.idProof,
            selectedIDProofFiles,
            setSelectedIDProofFiles,
            "uploadIDProof"
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
                onChange={(e) => setUrl(e.target.value)}
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
              {/* <Link to="/FamilyDetails"> */}
              <button
                className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2"
                onClick={handleSubmit}
              >
                Next
                <span>
                  <img src={arrow} alt="next arrow" className="ml-2" />
                </span>
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
        <SideContent />
      </div>
      <ToastNotification />
    </div>
  );
};

export default UploadImages;
