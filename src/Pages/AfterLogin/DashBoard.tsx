import { useState } from "react";
import { DashBoardGrid } from "../../Components/DashBoard/DashBoardGrid"
// import { ProfileDetailsRequest } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsRequest"
import { DashBoardMyProfile } from "../../Components/DashBoard/DashBoardMyProfile";
import { OtherSettings } from "../../Components/DashBoard/OtherSettings";

export const DashBoard = () => {

    // Toggle to Profile Details when the user clicks on Complete your profile
    const [showProfileDetails, setShowProfileDetails] = useState(false);

    // Toggle to Other Settings when the user clicks on Other Settings
    const [showOtherSettings, setShowOtherSettings] = useState(false);


    return (
        <div>
            <div className="">

                {showProfileDetails ? (
                    // <ProfileDetailsRequest dashBoardAgain={() => setShowProfileDetails(false)} />
                    <DashBoardMyProfile dashBoardAgain={() => setShowProfileDetails(false)} />
                ) : showOtherSettings ? (
                    <OtherSettings dashBoardAgain={() => setShowOtherSettings(false)} />
                ) : (
                    <DashBoardGrid
                        onProfileDetails={() => setShowProfileDetails(true)}
                        onOtherSettings={() => setShowOtherSettings(true)}
                    />
                )}
            </div>
        </div>
    )
}
