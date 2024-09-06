import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";
import { MdImage } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
// import { BiSolidUserCircle } from "react-icons/bi";
// import { IoMdLock } from "react-icons/io";
import { AlertSettings } from "./OtherSettings/AlertSettings";
import { PhotoSettings } from "./OtherSettings/PhotoSettings";
import { PartnerSettings } from "./OtherSettings/PartnerSettings";
// import { ChangePassword } from "./OtherSettings/ChangePassword";
// import { ProfileVisibility } from "./OtherSettings/ProfileVisibility";

interface OtherSettingsProps {
  dashBoardAgain: () => void;
}

export const OtherSettings: React.FC<OtherSettingsProps> = ({
  dashBoardAgain,
}) => {
  // Corresponding Component State Declaration
  const [activeSection, setActiveSection] = useState<string>("AlertSettings");

  const renderSection = () => {
    switch (activeSection) {
      case "Personal":
        return <AlertSettings />;
      case "PhotoSettings":
        return <PhotoSettings />;
      case "PartnerSettings":
        return <PartnerSettings />;
      // case 'ChangePassword':
      //     return <ChangePassword />;
      // case "ProfileVisibility":
      //   return <ProfileVisibility />;
      default:
        return <AlertSettings />;
    }
  };
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline
            onClick={dashBoardAgain}
            className="text-[24px] mr-2 cursor-pointer"
          />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
            {" "}
            Other Settings
            {/* <span className="text-sm text-primary"> (234)</span> */}
          </h4>
        </div>
      </div>

      <div className="bg-ash">
        <div className="container mx-auto py-20">
          <div className="w-full flex justify-between items-start space-x-5">
            {/* Side Bar */}
            <div className="sidebar">
              <ul className="w-full space-y-10">
                <li
                  className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${
                                   activeSection === "AlertSettings"
                                     ? "active"
                                     : ""
                                 }`}
                  onClick={() => setActiveSection("AlertSettings")}
                >
                  <FaBell className="text-[22px] mr-2" />
                  Alert Settings
                </li>

                <li
                  className={`flex items-center text-[20px] text-white cursor-pointer 
                            ${
                              activeSection === "PhotoSettings" ? "active" : ""
                            }`}
                  onClick={() => setActiveSection("PhotoSettings")}
                >
                  <MdImage className="text-[22px] mr-2" />
                  Photo / ID Settings
                </li>

                <li
                  className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${
                                   activeSection === "PartnerSettings"
                                     ? "active"
                                     : ""
                                 }`}
                  onClick={() => setActiveSection("PartnerSettings")}
                >
                  <MdManageAccounts className="text-[22px] mr-2" />
                  Partner Settings
                </li>
                {/* 
                <li
                  className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${
                                   activeSection === "ChangePassword"
                                     ? "active"
                                     : ""
                                 }`}
                  onClick={() => setActiveSection("ChangePassword")}
                >
                  <IoMdLock className="text-[22px] mr-2" />
                  Change Password
                </li> */}

                {/* <li
                  className={`flex items-center text-[20px] text-white cursor-pointer
                                 ${
                                   activeSection === "ProfileVisibility"
                                     ? "active"
                                     : ""
                                 }`}
                  onClick={() => setActiveSection("ProfileVisibility")}
                >
                  <BiSolidUserCircle className="text-[22px] mr-2" />
                  Profile Visibility
                </li> */}
              </ul>
            </div>

            {/* Content */}
            <div className="w-3/4 bg-white rounded-lg">
              <div className="p-10">{renderSection()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
