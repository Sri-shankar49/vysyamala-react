/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the interface for family details
interface FamilyDetails {
    personal_about_fam: string;
    personal_father_name: string;
    personal_father_occu_id: number;
    personal_father_occu_name: string;
    personal_mother_name: string;
    personal_mother_occu_name: string;
    persoanl_fam_sta_id: string;
    personal_fam_sta_name: string;
    personal_sis: string;
    personal_sis_married: string;
    personal_bro: string;
    personal_bro_married: string;
    personal_prope_det: string;
}

interface FamilyStatus {
    family_status_id: number;
    family_status_name: string;
}


interface Occupation {
    occupation_id: number;
    occupation_description: string;
}


interface Occupation1 {
    occupation_id: number;
    occupation_description: string;
}


export const Family = () => {
    const [familyDetails, setFamilyDetails] = useState<FamilyDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<FamilyDetails>>({});
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');
    const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
    const [selectedFamilyStatusId, setSelectedFamilyStatusId] = useState<number | string>('');
    const [occupations, setOccupations] = useState<Occupation[]>([]);
    const [selectedOccupationId, setSelectedOccupationId] = useState<number | string>('');
    const [occupations1, setOccupations1] = useState<Occupation1[]>([]);
    const [selectedOccupationId1, setSelectedOccupationId1] = useState<number | string>('');

    useEffect(() => {
        const fetchFamilyDetails = async () => {
            try {
                const response = await axios.post("http://103.214.132.20:8000/auth/get_myprofile_family/", {
                    profile_id: loginuser_profileId // replace with the actual profile_id if needed
                });
                const data = response.data.data;
                setFamilyDetails(response.data.data);

                const matchedFamilyStatus = familyStatuses.find(status =>
                    status.family_status_name.includes(data.personal_fam_sta_name)
                );
                if (matchedFamilyStatus) {
                    setSelectedFamilyStatusId(matchedFamilyStatus.family_status_id);
                }

                const matchedFatherOcc = occupations.find(occupation =>
                    occupation.occupation_description.includes(data.personal_father_occu_name)
                );
                if (matchedFatherOcc) {
                    setSelectedOccupationId(matchedFatherOcc.occupation_id);
                }


                const matchedMotherOcc = occupations1.find(occupation =>
                    occupation.occupation_description.includes(data.personal_mother_occu_name)
                );
                if (matchedMotherOcc) {
                    setSelectedOccupationId1(matchedMotherOcc.occupation_id);
                }

            } catch (error) {
                console.error("Error fetching family details:", error);
            }
        };

        fetchFamilyDetails();
    }, [familyStatuses]);


    useEffect(() => {
        const fetchFamilyStatuses = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_FamilyStatus/');
                const familyStatusData = Object.values(response.data) as FamilyStatus[];
                setFamilyStatuses(familyStatusData);
            } catch (error) {
                console.error('Error fetching family statuses:', error);
            }
        };
        const fetchOccupations = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_Parent_Occupation/');
                const occupationData = Object.values(response.data) as Occupation[];
                setOccupations(occupationData);
            } catch (error) {
                console.error('Error fetching occupations:', error);
            }
        };
        const fetchOccupations1 = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_Parent_Occupation/');
                const occupationData = Object.values(response.data) as Occupation[];
                setOccupations1(occupationData);
            } catch (error) {
                console.error('Error fetching occupations:', error);
            }
        };
        fetchOccupations1();
        fetchOccupations();
        fetchFamilyStatuses();
    }, []);



    const handleFamilyStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setSelectedFamilyStatusId(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            persoanl_fam_sta_name: e.target.value
        }));
    };


    const handleOccupationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setSelectedOccupationId(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            persoanl_father_occu: e.target.value
        }));
    };



    const handleMotherOccupationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setSelectedOccupationId1(e.target.value)
        setFormData(prevState => ({
            ...prevState,
            personal_mother_occu_name: e.target.value
        }));
    };

    // const handleEditClick = () => {
    //     if (familyDetails) {
    //         setFormData(familyDetails);
    //     }
    //     setIsEditing(true);
    // };

    const handleEditClick = () => {
        if (isEditing) {
            // Reset form data to an empty object if exiting edit mode
            setFormData({});
        } else {
            if (familyDetails) {
                setFormData(familyDetails);
            }
        }
        setIsEditing(!isEditing); // Toggle editing state
    };

    const navigate = useNavigate(); // Initialize navigate
    const handleEditClick1 = () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            navigate(-1); // Navigate back to the previous page
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(selectedOccupationId, 'mothocc')
        try {
            const response = await axios.post("http://103.214.132.20:8000/auth/update_myprofile_family/", {
                profile_id: loginuser_profileId,
                father_name: formData.personal_father_name,
                father_occupation: selectedOccupationId,
                mother_name: formData.personal_mother_name,
                mother_occupation: selectedOccupationId1,
                family_status: selectedFamilyStatusId,
                no_of_sister: formData.personal_sis,
                no_of_sis_married: formData.personal_sis_married,
                no_of_brother: formData.personal_bro,
                no_of_bro_married: formData.personal_bro_married,
                property_details: formData.personal_prope_det,
                about_family: formData.personal_about_fam,
            });
            if (response.data.status === "success") {
                alert(response.data.message);
                window.location.reload(); // Reload the page
                setFamilyDetails(prevState => ({
                    ...prevState!,
                    ...formData
                }));
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating family details:", error);
        }
    };

    if (!familyDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">
                Family Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" onClick={handleEditClick} />
            </h2>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-rows-1 grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                About My Family:
                                <input
                                    name="personal_about_fam"
                                    value={formData.personal_about_fam || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Father Name:
                                <input
                                    type="text"
                                    name="personal_father_name"
                                    value={formData.personal_father_name || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Father Occupation:
                                <select
                                    name="personal_father_occu_id"
                                    value={selectedOccupationId}
                                    onChange={handleOccupationChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Occupation</option>
                                    {occupations.map(occupation => (
                                        <option key={occupation.occupation_id} value={occupation.occupation_id}>
                                            {occupation.occupation_description}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Mother Name:
                                <input
                                    type="text"
                                    name="personal_mother_name"
                                    value={formData.personal_mother_name || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Mother Occupation:
                                <select
                                    name="personal_mother_occu_id"
                                    value={selectedOccupationId1}
                                    onChange={handleMotherOccupationChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Occupation</option>
                                    {occupations1.map(occupation => (
                                        <option key={occupation.occupation_id} value={occupation.occupation_id}>
                                            {occupation.occupation_description}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Family Status:
                                <select
                                    name="persoanl_fam_sta_id"
                                    value={selectedFamilyStatusId}
                                    onChange={handleFamilyStatusChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Family Status</option>
                                    {familyStatuses.map(status => (
                                        <option key={status.family_status_id} value={status.family_status_id}>
                                            {status.family_status_name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Sisters:
                                <input
                                    type="text"
                                    name="personal_sis"
                                    value={formData.personal_sis || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Sisters Married:
                                <input
                                    type="text"
                                    name="personal_sis_married"
                                    value={formData.personal_sis_married || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Brothers:
                                <input
                                    type="text"
                                    name="personal_bro"
                                    value={formData.personal_bro || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Brothers Married:
                                <input
                                    type="text"
                                    name="personal_bro_married"
                                    value={formData.personal_bro_married || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Property Details:
                                <input
                                    name="personal_prope_det"
                                    value={formData.personal_prope_det || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                        </div>
                    </div>
                    {isEditing && (
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
                    )}
                </form>

            ) : (
                <div>
                    <div className="grid grid-rows-1 grid-cols-2 gap-4">
                        <div>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">About My Family:
                                <span className="font-normal"> {familyDetails.personal_about_fam}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Father Name:
                                <span className="font-normal"> {familyDetails.personal_father_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Father Occupation:
                                <span className="font-normal"> {familyDetails.personal_father_occu_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Mother Name:
                                <span className="font-normal"> {familyDetails.personal_mother_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Mother Occupation:
                                <span className="font-normal"> {familyDetails.personal_mother_occu_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Family Status:
                                <span className="font-normal"> {familyDetails.personal_fam_sta_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Sisters:
                                <span className="font-normal"> {familyDetails.personal_sis}</span>
                            </h5>
                        </div>
                        <div>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">Sisters Married:
                                <span className="font-normal"> {familyDetails.personal_sis_married}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Brothers:
                                <span className="font-normal"> {familyDetails.personal_bro}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Brothers Married:
                                <span className="font-normal"> {familyDetails.personal_bro_married}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Property Details:
                                <span className="font-normal"> {familyDetails.personal_prope_det}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
