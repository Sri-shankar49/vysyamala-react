import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { hideInterest } from "../../../redux/slices/interestSlice";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileViewPassWordInput from "./ProfileViewPasswordInput";
import { MdMessage, MdVerifiedUser } from "react-icons/md";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { IoClose, IoDocumentText } from "react-icons/io5";
import { RiAlertFill } from "react-icons/ri";
import { BiSolidUserVoice } from "react-icons/bi";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
// import { ProfileSlick } from "./ProfileSlick";
import { ProfileSlickView } from "../../LoginHome/ProfileDetailsView/ProfileSlickView";
import { MdLocalPrintshop } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
// import { ProfileDetailsSettings } from "./ProfileDetailsSettings"
// import { ProfileDetailsSettingsView } from "../../LoginHome/ProfileDetailsView/ProfileDetailsSettingsView";
// import { FeaturedProfiles } from "../../LoginHome/FeaturedProfiles";
// import { VysyaBazaar } from "../../LoginHome/VysyaBazaar";
// import { SuggestedProfiles } from "../../LoginHome/SuggestedProfiles";
import MatchingScore from "./MatchingScore";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import CustomMessagePopUp from "./CustomMessagePopup";
import {
  ToastNotification,
  NotifySuccess,
  NotifyError,
} from "../../Toast/ToastNotification";
import { toast } from "react-toastify";
import { PersonalNotesPopup } from "../PersonalNotes/PersonalNotesPopup";

import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  WeiboShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import { Get_profile_det_match } from "../../../commonapicall";
import { Get_photo_bypassword } from "../../../commonapicall";
import { Share } from "./Share";

// import { boolean } from "zod";

// Define the interfaces for profile data
interface HoroscopeDetails {
  star_name: string;
  surya_gothram: string;
}

interface EducationDetails {
  profession: string;
  education_level: string;
}

interface BasicDetails {
  profile_id: string;
  profile_name: string;
  express_int: string;
  about: string;
  user_profile_views: string;
  matching_score: number;
}

interface PersonalDetails {
  age: number;
  height: string;
  weight: string;
}

interface ProfileData {
  horoscope_details: HoroscopeDetails;
  education_details: EducationDetails;
  basic_details: BasicDetails;
  personal_details: PersonalDetails;
}

interface ProfileDetailsExpressInterestProps { }

export const ProfileDetailsExpressInterest: React.FC<
  ProfileDetailsExpressInterestProps
> = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  console.log(profileData, "profileData");
  const [hideExpresButton, setHideExpressButton] = useState<boolean>(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const interestParam = queryParams.get("interest");
  const id = queryParams.get("id");
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const [GetProfileDetMatchData, SetGetProfileDetMatchData] = useState<any>({});
  // const [PasswordModal, setPassWordModal] = useState<boolean>(false);

  const [response, setResponse] = useState<boolean>(false);
  const custom_message = sessionStorage.getItem("custom_message");
  useEffect(() => {
    if (response === true) {
      NotifySuccess("Image Unlocked Successfully");
    }
  }, [response]);

  const storedPlanId = sessionStorage.getItem("plan_id");
  console.log("vysya", storedPlanId)
  const { photo_protection } = GetProfileDetMatchData;
  console.log("vysya", photo_protection)


  const GetProfileDetMatch = async () => {
    try {
      const response = await axios.post(Get_profile_det_match, {
        profile_id: loginuser_profileId, // Replace with the appropriate value or extract from route params if needed
        user_profile_id: id,
      });

      if (response.status === 200) {
        SetGetProfileDetMatchData(response.data);
        const xyz = sessionStorage.setItem("photo_protection", response.data)
        console.log("asdsas", xyz)
        console.log("messagexsxsxsxsxsx", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };




  const handleUpdateInterest = async (profileId: string, status: string) => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Update_profile_intrests/",
        {
          profile_id: loginuser_profileId,
          profile_from: profileId,
          status: status,
        }
      );
      if (response.data.Status === 1) {
        // Remove the profile from the state if rejected
        if (status === "2") {
          NotifySuccess("Interest Accepted");
          setHideExpressButton(false);
        } else if (status === "3") {
          NotifyError("Interest Declined");
          setHideExpressButton(false);
        } else {
          console.error(
            "Error updating profile interest:",
            response.data.message
          );
          NotifyError("Error updating profile interest");
        }
      }
    } catch (error) {
      console.error("Error updating profile interest:", error);
      NotifyError("Error updating profile interest");
    }
  };

  // const GetPhotoByPassword = async (Password: string) => {
  //   try {
  //     const response = await axios.post(Get_photo_bypassword, {
  //       profile_id: loginuser_profileId,
  //       profile_to: id,
  //       photo_password: Password,
  //     });

  //     if (response.status === 200) {
  //       const userImages = response.data.data.user_images;
  //       setResponse(true);
  //       // NotifySuccess("Image Unlocked Successfully");
  //       // Set the user images to the state
  //       // setProtectedImg(userImages);

  //       sessionStorage.setItem(`userImages_${id}`, JSON.stringify(userImages));
  //       // sessionStorage.setItem("userImages", JSON.stringify(userImages));
  //     }
  //   } catch (error) {
  //     NotifyError("Please Enter Correct Password");
  //   }
  // };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_profile_det_match/",
          {
            profile_id: loginuser_profileId, // Replace with the appropriate value or extract from route params if needed
            user_profile_id: id,
          }
        );
        setProfileData(response.data);
        if (response.data.basic_details.express_int === "1") {
          setIsHeartMarked(true);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Redux
  // const dispatch = useDispatch();

  // const handleBackClick = () => {
  //     dispatch(hideInterest());
  // };

  // Declaration for Bookmarking Profile
  // Declaration for Bookmarking Profile
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<ProfileData[]>(
    () => {
      const savedBookmarks = localStorage.getItem("bookmarkedProfiles");
      return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    }
  );
  const [selectedProfiles, setSelectedProfiles] = useState<ProfileData[]>(
    () => {
      const savedSelectedProfiles = localStorage.getItem("selectedProfiles");
      return savedSelectedProfiles ? JSON.parse(savedSelectedProfiles) : [];
    }
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_profile_det_match/",
          {
            profile_id: loginuser_profileId,
            user_profile_id: id,
          }
        );
        setProfileData(response.data);
        if (response.data.basic_details.express_int === "1") {
          setIsHeartMarked(true);
        }

        const isAlreadyBookmarked = bookmarkedProfiles.some(
          (profile) =>
            profile.basic_details.profile_id ===
            response.data.basic_details.profile_id
        );
        setIsBookmarked(isAlreadyBookmarked);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [id, loginuser_profileId, bookmarkedProfiles]);

  useEffect(() => {
    localStorage.setItem(
      "bookmarkedProfiles",
      JSON.stringify(bookmarkedProfiles)
    );
  }, [bookmarkedProfiles]);

  useEffect(() => {
    localStorage.setItem("selectedProfiles", JSON.stringify(selectedProfiles));
  }, [selectedProfiles]);

  const addBookmark = async (profile: ProfileData) => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Mark_profile_wishlist/",
        {
          profile_id: loginuser_profileId,
          profile_to: id,
          status: "1",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        NotifySuccess("Profile added Bookmark Successfully");
      }
      if (response.data.Status === 1) {
        setBookmarkedProfiles((prev) => [...prev, profile]);
        setSelectedProfiles((prev) => [...prev, profile]);
        setIsBookmarked(true);
        console.log(
          `Profile ${profile.basic_details.profile_id} bookmarked successfully with status 1.`
        );
      } else {
        console.log("Failed to bookmark profile:", response.data.Message);
      }
    } catch (error) {
      console.error("Error bookmarking profile:", error);
    }
  };

  const removeBookmark = async (profile_id: string) => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Mark_profile_wishlist/",
        {
          profile_id: loginuser_profileId,
          profile_to: id,
          status: "0",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.Status === 1) {
        NotifyError("Profile Removed from Bookmark Successfully");
        setBookmarkedProfiles((prev) => {
          console.log("Previous bookmarked profiles:", prev);

          return prev.filter((profile) => {
            if (!profile || !profile.basic_details) {
              console.error("Malformed profile object:", profile);
              return false; // Skip malformed profile objects
            }
            return profile.basic_details.profile_id !== profile_id;
          });
        });

        setSelectedProfiles((prev) => {
          console.log("Previous selected profiles:", prev);

          return prev.filter((profile) => {
            if (!profile || !profile.basic_details) {
              console.error("Malformed profile object:", profile);
              return false; // Skip malformed profile objects
            }
            return profile.basic_details.profile_id !== profile_id;
          });
        });

        setIsBookmarked(false);
        console.log(
          `Profile ${profile_id} removed from bookmarks successfully with status 0.`
        );
      } else {
        console.log("Failed to remove bookmark:", response.data.Message);
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const handleBookmark = () => {
    if (isBookmarked && profileData) {
      removeBookmark(profileData.basic_details.profile_id);
    } else if (profileData) {
      addBookmark(profileData);
    }
  };

  // Declaration for Heart State
  const [isHeartMarked, setIsHeartMarked] = useState(false);

  const [openCustomMsgShow, setOpenCustomMsgShow] = useState<boolean>(false);
  const [openCustomMsg, setOpenCustomMsg] = useState<string>("");

  console.log(openCustomMsg, "openCustomMsg");
  console.log(openCustomMsg, "setOpenCustomMsg");

  const [selectValue, setSelectValue] = useState<string>("");

  const handleHeartMark = async () => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Send_profile_intrests/",
        {
          profile_id: loginuser_profileId,
          profile_to: id,
          status: !isHeartMarked ? "1" : "0",
          to_express_message: openCustomMsg || selectValue, // Use message if provided, otherwise use an empty string
        }
      );

      if (response.status === 200) {
        setIsHeartMarked(!isHeartMarked);

        // Toast Notification
        if (!isHeartMarked) {
          NotifySuccess("Expressed Interest");
        } else {
          toast.error("Removed Interest");
        }
      } else {
        // Toast Notification
        NotifyError("Failed to update express interest");

        console.error("Failed to update express interest");
      }
    } catch (error) {
      // Toast Notification
      NotifyError("Error updating express interest");

      console.error("Error updating express interest:", error);
    } finally {
      setOpenCustomMsg("")
      setSelectValue("")
    }
  };

  useEffect(() => {
    if (openCustomMsg || selectValue) {
      handleHeartMark();
    }
  }, [openCustomMsg, selectValue]);

  const openMsgPopUp = () => {
    setOpenCustomMsgShow(true);
  };

  // Declaration for Horoscope State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const sendPhotoRequest = async () => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Send_photo_request/",
        {
          profile_id: loginuser_profileId,
          profile_to: profileData?.basic_details.profile_id,
          status: 1,
        }
      );
      if (response.status >= 200 || response.status >= 204) {
        NotifySuccess("Photo interests sent successfully");
      } else {
        NotifyError("Something went wrong, please try again later");
      }

      return response.data;
    } catch (error: any) {
      console.error(
        "Error sending photo request:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // const toggleDropdown = () => {
  //     setIsOpen(!isOpen);
  // };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  // Personal Notes Popup
  const [showPersonalNotes, setShowPersonalNotes] = useState(false);
  const navigate = useNavigate();
  const handlePersonalNotesPopup = () => {
    setShowPersonalNotes(!showPersonalNotes);
  };

  const closePersonalNotesPopup = () => {
    setShowPersonalNotes(false);
  };

  const [isShareVisible, setIsShareVisible] = useState(false);

  const toggleShareVisibility = () => {
    setIsShareVisible(!isShareVisible);
  };

  const closeShareModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).className.includes("modal-overlay")) {
      setIsShareVisible(false);
    }
  };


  useEffect(() => {
    if (storedPlanId === "0") {
      navigate("/MembershipPlan");
    }
  }, [storedPlanId]);

  return (
    <div>
      <div className="bg-grayBg pt-10">
        <div className="container mx-auto">
          <div className="flex items-center mb-5">
            {/* <IoArrowBackOutline onClick={handleBackClick} className="text-[24px] mr-2 cursor-pointer" /> */}
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
              {" "}
              Profile Details
              {/* <span className="text-sm text-primary"> (234)</span> */}
            </h4>
          </div>
          <ToastNotification />
          <div className="grid grid-rows-1 grid-cols-3 justify-start items-center space-x-10 my-5">
            <div>
              <ProfileSlickView
                GetProfileDetMatch={GetProfileDetMatch}
                profileId={profileData?.basic_details.profile_id}
              />

              {/* <div>
                {photo_protection && (
                  <ProfileViewPassWordInput
                    PasswordModal={PasswordModal}
                    setPassWordModal={setPassWordModal}
                    GetPhotoByPassword={GetPhotoByPassword}
                  />
                )}
              </div> */}
            </div>

            {/* Profile Details */}
            <div className="col-span-2">
              <div className="flex justify-between items-center">
                <div className="">
                  <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2">
                    {profileData?.basic_details.profile_name}
                    <MdVerifiedUser className="text-checkGreen ml-2" />
                  </h4>
                </div>

                {/* Icons */}
                <div className="flex justify-center items-center space-x-10">
                  <div>
                    <IoShareSocialSharp
                      title="Share Profile"
                      className="text-[22px] text-vysyamalaBlack cursor-pointer"
                      onClick={toggleShareVisibility}
                    />

                    {/* Share Component here */}
                    {isShareVisible && (<Share closePopup={toggleShareVisibility} />)}

                  </div>

                  <div>
                    {/* <MdBookmarkBorder title="Bookmark Profile" className="text-[22px] text-vysyamalaBlack cursor-pointer" /> */}
                    {isBookmarked ? (
                      <MdBookmark
                        title="Wishlist this Profile"
                        onClick={handleBookmark}
                        className="text-[22px] text-vysyamalaBlack cursor-pointer"
                      />
                    ) : (
                      <MdBookmarkBorder
                        title="Wishlist this Profile"
                        onClick={handleBookmark}
                        className="text-[22px] text-vysyamalaBlack cursor-pointer"
                      />
                    )}
                  </div>

                  <div>
                    <IoDocumentText
                      onClick={handlePersonalNotesPopup}
                      title="Personal Notes"
                      className="text-[22px] text-vysyamalaBlack cursor-pointer"
                    />
                    {showPersonalNotes && (
                      <PersonalNotesPopup
                        closePopup={closePersonalNotesPopup}
                        profileId={""}
                        profileTo={""}
                      />
                    )}
                  </div>

                  <div>
                    <RiAlertFill
                      onClick={() => sendPhotoRequest()}
                      title="Spot on Error"
                      className="text-[22px] text-vysyamalaBlack cursor-pointer"
                    />
                  </div>

                  <div>
                    <BiSolidUserVoice
                      title="Vys Assist"
                      className="text-[22px] text-vysyamalaBlack cursor-pointer"
                    />
                  </div>

                </div>
              </div>

              <p className="text-[20px] text-primary font-bold mb-2">
                {profileData?.basic_details.profile_id}
              </p>

              <div className="flex justify-between items-center">
                {/* Profile Details Content */}
                <div>
                  {/* Age & height */}
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-[18px] text-ash font-semibold">
                      Age :
                      <span className="font-normal">
                        {" "}
                        {profileData?.personal_details.age} years
                      </span>
                    </h5>

                    <h5 className="text-[18px] text-ash font-semibold mb-2">
                      Height :
                      <span className="font-normal">
                        {" "}
                        {profileData?.personal_details.height}
                      </span>
                    </h5>
                  </div>

                  <h5 className="text-[18px] text-ash font-semibold mb-2">
                    Weight :
                    <span className="font-normal">
                      {" "}
                      {profileData?.personal_details.weight}
                    </span>
                  </h5>

                  {/* Star & Gothram */}
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-[18px] text-ash font-semibold">
                      Star :
                      <span className="font-normal">
                        {" "}
                        {profileData?.horoscope_details.star_name}
                      </span>
                    </h5>

                    <h5 className="text-[18px] text-ash font-semibold mb-2">
                      Gothram :
                      <span className="font-normal">
                        {" "}
                        {profileData?.horoscope_details.surya_gothram}
                      </span>
                    </h5>
                  </div>

                  <h5 className="text-[18px] text-ash font-semibold mb-2">
                    Profession :
                    <span className="font-normal">
                      {" "}
                      {profileData?.education_details.profession}
                    </span>
                  </h5>

                  <h5 className="text-[18px] text-ash font-semibold mb-2">
                    Education :
                    <span className="font-normal">
                      {" "}
                      {profileData?.education_details.education_level}
                    </span>
                  </h5>

                  <h5 className="text-[18px] text-ash font-semibold mb-2">
                    About :
                    <span className="font-normal">
                      {" "}
                      {profileData?.basic_details.about}
                    </span>
                  </h5>

                  <div className="flex justify-start items-center space-x-3 mt-3">
                    {/* Horoscope Available */}
                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <MdOutlineGrid3X3 className="mr-2" /> Horoscope
                        Available
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
                        <IoCalendar className="mr-2" /> Last visit on June 30,
                        2024
                      </p>
                    </div>

                    {/* views */}
                    <div>
                      <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                        <IoEye className="mr-2" />{" "}
                        {profileData?.basic_details.user_profile_views} views
                      </p>
                    </div>
                  </div>
                </div>

                {/* Matching Meter */}
                <div>
                  {/* <img
                                        src={MatchingScoreImg}
                                        alt="Matching Score"
                                        className="w-full"
                                    /> */}
                  <MatchingScore
                  // matchingScore={profileData?.basic_details.matching_score}
                  />
                </div>
              </div>
              {openCustomMsgShow ? (
                <CustomMessagePopUp
                  custom_message={custom_message}
                  setOpenCustomMsgShow={setOpenCustomMsgShow}
                  setOpenCustomMsg={setOpenCustomMsg}
                  setSelect={setSelectValue}
                />
              ) : (
                ""
              )}
              <div className="flex justify-between items-center mt-10 mb-3">
                <div>
                  {/* Buttons */}

                  {interestParam !== "1" && loginuser_profileId && (
                    <div className="flex justify-start items-center space-x-5 my-5">
                      <button
                        onClick={
                          custom_message && !isHeartMarked
                            ? openMsgPopUp
                            : handleHeartMark
                        }
                        className="bg-gradient text-white flex items-center rounded-md px-5 py-3 cursor-pointer"
                      >
                        <FaHeart
                          className={`text-[22px] mr-2 ${isHeartMarked ? "text-red-500" : "text-gray-400"
                            }`}
                        />
                        {isHeartMarked
                          ? "Remove from Interest"
                          : "Express Interest"}

                        {/* Toast Notifications */}
                      </button>

                      <button className="bg-white text-main flex items-center rounded-md border-2 px-5 py-2.5 cursor-pointer">
                        <FaTableList className="text-[22px] mr-2" /> Horoscope
                      </button>
                    </div>
                  )}

                  {interestParam === "1" && loginuser_profileId && (
                    <div className="flex justify-start items-center space-x-5 my-5">
                      {/* Accept button */}
                      {hideExpresButton ? (
                        <>
                          {" "}
                          <button
                            onClick={() =>
                              handleUpdateInterest(loginuser_profileId, "2")
                            }
                            className="bg-checkGreen text-white flex items-center rounded-lg px-5 py-3 cursor-pointer"
                          >
                            <FaCheckCircle className="text-[22px] mr-2" />{" "}
                            Accept
                          </button>
                          {/* Decline button */}
                          <button
                            onClick={() =>
                              handleUpdateInterest(loginuser_profileId, "3")
                            }
                            className="bg-white text-main flex items-center rounded-lg border-2 px-5 py-2.5 cursor-pointer"
                          >
                            <IoMdCloseCircle className="text-[26px] mr-2" />{" "}
                            Decline
                          </button>
                          {/* Message button */}
                        </>
                      ) : (
                        ""
                      )}
                      <Link to="/Messages">
                        <button className="text-main flex items-center rounded-lg px-5 py-2.5 cursor-pointer">
                          <MdMessage className="text-[26px] mr-2" /> Message
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                <div
                  className="flex justify-center items-center space-x-10"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="relative">
                    <p className="flex items-center text-ash cursor-pointer">
                      <MdLocalPrintshop className="text-[22px] mr-2" />
                      Print Horoscope
                      <MdArrowDropDown className="text-[22px] ml-2" />
                    </p>

                    {(isHovered || isOpen) && (
                      <div
                        className="absolute top-4 right-0 mt-2 w-40 bg-white rounded-md shadow-lg"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                      >
                        <ul>
                          <li
                            className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                            onClick={() => handleSelectLanguage("Tamil")}
                          >
                            Tamil
                          </li>
                          <li
                            className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                            onClick={() => handleSelectLanguage("English")}
                          >
                            English
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  {selectedLanguage && (
                    <p className="ml-4 text-ash">
                      Selected: {selectedLanguage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ProfileDetailsSettingsView />
            <FeaturedProfiles />
            <VysyaBazaar />
            <SuggestedProfiles /> */}
    </div>
  );
};
