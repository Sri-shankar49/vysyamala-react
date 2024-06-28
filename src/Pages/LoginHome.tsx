import { HeroSlider } from "../Components/LoginHome/HeroSlider";
import { MatchingProfiles } from "../Components/LoginHome/MatchingProfiles";

export const LoginHome = () => {
  // Retrieve token from sessionStorage
  const token = sessionStorage.getItem('token');

  // Function to handle logout
  const handleLogout = () => {
    // Clear token from sessionStorage
    sessionStorage.removeItem('token');
     window.location.href = '/';
  };

  return (
    <div>
      <h2>LoginHome</h2>
      <p>Token: {token}</p>
      <button onClick={handleLogout}>Logout</button>
      <HeroSlider />
      <MatchingProfiles />
    </div>
  );
};
