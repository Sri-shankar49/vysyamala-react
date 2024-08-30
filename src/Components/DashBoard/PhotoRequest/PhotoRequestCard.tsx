import { useState } from "react";
import { MdBookmark, MdBookmarkBorder, MdMessage, MdOutlineGrid3X3, MdStars, MdVerifiedUser } from "react-icons/md";

import axios from "axios";
import { Update_photo_request } from "../../../commonapicall";

import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../../Toast/ToastNotification";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoCalendar, IoEye, IoSchool } from "react-icons/io5";
import { FaLocationDot, FaPersonArrowUpFromLine, FaSuitcase, FaUser } from "react-icons/fa6";
import MatchingScore from "../ProfileDetails/MatchingScore";
import ProfileListImg from "../../../assets/images/./ProfileListImg.png";

interface PhotoRequestData {
  req_Profile_img: string;
  req_profile_age: number;
  req_profile_name: string;
  req_profileid: string;
  req_status: number;
  response_message: string | null;
}

interface proptype {
  NewUpdatedData: boolean;
  setNewUPDatedData: (value: boolean) => void;
  data: PhotoRequestData;
}

const PhotoRequestCard = ({
  NewUpdatedData,
  setNewUPDatedData,
  data,
}: proptype) => {
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  const [showTextBox, setShowTextBox] = useState<boolean>(false);

  const [RejectMsg, setRejectMsg] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const upDatePhotoRequest = async (Message?: string) => {
    const payload = {
      profile_from: data.req_profileid,
      status: Message ? 3 : 2,
      profile_id: loginuser_profileId,
      ...(Message && { response_message: Message }),
    };

    try {
      const response = await axios.post(Update_photo_request, payload);
      if (response.status === 200 && Message) {
        NotifyError("Photo request rejected successfully");
        // window.alert("Photo request rejected successfully");
      } else {
        NotifySuccess("Photo request accepted successfully");
        // window.alert("Photo request accepted successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRejectMsg("");
      setNewUPDatedData(!NewUpdatedData);
    }
  };

  const showTextArea = () => {
    setShowTextBox(!showTextBox);
    setRejectMsg("");
  };

  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}`);
  };


  // State to track if the card is bookmarked or not
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div>
      <ToastNotification />

      <div className="border-b-[1px] border-footer-text-gray">
        <div className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-between items-start space-x-5">
              {/* Profile Image */}
              <div className="relative">
                <img src={ProfileListImg} alt="Profile-image" />

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

              {/* Profile Details */}
              <div className="">
                {/* Name & Profile ID */}
                <div className="relative mb-2">
                  <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                    Harini{" "}
                    <span className="text-sm text-ashSecondary">(VM32787)</span>
                    <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                  </h5>
                </div>

                {/* Years & Height */}
                <div className="flex items-center space-x-3 mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoCalendar className="mr-2" />
                    28 yrs
                  </p>

                  <p className="text-gray font-semibold">|</p>

                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaPersonArrowUpFromLine className="mr-2" />
                    5ft 10in (177 cms)
                  </p>
                </div>

                {/* Uthiram */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <MdStars className="mr-2" />
                    Uthiram
                  </p>
                </div>

                {/* Bachelors */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoSchool className="mr-2" />
                    Bachelors - Arts/Science/Commerce/B Phil
                  </p>
                </div>

                {/* Employed */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaSuitcase className="mr-2" />
                    Employed
                  </p>
                </div>

                {/* Location */}
                <div className="mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <FaLocationDot className="mr-2" />
                    Chennai
                  </p>
                </div>

                {/* Tags */}
                <div className="flex justify-start items-center space-x-3">
                  {/* Horoscope Available */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                    </p>
                  </div>

                  {/*  Active User */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <FaUser className="mr-2" /> Active user
                    </p>
                  </div>

                  {/* Last Visit */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoCalendar className="mr-2" /> Last visit on June 30, 2024
                    </p>
                  </div>

                  {/* views */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoEye className="mr-2" /> 31 views
                    </p>
                  </div>
                </div>

                {/* Message button */}
                <button className="text-main font-semibold flex items-center rounded-lg py-5 cursor-pointer">
                  <MdMessage className="text-[26px] mr-2" /> Message
                </button>
              </div>

            </div>

            {/* Matching Score */}
            <div>
              <div>
                {/* <img
                  src={MatchingScoreImg}
                  alt="Matching Score"
                  className="w-full"
                /> */}
                <MatchingScore />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoRequestCard;
