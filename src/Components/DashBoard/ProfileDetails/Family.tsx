import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { MdModeEdit } from "react-icons/md";
import axios from 'axios';

export const Family = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        aboutFamily: '',
        fatherName: '',
        fatherOccupation: '',
        motherName: '',
        motherOccupation: '',
        familyStatus: '',
        sisters: '',
        sistersMarried: '',
        brothers: '',
        brothersMarried: '',
        propertyDetails: '',
        aboutself: '',
        profileid: '',
        familyname: '',
        hobbies: '',
        bloodgroup: '',
        Pysicallychanged: '',
        familytype: '',
        familyvalue: '',
        familystatus: '',
        suyagothram: '',
        unclegothram: '',
        ancestororigin: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_save_details/', {
                    profile_id: 'VY240065',
                    page_id: '3'
                });
                const data = response.data.data;
                setFormData({
                    aboutFamily: data.about_family || '',
                    fatherName: data.father_name || '',
                    fatherOccupation: data.father_occupation || '',
                    motherName: data.mother_name || '',
                    motherOccupation: data.mother_occupation || '',
                    familyStatus: data.family_status || '',
                    sisters: data.no_of_sister || '',
                    sistersMarried: data.no_of_sis_married || '',
                    brothers: data.no_of_brother || '',
                    brothersMarried: data.no_of_bro_married || '',
                    propertyDetails: data.property_details || '',
                    aboutself: data.about_self || '',
                    profileid: data.profile_id || '',
                    familyname: data.family_name || '',
                    hobbies: data.hobbies || '',
                    bloodgroup: data.blood_group || '',
                    Pysicallychanged: data.Pysically_changed || '',
                    familytype: data.family_type || '',
                    familyvalue: data.family_value || '',
                    familystatus: data.family_status || '',
                    suyagothram: data.suya_gothram || '',
                    unclegothram: data.uncle_gothram || '',
                    ancestororigin: data.ancestor_origin || '',
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            profile_id: "VY240065",
            father_name: formData.fatherName,
            father_occupation: formData.fatherOccupation,
            mother_name: formData.motherName,
            mother_occupation: formData.motherOccupation,
            family_name: formData.familyname,
            about_self: formData.aboutself,
            hobbies: formData.hobbies,
            blood_group: formData.bloodgroup,
            Pysically_changed: formData.Pysicallychanged,
            no_of_brother: formData.brothers,
            no_of_sister: formData.sisters,
            no_of_bro_married: formData.brothersMarried,
            no_of_sis_married: formData.sistersMarried,
            family_type: formData.familytype,
            family_value: formData.familyvalue,
            family_status: formData.familystatus,
            property_details: formData.propertyDetails,
            suyagothram: formData.suyagothram,
            unclegothram: formData.unclegothram,
            ancestororigin: formData.ancestororigin
        };
        try {
            const response = await axios.post('http://103.214.132.20:8000/auth/Family_registration/', payload);
            console.log('Form submission response:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">Family Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" onClick={handleEditClick} />
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-1 grid-cols-2 gap-4">
                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">About My Family:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="aboutFamily"
                                    value={formData.aboutFamily}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.aboutFamily || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Father Name:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.fatherName}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Father Occupation:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="fatherOccupation"
                                    value={formData.fatherOccupation}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.fatherOccupation || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Mother Name:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="motherName"
                                    value={formData.motherName}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.motherName}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Mother Occupation:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="motherOccupation"
                                    value={formData.motherOccupation}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.motherOccupation}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Family Status:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="familyStatus"
                                    value={formData.familyStatus}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.familyStatus}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Sisters:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="sisters"
                                    value={formData.sisters}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.sisters}</span>
                            )}
                        </h5>
                    </div>

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Sisters Married:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="sistersMarried"
                                    value={formData.sistersMarried}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.sistersMarried}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Brothers:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="brothers"
                                    value={formData.brothers}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.brothers}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Brothers Married:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="brothersMarried"
                                    value={formData.brothersMarried}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.brothersMarried}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Property Details:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="propertyDetails"
                                    value={formData.propertyDetails}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.propertyDetails || '-'}</span>
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
