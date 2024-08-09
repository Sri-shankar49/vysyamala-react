import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


interface ContactDetails {
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    mobile: string;
    whatsapp: string;
    email: string;
}

export const ContactView: React.FC = () => {
    const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user_profile_id } = useParams<{ user_profile_id: string }>();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        const fetchContactDetails = async () => {
          try {
            const response = await axios.post("http://103.214.132.20:8000/auth/Get_profile_det_match/", {
              profile_id: "VY240014",
              user_profile_id:id
            });
      
            console.log("API Response:", response.data);
      
            // Accessing the contact_details property in the response data
            if (response.data && response.data.contact_details) {
              setContactDetails(response.data.contact_details);
            } else {
              setError("Contact details not found in the response");
            }
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
      
        fetchContactDetails();
      }, [user_profile_id]);
      
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!contactDetails) return <p>No contact details available</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">
                Contact Details
            </h2>
            <div className="grid grid-rows-1 grid-cols-2 gap-4">
                <div>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Address:
                        <span className="font-normal"> {contactDetails.address}</span></h5>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">City:
                        <span className="font-normal"> {contactDetails.city}</span></h5>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">State:
                        <span className="font-normal"> {contactDetails.state}</span></h5>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Country:
                        <span className="font-normal"> {contactDetails.country}</span></h5>
                </div>
                <div>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Phone:
                        <span className="font-normal"> {contactDetails.phone}</span></h5>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Mobile:
                        <span className="font-normal"> {contactDetails.mobile}</span></h5>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">WhatsApp:
                        <span className="font-normal"> {contactDetails.whatsapp}</span></h5>
                    <h5 className="text-[20px] text-ash font-semibold mb-2">Email:
                        <span className="font-normal"> {contactDetails.email}</span></h5>
                </div>
            </div>
        </div>
    );
};
