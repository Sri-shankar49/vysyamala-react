import React, { useState } from 'react';
import { BiSolidUserCircle } from "react-icons/bi";
import { FaSuitcase } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Personal } from './Personal';
import { EducationProfession } from './EducationProfession';
import { Family } from './Family';
import { Horoscope } from './Horoscope';
import { Contact } from './Contact';
import { ChangePassword } from './ChangePassword';



interface ProfileDetailsSettingsProps { }

export const ProfileDetailsSettings: React.FC<ProfileDetailsSettingsProps> = () => {
    // Corresponding Component State Declaration
    const [activeSection, setActiveSection] = useState<string>('Personal');

    const renderSection = () => {
        switch (activeSection) {
            case 'Personal':
                return <Personal />;
            case 'EducationProfession':
                return <EducationProfession />;
            case 'Family':
                return <Family />;
            case 'Horoscope':
                return <Horoscope />;
            case 'Contact':
                return <Contact />;
            case 'ChangePassword':
                return <ChangePassword />;
            default:
                return <Personal />;
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
                                 ${activeSection === 'Personal' ? 'active' : ''}`}
                                onClick={() => setActiveSection('Personal')}>
                                <BiSolidUserCircle className="text-[22px] mr-2" />
                                Personal</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer 
                            ${activeSection === 'EducationProfession' ? 'active' : ''}`}
                                onClick={() => setActiveSection('EducationProfession')}>
                                <FaSuitcase className="text-[22px] mr-2" />
                                Education & Profession</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'Family' ? 'active' : ''}`}
                                onClick={() => setActiveSection('Family')}>
                                <MdFamilyRestroom className="text-[22px] mr-2" />
                                Family</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'Horoscope' ? 'active' : ''}`}
                                onClick={() => setActiveSection('Horoscope')}>
                                <FaTableList className="text-[22px] mr-2" />
                                Horoscope</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'Contact' ? 'active' : ''}`}
                                onClick={() => setActiveSection('Contact')}>
                                <MdContacts className="text-[22px] mr-2" />
                                Contact</li>

                            <li className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${activeSection === 'ChangePassword' ? 'active' : ''}`}
                                onClick={() => setActiveSection('ChangePassword')}>
                                <IoMdLock className="text-[22px] mr-2" />
                                Change Password</li>
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
