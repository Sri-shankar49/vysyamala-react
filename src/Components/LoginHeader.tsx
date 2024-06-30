// import React, { useState, useEffect } from "react";
import VysyamalaLogo from "../assets/icons/VysyamalaLogo.png";
import ProfileImg from "../assets/icons/profileRound.png";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export const LoginHeader: React.FC = () => {
  return (
    <div>
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

            <div className="border-l-2 border-l-ashSecondary pl-8">
              <img src={ProfileImg} alt="Profile-image" />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};
