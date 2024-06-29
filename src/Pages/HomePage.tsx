import { HeroSection } from "../Components/HomePage/HeroSection";
import { VysyamalaAbout } from "../Components/HomePage/VysyamalaAbout";
import { FeaturedBride } from "../Components/HomePage/FeaturedBride";
import { FeaturedGroom } from "../Components/HomePage/FeaturedGroom";
import { WhyVysyamala } from "../Components/HomePage/WhyVysyamala";
import { AwardsGallery } from "../Components/HomePage/AwardsGallery";
import TrustedPeople from "../Components/HomePage/TrustedPeople";
import FindSomeone from "../Components/HomePage/FindSomeone";
import HappyStories from "../Components/HomePage/HappyStories";
import VysyamalaApps from "../Components/HomePage/VysyamalaApps";

export const HomePage = () => {
  return (
    <div>
      <HeroSection
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <FeaturedBride />
      <FeaturedGroom />
      <WhyVysyamala />
      <AwardsGallery />
      <TrustedPeople />
      <FindSomeone />
      <HappyStories />
      <VysyamalaApps />
      <VysyamalaAbout />
    </div>
  );
};
