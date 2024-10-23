/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdMessage,
  MdOutlineGrid3X3,
  MdStars,
  MdVerifiedUser,
} from "react-icons/md";
import axios from "axios";
import { Update_photo_request } from "../../../commonapicall";
import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../../Toast/ToastNotification";
// import { useNavigate } from "react-router-dom";
import { IoCalendar, IoEye, IoSchool } from "react-icons/io5";
import {
  FaLocationDot,
  FaPersonArrowUpFromLine,
  FaSuitcase,
  FaUser,
} from "react-icons/fa6";
import MatchingScore from "../ProfileDetails/MatchingScore";
// import ProfileListImg from "../../../assets/images/./ProfileListImg.png";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { PhotoRequestPopup } from "./PhotoRequestPopup";
import Spinner from "../../Spinner";
import { useNavigate } from "react-router-dom";

interface PhotoRequestData {
  req_Profile_img: string;
  req_profile_age: number;
  req_profile_name: string;
  req_profileid: string;
  req_status: number;
  response_message: string | null;
  req_verified: number;
  req_height:number;
  req_star:string;
  req_profession:string;
  req_city:string;
  req_degree:string;
  req_match_score?: number;
  req_views:number;
  req_lastvisit:string;
  req_userstatus:string;
  req_horoscope:string;
  req_profile_wishlist:string;
}

interface proptype {
  NewUpdatedData: boolean;
  setNewUPDatedData: (value: boolean) => void;
  data: PhotoRequestData;
  totalRecords: number;
  toptalPages: number;

}

