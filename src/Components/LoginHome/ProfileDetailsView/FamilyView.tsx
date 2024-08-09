

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface FamilyDetails {
    about_family: string;
    father_name: string;
    father_occupation: string;
    mother_name: string;
    mother_occupation: string;
    family_status: string;
    no_of_sisters: string;
    no_of_brothers: string;
    no_of_sis_married: string;
    no_of_bro_married: string;
    property_details: string;
}

export const FamilyView: React.FC = () => {
    const [familyDetails, setFamilyDetails] = useState<FamilyDetails | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<FamilyDetails>({
        about_family: '',
        father_name: '',
        father_occupation: '',
        mother_name: '',
        mother_occupation: '',
        family_status: '',
        no_of_sisters: '',
        no_of_brothers: '',
        no_of_sis_married: '',
        no_of_bro_married: '',
        property_details: ''
    });

    const { user_profile_id } = useParams<{ user_profile_id: string }>();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    useEffect(() => {
        const fetchFamilyDetails = async () => {
          try {
            const response = await axios.post('http://103.214.132.20:8000/auth/Get_profile_det_match/', {
              profile_id: 'VY240014',
              user_profile_id: id
            });
            
            // Extract family_details from the response
            const data = response.data.family_details;
            
            setFamilyDetails(data);
            setFormData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchFamilyDetails();
      }, [user_profile_id]);
      

    // const handleEditClick = () => {
    //     setIsEditing(!isEditing);
    // };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://103.214.132.20:8000/auth/Family_registration/', formData);
            console.log('Form submission response:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (!familyDetails) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-[30px] text-vysyamalaBlack font-bold mb-5">Family Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-1 grid-cols-2 gap-4">
                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">About My Family:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="about_family"
                                    value={formData.about_family}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.about_family || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Father Name:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="father_name"
                                    value={formData.father_name}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.father_name || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Father Occupation:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="father_occupation"
                                    value={formData.father_occupation}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.father_occupation || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Mother Name:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="mother_name"
                                    value={formData.mother_name}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.mother_name || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Mother Occupation:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="mother_occupation"
                                    value={formData.mother_occupation}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.mother_occupation || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Family Status:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="family_status"
                                    value={formData.family_status}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.family_status || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Sisters:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_of_sisters"
                                    value={formData.no_of_sisters}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.no_of_sisters || '-'}</span>
                            )}
                        </h5>
                    </div>

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Sisters Married:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_of_sis_married"
                                    value={formData.no_of_sis_married}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.no_of_sis_married || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Brothers:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_of_brothers"
                                    value={formData.no_of_brothers}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.no_of_brothers || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Brothers Married:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_of_bro_married"
                                    value={formData.no_of_bro_married}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.no_of_bro_married || '-'}</span>
                            )}
                        </h5>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Property Details:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="property_details"
                                    value={formData.property_details}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.property_details || '-'}</span>
                            )}
                        </h5>
                    </div>
                </div>

                {/* {isEditing && (
                    <div className="flex justify-end items-center space-x-5">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                )}

                {!isEditing && (
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>
                    </div>
                )} */}
            </form>
        </div>
    );
};