import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { BiSolidUserCircle } from "react-icons/bi";
import { FaSuitcase } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { FaArrowLeft, FaTableList } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
// import { IoMdLock } from "react-icons/io";
import { PersonalView } from './PersonalView';
import { EducationProfessionView } from './EducationProfessionView';
import { FamilyView } from './FamilyView';
import { HoroscopeView } from './HoroscopeView';
import { ContactView } from './ContactView';
// import { ChangePassword } from './ChangePassword';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";




interface ProfileDetailsSettingsViewProps { }


interface ProfileListResponse {
    Status: number;
    message: string;
    all_profile_ids: Record<string, string>; // Use Record to map numbers to strings
    // Add other fields if necessary
}

export const ProfileDetailsSettingsView: React.FC<ProfileDetailsSettingsViewProps> = () => {
    // Corresponding Component State Declaration
    const [activeSection, setActiveSection] = useState<string>('PersonalView');

    const renderSection = () => {
        switch (activeSection) {
            case 'PersonalView':
                return <PersonalView />;
            case 'EducationProfessionView':
                return <EducationProfessionView />;
            case 'FamilyView':
                return <FamilyView />;
            case 'HoroscopeView':
                return <HoroscopeView />;
            case 'ContactView':
                return <ContactView />;
            default:
                return <PersonalView />;
        }
    };

    // Previos Next Button function
    const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

    const [profileIds, setProfileIds] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Define the fetchProfileIds function
        const fetchProfileIds = async () => {
            setLoading(true);
            try {
                const response = await axios.post<ProfileListResponse>(
                    'http://103.214.132.20:8000/auth/Get_prof_list_match/',
                    {
                        profile_id: loginuser_profileId
                    }
                );
                const data = response.data;

                if (data.Status === 1) {
                    const ids = Object.values(data.all_profile_ids);
                    setProfileIds(ids);
                    setCurrentIndex(-1); // Set initial index to 0
                    if (ids.length > 0) {
                        // navigate(`/ProfileDetails?id=${ids[0]}`); // Navigate to the first profile
                    }
                } else {
                    setError("Failed to fetch profiles.");
                }
            } catch (err) {
                console.error("Error fetching profile IDs:", err);
                setError("Failed to fetch profiles.");
            } finally {
                setLoading(false);
            }
        };

        // Call the fetchProfileIds function
        fetchProfileIds();
    }, [navigate]);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            navigate(`/ProfileDetails?id=${profileIds[newIndex]}`);
            setTimeout(() => {
                window.scrollTo(0, 0); // Scroll to top after navigating
            }, 300);
        }
    };

    const handleNext = () => {
        if (currentIndex < profileIds.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            navigate(`/ProfileDetails?id=${profileIds[newIndex]}`);
            setTimeout(() => {
                window.scrollTo(0, 0); // Scroll to top after navigating
            }, 300);
        }
    };

    return (
        <div className="bg-ash">
            <div className="container mx-auto py-20">

                <div className="w-full flex justify-between items-start space-x-5">
                    {/* Side Bar */}
                    <div className="sidebar">
                        <ul className="w-full space-y-10">
                            <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'PersonalView' ? 'active' : ''}`}
                                onClick={() => setActiveSection('PersonalView')}>
                                <BiSolidUserCircle className="text-[22px] mr-2" />
                                Personal</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer 
                            ${activeSection === 'EducationProfessionView ' ? 'active' : ''}`}
                                onClick={() => setActiveSection('EducationProfessionView')}>
                                <FaSuitcase className="text-[22px] mr-2" />
                                Education & Profession</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'FamilyView' ? 'active' : ''}`}
                                onClick={() => setActiveSection('FamilyView')}>
                                <MdFamilyRestroom className="text-[22px] mr-2" />
                                Family</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'HoroscopeView' ? 'active' : ''}`}
                                onClick={() => setActiveSection('HoroscopeView')}>
                                <FaTableList className="text-[22px] mr-2" />
                                Horoscope</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'ContactView' ? 'active' : ''}`}
                                onClick={() => setActiveSection('ContactView')}>
                                <MdContacts className="text-[22px] mr-2" />
                                Contact</li>

                            {/* <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'ChangePassword' ? 'active' : ''}`}
                                onClick={() => setActiveSection('ChangePassword')}>
                                <IoMdLock className="text-[22px] mr-2" />
                                Change Password</li> */}
                        </ul>
                    </div>

                    {/* Content */}
                    <div className="w-3/4 bg-white rounded-lg">
                        <div className="p-10">
                            {renderSection()}
                        </div>
                    </div>
                </div>

                {/* Previous / Next Button */}
                <div>
                    <div className="flex justify-between items-center mt-20">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0 || loading}
                            className="bg-ash text-white flex items-center rounded-md border-2 px-5 py-3 cursor-pointer"
                        >
                           <FaArrowLeft className="text-white mr-2" /> Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === profileIds.length - 1 || loading}
                            className="bg-ash text-white flex items-center rounded-md border-2 px-5 py-3 cursor-pointer"
                        >
                            Next <FaArrowRight className="text-white ml-2" />
                        </button>
                    </div>

                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
            </div>


        </div>
    );
};