const PhotoRequestCard = ({
  NewUpdatedData,
  setNewUPDatedData,


  data,
}: proptype) => {
  const navigate = useNavigate();
  const [photoRequests, setPhotoRequests] = useState<PhotoRequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const [RejectMsg, setRejectMsg] = useState<string>("");
  const [, setShowPhotoRequestNotesPopup] =
    useState<boolean>(false);

  const [showMessageButton, setShowMessageButton] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [requestHandled, setRequestHandled] = useState(false);
  const [showPhotoRequestPopup, setshowPhotoRequestPopup] = useState(false);
  const [declineButtonVisible, setDeclineButtonVisible] = useState(true); // State to control the visibility of the Decline button
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotoRequests = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_photo_request_list/",
          {
            profile_id: loginuser_profileId,
          }
        );
        if (response.data.Status === 1) {
          setPhotoRequests(response.data.data.profiles);
          setLoading(false);

          response.data.data.profiles.forEach((profile: PhotoRequestData) => {
            const handledState = sessionStorage.getItem(
              `requestHandled_${profile.req_profileid}`
            );
            if (handledState) {
              setRequestHandled(true);
              if (handledState === "rejected") {
                setDeclineButtonVisible(false);
                const storedMessage = sessionStorage.getItem(
                  `responseMessage_${profile.req_profileid}`
                );
                if (storedMessage) {
                  setResponseMessage(storedMessage);
                }
              } else {
                setShowMessageButton(true);
              }
            }
          });
        } else {
          setError("Failed to fetch photo requests.");
          setLoading(false);
        }
      } catch (err) {
        setError("Error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchPhotoRequests();
  }, [loginuser_profileId]);
  console.log(photoRequests, "ddddddddddddddd");
  // useEffect(() => {
  //   const fetchPhotoRequests = async () => {
  //     try {
  //       const response = await axios.post("http://103.214.132.20:8000/auth/Get_photo_request_list/", {
  //         profile_id: loginuser_profileId,
  //       });
  //       if (response.data.Status === 1) {
  //         setPhotoRequests(response.data.data.profiles);
  //         setLoading(false);
  //       } else {
  //         setError("Failed to fetch photo requests.");
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       setError("Error occurred while fetching data.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchPhotoRequests();
  // }, [loginuser_profileId]);

  const upDatePhotoRequest = async (Message?: string) => {
    const payload = {
      profile_from: data.req_profileid,
      status: Message ? 3 : 2,
      profile_id: loginuser_profileId,
      ...(Message && { response_message: Message }),
    };

    try {
      const response = await axios.post(Update_photo_request, payload);
      if (response.status === 200) {
        if (Message) {
          NotifyError("Interest Declined");
        } else {
          NotifySuccess("Photo request accepted successfully");
          setShowMessageButton(true);
        }
        setShowPhotoRequestNotesPopup(true);
        setRequestHandled(true); // Update state to hide buttons
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRejectMsg("");
      setNewUPDatedData(!NewUpdatedData);
    }
  };

  const handleUpdateInterest = async (status: string) => {
    await upDatePhotoRequest(status === "3" ? RejectMsg : undefined);

    // Store the accept state in sessionStorage
    sessionStorage.setItem(`requestHandled_${data.req_profileid}`, "accepted");
    setRequestHandled(true);
    setDeclineButtonVisible(false);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleshowPhotoRequestPopup = () => {
    setshowPhotoRequestPopup(!showPhotoRequestPopup);
  };

  // const handleDeclineSubmit = () => {
  //   setRequestHandled(true);
  //   setDeclineButtonVisible(false); // Hide Decline button
  // };

  const handleDeclineSubmit = (message: string) => {
    setResponseMessage(message); // Store the response message

    // Store the reject state in sessionStorage
    sessionStorage.setItem(`responseMessage_${data.req_profileid}`, message); // Store the response message
    sessionStorage.setItem(`requestHandled_${data.req_profileid}`, "rejected");
    setRequestHandled(true);
    setDeclineButtonVisible(false);
  };

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;



  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}&page=6`);
  };
  return (
    <div>
      <ToastNotification />

      {photoRequests.map((data) => (
        <div
          key={data.req_profileid}
          className="border-b-[1px] border-footer-text-gray"
        >
          <div className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5">
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-between items-start space-x-5">
                <div className="relative">
                  <img
                    src={data.req_Profile_img}
                    alt="Profile-image"
                    className="rounded-lg"
                  />
                  {isBookmarked ? (
                    <MdBookmark
                      onClick={handleBookmark}
                      className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                    />
                  ) : (
                    <MdBookmarkBorder
                      onClick={handleBookmark}
                      className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                    />
                  )}
                </div>

                <div className="">
                  {/* <div className="relative mb-2">
                    <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                      {data.req_profile_name}{" "}
                      <span className="text-sm text-ashSecondary">({data.req_profileid})</span>
                      <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                    </h5>
                  </div> */}

                  <div className="relative mb-2">
                    <div className="flex items-center">
                      <h5
                        className="text-[20px] text-secondary font-semibold cursor-pointer"
                      onClick={() => handleProfileClick(data.req_profileid)}
                      >
                        {data.req_profile_name}
                        <span className="text-sm text-ashSecondary">
                          ({data.req_profileid})
                        </span>
                      </h5>
                      {data.req_verified === 1 && (
                        <MdVerifiedUser className="text-[20px] text-checkGreen ml-2" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <IoCalendar className="mr-2" />
                      {data.req_profile_age} yrs
                    </p>
                    <p className="text-gray font-semibold">|</p>
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <FaPersonArrowUpFromLine className="mr-2" />
                      {data.req_height} ft
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <MdStars className="mr-2" />
                      {data.req_star}
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <IoSchool className="mr-2" />
                      {data.req_degree}
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <FaSuitcase className="mr-2" />
                      {data.req_profession}
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="flex items-center text-ashSecondary font-semibold">
                      <FaLocationDot className="mr-2" />
                      {data.req_city}
                    </p>
                  </div>

                  <div className="flex justify-start items-center space-x-3">
                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <MdOutlineGrid3X3 className="mr-2" />  {data.req_horoscope}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <FaUser className="mr-2" />{data.req_userstatus}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <IoCalendar className="mr-2" /> Last visit on {data.req_lastvisit}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <IoEye className="mr-2" /> {data.req_views} views
                      </p>
                    </div>
                  </div>

                  <div></div>

                  <div className="flex space-x-4 mt-4">
                    {!requestHandled && (
                      <>
                        <button
                          onClick={() => handleUpdateInterest("2")}
                          className="bg-checkGreen text-white flex items-center rounded-lg px-5 py-3 cursor-pointer"
                        >
                          <FaCheckCircle className="text-[22px] mr-2" /> Accept
                        </button>
                        {declineButtonVisible && (
                          <button
                            onClick={() => handleshowPhotoRequestPopup()}
                            className="bg-white text-main flex items-center rounded-lg border-2 px-5 py-2.5 cursor-pointer"
                          >
                            <IoMdCloseCircle className="text-[26px] mr-2" />{" "}
                            Decline
                          </button>
                        )}
                      </>
                    )}
                    {showMessageButton && (
                      <button className="text-main font-semibold flex items-center rounded-lg py-5 cursor-pointer">
                        <MdMessage className="text-[26px] mr-2" /> Message
                      </button>
                    )}
                  </div>
                  <div>
                    <div>
                      {responseMessage && (
                        <div className="text-main font-semibold mt-4">
                          Response Message: {responseMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <MatchingScore scorePercentage={data.req_match_score} />
              </div>
            </div>
          </div>
          {showPhotoRequestPopup && (
            <PhotoRequestPopup
              closePopup={() => handleshowPhotoRequestPopup()}
              profileId={data.req_profileid}
              profileTo={loginuser_profileId || ""}
              onDeclineSubmit={handleDeclineSubmit}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoRequestCard;
