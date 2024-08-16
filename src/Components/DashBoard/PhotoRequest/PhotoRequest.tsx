import { useState, useEffect } from "react";
import axios from "axios";
import PhotoRequestView from "../PhotoRequestView";
import { FaArrowLeft } from "react-icons/fa6";

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
    <div className="ml-10">
      <div className="flex gap-4">
        <button onClick={dashBoardAgain}>
          <FaArrowLeft className=" h-6  w-6 " />
        </button>
        <h2 className="font-inter font-bold text-2xl leading-9">
          Photo Requests
        </h2>
      </div>
      {photoRequestData.map((requests) => (
        <PhotoRequestView
          NewUpdatedData={NewUpdatedData}
          setNewUPDatedData={setNewUPDatedData}
          data={requests}
        />
      ))}
    </div>
  );
};

export default PhotoRequest;
