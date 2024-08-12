import { useState, useEffect, MouseEvent } from "react";
// import { useDispatch } from "react-redux";
// import { hideInterest } from "../../../redux/slices/interestSlice";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdMessage, MdVerifiedUser } from "react-icons/md";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
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
import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
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
import { ToastNotification, NotifySuccess, NotifyError } from "../../Toast/ToastNotification";
import { toast } from 'react-toastify';
import { PersonalNotesPopup } from "../PersonalNotes/PersonalNotesPopup";

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

export const ProfileDetailsExpressInterest: React.FC<ProfileDetailsExpressInterestProps> = () => {

    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const interestParam = queryParams.get('interest');
    const id = queryParams.get('id');
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.post("http://103.214.132.20:8000/auth/Get_profile_det_match/", {
                    profile_id: loginuser_profileId, // Replace with the appropriate value or extract from route params if needed
                    user_profile_id: id
                });
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
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        if (!isBookmarked) {
            NotifySuccess('Added to Wishlist');
        }
        else {
            toast.error('Removed from Wishlist');
        }
    };

    // Declaration for Heart State
    const [isHeartMarked, setIsHeartMarked] = useState(false);

    const handleHeartMark = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent the Link navigation


        try {
            const response = await axios.post("http://103.214.132.20:8000/auth/Send_profile_intrests/", {
                profile_id: loginuser_profileId,
                profile_to: id,
                status: !isHeartMarked ? "1" : "0"
            });

            if (response.status === 200) {
                setIsHeartMarked(!isHeartMarked);

                // Toast Notification
                if (!isHeartMarked) {
                    NotifySuccess('Expressed Interest');
                } else {
                    toast.error('Removed Interest');
                }

            } else {
                // Toast Notification
                NotifyError('Failed to update express interest');

                console.error("Failed to update express interest");
            }
        } catch (error) {
            // Toast Notification
            NotifyError('Error updating express interest');

            console.error("Error updating express interest:", error);
        }
    }

    // Declaration for Horoscope State
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectLanguage = (language: string) => {
        setSelectedLanguage(language);
        setIsOpen(false);
    };

    // Personal Notes Popup
    const [showPersonalNotes, setShowPersonalNotes] = useState(false);

    const handlePersonalNotesPopup = () => {
        setShowPersonalNotes(!showPersonalNotes)
    }

    const closePersonalNotesPopup = () => {
        setShowPersonalNotes(false)
    }

    return (
        <div>
            <div className="bg-grayBg pt-10">
                <div className="container mx-auto">
                    <div className="flex items-center mb-5">
                        {/* <IoArrowBackOutline onClick={handleBackClick} className="text-[24px] mr-2 cursor-pointer" /> */}
                        <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold"> Profile Details
                            {/* <span className="text-sm text-primary"> (234)</span> */}
                        </h4>
                    </div>

                    <div className="grid grid-rows-1 grid-cols-3 justify-start items-center space-x-10 my-5">

                        <div className="">
                            <ProfileSlickView profileId={profileData?.basic_details.profile_id} />
                        </div>


                        {/* Profile Details */}
                        <div className="col-span-2">
                            <div className="flex justify-between items-center">
                                <div className="">
                                    <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2">
                                        {profileData?.basic_details.profile_name}
                                        <MdVerifiedUser className="text-checkGreen ml-2" /></h4>
                                </div>

                                {/* Icons */}
                                <div className="flex justify-center items-center space-x-10">
                                    <div>
                                        <IoShareSocialSharp title="Share Profile" className="text-[22px] text-vysyamalaBlack cursor-pointer" />
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
                                        <IoDocumentText onClick={handlePersonalNotesPopup} title="Personal Notes" className="text-[22px] text-vysyamalaBlack cursor-pointer" />
                                        {showPersonalNotes && (
                                            <PersonalNotesPopup closePopup={closePersonalNotesPopup} />
                                        )}
                                    </div>
                                    <div>
                                        <RiAlertFill title="Spot on Error" className="text-[22px] text-vysyamalaBlack cursor-pointer" />
                                    </div>
                                    <div>
                                        <BiSolidUserVoice title="Vys Assist" className="text-[22px] text-vysyamalaBlack cursor-pointer" />
                                    </div>
                                </div>

                            </div>

                            <p className="text-[20px] text-primary font-bold mb-2">{profileData?.basic_details.profile_id}</p>

                            <div className="flex justify-between items-center">
                                {/* Profile Details Content */}
                                <div>
                                    {/* Age & height */}
                                    <div className="flex justify-between items-center mb-2">
                                        <h5 className="text-[18px] text-ash font-semibold">Age :
                                            <span className="font-normal"> {profileData?.personal_details.age} years</span></h5>

                                        <h5 className="text-[18px] text-ash font-semibold mb-2">Height :
                                            <span className="font-normal"> {profileData?.personal_details.height}</span></h5>
                                    </div>

                                    <h5 className="text-[18px] text-ash font-semibold mb-2">Weight :
                                        <span className="font-normal"> {profileData?.personal_details.weight}</span></h5>

                                    {/* Star & Gothram */}
                                    <div className="flex justify-between items-center mb-2">
                                        <h5 className="text-[18px] text-ash font-semibold">Star :
                                            <span className="font-normal"> {profileData?.horoscope_details.star_name}</span></h5>

                                        <h5 className="text-[18px] text-ash font-semibold mb-2">Gothram :
                                            <span className="font-normal"> {profileData?.horoscope_details.surya_gothram}</span></h5>
                                    </div>

                                    <h5 className="text-[18px] text-ash font-semibold mb-2">Profession :
                                        <span className="font-normal"> {profileData?.education_details.profession}</span></h5>

                                    <h5 className="text-[18px] text-ash font-semibold mb-2">Education :
                                        <span className="font-normal"> {profileData?.education_details.education_level}</span></h5>

                                    <h5 className="text-[18px] text-ash font-semibold mb-2">About :
                                        <span className="font-normal"> {profileData?.basic_details.about}</span></h5>

                                    <div className="flex justify-start items-center space-x-3 mt-3">
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
                                                <IoEye className="mr-2" /> {profileData?.basic_details.user_profile_views} views
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
                                    <MatchingScore />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-10 mb-3">
                                <div>
                                    {/* Buttons */}

                                    {interestParam !== '1' && loginuser_profileId && (

                                        <div className="flex justify-start items-center space-x-5 my-5">
                                            <button
                                                onClick={handleHeartMark}
                                                className="bg-gradient text-white flex items-center rounded-md px-5 py-3 cursor-pointer">
                                                <FaHeart className={`text-[22px] mr-2 ${isHeartMarked ? 'text-red-500' : 'text-gray-400'}`} />
                                                {isHeartMarked ? 'Remove from Interest' : 'Express Interest'}

                                                {/* Toast Notifications */}
                                                <ToastNotification />
                                            </button>

                                            <button className="bg-white text-main flex items-center rounded-md border-2 px-5 py-2.5 cursor-pointer">
                                                <FaTableList className="text-[22px] mr-2" /> Horoscope
                                            </button>
                                        </div>
                                    )}

                                    {interestParam === '1' && loginuser_profileId && (

                                        <div className="flex justify-start items-center space-x-5 my-5">
                                            {/* Accept button */}
                                            <button className="bg-checkGreen text-white flex items-center rounded-lg px-5 py-3 cursor-pointer">
                                                <FaCheckCircle className="text-[22px] mr-2" /> Accept</button>

                                            {/* Decline button */}
                                            <button className="bg-white text-main flex items-center rounded-lg border-2 px-5 py-2.5 cursor-pointer">
                                                <IoMdCloseCircle className="text-[26px] mr-2" /> Decline</button>

                                            {/* Message button */}
                                            <button className="text-main flex items-center rounded-lg px-5 py-2.5 cursor-pointer">
                                                <MdMessage className="text-[26px] mr-2" /> Message</button>

                                        </div>


                                    )}


                                </div>

                                <div className="flex justify-center items-center space-x-10"
                                // onMouseEnter={() => setIsHovered(true)}
                                // onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div className="relative"

                                    >
                                        <p className="flex items-center text-ash cursor-pointer"
                                        >
                                            <MdLocalPrintshop className="text-[22px] mr-2" />Print Horoscope
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
                                                        onClick={() => handleSelectLanguage('Tamil')}
                                                    >
                                                        Tamil
                                                    </li>
                                                    <li
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                                        onClick={() => handleSelectLanguage('English')}
                                                    >
                                                        English
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    {selectedLanguage && <p className="ml-4 text-ash">Selected: {selectedLanguage}</p>}
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
    )
};
