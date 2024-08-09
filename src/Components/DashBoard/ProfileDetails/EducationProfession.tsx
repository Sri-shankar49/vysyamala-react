import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";

export const EducationProfession = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({
        highestEducation: '',
        ugDegree: '',
        aboutEdu: '',
        profession: '',
        annualIncome: '',
        actualIncome: '',
        workCountry: '',
        workState: '',
        workPincode: '',
        careerPlans: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_save_details/', {
                    page_id: '4',
                    profile_id: 'VY240065'
                });
                const fetchedData = response.data.data;
                setData({
                    highestEducation: fetchedData.highest_education || '',
                    ugDegree: fetchedData.ug_degree || '',
                    aboutEdu: fetchedData.about_edu || '',
                    profession: fetchedData.profession || '',
                    annualIncome: fetchedData.anual_income || '',
                    actualIncome: fetchedData.actual_income || '',
                    workCountry: fetchedData.work_country || '',
                    workState: fetchedData.work_state || '',
                    workPincode: fetchedData.work_pincode || '',
                    careerPlans: fetchedData.career_plans || ''
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the payload
        const payload = {
            profile_id: 'VY240065',
            highest_education: data.highestEducation,
            about_edu: data.aboutEdu,
            profession: data.profession,
            anual_income: data.annualIncome,
            actual_income: data.actualIncome,
            work_country: data.workCountry,
            work_state: data.workState,
            work_pincode: data.workPincode,
            status: '4' // Assuming status is static or can be dynamically set
        };

        try {
            // Make the API request
            const response = await axios.post('http://103.214.132.20:8000/auth/Education_registration/', payload);
            console.log('Form submission response:', response.data);

            // Update the state to reflect that editing has finished
            setIsEditing(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">Education & Profession Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" onClick={handleEditClick} />
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-1 grid-cols-2">
                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Education Level :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="highestEducation"
                                    value={data.highestEducation}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.highestEducation || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Education Details :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="ugDegree"
                                    value={data.ugDegree}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.ugDegree || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">About Education :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="aboutEdu"
                                    value={data.aboutEdu}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.aboutEdu || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Profession :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="profession"
                                    value={data.profession}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.profession || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Annual Income :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="annualIncome"
                                    value={data.annualIncome}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.annualIncome || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Gross Annual Income :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="actualIncome"
                                    value={data.actualIncome}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.actualIncome || '-'}</span>
                            )}
                        </h5>
                    </div>

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Work Country :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="workCountry"
                                    value={data.workCountry}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.workCountry || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Work State :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="workState"
                                    value={data.workState}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.workState || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Work Pincode :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="workPincode"
                                    value={data.workPincode}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.workPincode || '-'}</span>
                            )}
                        </h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Career Plans :
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="careerPlans"
                                    value={data.careerPlans}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {data.careerPlans || '-'}</span>
                            )}
                        </h5>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end items-center space-x-5">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="text-main flex items-center rounded-lg px-3 py-2 border border-main"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-main text-white flex items-center rounded-lg px-3 py-2"
                        >
                            Save
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};
