import React from 'react'
import { HeroSection } from '../Components/HomePage/HeroSection'
import { VysyamalaAbout } from '../Components/HomePage/VysyamalaAbout'
import { FeaturedBride } from '../Components/HomePage/FeaturedBride'

export const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedBride />
            <VysyamalaAbout />
        </div>
    )
}
