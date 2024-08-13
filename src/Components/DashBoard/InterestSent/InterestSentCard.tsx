import { useState, useEffect } from "react";
import axios from "axios";
import ProfileListImg from "../../../assets/images/./ProfileListImg.png";
import { MdVerifiedUser, MdBookmark, MdBookmarkBorder, MdStars, MdOutlineGrid3X3, MdMessage } from "react-icons/md";
import { IoCalendar, IoSchool, IoEye } from "react-icons/io5";
import { FaPersonArrowUpFromLine, FaSuitcase, FaLocationDot, FaUser } from "react-icons/fa6";
import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
import MatchingScore from "../ProfileDetails/MatchingScore";

// Define the Profile interface
export interface Profile {
    myint_Profile_img: string;
    myint_profile_name: string;
    myint_profileid: string;
    myint_profile_age: number;
}

export const InterestSentCard = () => {
    // State to track if the card is bookmarked or not
    const [isBookmarked, setIsBookmarked] = useState<{ [key: string]: boolean }>({});
    // State to store the profile data fetched from the API
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [noData, setNoData] = useState(false);
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

    const handleBookmark = (profileId: string) => {
        setIsBookmarked((prev) => ({
            ...prev,
            [profileId]: !prev[profileId],
        }));
    };

    // Fetch data from the API
    useEffect(() => {
        const fetchProfiles = async () => {
            if (!loginuser_profileId) {
                setError('Profile ID is not available');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/My_intrests_list/', {
                    profile_id: loginuser_profileId
                });

                // Check the response status
                if (response.data.Status === 1) {
                    setProfiles(response.data.data.profiles);
                    setNoData(response.data.data.profiles.length === 0);
                } else if (response.data.Status === 0) {
                    setNoData(true);
                    setProfiles([]);
                } else {
                    setError('Error fetching profiles: ' + response.data.message);
                }
                setLoading(false);
            } catch (error) {
                console.error('API Call Error:', error);
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        setError('No interests found for the given profile ID');
                    } else {
                        setError('Error loading profiles: ' + error.message);
                    }
                } else {
                    setError('Unexpected error occurred');
                }
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [loginuser_profileId]);





    if (loading) {
        return <p>Loading profiles...</p>;
    }

    if (error) {
        return <p>Error loading profiles: {error}</p>;
    }

    if (noData) {
        return <p>No data found.</p>;
    }

    return (
        <div className="border-b-[1px] border-footer-text-gray">
            {profiles.map(profile => (
                <div key={profile.myint_profileid} className="flex justify-start items-center space-x-5 relative rounded-xl shadow-sm py-5">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex justify-between items-start space-x-5">
                            {/* Profile Image */}
                            <div className="relative">
                                <img src={profile.myint_Profile_img || ProfileListImg} alt="Profile-image" />

                                {isBookmarked[profile.myint_profileid] ? (
                                    <MdBookmark
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleBookmark(profile.myint_profileid);
                                        }}
                                        className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                                    />
                                ) : (
                                    <MdBookmarkBorder
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleBookmark(profile.myint_profileid);
                                        }}
                                        className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                                    />
                                )}
                            </div>

                            {/* Profile Details */}
                            <div className="">
                                {/* Name & Profile ID */}
                                <div className="relative mb-2">
                                    <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                                        {profile.myint_profile_name}{" "}
                                        <span className="text-sm text-ashSecondary">({profile.myint_profileid})</span>
                                        <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                                    </h5>
                                </div>

                                {/* Years & Height */}
                                <div className="flex items-center space-x-3 mb-2">
                                    <p className="flex items-center text-ashSecondary font-semibold">
                                        <IoCalendar className="mr-2" />
                                        {profile.myint_profile_age} yrs
                                    </p>

                                    <p className="text-gray font-semibold">|</p>

                                    <p className="flex items-center text-ashSecondary font-semibold">
                                        <FaPersonArrowUpFromLine className="mr-2" />
                                        Height Data
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
            ))}
        </div>
    );
};
