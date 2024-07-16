import React, { useState } from 'react'
import { MdVerifiedUser } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { ProfileSlick } from "../../Components/DashBoard/ProfileDetails/ProfileSlick";
import { MdLocalPrintshop } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ProfileDetailsSettings } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsSettings"

export const MyProfile = () => {

  // Declaration for Horoscope State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  // Circular Progress bar value
  const percentage = 85;

  return (
    <div>
      <div className="bg-grayBg pt-10">
        <div className="container mx-auto">
          <div className="mb-5">
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">My Profile
            </h4>
          </div>

          <div className="grid grid-rows-1 grid-cols-3 justify-start items-start space-x-10">

            <div className="">
              <ProfileSlick />
            </div>


            {/* Profile Details */}
            <div className="col-span-2">
              <div className="flex justify-between items-center">
                <div className="">
                  <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2">Harini
                    <MdVerifiedUser className="text-checkGreen ml-2" /></h4>
                </div>

                {/* Print Horoscope */}
                <div className="flex justify-center items-center space-x-10"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
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

              {/* Vysyamala ID */}
              <p className="text-[20px] text-primary font-bold mb-2">VM30492</p>

              {/* Plan & Date */}
              <div className="flex items-center space-x-5 mb-2">
                <p className="w-fit bg-gradientGold text-primary font-semibold rounded-md px-3 py-0.5 ">Gold</p>
                <p className=" text-primary">Valid Upto : 16-July-2024</p>
              </div>

              {/* Add-Ons */}
              <div className="my-3">
                <button className="flex items-center text-lg text-main font-semibold">Add-On-Packages
                  <FaArrowRight className="ml-2" /></button>
              </div>

              <div className="w-1/2 mb-16">
                {/* Profile Details Content */}
                <div>
                  {/* Age & height */}
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-[18px] text-ash font-semibold">Age :
                      <span className="font-normal"> 22 years</span></h5>

                    <h5 className="text-[18px] text-ash font-semibold">Height :
                      <span className="font-normal"> 5ft 5inch (165cms)</span></h5>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-[18px] text-ash font-semibold">Weight :
                      <span className="font-normal"> 68 Kgs</span></h5>
                  </div>

                  {/* Star & Gothram */}
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-[18px] text-ash font-semibold">Star :
                      <span className="font-normal"> Anusham</span></h5>

                    <h5 className="text-[18px] text-ash font-semibold">Gothram :
                      <span className="font-normal"> Nabila</span></h5>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-[18px] text-ash font-semibold">Profession :
                      <span className="font-normal"> Employed</span></h5>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-[18px] text-ash font-semibold">Education :
                      <span className="font-normal"> B.Tech., Mech</span></h5>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-[18px] text-ash font-semibold">About :
                      <span className="font-normal"> B.Tech., Mech</span></h5>
                  </div>
                </div>

              </div>

              <div className="bg-vysyamalaLightSandal px-5 py-7 border-2 border-vysyamalaYellow border-dashed rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-lg text-primary font-semibold">Your profile is now 85% complete</h5>
                    <p className="text-sm text-primary">Complete your profile we will suggest profiles based on your preference</p>

                    <button className="flex items-center text-lg text-main font-semibold my-3">Complete Your Profile <FaArrowRight className="ml-2" /></button>
                  </div>
                  <div className="w-24 h-24 text-primary font-semibold">
                    <CircularProgressbar value={percentage} text={`${percentage}%`}
                      styles={buildStyles({
                        pathColor: `rgba(47, 189, 18, ${percentage / 100})`,
                        textColor: '#535665',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
      <ProfileDetailsSettings />
    </div>
  )
}
