import { useState } from "react";
import { MdVerifiedUser, MdOutlineGrid3X3 } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import axios from "axios";
import { Update_photo_request } from "../../commonapicall";
// import {
//   ToastNotification,
//   NotifyError,
//   NotifySuccess,
// } from "../Toast/ToastNotification";

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

const PhotoRequestView = ({
  NewUpdatedData,
  setNewUPDatedData,
  data,
}: proptype) => {
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  const [showTextBox, setShowTextBox] = useState<boolean>(false);
  const [showMsgtBox, setMsgTextBox] = useState<boolean>(false);
  const [RejectMsg, setRejectMsg] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

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
        // NotifyError("Photo request rejected successfully");
        window.alert("Photo request rejected successfully");
      } else {
        // NotifySuccess("Photo request accepted successfully");
        window.alert("Photo request accepted successfully");
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
  return (
    <div>
      {/* <ToastNotification /> */}
      <div className="border-b-[1px]  border-footer-text-gray">
        <div className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-between items-center space-x-5">
              {/* Profile Image */}
              <div className="relative">
                <img src={data.req_Profile_img} alt="Profile-image" />
              </div>

              {/* Profile Details */}
              <div>
                {/* Name & Profile ID */}
                <div className="relative mb-2">
                  <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                    {data.req_profile_name || "Unknown Name"}{" "}
                    <p className="text-sm text-ashSecondary">
                      ({data.req_profileid || "ID"})
                    </p>
                    <MdVerifiedUser className="absolute top-1.5  left-[155px] text-checkGreen" />
                  </h5>
                </div>

                {/* Age */}
                <div className="flex items-center space-x-3 mb-2">
                  <p className="flex items-center text-ashSecondary font-semibold">
                    <IoCalendar className="mr-2" />
                    {data.req_profile_age || "Unknown Age"} yrs
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

                  {/* Active User */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <FaUser className="mr-2" /> Active user
                    </p>
                  </div>

                  {/* Last Visit */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoCalendar className="mr-2" /> Last visit on June 30,
                      2024
                    </p>
                  </div>

                  {/* Views */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoEye className="mr-2" /> 31 views
                    </p>
                  </div>
                </div>
                <div className="flex mt-3 gap-4">
                  {data.req_status === 2 ? (
                    <>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setMsgTextBox(!showMsgtBox)}
                          className=" text-checkGreen border-checkGreen rounded-md border-[2px] px-2 py-1"
                        >
                          {showMsgtBox ? "cancel" : "Message"}
                        </button>

                        {showMsgtBox ? (
                          <div className="relative max-w-sm">
                            <textarea
                              id="hs-default-height-with-autoheight-script"
                              className="max-h-36 py-1 ps-4 pe-20 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 resize-none overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                              placeholder="Please write the reason for rejection"
                            ></textarea>

                            <div className="absolute top-2 end-3 z-10">
                              <button
                                type="button"
                                className=" text-checkGreen border-checkGreen py-1.5 px-3 inline-flex shrink-0 justify-center items-center text-sm font-medium rounded-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4">
                        {data.req_status === 3 ? (
                          <>
                            <div className="flex gap-4">
                              <button
                                onMouseEnter={() => setIsVisible(true)}
                                onMouseLeave={() => setIsVisible(false)}
                                className="text-main rounded-md border-[2px] border-main px-6 py-1"
                              >
                                Rejected
                              </button>
                              <div>

                                {isVisible && (
                                  <div className="text-smbg-gray-800 rounded-md shadow-lg">
                                    {data.response_message}

                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => upDatePhotoRequest()}
                              className=" rounded-md border-[2px] text-checkGreen border-checkGreen px-4 py-1"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => showTextArea()}
                              className="text-main rounded-md border-[2px] border-main px-6 py-1"
                            >
                              {showTextBox ? "Cancel" : "  Reject"}
                            </button>
                            {showTextBox && (
                              <div className="relative max-w-sm">
                                <textarea
                                  id="hs-default-height-with-autoheight-script"
                                  className="max-h-36 py-1 ps-4 pe-20 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 resize-none overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                                  placeholder="Please write the reason for rejection"
                                  onChange={(e) => setRejectMsg(e.target.value)}
                                ></textarea>

                                <div className="absolute top-2 end-3 z-10">
                                  <button
                                    disabled={!RejectMsg}
                                    onClick={() =>
                                      upDatePhotoRequest(RejectMsg)
                                    }
                                    type="button"
                                    className="py-1.5 px-3 inline-flex shrink-0 justify-center items-center text-sm font-medium rounded-lg text-main hover:text-white  hover:bg-main focus:outline-none focus:bg-main disabled:opacity-50 disabled:pointer-events-none"
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoRequestView;
