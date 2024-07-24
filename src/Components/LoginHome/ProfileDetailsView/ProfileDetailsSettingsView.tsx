import React, { useState } from 'react';
import { BiSolidUserCircle } from "react-icons/bi";
import { FaSuitcase } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
// import { IoMdLock } from "react-icons/io";
import { PersonalView } from './PersonalView';
import { EducationProfessionView } from './EducationProfessionView';
import { FamilyView } from './FamilyView';
import { HoroscopeView } from './HoroscopeView';
import { ContactView } from './ContactView';
// import { ChangePassword } from './ChangePassword';



interface ProfileDetailsSettingsViewProps { }

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
            </div>
        </div>
    );
};
