import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface ContactDetails {
    personal_prof_addr: string;
    personal_prof_city: string;
    personal_prof_stat_id: number;
    personal_prof_stat_name: string;
    personal_prof_count_id: number;
    personal_prof_count_name: string;
    personal_prof_pin: number;
    personal_prof_phone: number;
    personal_prof_mob_no: number;
    personal_prof_whats: number;
    personal_email: string;
}

interface Country {
    country_id: number;
    country_name: string;
}

interface State {
    state_id: number;
    state_name: string;
}

interface City {
    city_id: number;
    city_name: string;
}

export const Contact = () => {
    const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<ContactDetails>>({});
    const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountryId, setSelectedCountryId] = useState<number | string>("");
    const [states, setStates] = useState<State[]>([]);
    const [selectedStateId, setSelectedStateId] = useState<number | string>("");
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCityId, setSelectedCityId] = useState<number | string>("");
    const [refreshData, setRefreshData] = useState(false);
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const response = await axios.post("http://103.214.132.20:8000/auth/get_myprofile_contact/", {
                    profile_id: loginuser_profileId,
                });
                const data = response.data.data;
                setContactDetails(data);
                setSelectedCountryId(data.personal_prof_count_id);
                setSelectedStateId(data.personal_prof_stat_id);
                // setSelectedCityId(data.personal_prof_city);
            } catch (error) {
                console.error("Error fetching contact details:", error);
            }
        };

        fetchContactDetails();
    }, [loginuser_profileId, refreshData]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.post("http://103.214.132.20:8000/auth/Get_Country/");
                setCountries(Object.values(response.data) as Country[]);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, [refreshData]);

    useEffect(() => {
        if (!selectedCountryId) return;

        const fetchStates = async () => {
            try {
                const response = await axios.post("http://103.214.132.20:8000/auth/Get_State/", {
                    country_id: selectedCountryId.toString(),
                });
                setStates(Object.values(response.data) as State[]);
                // setSelectedStateId(""); // Reset state selection
                // setSelectedCityId(""); // Reset city selection
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        fetchStates();
    }, [selectedCountryId, refreshData]);

    useEffect(() => {
        if (!selectedStateId) return;

        const fetchCities = async () => {
            try {
                const response = await axios.post("http://103.214.132.20:8000/auth/Get_City/", {
                    state_id: selectedStateId.toString(),
                });
                setCities(Object.values(response.data) as City[]);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, [selectedStateId, refreshData]);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedCountryId(selectedId);
        setFormData((prevState) => ({
            ...prevState,
            personal_prof_count_name: event.target.options[event.target.selectedIndex].text,
        }));
    };

    // const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedId = event.target.value;
    //     setSelectedStateId(selectedId);
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         personal_prof_stat_name: event.target.options[event.target.selectedIndex].text,
    //     }));
    // };


    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedStateId(selectedId);
        setFormData((prevState) => ({
            ...prevState,
            personal_prof_stat_name: event.target.options[event.target.selectedIndex].text,
        }));
    };
    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedCityId(selectedId);
        setFormData((prevState) => ({
            ...prevState,
            personal_prof_city: event.target.options[event.target.selectedIndex].text,
        }));
    };

    const handleEditClick = () => {
        if (isEditing) {
            setFormData({});
        } else {
            if (contactDetails) {
                setFormData(contactDetails);
            }
        }
        setIsEditing(!isEditing);
    };

    const navigate = useNavigate();
    const handleEditClick1 = () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            navigate(-1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Validate email
        if (name === "personal_email") {
            
            const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!emailPattern.test(value)) {
                setEmailError('Invalid email address');
            } else {
                setEmailError('');
            }
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();


        
    //     console.log("Data being sent:", {
    //         profile_id: loginuser_profileId,
    //         Profile_address: formData.personal_prof_addr,
    //         Profile_city: formData.personal_prof_city,
    //         Profile_state: selectedStateId,
    //         Profile_country: selectedCountryId,
    //         Profile_pincode: formData.personal_prof_pin,
    //         Profile_alternate_mobile: formData.personal_prof_phone,
    //         Profile_mobile_no: formData.personal_prof_mob_no,
    //         Profile_whatsapp: formData.personal_prof_whats,
    //         EmailId: formData.personal_email,
    //     });

    //     try {
    //         const response = await axios.post("http://103.214.132.20:8000/auth/update_myprofile_contact/", {
    //             profile_id: loginuser_profileId,
    //             Profile_address: formData.personal_prof_addr,
    //             Profile_city: selectedCityId,
    //             Profile_state: selectedStateId,
    //             Profile_country: selectedCountryId,
    //             Profile_pincode: formData.personal_prof_pin,
    //             Profile_alternate_mobile: formData.personal_prof_phone,
    //             Profile_mobile_no: formData.personal_prof_mob_no,
    //             Profile_whatsapp: formData.personal_prof_whats,
    //             EmailId: formData.personal_email,
    //         });

    //         if (response.data.status === "success") {
    //             toast.success(response.data.message);
    //             setRefreshData(prev => !prev); // Trigger re-fetch of data
    //             // window.location.reload();

    //             const getResponse = await axios.post("http://103.214.132.20:8000/auth/get_myprofile_contact/", {
    //                 profile_id: loginuser_profileId,
    //             });

    //             const updatedDetails = getResponse.data.data;
    //             setContactDetails(updatedDetails);
    //             setIsEditing(false);
    //         }
    //     } catch (error) {
    //         console.error("Error updating contact details:", error);
    //         toast.error("Failed to update contact details. Please try again.");
    //     }
    // };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Form validation
        if (!formData.personal_prof_addr || 
            !selectedCountryId || 
            !selectedStateId || 
            !selectedCityId || 
            !formData.personal_prof_pin || 
            !formData.personal_prof_phone || 
            !formData.personal_prof_mob_no || 
            !formData.personal_prof_whats || 
            !formData.personal_email || 
            emailError) {
            toast.error("Please fill all fields correctly.");
            return;
        }
    
        // Print data to be sent
        console.log("Data being sent:", {
            profile_id: loginuser_profileId,
            Profile_address: formData.personal_prof_addr,
            Profile_city: selectedCityId,
            Profile_state: selectedStateId,
            Profile_country: selectedCountryId,
            Profile_pincode: formData.personal_prof_pin,
            Profile_alternate_mobile: formData.personal_prof_phone,
            Profile_mobile_no: formData.personal_prof_mob_no,
            Profile_whatsapp: formData.personal_prof_whats,
            EmailId: formData.personal_email,
        });
    
        try {
            const response = await axios.post("http://103.214.132.20:8000/auth/update_myprofile_contact/", {
                profile_id: loginuser_profileId,
                Profile_address: formData.personal_prof_addr,
                Profile_city: selectedCityId,
                Profile_state: selectedStateId,
                Profile_country: selectedCountryId,
                Profile_pincode: formData.personal_prof_pin,
                Profile_alternate_mobile: formData.personal_prof_phone,
                Profile_mobile_no: formData.personal_prof_mob_no,
                Profile_whatsapp: formData.personal_prof_whats,
                EmailId: formData.personal_email,
            });
    
            if (response.data.status === "success") {
                toast.success(response.data.message);
                setRefreshData(prev => !prev); // Trigger re-fetch of data
    
                const getResponse = await axios.post("http://103.214.132.20:8000/auth/get_myprofile_contact/", {
                    profile_id: loginuser_profileId,
                });
    
                const updatedDetails = getResponse.data.data;
                setContactDetails(updatedDetails);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating contact details:", error);
            toast.error("Failed to update contact details. Please try again.");
        }
    };

    if (!contactDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-lg:text-[28px] max-md:text-[26px] max-sm:text-[22px]">
                Contact Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" onClick={handleEditClick} />
            </h2>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-rows-1 grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
                        <div>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Address:
                                <input
                                    type="text"
                                    name="personal_prof_addr"
                                    value={formData.personal_prof_addr || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Country:
                                <select
                                    name="personal_profile_country"
                                    value={selectedCountryId}
                                    onChange={handleCountryChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.country_id} value={country.country_id}>
                                            {country.country_name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                State:
                                <select
                                    name="personal_prof_state"
                                    value={selectedStateId}
                                    onChange={handleStateChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state.state_id} value={state.state_id}>
                                            {state.state_name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                City:
                                <select
                                    name="personal_prof_city"
                                    value={selectedCityId}
                                    onChange={handleCityChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.city_id} value={city.city_id}>
                                            {city.city_name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Pincode:
                                <input
                                    type="text"
                                    name="personal_prof_pin"
                                    value={formData.personal_prof_pin || ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                          // Allow only numeric values
                                           if (/^\d{0,6}$/.test(value)) {
                                          handleInputChange(e); // Call your input change handler
                                        }
                                      }}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Phone:
                                <input
                                    type="text"
                                    name="personal_prof_phone"
                                    value={formData.personal_prof_phone || ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                          // Allow only numeric values
                                           if (/^\d{0,10}$/.test(value)) {
                                          handleInputChange(e); // Call your input change handler
                                        }
                                      }}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Mobile:
                                <input
                                    type="text"
                                    name="personal_prof_mob_no"
                                    value={formData.personal_prof_mob_no || ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                          // Allow only numeric values
                                           if (/^\d{0,10}$/.test(value)) {
                                          handleInputChange(e); // Call your input change handler
                                        }
                                      }}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                WhatsApp:
                                <input
                                    type="text"
                                    name="personal_prof_whats"
                                    value={formData.personal_prof_whats || ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                          // Allow only numeric values
                                           if (/^\d{0,10}$/.test(value)) {
                                          handleInputChange(e); // Call your input change handler
                                        }
                                      }}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
    Email:
    <input
        type="email"
        name="personal_email"
        value={formData.personal_email || ""}
        onChange={handleInputChange}
      
        className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
    />
</label>
{emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}

                        </div>
                    </div>

                    <div className="flex justify-end items-center space-x-5">
                        <button
                            type="button"
                            onClick={handleEditClick1}
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
                </form>
            ) : (
                <div>
                    <div className="grid grid-rows-1 grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
                        <div>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                Address:
                                <span className="font-normal"> {contactDetails.personal_prof_addr}</span>
                            </h5>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                Country:
                                <span className="font-normal"> {contactDetails.personal_prof_count_name}</span>
                            </h5>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                State:
                                <span className="font-normal"> {contactDetails.personal_prof_stat_name}</span>
                            </h5>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                City:
                                <span className="font-normal"> {contactDetails.personal_prof_city}</span>
                            </h5>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                Pincode:
                                <span className="font-normal"> {contactDetails.personal_prof_pin}</span>
                            </h5>
                        </div>

                        <div>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                Phone:
                                <span className="font-normal"> {contactDetails.personal_prof_phone}</span>
                            </h5>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                Mobile:
                                <span className="font-normal"> {contactDetails.personal_prof_mob_no}</span>
                            </h5>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                WhatsApp:
                                <span className="font-normal"> {contactDetails.personal_prof_whats}</span>
                            </h5>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                Email:
                                <span className="font-normal"> {contactDetails.personal_email}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
