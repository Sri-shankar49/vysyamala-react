
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPersonCircle, IoCalendar } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import FindSomeoneIcon from "../../assets/images/FindSomeone.png";
import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal"; // Assuming this is the component for the login popup

interface Profession {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface Profile {
  profile_id: string;
  profile_name: string;
  profile_age: number;
  profile_img: string;
  profile_height: string;
  profession: string;
  location: string;
}

const FindSomeone = () => {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState<boolean>(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState<boolean>(false); // For login popup state

  const [formData, setFormData] = useState({
    gender: "",
    profession: "",
    ageRange: "",
  });

  useEffect(() => {
    // Fetch profession preferences from API
    const fetchProfessions = async () => {
      try {
        const response = await axios.post<Record<string, Profession>>(
          "http://103.214.132.20:8000/auth/Get_Profes_Pref/"
        );
        const professionData = Object.values(response.data);
        setProfessions(professionData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profession preferences");
        setLoading(false);
      }
    };

    fetchProfessions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async () => {
    setSearching(true);
    setError(null);
    try {
      const [fromAge, toAge] = formData.ageRange.split("-");
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Searchbeforelogin/",
        {
          from_age: fromAge.trim(),
          to_age: toAge.trim(),
          gender: formData.gender,
          native_state: "Tamilnadu",
          city: "Trichy",
          profession: formData.profession,
          received_per_page: "2",
          received_page_number: "1",
        }
      );
      setProfiles(response.data.data);
      setSearching(false);
    } catch (err) {
      setError("Failed to fetch search results");
      setSearching(false);
    }
  };

  const handleViewProfileClick = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsLoginPopupOpen(true); // Open login popup if not logged in
    } else {
      // Handle logged-in behavior, such as navigating to the profile page
      console.log("User is logged in, proceed with profile view.");
    }
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false); // Close the login popup
  };

  return (
    <div className="bg-[#FFCCCC]">
      <div className="container flex flex-col py-14">
        <div>
          <img
            src={FindSomeoneIcon}
            alt="find someone special"
            className="size-28 mx-auto"
          />
        </div>
        <div>
          <h1 className="text-ash text-center text-3xl font-bold">
            Find that someone special
          </h1>
        </div>

        <div className="mt-8 flex items-center">
          <div className="bg-white grid grid-cols-3 px-5 py-3 text-ashSecondary divide-x-2 divide-gray w-full rounded-l-md">
            <div className="pr-3">
              <label htmlFor="gender" className="block mb-1">
                <IoPersonCircle className="text-[22px]" />
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="outline-none py-1.5 rounded w-full"
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="px-3">
              <label htmlFor="profession" className="block mb-1">
                <FaSuitcase className="text-[22px]" />
              </label>
              <select
                name="profession"
                id="profession"
                value={formData.profession}
                onChange={handleInputChange}
                className="outline-none py-1.5 rounded w-full"
              >
                <option value="" disabled>
                  {loading ? "Loading..." : error ? error : "Profession"}
                </option>
                {!loading &&
                  !error &&
                  professions.map((profession) => (
                    <option
                      key={profession.Profes_Pref_id}
                      value={profession.Profes_name}
                    >
                      {profession.Profes_name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="px-3">
              <label htmlFor="age" className="block mb-1">
                <IoCalendar className="text-[22px]" />
              </label>
              <select
                name="ageRange"
                id="age"
                value={formData.ageRange}
                onChange={handleInputChange}
                className="outline-none py-1.5 rounded w-full"
              >
                <option value="" disabled>
                  Age
                </option>
                <option value="18 - 21">18 - 21</option>
                <option value="22 - 25">22 - 25</option>
                <option value="26 - 30">26 - 30</option>
              </select>
            </div>
          </div>

          <div className="w-1/5">
            <button
              className="bg-primary flex justify-center items-center py-7 w-full text-lg tracking-wide text-white rounded-r-md"
              onClick={handleSearch}
              disabled={searching}
            >
              <MdOutlineSearch className="text-3xl mr-3" />
              {searching ? "Searching..." : "Find Match"}
            </button>
          </div>
        </div>

        <div className="mt-8">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {profiles.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <div
                  key={profile.profile_id}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <img
                    src={profile.profile_img}
                    alt={profile.profile_name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                  />
                  <h3 className="text-xl font-bold mt-4">
                    {profile.profile_name}
                  </h3>
                  <p className="text-gray-600 mt-1">{profile.profession}</p>
                  <p className="text-gray-600 mt-1">{profile.location}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">
                      Age: {profile.profile_age}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">
                      Height: {profile.profile_height}
                    </span>
                  </div>
                  <button
                    className="bg-primary mt-4 px-4 py-2 text-white rounded-full hover:bg-primary-dark"
                    onClick={handleViewProfileClick} // Show login popup if not logged in
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-8 text-gray-600">
              {searching ? "Searching for profiles..." : "No profiles found."}
            </p>
          )}
        </div>
      </div>

      {isLoginPopupOpen && (
        <LoginPopupModal isopen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
      )}
    </div>
  );
};

export default FindSomeone;