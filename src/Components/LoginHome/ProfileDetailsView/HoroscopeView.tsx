import React, { useEffect, useState } from 'react';
// import { MdModeEdit } from "react-icons/md";
import RasiGrid from '../../HoroDetails/RasiGrid';
import AmsamGrid from '../../HoroDetails/AmsamGrid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface HoroscopeDetails {
    rasi: string;
    star_name: string;
    lagnam: string;
    nallikai: string;
    didi: string;
    surya_gothram: string;
    dasa_name: string;
    dasa_balance: string;
    chevai_dosham: string;
    sarpadosham: string;
}

export const HoroscopeView: React.FC = () => {
    const [horoscopeDetails, setHoroscopeDetails] = useState<HoroscopeDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user_profile_id } = useParams<{ user_profile_id: string }>();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

    useEffect(() => {
        const fetchHoroscopeDetails = async () => {
          try {
            const response = await axios.post("http://103.214.132.20:8000/auth/Get_profile_det_match/", {
              profile_id: loginuser_profileId,
              user_profile_id:id
            });
      
            console.log("API Response:", response.data);
      
            // Adjust the response processing based on the actual API response format
            setHoroscopeDetails(response.data.horoscope_details);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error("Axios error:", error.response?.data || error.message);
              setError(`Axios error: ${error.response?.data || error.message}`);
            } else {
              console.error("Unexpected error:", error);
              setError("Unexpected error occurred");
            }
          } finally {
            setLoading(false);
          }
        };
      
        fetchHoroscopeDetails();
      }, [id]);
      

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">Horoscope Details</h2>
            
            <div className="grid grid-rows-1 grid-cols-2 gap-5">
                <div>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Tamil Year :
                        <span className="font-normal"> Srimukha</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Tamil Month :
                        <span className="font-normal"> Karthikai</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Tamil Day :
                        <span className="font-normal"> 18, Friday</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Telugu Year :
                        <span className="font-normal"> -</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Telugu Month :
                        <span className="font-normal"> -</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Telugu Day :
                        <span className="font-normal"> 22 years</span></h5>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Rasi:
                        <span className="font-normal"> {horoscopeDetails?.rasi}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Star Name:
                        <span className="font-normal"> {horoscopeDetails?.star_name}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Lagnam:
                        <span className="font-normal"> {horoscopeDetails?.lagnam}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Nallikai:
                        <span className="font-normal"> {horoscopeDetails?.nallikai}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Didi:
                        <span className="font-normal"> {horoscopeDetails?.didi}</span></h5>
                </div>

                <div>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Surya Gothram:
                        <span className="font-normal"> {horoscopeDetails?.surya_gothram}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Madhulam :
                        <span className="font-normal"> Vasthrakula</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Dasa Name:
                        <span className="font-normal"> {horoscopeDetails?.dasa_name}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Dasa Balance:
                        <span className="font-normal"> {horoscopeDetails?.dasa_balance}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Chevvai Dosham:
                        <span className="font-normal"> {horoscopeDetails?.chevai_dosham}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Sarpa Dosham:
                        <span className="font-normal"> {horoscopeDetails?.sarpadosham}</span></h5>
                </div>
            </div>
            
            <div className="space-y-10 my-10">
                <div>
                    <RasiGrid centerLabel={"Rasi"} />
                </div>
                <div>
                    <AmsamGrid centerLabel={"Amsam"} />
                </div>
            </div>
        </div>
    );
};
