import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface Profile {
    int_profileid: string;
    int_profile_name: string;
    int_Profile_img: string;
    int_profile_age: number;
    int_profile_notes: string;
    int_status: number;
}

const InterestCard: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.post<{ Status: number, message: string, data: { profiles: Profile[] } }>(
                    'http://103.214.132.20:8000/auth/Get_profile_intrests_list/',
                    { profile_id: loginuser_profileId }
                );
                if (response.data.Status === 1) {
                    setProfiles(response.data.data.profiles);
                } else {
                    console.error('Error fetching profiles:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [loginuser_profileId]);

    const handleUpdateInterest = async (profileId: string, status: string) => {
        try {
            const response = await axios.post(
                'http://103.214.132.20:8000/auth/Update_profile_intrests/',
                {
                    profile_id: loginuser_profileId,
                    profile_from: profileId,
                    status: status
                }
            );
            if (response.data.Status === 1) {
                // Remove the profile from the state if rejected
                if (status === '2' ||status === '3') {
                    setProfiles(profiles.filter(profile => profile.int_profileid !== profileId));
                }
                console.log(`Profile ${status === '2' ? 'accepted' : 'rejected'}`);
            } else {
                console.error('Error updating profile interest:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile interest:', error);
        }
    };

    const handleProfileClick = (profileId: string) => {
        navigate(`/profiledetails?id=${profileId}&interest=1`);
    };

    return (
        <div className="space-y-4">
            {loading ? (
                <p>Loading...</p> // Or any loading indicator you prefer
            ) : profiles.length === 0 ? (
                <div className="text-center py-4">
                    <h4 className="text-xl text-gray-600">No New Interest Received</h4>
                </div>
            ) : (
                profiles.map(profile =>
                    profile.int_status === 1 ? (
                        <div
                            key={profile.int_profileid}
                            className="flex justify-between items-center bg-white shadow-sm rounded-xl p-4 mb-4 cursor-pointer"
                            onClick={() => handleProfileClick(profile.int_profileid)}
                        >
                            <div className="flex justify-center items-center space-x-5">
                                <div className="p-2">
                                    <img
                                        src={profile.int_Profile_img}
                                        alt={profile.int_profile_name}
                                        className="w-24 h-16 object-cover rounded-md"
                                    />
                                </div>
    
                                <div>
                                    <h5 className="text-[18px] text-primary font-bold">
                                        {profile.int_profile_name} <span className="text-sm text-ashSecondary font-semibold">({profile.int_profileid})</span>
                                    </h5>
                                    <p className="text-sm text-ashSecondary">{profile.int_profile_age} yrs</p>
                                    <p className="text-sm text-ashSecondary">{profile.int_profile_notes}</p>
                                </div>
                            </div>
    
                            <div>
                                <div className="flex items-center">
                                    <FaCheckCircle
                                        className="text-[60px] text-checkGreen rounded-xl px-3 py-3 m-3 cursor-pointer hover:bg-gray"
                                        onClick={(e) => { e.stopPropagation(); handleUpdateInterest(profile.int_profileid, '2'); }}
                                    />
                                    <IoMdCloseCircle
                                        className="text-[65px] text-closeRed rounded-xl px-3 py-3 m-3 cursor-pointer hover:bg-gray"
                                        onClick={(e) => { e.stopPropagation(); handleUpdateInterest(profile.int_profileid, '3'); }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null
                )
            )}
        </div>
    );
};

export default InterestCard;
