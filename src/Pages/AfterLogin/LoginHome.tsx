import { HeroSlider } from "../../Components/LoginHome/HeroSlider";
import { MatchingProfiles } from "../../Components/LoginHome/MatchingProfiles";
import { SuggestedProfiles } from "../../Components/LoginHome/SuggestedProfiles";
import { VysyamalaStore } from "../../Components/LoginHome/VysyamalaStore";
import { FeaturedProfiles } from "../../Components/LoginHome/FeaturedProfiles";
import { VysyaBazaar } from "../../Components/LoginHome/VysyaBazaar";

export const LoginHome = () => {
  // Retrieve token from sessionStorage
  const token = sessionStorage.getItem("token");

  // Function to handle logout
  const handleLogout = () => {
    // Clear token from sessionStorage
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <h2>LoginHome</h2>
        <p>Token: {token}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <HeroSlider />
      <MatchingProfiles />
      <SuggestedProfiles />
      <VysyamalaStore />
      <FeaturedProfiles />
      <VysyaBazaar />
    </div>
  );
};
