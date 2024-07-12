import { useState } from "react";
import { ProfileDetailsExpressInterest } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsExpressInterest";
import { HandleLogin } from "../../Components/LoginHome/HandleLogin";
import { GridListCard } from "../../Components/LoginHome/MatchingProfiles/ProfileCard/GridListCard";


export const LoginHome = () => {

  // State Declaration to show ProfileDetailsExpressInterest
  const [showExpressInterest, setShowExpressInterest] = useState(false);


  // Function to toggle the state
  const toggleExpressInterest = () => {
    setShowExpressInterest(true); // Ensure that ProfileDetailsExpressInterest is shown
  };


  return (
    <div>
      {showExpressInterest ? (
        <ProfileDetailsExpressInterest />
      ) : (
        <><HandleLogin /><GridListCard onExpressInterest={toggleExpressInterest} /></>
      )}
    </div>
  );
};
