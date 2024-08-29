import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
// import UploadFile from "../../../Components/UploadImages/UploadFile";
import uploadfile from "../../../assets/icons/uploadfile.png";
import closebtn from "../../../assets/icons/closebtn.png";
import axios from "axios";
// import { profile } from "console";
import { photo_protection } from "../../../commonapicall"; //api
import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../../Toast/ToastNotification";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { update_photo_password } from "../../../commonapicall"; //api
// import arrow from "../../../assets/icons/arrow.png";
const schema = z.object({
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

type FormData = z.infer<typeof schema>;

interface PhotoSettingsProps { }

export const PhotoSettings: React.FC<PhotoSettingsProps> = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const loginuser_profile_id = sessionStorage.getItem("loginuser_profile_id");
  // const [updatePhotoPassward, setUpdatePhotoPassward] = useState<string>("");
  // const [photoprotectionValue, setPhotoprotectionValue] = useState<number>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // const fileInputRefs = {
  //   images: useRef<HTMLInputElement>(null),
  //   horoscope: useRef<HTMLInputElement>(null),
  //   idProof: useRef<HTMLInputElement>(null),
  // };

  // const dropAreaRef = useRef<HTMLDivElement>(null);

  // const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
  //   if (inputRef.current) {
  //     inputRef.current.click();
  //   }
  // };

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files) {
  //     handleFiles(files);
  //   }
  // };

  // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const files = event.dataTransfer.files;
  //   if (files) {
  //     handleFiles(files);
  //   }
  //   if (dropAreaRef.current) {
  //     dropAreaRef.current.classList.remove("border-blue-500");
  //   }
  // };

  // const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   if (dropAreaRef.current) {
  //     dropAreaRef.current.classList.add("border-blue-500");
  //   }
  // };

  // const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   if (dropAreaRef.current) {
  //     dropAreaRef.current.classList.add("border-blue-500");
  //   }
  // };

  // const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   if (dropAreaRef.current) {
  //     dropAreaRef.current.classList.remove("border-blue-500");
  //   }
  // };

  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  // const clearFileInput = () => {
  //   setSelectedFiles([]);
  // };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePhotoProtection = async () => {
    try {
      const response = await axios.post(photo_protection, {
        profile_id: loginuser_profile_id,
      });

      if (response.status === 200) {
        console.log(response);

        const protectionValue = response.data.data.Photo_protection;
        // setPhotoprotectionValue(protectionValue);
        setIsChecked(protectionValue === 1);
        // console.log("success", protectionValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    // setPhotoprotectionValue(e.target.checked ? 1 : 0);
  };

  const handle_Update_photo_password = async (password: string) => {
    try {
      const response = await axios.post(update_photo_password, {
        profile_id: loginuser_profile_id,
        photo_password: password,
        photo_protection: isChecked ? 1 : 0,
      });

      if (response.status === 200) {
        // Handle the successful update here
        NotifySuccess("Photo password updated successfully.");

      }
    } catch (error) {
      console.log(error);
      NotifyError("Something went wrong");
    }
  };
  // const handleFiles = (files: FileList) => {
  //   const newFiles: File[] = Array.from(files);
  //   if (selectedFiles.length + newFiles.length > 10) {
  //     const remainingSpace = 10 - selectedFiles.length;
  //     setSelectedFiles([
  //       ...selectedFiles,
  //       ...newFiles.slice(0, remainingSpace),
  //     ]);
  //   } else {
  //     setSelectedFiles([...selectedFiles, ...newFiles]);
  //   }
  // };

  useEffect(() => {
    handlePhotoProtection();
  }, []);

  const onSubmit = (data: FormData) => {
    // setUpdatePhotoPassward(data.password);

    handle_Update_photo_password(data.password);

    reset()

    // Handle form submission
  };
  return (
    <div className="">
      <div className="container flex justify-between space-x-24 space-y-7">
        <div className="w-full">
          <div>
            <h1 className="font-semibold text-primary text-xl mb-4">
              Upload Your Images
            </h1>

            {/* <div
              onClick={() => handleButtonClick(fileInputRefs.images)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              ref={dropAreaRef}
            > */}
            {/* <UploadFile
                heading="Select a file or drag and drop here"
                desc="JPG, PNG file size no more than 10MB"
                name="uploadImg"
                onChange={handleFileUpload}
                onClick={() => handleButtonClick(fileInputRefs.images)}
                multiple // Set to true if you want to allow multiple file selection
              //ref={fileInputRefs.images}
              /> */}
            {/* </div> */}
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
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 py-2"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={uploadfile}
                      alt="uploadfile"
                      className="h-8 w-8"
                    />
                    <div>
                      <h1 className="text-lg font-semibold">{file.name}</h1>
                      <p className="text-sm text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
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
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="passwordCheckbox">
              Protect my images with password (only people you share the
              password can view the images)
            </label>
          </div>

          {isChecked && (
            <div className="mt-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="password" className="block text-lg mb-2">
                  Enter Password
                </label>
                <div className="w-fit relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    id="password"

                    className="outline-none w-full px-5 py-1.5 border border-ashSecondary rounded"
                  />

                  <div
                    onClick={handleShowPassword}
                    className="absolute inset-y-1.5 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </div>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-white mt-1 text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {!isChecked && (
            <button
              onClick={() => handle_Update_photo_password("")}
              className="bg-white mt-1 text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer"
            >
              Submit
            </button>
          )}
          {/* <div className="mt-7">
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
          </div> */}

          <div className="mt-7">
            {/* <h1 className="font-semibold text-primary text-xl mb-4">
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
            </div> */}
            {/* <p className="mt-3 text-ash">
              Note: If youtube URL is not available send your video and your
              Profile ID on Whatsapp to +1234567890. Our admin will moderate and
              upload
            </p>
          </div>

          <div className="mt-7">
            <h1 className="font-semibold text-primary text-xl mb-4">
              Upload Daughter ID Proof
            </h1> */}

            {/* <div
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
            </div> */}
          </div>
        </div>
      </div>
      <ToastNotification />
    </div>
  );
};
