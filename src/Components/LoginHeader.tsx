import React, { useState } from "react";
import VysyamalaLogo from "../assets/icons/VysyamalaLogo.png";
import ProfileImg from "../assets/icons/profileRound.png";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

export const LoginHeader: React.FC = () => {

  // Retrieve token from sessionStorage
  const token = sessionStorage.getItem("token");

  // Function to handle logout
  const handleLogout = () => {
    // Clear token from sessionStorage
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  // Dropdown State Declaration
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div>
      <div>
        {/* <h2>LoginHome</h2> */}
        {/* <p>Token: {token}</p> */}
        {/* <button>Logout</button> */}
      </div>
      <header className="transition-all duration-300 z-[1]">
        <div className="container mx-auto flex justify-between items-center py-5 bg-transparent">
          <div>
            <Link to="/">
              <img src={VysyamalaLogo} alt="Vysyamala-Logo" className="w-36" />
            </Link>
          </div>

          <nav className="flex items-center space-x-10">

            <ul className="flex justify-center items-center text-ash space-x-14">
              <NavLink
                to="/LoginHome"
                className="active-nav"
                aria-current="page"
              >
                <li className="text-[16px] cursor-pointer font-medium">Home</li>
              </NavLink>

              <NavLink to="/Search" aria-current="page" className="active-nav">
                <li className="text-[16px] cursor-pointer font-medium">
                  Search
                </li>
              </NavLink>

              <NavLink
                to="/Dashboard"
                aria-current="page"
                className="active-nav"
              >
                <li className="text-[16px] cursor-pointer font-medium">
                  Dashboard
                </li>
              </NavLink>

              <NavLink
                to={"/Wishlist"}
                aria-current="page"
                className="active-nav"
              >
                <li className="text-[16px] cursor-pointer font-medium">
                  Wishlist
                </li>
              </NavLink>

              <li className="text-[16px] cursor-pointer font-medium">
                <MdMessage className="text-[22px]" />
              </li>

              <li className="text-[16px] cursor-pointer font-medium">
                <FaBell className="text-[22px]" />
              </li>

              <li className="bg-gradientLight rounded-[6px] py-[8px] px-[24px] text-white text-[16px] font-semibold cursor-pointer">
                Upgrade
              </li>

            </ul>

            <div className="border-l-2 border-l-ashSecondary pl-8 relative inline-block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>

              <img src={ProfileImg} alt="Profile-image" className="rounded-full cursor-pointer" />
              {isHovered && (
                <div className="absolute top-9 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link to="/MyProfile">
                    <div className="block px-4 py-2 text-gray-800 hover:bg-gray">
                      <FaCircleUser className="text-[18px] inline mr-2" /> Profile
                    </div></Link>
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
