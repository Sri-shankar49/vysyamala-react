
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { MdModeEdit } from "react-icons/md";
import axios from 'axios';

export const Contact = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [contactData, setContactData] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        phone: '',
        mobile: '',
        whatsapp: '',
        email: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_save_details/', {
                    profile_id: 'VY240065',
                    page_id: '1'
                });
                const data = response.data.data;
                setContactData({
                    address: data.Profile_address || '',
                    city: data.Profile_city || '',
                    state: data.Profile_state || '',
                    country: data.Profile_country || '',
                    pincode: data.Profile_pincode || '',
                    phone: data.Profile_mobile_no || '',
                    mobile: data.Profile_mobile_no || '',
                    whatsapp: data.Profile_whatsapp || '',
                    email: data.Profile_alternate_mobile || '' // Assuming this is the email field; adjust if necessary
                });
            } catch (error) {
                console.error('Error fetching contact data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactData({
            ...contactData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            profile_id: "VY240065",
            Profile_address: contactData.address,
            Profile_city: contactData.city,
            Profile_state: contactData.state,
            Profile_country: contactData.country,
            Profile_pincode: contactData.pincode,
            Profile_mobile_no: contactData.mobile,
            Profile_whatsapp: contactData.whatsapp,
            Profile_alternate_mobile: contactData.email
        };
        try {
            const response = await axios.post('http://103.214.132.20:8000/auth/Contact_registration/', payload);
            console.log('Contact details update response:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating contact details:', error);
        }
    };

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">
                Contact Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" onClick={handleEditClick} />
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-1 grid-cols-2 gap-4">
                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Address:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={contactData.address}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.address || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">City:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="city"
                                    value={contactData.city}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.city || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">State:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="state"
                                    value={contactData.state}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.state || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Country:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="country"
                                    value={contactData.country}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.country || '-'}</span>
                            )}
                        </h5>
                        
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Pincode:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="pincode"
                                    value={contactData.pincode}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.pincode || '-'}</span>
                            )}
                        </h5>
                    </div>

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Phone:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={contactData.phone}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.phone || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Mobile:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="mobile"
                                    value={contactData.mobile}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.mobile || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">WhatsApp:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="whatsapp"
                                    value={contactData.whatsapp}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.whatsapp || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Email:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="email"
                                    value={contactData.email}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {contactData.email || '-'}</span>
                            )}
                        </h5>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end items-center space-x-5">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer"
                        >
                            Update Changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};
