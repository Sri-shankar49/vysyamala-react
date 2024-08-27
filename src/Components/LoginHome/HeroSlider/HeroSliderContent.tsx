import React, { useState, useEffect } from "react";
import HeartMsg from "../../../assets/icons/HeartMsg.png";
import ProfileImgSlider from "../../../assets/images/ProfileImgSlider.png";
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Define interface for profile data
interface Profile {
  int_profileid: string;
  int_profile_name: string;
  int_Profile_img: string;
  int_profile_age: number;
  int_profile_notes: string;
  int_status: number;
}

// Define props interface for settings
interface HeroSliderContentProps {
  settings: object; // Accept slider settings as props
}

export const HeroSliderContent: React.FC<HeroSliderContentProps> = ({ settings }) => {
  const [profileData, setProfileData] = useState<Profile[]>([]); // Use an array to hold multiple profiles
  const [loading, setLoading] = useState(true);
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.post<{ Status: number, message: string, data: { profiles: Profile[] } }>(
          'http://103.214.132.20:8000/auth/Get_profile_intrests_list/',
          { profile_id: loginuser_profileId }
        );

        if (response.data.Status === 1 && response.data.data.profiles.length > 0) {
          setProfileData(response.data.data.profiles);
        } else {
          setProfileData([]);
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
        setProfileData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [loginuser_profileId]);


  const handleClick = (profileId: string) => {
    const url = `/profiledetails?id=${profileId}&interest=1`;
    // window.open(url, '_blank');
    window.location.href = url; // Navigate to the URL in the same tab
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Slider {...settings}>
        {profileData.length > 0 ? (
          profileData.map(profile => (
            <div>
              <div key={profile.int_profileid} className="w-9/12 mx-auto flex justify-between items-center py-36">
                {/* New Interest Received */}
                <div>
                  <div className="mb-3">
                    <img src={HeartMsg} alt="" />
                  </div>
                  <h4 className="text-4xl text-white font-semibold">
                    New Interest <br /> Received
                  </h4>
                </div>

                <div>
                  <div className="flex justify-end items-center">

                    {/* Slick Card Image */}
                    <div className="relative fade-bottom">
                      <img
                        src={profile.int_Profile_img || ProfileImgSlider}
                        alt=""
                        className="w-[250px] h-[250px] translate-x-1"
                      />

                      {/* Slick Image Fade Effect */}
                      <div className="w-full absolute bottom-0 px-2 py-3 z-10 translate-x-1">
                        <h5 className="text-white font-semibold">
                          {profile.int_profile_name} <span>({profile.int_profileid})</span>
                        </h5>
                        <div className="flex justify-between items-center">
                          <p className="text-white font-normal flex items-center">
                            {" "}
                            <IoCalendar className="mr-2" /> {profile.int_profile_age} yrs
                          </p>
                          <p className="text-white font-normal flex items-center">
                            <FaPersonArrowUpFromLine className="mr-2" /> 5ft 10in (177
                            cms)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Slick Card Content */}
                    <div className="w-96 bg-white px-10 py-[3.39em] rounded-r-lg">
                      <h5 className="text-md vysyamalaBlack font-semibold mb-5">
                        {profile.int_profile_notes}
                      </h5>

                      <div className="space-x-5">

                        <Link to="/ProfileDetails" target="_blank">
                          <button
                            onClick={() => handleClick(profile.int_profileid)}
                            className="bg-gradient text-white rounded-[6px] font-semibold px-8 py-3">
                            View Profile
                          </button>
                        </Link>

                        <button className="bg-white text-main rounded-[6px] border-2 border-main font-semibold px-8 py-2.5">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))
        )
          :
          (
            <div>
              <div className="w-9/12 mx-auto flex justify-center items-center py-36">
                <h4 className="w-fit mx-auto text-4xl text-white font-semibold">No New Interest Received</h4>
              </div>
            </div>
          )
        }
      </Slider >
    </div >
  );
};
