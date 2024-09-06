import React, { useState, useEffect } from "react";
import VysyamalaWhite from "../assets/icons/VysyamalaWhite.png";
import { Link } from "react-router-dom";
import { PopupModal } from "./HomePage/PopUpsReg/PopupModal";
import { LoginPopupModal } from "./HomePage/PopUpsLogin/LoginPopupModal";

export const Header: React.FC = () => {
  const [, setIsScrolled] = useState(false);

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

  // Login Popup
  const [isAccountSetupOpen, setIsAccountSetupOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsAccountSetupOpen(true);
  };

  const handleCloseAccountSetup = () => {
    setIsAccountSetupOpen(false);
    console.log("Closing PopupModal popup"); // Debug log
  };

  // Register Popup
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
    console.log("Closing Login PopupModal popup"); // Debug log
  };

  const handleLogout = () => {
    // Clear token from sessionStorage
    sessionStorage.removeItem("profile_completion");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userImages");
    sessionStorage.removeItem("profile_id");
    window.location.href = "/";
  };

  // const profile_id = sessionStorage.getItem("profile_id");
  const profile_completion = sessionStorage.getItem("profile_completion");

  return (
    <div>
      {/* <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-[1]
           ${
             isScrolled
               ? "bg-secondary backdrop-blur-lg bg-opacity-100"
               : "bg-transparent"
           }`}
      > */}
      <header className="bg-secondary">
        <div className="container mx-auto flex justify-between items-center py-5 bg-transparent">
          <div>
            <Link to="/" className="">
              <img
                src={VysyamalaWhite}
                alt=""
                className="w-36 cursor-pointer"
              />
            </Link>
          </div>

          <nav>
            <ul className="flex justify-center items-center text-white">
              {!profile_completion && (
                <>
                  <li className="text-[16px] cursor-pointer">Search</li>
                  <li
                    className="text-[16px] cursor-pointer px-10"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </li>
                </>
              )}
              {profile_completion != null ? (
                <li
                  className="bg-light-pink rounded-[6px] py-[8px] px-[24px] text-main text-[16px] font-semibold cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              ) : (
                <li
                  className="bg-light-pink rounded-[6px] py-[8px] px-[24px] text-main text-[16px] font-semibold cursor-pointer"
                  onClick={handleLoginClick}
                >
                  Login
                </li>
              )}

              {isAccountSetupOpen && (
                <PopupModal onClose={handleCloseAccountSetup} />
              )}
              {isLoginPopupOpen && (
                <LoginPopupModal
                  onClose={handleCloseLoginPopup}
                  onForgetPassword={function (): void {
                    throw new Error("Function not implemented.");
                  } } isopen={false}                />
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};
