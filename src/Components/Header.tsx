import React, { useState, useEffect } from "react";
import VysyamalaWhite from "../assets/icons/VysyamalaWhite.png";
import { Link } from "react-router-dom";
import { PopupModal } from "../Components/HomePage/PopUps/PopupModal";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Popup
  const [isAccountSetupOpen, setIsAccountSetupOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsAccountSetupOpen(true);
  };

  const handleCloseAccountSetup = () => {
    setIsAccountSetupOpen(false);
    console.log("Closing PopupModal popup"); // Debug log
  };

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-[1] ${
          isScrolled ? "backdrop-blur-lg bg-opacity-50" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-5 bg-transparent">
          <div>
            <Link to="/HomePage" className="">
              <img src={VysyamalaWhite} alt="" className="w-36" />
            </Link>
          </div>

          <nav>
            <ul className="flex justify-center items-center text-white">
              <Link to="/D">
                <li className="text-[16px] cursor-pointer">Search</li>
              </Link>
              <li
                className="text-[16px] cursor-pointer px-10"
                onClick={handleRegisterClick}
              >
                Register
              </li>
              <li className="bg-light-pink rounded-[6px] py-[8px] px-[24px] text-main text-[16px] font-semibold cursor-pointer">
                Login
              </li>
              {isAccountSetupOpen && (
                <PopupModal onClose={handleCloseAccountSetup} />
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};
