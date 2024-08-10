import { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdVerifiedUser, MdBookmark, MdBookmarkBorder, MdOutlineGrid3X3, MdMessage } from "react-icons/md";
import { IoDocumentText, IoCalendar, IoEye, IoCloseCircle } from "react-icons/io5";
import { RiAlertFill } from "react-icons/ri";
import { BiSolidUserVoice } from "react-icons/bi";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaUser, FaHeart, FaCheckCircle } from "react-icons/fa";
import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
import { ProfileSlickView } from "../../LoginHome/ProfileDetailsView/ProfileSlickView";
import { FaTableList } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
// import { ProfileDetailsSettings } from "./ProfileDetailsSettings"
import { ProfileDetailsSettingsView } from "../../LoginHome/ProfileDetailsView/ProfileDetailsSettingsView";
import { FeaturedProfiles } from "../../LoginHome/FeaturedProfiles";
import { VysyaBazaar } from "../../LoginHome/VysyaBazaar";
import { SuggestedProfiles } from "../../LoginHome/SuggestedProfiles";
import MatchingScore from "./MatchingScore";


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
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isHeartMarked, setIsHeartMarked] = useState(false);


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

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleHeartMark = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://103.214.132.20:8000/auth/Send_profile_intrests/", {
                profile_id: loginuser_profileId,
                profile_to: id,
                status: !isHeartMarked ? "1" : "0"
            });

            if (response.status === 200) {
                setIsHeartMarked(!isHeartMarked);
            } else {
                console.error("Failed to update express interest");
            }
        } catch (error) {
            console.error("Error updating express interest:", error);
        }
    };



    return (
        <div>
            <div className="bg-grayBg pt-10">
                <div className="container mx-auto">
                    <div className="flex items-center mb-5">
                        <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">Profile Details</h4>
                    </div>

                    <div className="grid grid-rows-1 grid-cols-3 justify-start items-center space-x-10 my-5">
                        <div>
                        <ProfileSlickView profileId={profileData?.basic_details.profile_id} />
                        </div>

                        {/* Profile Details */}
                        <div className="col-span-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2">
                                        {profileData?.basic_details.profile_name}
                                        <MdVerifiedUser className="text-checkGreen ml-2" />
                                    </h4>
                                </div>

                                {/* Icons */}
                                <div className="flex justify-center items-center space-x-10">
                                    <IoShareSocialSharp title="Share Profile" className="text-[22px] text-vysyamalaBlack cursor-pointer" />
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
                                    <IoDocumentText title="Personal Notes" className="text-[22px] text-vysyamalaBlack cursor-pointer" />
                                    <RiAlertFill title="Spot on Error" className="text-[22px] text-vysyamalaBlack cursor-pointer" />
                                    <BiSolidUserVoice title="Vys Assist" className="text-[22px] text-vysyamalaBlack cursor-pointer" />
                                </div>
                            </div>

                            <p className="text-[20px] text-primary font-bold mb-2">{profileData?.basic_details.profile_id}</p>

                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h5 className="text-[18px] text-ash font-semibold">Age:
                                            <span className="font-normal"> {profileData?.personal_details.age} years</span>
                                        </h5>
                                        <h5 className="text-[18px] text-ash font-semibold mb-2">Height:
                                            <span className="font-normal"> {profileData?.personal_details.height}</span>
                                        </h5>
                                    </div>

                                    <h5 className="text-[18px] text-ash font-semibold mb-2">Weight:
                                        <span className="font-normal"> {profileData?.personal_details.weight}</span>
                                    </h5>

                                    <div className="flex justify-between items-center mb-2">
                                        <h5 className="text-[18px] text-ash font-semibold">Star:
                                            <span className="font-normal"> {profileData?.horoscope_details.star_name}</span>
                                        </h5>
                                        <h5 className="text-[18px] text-ash font-semibold mb-2">Gothram:
                                            <span className="font-normal"> {profileData?.horoscope_details.surya_gothram}</span>
                                        </h5>
                                    </div>

                                    <h5 className="text-[18px] text-ash font-semibold mb-2">Profession:
                                        <span className="font-normal"> {profileData?.education_details.profession}</span>
                                    </h5>

                                    <h5 className="text-[18px] text-ash font-semibold mb-2">Education:
                                        <span className="font-normal"> {profileData?.education_details.education_level}</span>
                                    </h5>

                                    <h5 className="text-[18px] text-ash font-semibold mb-2">About:
                                        <span className="font-normal"> {profileData?.basic_details.about}</span>
                                    </h5>

                                    <div className="flex justify-start items-center space-x-3 mt-3">
                                        <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                            <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                                        </p>
                                        <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                            <FaUser className="mr-2" /> Active user
                                        </p>
                                        <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                            <IoCalendar className="mr-2" /> Last visit on June 30, 2024
                                        </p>
                                        <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                            <IoEye className="mr-2" /> {profileData?.basic_details.user_profile_views} views
                                        </p>
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
                                </div>

                                {/* Matching Meter */}
                                <div>
                                    <img
                                        src={MatchingScoreImg}
                                        alt="Matching Score"
                                        className="w-full"
                                    />
                                    <MatchingScore />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-10 mb-3">
                                

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
                                    </div>

                                </div>

                                <div>
                                    <img src={MatchingScoreImg} alt="Matching Score" className="w-full" />
                                </div>
                            </div>


                            {interestParam !== '1' && loginuser_profileId && (

                                < div className="flex justify-start items-center space-x-5 my-5">
                                    <button
                                        onClick={handleHeartMark}
                                        className="bg-gradient text-white flex items-center rounded-md px-5 py-3 cursor-pointer">
                                        <FaHeart className={`text-[22px] mr-2 ${isHeartMarked ? 'text-red-500' : 'text-gray-400'}`} />
                                        {isHeartMarked ? 'Remove from Interest' : 'Express Interest'}
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


                    </div>
                </div>
            </div>
        </div >
    );
};
