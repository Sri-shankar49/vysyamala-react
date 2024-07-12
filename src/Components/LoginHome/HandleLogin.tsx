import React from 'react';
import { HeroSlider } from './HeroSlider';
import { MatchingProfiles } from './MatchingProfiles';
import { SuggestedProfiles } from './SuggestedProfiles';
import { VysyamalaStore } from './VysyamalaStore';
import { FeaturedProfiles } from './FeaturedProfiles';
import { VysyaBazaar } from './VysyaBazaar';

export const HandleLogin = () => {
    return (
        <div>
            <HeroSlider />
            <MatchingProfiles />
            <SuggestedProfiles />
            <VysyamalaStore />
            <FeaturedProfiles />
            <VysyaBazaar />
        </div>
    )
}
