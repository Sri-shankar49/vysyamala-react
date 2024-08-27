import { useState, useEffect } from "react";
import axios from "axios";
import ProfileListImg from "../../../assets/images/ProfileListImg.png";
import { MdVerifiedUser, MdBookmark, MdBookmarkBorder, MdOutlineGrid3X3, MdStars } from "react-icons/md";
import { IoCalendar, IoSchool } from "react-icons/io5";
// import { FaPersonArrowUpFromLine } from "react-icons/fa";
// import { FaPersonArrowUpFromLine } from "react-icons/fa";
import { FaUser, } from "react-icons/fa";
// import { FaSuitcase } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
// import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
import MatchingScore from "../ProfileDetails/MatchingScore";
import { FaLocationDot, FaPersonArrowUpFromLine, FaSuitcase } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// Define the profile and API response types
interface Profile {
    viwed_profileid: string;
    viwed_profile_name: string;
    viwed_Profile_img: string;
    viwed_profile_age: number;
}

interface ApiResponse {
    Status: number;
    message: string;
    data: {
        profiles: Profile[];
    };
}

// Assuming you have a way to get the logged-in user's profile ID

export const MyVisitorsCard = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');
    const navigate = useNavigate();

    // Function to handle the bookmark toggle
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    // Fetch profile data when the component mounts
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.post<ApiResponse>('http://103.214.132.20:8000/auth/My_profile_visit/', {
                    profile_id: loginuser_profileId
                });

                // Check if response is successful and contains profiles
                if (response.data.Status === 1 && response.data.data.profiles.length > 0) {
                    setProfile(response.data.data.profiles[0]); // Use the first profile
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    },);

    if (!profile) {
        return <div>No Profile Viewer</div>;
    }
    const handleProfileClick = (profileId: string) => {
        navigate(`/ProfileDetails?id=${profileId}`);
    };
    return (
        <div className="border-b-[1px] border-footer-text-gray">
            <div className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5">
                <div className="w-full flex justify-between items-center">
                    <div className="flex justify-between items-center space-x-5">
                        {/* Profile Image */}
                        <div className="relative">
                            <img src={profile.viwed_Profile_img || ProfileListImg} alt="Profile-image" />

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
                        <div>
                            {/* Name & Profile ID */}
                            <div className="relative mb-2">
                                <h5 className="text-[20px] text-secondary font-semibold cursor-pointer"
                                    onClick={() => handleProfileClick(profile.viwed_profileid)}
                                >
                                    {profile.viwed_profile_name || "Unknown Name"}{" "}
                                    <span className="text-sm text-ashSecondary">({profile.viwed_profileid || "ID"})</span>
                                    <MdVerifiedUser className="absolute top-1.5 left-[155px] text-checkGreen" />
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

                            {/* Age */}
                            <div className="flex items-center space-x-3 mb-2">
                                <p className="flex items-center text-ashSecondary font-semibold">
                                    <IoCalendar className="mr-2" />
                                    {profile.viwed_profile_age || "Unknown Age"} yrs
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
                                        <IoCalendar className="mr-2" /> Last visit on June 30, 2024
                                    </p>
                                </div>

                                {/* Views */}
                                <div>
                                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                        <IoEye className="mr-2" /> 31 views
                                    </p>
                                </div>
                            </div>

                            {/* Message button */}
                            {/* <button className="text-main font-semibold flex items-center rounded-lg py-5 cursor-pointer">
                                <MdMessage className="text-[26px] mr-2" /> Message
                            </button> */}
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
    );
};
