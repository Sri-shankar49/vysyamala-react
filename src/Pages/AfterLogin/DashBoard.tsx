import { useState } from "react";
import { DashBoardGrid } from "../../Components/DashBoard/DashBoardGrid";
import { DashBoardMutualInterest } from "../../Components/DashBoard/DashBoardMutualInterest";
import { DashBoardWishlist } from "../../Components/DashBoard/DashBoardWishlist";
import { DashBoardMyProfile } from "../../Components/DashBoard/DashBoardMyProfile";
import { OtherSettings } from "../../Components/DashBoard/OtherSettings";
import { DashBoardMatchingProfiles } from "../../Components/DashBoard/DashBoardMatchingProfiles";
import { InterestSent } from "../../Components/DashBoard/InterestSent";
import { ViewedProfiles } from "../../Components/DashBoard/ViewedProfiles";
import { MyVisitors } from "../../Components/DashBoard/MyVisitors";
import { PersonalNotes } from "../../Components/DashBoard/PersonalNotes";
import PhotoRequest  from "../../Components/DashBoard/PhotoRequest/PhotoRequest";




export const DashBoard = () => {
  // State to manage which section to display
  const [showDashBoardMatchingProfiles, setShowDashBoardMatchingProfiles] =
    useState(false);
  const [showDashBoardMutualInterest, setShowDashBoardMutualInterest] =
    useState(false);
  const [showDashBoardWishlist, setShowDashBoardWishlist] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [showInterestSent, setShowInterestSent] = useState(false);
  const [showViewedProfiles, setShowViewedProfiles] = useState(false);
  const [showMyVisitors, setShowMyVisitors] = useState(false);
  const [showPersonalNotes, setShowPersonalNotes] = useState(false);
  const [showOtherSettings, setShowOtherSettings] = useState(false);
  const [showPhotoRequest, setShowPhotoRequest] = useState(false);

  return (
    <div>
      {showProfileDetails ? (
        <DashBoardMyProfile
          dashBoardAgain={() => setShowProfileDetails(false)}
        />
      ) : showPhotoRequest ? (
        <PhotoRequest dashBoardAgain={()=>setShowPhotoRequest(false)} />
      ) : showDashBoardMutualInterest ? (
        <DashBoardMutualInterest
          dashBoardAgain={() => setShowDashBoardMutualInterest(false)}
        />
      ) : showDashBoardMatchingProfiles ? (
        <DashBoardMatchingProfiles
          dashBoardAgain={() => setShowDashBoardMatchingProfiles(false)}
        />
      ) : showDashBoardWishlist ? (
        <DashBoardWishlist
          dashBoardAgain={() => setShowDashBoardWishlist(false)}
        />
      ) : showInterestSent ? (
        <InterestSent dashBoardAgain={() => setShowInterestSent(false)} />
      ) : showViewedProfiles ? (
        <ViewedProfiles dashBoardAgain={() => setShowViewedProfiles(false)} />
      ) : showMyVisitors ? (
        <MyVisitors dashBoardAgain={() => setShowMyVisitors(false)} />
      ) : showPersonalNotes ? (
        <PersonalNotes dashBoardAgain={() => setShowPersonalNotes(false)} />
      ) : showOtherSettings ? (
        <OtherSettings dashBoardAgain={() => setShowOtherSettings(false)} />
      ) : (
        <DashBoardGrid
          onDashBoardMutualInterest={() =>
            setShowDashBoardMutualInterest(true)
          }
          onDashBoardMatchingProfiles={() =>
            setShowDashBoardMatchingProfiles(true)
          }
          onDashBoardWishlist={() => setShowDashBoardWishlist(true)}
          // Profile Card
          onProfileDetails={() => setShowProfileDetails(true)}
          // Indicator Cards
          onViewedProfiles={() => setShowViewedProfiles(true)}
          onInterestSent={() => setShowInterestSent(true)}
          onMyVisitors={() => setShowMyVisitors(true)}
          onPhotoRequest={() => setShowPhotoRequest(true)}
          // Optional Cards
          onPersonalNotes={() => setShowPersonalNotes(true)}
          onOtherSettings={() => setShowOtherSettings(true)}
        />
      )}
    </div>
  );
};
