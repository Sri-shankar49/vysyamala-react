import { useState } from "react";
import { DashBoardGrid } from "../../Components/DashBoard/DashBoardGrid";
// import { ProfileDetailsRequest } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsRequest";
import { DashBoardMutualInterest } from "../../Components/DashBoard/DashBoardMutualInterest";
import { DashBoardWishlist } from "../../Components/DashBoard/DashBoardWishlist";
import { DashBoardMyProfile } from "../../Components/DashBoard/DashBoardMyProfile";
import { OtherSettings } from "../../Components/DashBoard/OtherSettings";
import { DashBoardMatchingProfiles } from "../../Components/DashBoard/DashBoardMatchingProfiles";
import { InterestSent } from "../../Components/DashBoard/InterestSent";
import { ViewedProfiles } from "../../Components/DashBoard/ViewedProfiles";
import { MyVisitors } from "../../Components/DashBoard/MyVisitors";
import { PersonalNotes } from "../../Components/DashBoard/PersonalNotes";

export const DashBoard = () => {

    // Toggle to Profile Details when the user clicks on Complete your profile
    const [showDashBoardMatchingProfiles, setShowDashBoardMatchingProfiles] = useState(false);

    // Toggle to Profile Details when the user clicks on Complete your profile
    const [showDashBoardMutualInterest, setShowDashBoardMutualInterest] = useState(false);

    // Toggle to Profile Details when the user clicks on Complete your profile
    const [showDashBoardWishlist, setShowDashBoardWishlist] = useState(false);

    // Toggle to Profile Details when the user clicks on Complete your profile
    const [showProfileDetails, setShowProfileDetails] = useState(false);

    // Toggle to Interest Sent when the user clicks on Interest Sent
    const [showInterestSent, setShowInterestSent] = useState(false);

    // Toggle to Viewed Profile when the user clicks on Viewed Profile
    const [showViewedProfiles, setShowViewedProfiles] = useState(false);

    // Toggle to My Visitors when the user clicks on My Visitors
    const [showMyVisitors, setShowMyVisitors] = useState(false);

    // Toggle to Other Settings when the user clicks on Other Settings
    const [showPersonalNotes, setShowPersonalNotes] = useState(false);

    // Toggle to Other Settings when the user clicks on Other Settings
    const [showOtherSettings, setShowOtherSettings] = useState(false);




    return (
        <div>
            <div className="">

                {showProfileDetails ? (
                    // <ProfileDetailsRequest dashBoardAgain={() => setShowProfileDetails(false)} />
                    <DashBoardMyProfile dashBoardAgain={() => setShowProfileDetails(false)} />
                ) :
                    showDashBoardMutualInterest ? (
                        <DashBoardMutualInterest dashBoardAgain={() => setShowDashBoardMutualInterest(false)}
                        />) :
                        showDashBoardMatchingProfiles ? (
                            <DashBoardMatchingProfiles dashBoardAgain={() => setShowDashBoardMatchingProfiles(false)} />
                        ) :
                            showDashBoardWishlist ? (
                                <DashBoardWishlist dashBoardAgain={() => setShowDashBoardWishlist(false)} />
                            ) :

                                // Indicator Cards
                                showInterestSent ? (
                                    <InterestSent dashBoardAgain={() => setShowInterestSent(false)} />
                                ) :
                                    showViewedProfiles ? (
                                        <ViewedProfiles dashBoardAgain={() => setShowViewedProfiles(false)} />
                                    ) : showMyVisitors ? (
                                        <MyVisitors dashBoardAgain={() => setShowMyVisitors(false)} />
                                    ) :

                                        // Optional Cards
                                        showPersonalNotes ? (
                                            <PersonalNotes dashBoardAgain={() => setShowPersonalNotes(false)} />
                                        ) :
                                            showOtherSettings ? (
                                                <OtherSettings dashBoardAgain={() => setShowOtherSettings(false)} />
                                            ) : (
                                                <DashBoardGrid
                                                    onDashBoardMutualInterest={() => setShowDashBoardMutualInterest(true)}
                                                    onDashBoardMatchingProfiles={() => setShowDashBoardMatchingProfiles(true)}
                                                    onDashBoardWishlist={() => setShowDashBoardWishlist(true)}

                                                    // Profile Card
                                                    onProfileDetails={() => setShowProfileDetails(true)}

                                                    // Indicator Cards
                                                    onViewedProfiles={() => setShowViewedProfiles(true)}
                                                    onInterestSent={() => setShowInterestSent(true)}
                                                    onMyVisitors={() => setShowMyVisitors(true)}

                                                    // Optional Cards
                                                    onPersonalNotes={() => setShowPersonalNotes(true)}
                                                    onOtherSettings={() => setShowOtherSettings(true)}

                                                />
                                            )}

            </div>
        </div>
    )
}
