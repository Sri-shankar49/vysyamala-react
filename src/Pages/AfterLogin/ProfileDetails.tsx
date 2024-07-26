import React from 'react'
import { ProfileDetailsExpressInterest } from '../../Components/DashBoard/ProfileDetails/ProfileDetailsExpressInterest'
import { ProfileDetailsRequest } from '../../Components/DashBoard/ProfileDetails/ProfileDetailsRequest'
import { ProfileDetailsSettingsView } from '../../Components/LoginHome/ProfileDetailsView/ProfileDetailsSettingsView'
import { FeaturedProfiles } from '../../Components/LoginHome/FeaturedProfiles'
import { VysyaBazaar } from '../../Components/LoginHome/VysyaBazaar'
import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles'

export const ProfileDetails = () => {
    return (
        <div>
            {/* <ProfileDetailsExpressInterest /> */}
            <ProfileDetailsRequest />

            <ProfileDetailsSettingsView />
            <FeaturedProfiles />
            <VysyaBazaar />
            <SuggestedProfiles />
        </div>
    )
}
