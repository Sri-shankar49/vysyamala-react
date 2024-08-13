import React, { useState, useEffect, useRef } from "react";
import VysyamalaLogo from "../assets/icons/VysyamalaLogo.png";
import ProfileImg from "../assets/icons/profileRound.png";
import { MdMessage } from "react-icons/md";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import NotificationsImg from "../assets/images/NotificationsImg.png";
import { Link, NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

export const LoginHeader: React.FC = () => {

  // Retrieve token from sessionStorage
  // const token = sessionStorage.getItem("token");

  // Function to handle logout
  const handleLogout = () => {
    // Clear token from sessionStorage
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  // Notification Dropdown State Declaration
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ensure the ref is typed correctly

  const handleNotificationClick = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation(); // Prevent the click event from propagating to the document
    setIsNotificationVisible((prev) => !prev);
  };

  // On Click outside of it 
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsNotificationVisible(false);
    }
  };
  

  useEffect(() => {
    if (isNotificationVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationVisible]);

  // Profile Image Dropdown State Declaration
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Menu Toggle State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="transition-all duration-300 z-[1]">
        <div className="container mx-auto flex justify-between items-center py-5 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div>
            <Link to="/LoginHome">
              <img src={VysyamalaLogo} alt="Vysyamala-Logo" className="w-36" />
            </Link>
          </div>

          <nav className="flex items-center space-x-4 sm:space-x-10">
            {/* Hamburger Button */}
            <div className="block lg:hidden">
              <button onClick={toggleMenu} className="text-2xl">
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Main Menu */}
            <ul className={`flex-col lg:flex-row lg:flex-wrap justify-center items-center text-ash space-x-4 sm:space-x-12 lg:flex ${isMenuOpen ? "flex" : "hidden"}`}>
              <NavLink to="/LoginHome" className="active-nav" aria-current="page">
                <li className="text-[16px] cursor-pointer font-medium px-3">Home</li>
              </NavLink>

              <NavLink to="/Search" aria-current="page" className="active-nav">
                <li className="text-[16px] cursor-pointer font-medium">Search</li>
              </NavLink>

              <NavLink to="/Dashboard" aria-current="page" className="active-nav">
                <li className="text-[16px] cursor-pointer font-medium px-3">Dashboard</li>
              </NavLink>

              <NavLink to="/Wishlist" aria-current="page" className="active-nav">
                <li className="text-[16px] cursor-pointer font-medium px-3">Wishlist</li>
              </NavLink>

              <NavLink to="/Messages" aria-current="page" className="active-nav">
                <li className="text-[16px] cursor-pointer font-medium px-3">
                  <MdMessage className="text-[22px]" />
                </li>
              </NavLink>

              {/* Notifications */}
              <li
                onClick={handleNotificationClick}
                className={`text-[16px] rounded-md transition-all cursor-pointer 
                ${isNotificationVisible ? "bg-light-pink" : ""} font-medium px-3 py-3 relative`}>
                <FaBell className={`text-[22px] ${isNotificationVisible ? "text-main" : ""} `} />

                {isNotificationVisible && (
                  <div
                    ref={dropdownRef}
                    className="notification-dropdown absolute top-16 right-0 translate-x-2/4 w-full sm:w-[30rem] bg-white rounded-md shadow-lg py-1 z-20">
                    <h4 className="text-vysyamalaBlack text-[20px] font-bold px-3 py-3">Notifications</h4>

                    <div className="h-96 overflow-y-auto">
                      {/* Express Interest */}
                      <div className="bg-lightFade-pink flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">
                        <div>
                          <img src={NotificationsImg} alt="Harini Image" className="w-full" />
                        </div>

                        <div className="">
                          <h5 className="text-vysyamalaBlack font-semibold">Harini has expressed interest in your profile</h5>
                          <p className="text-ashSecondary text-sm font-normal mb-3">I am interested in your profile. If you are interested in my profile, please contact me.</p>
                          <button className="text-main rounded-md border-[2px] border-main px-2 py-1">Message</button>
                          <p className="text-sm text-ashSecondary font-semibold mt-3">Today</p>
                        </div>
                      </div>

                      {/* Photo Request */}
                      <div className="bg-lightFade-pink flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">
                        <div>
                          <img src={NotificationsImg} alt="Harini Image" className="w-full" />
                        </div>

                        <div className="">
                          <h5 className="text-vysyamalaBlack font-semibold">Harini has requested your photo</h5>
                          <p className="text-ashSecondary text-sm font-normal mb-3">Update your profile image to get more matches</p>
                          <button className="text-main rounded-md border-[2px] border-main px-2 py-1">Update my photo</button>
                          <p className="text-sm text-ashSecondary font-semibold mt-3">1d ago</p>
                        </div>
                      </div>

                      {/* Change in Photo */}
                      <div className="bg-white flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">
                        <div>
                          <img src={NotificationsImg} alt="Harini Image" className="w-full" />
                        </div>

                        <div className="">
                          <h5 className="text-vysyamalaBlack font-semibold">Change in Photo</h5>
                          <p className="text-ashSecondary text-sm font-normal mb-3">Harini the profile you have visited has uploaded a new photo. Check it out!</p>
                          <p className="text-sm text-ashSecondary font-semibold mt-3">1 week ago</p>
                        </div>
                      </div>

                      {/* Change in Annual Income */}
                      <div className="bg-white flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">
                        <div>
                          <img src={NotificationsImg} alt="Harini Image" className="w-full" />
                        </div>

                        <div className="">
                          <h5 className="text-vysyamalaBlack font-semibold">Change in Annual Income</h5>
                          <p className="text-ashSecondary text-sm font-normal mb-3">Harini the profile you have visited has updated her annual income. Check it out!</p>
                          <p className="text-sm text-ashSecondary font-semibold mt-3">2 week ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center px-3 py-3">
                      <Link to="/Notifications">
                        <button className="w-full rounded-md text-main py-3 font-semibold hover:bg-gradient hover:text-white">Load more</button>
                      </Link>
                    </div>
                  </div>
                )}
              </li>

              {/* Upgrade Button */}
              <li className="bg-gradientLight rounded-[6px] py-[8px] px-[16px] sm:px-[24px] text-white text-[16px] font-semibold cursor-pointer">
                Upgrade
              </li>
            </ul>

            {/* Profile Image on hover */}
            <div className="border-l-2 border-l-ashSecondary pl-4 sm:pl-8 relative inline-block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>

              <img src={ProfileImg} alt="Profile-image" className="rounded-full cursor-pointer" />
              {isHovered && (
                <div className="absolute top-9 right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link to="/MyProfile">
                    <div className="block px-4 py-2 text-gray-800 hover:bg-gray">
                      <FaCircleUser className="text-[18px] inline mr-2" /> Profile
                    </div>
                  </Link>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray">
                    <MdManageAccounts className="text-[18px] inline mr-2" /> Settings
                  </a>
                  <a href="#" onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray">
                    <FiLogOut className="text-[18px] inline mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};
