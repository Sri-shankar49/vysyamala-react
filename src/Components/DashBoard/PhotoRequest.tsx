import { useState, useEffect } from "react";
import axios from "axios";
import PhotoRequestCard from "./PhotoRequest/PhotoRequestCard";
import { FaArrowLeft } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { SuggestedProfiles } from "../LoginHome/SuggestedProfiles";

interface DashBoardMyProfileProps {
  dashBoardAgain: () => void;
}

const PhotoRequest: React.FC<DashBoardMyProfileProps> = ({
  dashBoardAgain,
}) => {
  const [photoRequestData, setPhotoRequestData] = useState([]);

  const [NewUpdatedData, setNewUPDatedData] = useState<boolean>(false);
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  const getPhotoRequest = async () => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Get_photo_request_list/",
        {
          profile_id: loginuser_profileId,
        }
      );
      setPhotoRequestData(response.data.data.profiles);
    } catch (error) {
      console.error("Error fetching photo requests:", error);
    }
  };

  console.log("NewUpdatedData", NewUpdatedData);
  // Optionally, you can call `getPhotoRequest` inside `useEffect` if you want to fetch data when the component mounts
  useEffect(() => {
    getPhotoRequest();
  }, [NewUpdatedData]);

  return (
    // <div className="ml-10">
    //   <div className="flex gap-4">
    //     <button onClick={dashBoardAgain}>
    //       <FaArrowLeft className=" h-6  w-6 " />
    //     </button>
    //     <h2 className="font-inter font-bold text-2xl leading-9">
    //       Photo Requests
    //     </h2>
    //   </div>
    //   {photoRequestData.map((requests) => (
    //     <PhotoRequestCard
    //       NewUpdatedData={NewUpdatedData}
    //       setNewUPDatedData={setNewUPDatedData}
    //       data={requests}
    //     />
    //   ))}
    // </div>

    <div className="bg-grayBg pt-10">
      <div className="container mx-auto">

        <div className="flex items-center mb-5">
          <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold"> Photo Requests
            <span className="text-sm text-primary"> (05)</span>
          </h4>
        </div>

        {/* Personal Notes Card */}
        <div>
          {photoRequestData.map((requests) => (
            <PhotoRequestCard
              NewUpdatedData={NewUpdatedData}
              setNewUPDatedData={setNewUPDatedData}
              data={requests}
            />
          ))}
        </div>
      </div>
      <SuggestedProfiles />
    </div>
  );
};

export default PhotoRequest;
