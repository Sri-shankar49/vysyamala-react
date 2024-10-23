import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdVerifiedUser } from "react-icons/md";
import { IoCalendar, IoEye } from "react-icons/io5";
import { FaPersonArrowUpFromLine, FaSuitcase, FaLocationDot, FaUser } from "react-icons/fa6";
import { MdBookmark, MdBookmarkBorder, MdOutlineGrid3X3 } from "react-icons/md";
import { IoSchool } from "react-icons/io5";

// Define the interface for a profile
interface Profile {
    profile_id: string;
    profile_name: string;
    profile_img: string;
    profile_age: number;
    profile_gender: string;
    height: string;
    degree: string;
    profession: string;
    location: string;
}

// Define the API response interface
interface ApiResponse {
    Status: number;
    message: string;
    profiles: Profile[];
}

const API_URL = "https://matrimonyapi.rainyseasun.com/auth/Get_featured_profiles/";

export const FeaturedGroomCard: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.post<ApiResponse>(API_URL, { gender: "male" });
                if (response.data.Status === 1) {
                    setProfiles(response.data.profiles);
                    console.log('featuredgroom',response.data.profiles)
                } else {
                    console.error("Failed to fetch profiles");
                }
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div className="container mx-auto">
            {profiles.map((profile) => (
                <div key={profile.profile_id} className="space-y-5 rounded-xl shadow-md p-5 mb-5">
                    <div className="flex justify-start items-center space-x-5 relative">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex justify-between items-center space-x-5">
                                {/* Profile Image */}
                                <div className="relative">
                                    <img src={profile.profile_img} alt={`${profile.profile_name}-image`} />
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
                                    <div className="relative mb-2">
                                        <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                                            {profile.profile_name}{" "}
                                            <span className="text-sm text-ashSecondary">({profile.profile_id})</span>
                                            <MdVerifiedUser className="absolute top-1.5 left-[135px] text-checkGreen" />
                                        </h5>
                                    </div>

                                    <div className="flex items-center space-x-3 mb-2">
                                        <p className="flex items-center text-ashSecondary font-semibold">
                                            <IoCalendar className="mr-2" />
                                            {profile.profile_age} yrs
                                        </p>
                                        <p className="text-gray font-semibold">|</p>
                                        <p className="flex items-center text-ashSecondary font-semibold">
                                            <FaPersonArrowUpFromLine className="mr-2" />
                                            {profile.height} cms
                                        </p>
                                    </div>

                                    <div className="mb-2">
                                        <p className="flex items-center text-ashSecondary font-semibold">
                                            <IoSchool className="mr-2" />
                                            {profile.degree || "N/A"}
                                        </p>
                                    </div>

                                    <div className="mb-2">
                                        <p className="flex items-center text-ashSecondary font-semibold">
                                            <FaSuitcase className="mr-2" />
                                            {profile.profession || "N/A"}
                                        </p>
                                    </div>

                                    <div className="mb-2">
                                        <p className="flex items-center text-ashSecondary font-semibold">
                                            <FaLocationDot className="mr-2" />
                                            {profile.location}
                                        </p>
                                    </div>


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
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
