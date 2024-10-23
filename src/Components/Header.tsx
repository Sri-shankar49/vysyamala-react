import React, { useState, useEffect } from "react";
import Vysyamalalogo from "../assets/icons/VysyamalaLogo.png";
// import VysyamalaWhiteLogo from "../assets/icons/VysyamalaWhite.png";
import { Link } from "react-router-dom";
import { PopupModal } from "./HomePage/PopUpsReg/PopupModal";
import { LoginPopupModal } from "./HomePage/PopUpsLogin/LoginPopupModal";
import { IoClose } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  console.log(isScrolled);


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


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="relative">
      {/* <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-[1] shadow-md px-5
           ${isScrolled
            ? "bg-white backdrop-blur-lg bg-opacity-100"
            : "bg-transparent"
          }
           `}
      > */}
      <header className="fixed top-0 left-0 right-0 transition-all duration-300 z-[1] shadow-md px-5 bg-white w-full  max-2xl:px-4">
        <div className="container mx-auto flex justify-between items-center py-5 bg-transparent">
          <div>
            <Link to="/" className="">
              <img
                src={Vysyamalalogo}
                alt=""
                className="w-36 cursor-pointer"
              />
            </Link>
          </div>
          {/* Hamburger Menu Button (Visible on small screens) */}
          <button
            className="block lg:hidden text-gray-800"
            onClick={handleMenuToggle}
          >
            {/* <svg className="w-8 h-8" fill="none" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg> */}
            <CgDetailsMore className="text-[28px] text-vysyamalaBlack" />
          </button>

          <nav className="max-lg:hidden">
            <ul className="flex justify-center items-center text-white">
              {!profile_completion && (
                <>
                  <li className="text-[16px] cursor-pointer font-medium text-black"
                  >Search</li>
                  <li
                    className="text-[16px] text-black cursor-pointer px-10 font-medium "
                    onClick={handleRegisterClick}
                  >
                    Register
                  </li>
                </>
              )}
              <div>

              </div>
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
                  }} isopen={false} />
              )}
            </ul>
          </nav>


          {/* Sidebar for small screens */}
          {isMenuOpen && (
            <div className="lg:hidden fixed inset-0 bg-black bg-gray-800 bg-opacity-75 z-10 transition-opacity duration-300 ease-in-out">
              <div className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg py-8 px-4 transform transition-transform duration-300 ease-in-out 
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <button
                  onClick={handleMenuToggle}
                  className="absolute top-10 right-4 text-gray-800"
                >
                  {/* Close button */}
                  {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg> */}
                  <IoClose className="w-6 h-6 text-vysyamalaBlack" />
                </button>
                <nav>
                  <Link to="/" className="pb-8 block">
                    <img
                      src={Vysyamalalogo}
                      alt=""
                      className="w-36 cursor-pointer"
                    />
                  </Link>
                  <ul className="flex flex-col justify-center item-start text-black gap-8">
                    {!profile_completion && (
                      <>
                        <li className="text-[18px] cursor-pointer font-medium">Search</li>
                        <li
                          className="text-[18px] cursor-pointer font-medium"
                          onClick={handleRegisterClick}
                        >
                          Register
                        </li>
                      </>
                    )}
                    {profile_completion != null ? (
                      <li
                        className="bg-light-pink rounded-[6px] py-[8px] px-[24px] text-main text-[16px] font-semibold cursor-pointer w-fit"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    ) : (
                      <li
                        className="bg-light-pink rounded-[6px] py-[8px] px-[24px] text-main text-[16px] font-semibold cursor-pointer w-fit"
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
                        }} isopen={false} />
                    )}
                  </ul>

                </nav>
              </div>
            </div>
          )}

        </div>
      </header>
    </div>
  );
};
