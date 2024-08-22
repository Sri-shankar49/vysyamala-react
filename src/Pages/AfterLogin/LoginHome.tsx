// src/Components/LoginHome/LoginHome.tsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ProfileDetailsExpressInterest } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsExpressInterest";
import { HandleLogin } from "../../Components/LoginHome/HandleLogin";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const LoginHome: React.FC = () => {
  const showExpressInterest = useSelector(
    (state: RootState) => state.interest.showExpressInterest
  );
  const navigate = useNavigate();

  const storedProfileCompletion: string =
    sessionStorage.getItem("profile_completion") || "0";
  // const profile_id:string=sessionStorage.getItem("profile_id")

  const redirectToPage = (profileCompletion: string | null) => {
    switch (profileCompletion) {
      case "1":
        navigate("/ContactDetails");
        break;
      case "2":
        navigate("/FamilyDetails");
        break;
      case "3":
        navigate("/HoroDetails");
        break;
      case "4":
        navigate("/EduDetails");
        break;
      case "5":
        navigate("/PartnerSettings");
        break;
      default:
        console.error("Invalid plan ID");
        // Optionally, you can navigate to a default page
        break;
    }
  };

  useEffect(() => {
    redirectToPage(storedProfileCompletion);
  }, [storedProfileCompletion]);
  return (
    <div>
      {showExpressInterest ? (
        <ProfileDetailsExpressInterest />
      ) : (
        <HandleLogin />
      )}
    </div>
  );
};
