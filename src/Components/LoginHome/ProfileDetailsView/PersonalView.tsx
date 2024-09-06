import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Define the TypeScript interface for personal details
interface PersonalDetails {
    profile_name: string;
    gender: string;
    age: string;
    dob: string;
    place_of_birth: string;
    time_of_birth: string;
    weight: string;
    height: string;
    marital_status: string;
    blood_group: string;
    body_type: string;
    about_self: string;
    complexion: string;
    hobbies: string;
    physical_status: string;
    eye_wear: string;
    profile_created_by: string;
}

interface ApiResponse {
    personal_details: PersonalDetails;
    // other details if needed
}

export const PersonalView: React.FC = () => {
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user_profile_id } = useParams<{ user_profile_id: string }>();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");


    useEffect(() => {
        const fetchPersonalDetails = async () => {
          try {
            const response = await axios.post("http://103.214.132.20:8000/auth/Get_profile_det_match/", {
              profile_id: loginuser_profileId,
              user_profile_id: id
            });
            console.log("API Response:", response.data);
      
            // Extract personal details from the API response
            const { personal_details } = response.data as ApiResponse;
      
            setPersonalDetails(personal_details);
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
      
        fetchPersonalDetails();
      }, [id]);
      
    if (loading) return <p>Loading...</p>;
    if (error) return <p>No Data Available</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">
                Personal Details
            </h2>
            <div className="grid grid-rows-1 grid-cols-2">
                <div>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Name:
                        <span className="font-normal"> {personalDetails?.profile_name}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Gender:
                        <span className="font-normal"> {personalDetails?.gender}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Age:
                        <span className="font-normal"> {personalDetails?.age}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">DOB:
                        <span className="font-normal"> {personalDetails?.dob}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Place of Birth:
                        <span className="font-normal"> {personalDetails?.place_of_birth}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Time of Birth:
                        <span className="font-normal"> {personalDetails?.time_of_birth}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Weight:
                        <span className="font-normal"> {personalDetails?.weight}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Height:
                        <span className="font-normal"> {personalDetails?.height}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Marital Status:
                        <span className="font-normal"> {personalDetails?.marital_status}</span></h5>
                </div>

                <div>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Blood Group:
                        <span className="font-normal"> {personalDetails?.blood_group}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Body Type:
                        <span className="font-normal"> {personalDetails?.body_type}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">About Myself:
                        <span className="font-normal"> {personalDetails?.about_self}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Complexion:
                        <span className="font-normal"> {personalDetails?.complexion}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Hobbies:
                        <span className="font-normal"> {personalDetails?.hobbies}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Physical Status:
                        <span className="font-normal"> {personalDetails?.physical_status}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Eye Wear:
                        <span className="font-normal"> {personalDetails?.eye_wear}</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-2">Profile Created By:
                        <span className="font-normal"> {personalDetails?.profile_created_by}</span></h5>
                </div>
            </div>
        </div>
    );
};
