import { useState, useEffect } from "react";
import axios from "axios";
import ProfileListImg from "../../../assets/images/ProfileListImg.png";
import { MdVerifiedUser } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import MatchingScoreImg from "../../../assets/images/MatchingScore.png";

// Define types for API response
interface Profile {
    visited_profileid: string;
    visited_profile_name: string;
    visited_Profile_img: string;
    visited_profile_age: number;
}

interface ApiResponse {
    Status: number;
    message: string;
    data: {
        profiles: Profile[];
    };
}

export const ViewedProfilesCard = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({});
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

    useEffect(() => {
        // Fetch the data from the API
        axios.post<ApiResponse>("http://103.214.132.20:8000/auth/My_viewed_profiles/", {
            profile_id: loginuser_profileId // Send profile_id in the request body
        })
            .then(response => {
                if (response.data.Status === 1) {
                    setProfiles(response.data.data.profiles);
                }
            })
            .catch(error => {
                console.error("Error fetching profiles:", error);
            });
    }, [loginuser_profileId]); // Include profile_id in the dependency array if it can change

    const handleBookmark = (profileId: string) => {
        setIsBookmarked(prevState => ({
            ...prevState,
            [profileId]: !prevState[profileId]
        }));
    };

    return (
        <div className="border-b-[1px] border-footer-text-gray">
            {profiles.map(profile => (
                <div key={profile.visited_profileid} className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex justify-between items-center space-x-5">
                            {/* Profile Image */}
                            <div className="relative">
                                <img src={profile.visited_Profile_img || ProfileListImg} alt="Profile-image" />

                                {isBookmarked[profile.visited_profileid] ? (
                                    <MdBookmark
                                        onClick={() => handleBookmark(profile.visited_profileid)}
                                        className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                                    />
                                ) : (
                                    <MdBookmarkBorder
                                        onClick={() => handleBookmark(profile.visited_profileid)}
                                        className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                                    />
                                )}
                            </div>

                            {/* Profile Details */}
                            <div className="">
                                {/* Name & Profile ID */}
                                <div className="relative mb-2">
                                    <div className="flex items-center">
                                        <h5 className="text-[20px] text-secondary font-semibold cursor-pointer mr-2">
                                            {profile.visited_profile_name || "Unknown"}
                                        </h5>
                                        <span className="text-sm text-ashSecondary mr-2">
                                            ({profile.visited_profileid || "N/A"})
                                        </span>
                                        <MdVerifiedUser className="text-checkGreen" />
                                    </div>
                                </div>


                                {/* Age */}
                                <div className="flex items-center space-x-3 mb-2">
                                    <p className="flex items-center text-ashSecondary font-semibold">
                                        <IoCalendar className="mr-2" />
                                        {profile.visited_profile_age || "N/A"} yrs
                                    </p>
                                </div>

                                {/* Other Details */}
                                <div className="mb-2">
                                    <p className="flex items-center text-ashSecondary font-semibold">
                                        <MdStars className="mr-2" />
                                        Uthiram
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="flex items-center text-ashSecondary font-semibold">
                                        <IoSchool className="mr-2" />
                                        Bachelors - Arts/Science/Commerce/B Phil
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="flex items-center text-ashSecondary font-semibold">
                                        <FaSuitcase className="mr-2" />
                                        Employed
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="flex items-center text-ashSecondary font-semibold">
                                        <FaLocationDot className="mr-2" />
                                        Chennai
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="flex justify-start items-center space-x-3">
                                    <div>
                                        <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                            <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                                        </p>
                                    </div>
                                    <div>
                                        <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                            <FaUser className="mr-2" /> Active user
                                        </p>
                                    </div>
                                    <div>
                                        <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                            <IoCalendar className="mr-2" /> Last visit on June 30, 2024
                                        </p>
                                    </div>
                                    <div>
                                        <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                            <IoEye className="mr-2" /> 31 views
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Matching Score */}
                        <div>
                            <div>
                                <img
                                    src={MatchingScoreImg}
                                    alt="Matching Score"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
