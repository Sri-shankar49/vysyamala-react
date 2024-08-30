import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the interface for education and profession details
interface EducationProfessionDetails {
    personal_edu_id: number;
    personal_edu_name: string;
    personal_edu_details: string | null;
    personal_about_edu: string;
    personal_profession: string;
    personal_ann_inc_id: number;
    personal_ann_inc_name: string;
    personal_gross_ann_inc: string;
    personal_work_coun_id: number;
    personal_work_coun_name: string;
    personal_work_sta_id: number;
    personal_work_sta_name: string;
    personal_work_pin: string;
    personal_career_plans: string;
}

interface AnnualIncome {
    income_id: number;
    income_description: string;
}

interface Education {
    education_id: number;
    education_description: string;
}

interface Country {
    country_id: number;
    country_name: string;
}

interface State {
    state_id: number;
    state_name: string;
}

export const EducationProfession = () => {
    const [educationProfessionDetails, setEducationProfessionDetails] = useState<EducationProfessionDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<EducationProfessionDetails>>({});
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');
    const [annualIncomes, setAnnualIncomes] = useState<AnnualIncome[]>([]);
    const [selectedIncomeId, setSelectedIncomeId] = useState<number | string>('');
    const [educations, setEducations] = useState<Education[]>([]);
    const [selectedEducationId, setSelectedEducationId] = useState<number | string>('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedWorkCountryId, setSelectedWorkCountryId] = useState<number | string>('');
    const [states, setStates] = useState<State[]>([]);
    const [selectedWorkStateId, setSelectedWorkStateId] = useState<number | string>('');

    useEffect(() => {
        const fetchEducationProfessionDetails = async () => {
            try {
                const response = await axios.post("http://103.214.132.20:8000/auth/get_myprofile_education/", {
                    profile_id: loginuser_profileId
                });

                const data = response.data.data;
                setEducationProfessionDetails(response.data.data);

                const matchedIncome = annualIncomes.find(income => income.income_description.includes(data.personal_ann_inc_name));
                if (matchedIncome) {
                    setSelectedIncomeId(matchedIncome.income_id);
                }

                const matchedHighestEducation = educations.find(education => education.education_description.includes(data.personal_edu_name));
                if (matchedHighestEducation) {
                    setSelectedEducationId(matchedHighestEducation.education_id);
                }

                setSelectedWorkCountryId(data.personal_work_coun_id);
                setSelectedWorkStateId(data.personal_work_sta_id);

            } catch (error) {
                console.error("Error fetching education and profession details:", error);
            }
        };

        fetchEducationProfessionDetails();
    }, [loginuser_profileId, annualIncomes, educations]);

    useEffect(() => {
        const fetchAnnualIncomes = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_Annual_Income/');
                const incomeData = Object.values(response.data) as AnnualIncome[];
                setAnnualIncomes(incomeData);
            } catch (error) {
                console.error('Error fetching annual incomes:', error);
            }
        };

        const fetchEducations = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_Highest_Education/');
                const educationData = Object.values(response.data) as Education[];
                setEducations(educationData);
            } catch (error) {
                console.error('Error fetching education levels:', error);
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_Country/');
                const countriesData = Object.values(response.data) as Country[];
                setCountries(countriesData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
        fetchEducations();
        fetchAnnualIncomes();
    }, [loginuser_profileId]);

    useEffect(() => {
        const fetchStates = async () => {
            if (!selectedWorkCountryId) return;

            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_State/', {
                    country_id: selectedWorkCountryId.toString(),
                });
                const statesData = Object.values(response.data) as State[];
                setStates(statesData);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchStates();
    }, [selectedWorkCountryId]);

    const handleIncomeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIncomeId(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            personal_ann_inc_name: e.target.value
        }));
    };

    const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEducationId(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            personal_edu_name: e.target.value
        }));
    };

    const handleWorkCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedWorkCountryId(selectedId);
        setFormData(prevState => ({
            ...prevState,
            personal_work_coun_name: event.target.options[event.target.selectedIndex].text
        }));
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWorkStateId(e.target.value);
        setFormData(prevState => ({
            ...prevState,
            personal_work_sta_name: e.target.options[e.target.selectedIndex].text
        }));
    };

    // const handleEditClick = () => {
    //     if (educationProfessionDetails) {
    //         setFormData(educationProfessionDetails);
    //     }
    //     setIsEditing(true);
    // };

    const handleEditClick = () => {
        if (isEditing) {
            // Reset form data to an empty object if exiting edit mode
            setFormData({});
        } else {
            if (educationProfessionDetails) {
                setFormData(educationProfessionDetails);
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
        try {
            const response = await axios.post("http://103.214.132.20:8000/auth/update_myprofile_education/", {
                profile_id: loginuser_profileId,
                education_level: selectedEducationId,
                education_details: formData.personal_edu_details,
                about_edu: formData.personal_about_edu,
                profession: formData.personal_profession,
                annual_income: selectedIncomeId,
                actual_income: formData.personal_gross_ann_inc,
                work_country: selectedWorkCountryId,
                work_state: selectedWorkStateId,
                work_pincode: formData.personal_work_pin,
                career_plans: formData.personal_career_plans,
            });
            if (response.data.status === "success") {
                alert(response.data.message);
                window.location.reload(); // Reload the page
                setEducationProfessionDetails(prevState => ({
                    ...prevState!,
                    ...formData
                }));
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating education and profession details:", error);
        }
    };

    if (!educationProfessionDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">
                Education & Profession Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" onClick={handleEditClick} />
            </h2>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Education Level:
                                <select
                                    name="personal_edu_name"
                                    value={selectedEducationId ?? ""}
                                    onChange={handleEducationChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Education Level</option>
                                    {educations.map(education => (
                                        <option key={education.education_id} value={education.education_id}>
                                            {education.education_description}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Education Details:
                                <input
                                    type="text"
                                    name="personal_edu_details"
                                    value={formData.personal_edu_details || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                About Education:
                                <input
                                    name="personal_about_edu"
                                    value={formData.personal_about_edu || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Profession:
                                <input
                                    type="text"
                                    name="personal_profession"
                                    value={formData.personal_profession || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Annual Income:
                                <select
                                    name="personal_ann_inc_name"
                                    value={selectedIncomeId ?? ""}
                                    onChange={handleIncomeChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Annual Income</option>
                                    {annualIncomes.map(income => (
                                        <option key={income.income_id} value={income.income_id}>
                                            {income.income_description}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Gross Annual Income:
                                <input
                                    type="text"
                                    name="personal_gross_ann_inc"
                                    value={formData.personal_gross_ann_inc || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Work Country:
                                <select
                                    name="workCountryId"
                                    value={selectedWorkCountryId}
                                    onChange={handleWorkCountryChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Work Country</option>
                                    {countries.map(country => (
                                        <option key={country.country_id} value={country.country_id}>
                                            {country.country_name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Work State:
                                <select
                                    name="workStateId"
                                    value={selectedWorkStateId}
                                    onChange={handleStateChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Work State</option>
                                    {states.map(state => (
                                        <option key={state.state_id} value={state.state_id}>
                                            {state.state_name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Work Pincode:
                                <input
                                    type="text"
                                    name="personal_work_pin"
                                    value={formData.personal_work_pin || ""}
                                    onChange={handleInputChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            </label>
                            <label className="block mb-2 text-[20px] text-ash font-semibold">
                                Career Plans:
                                <input
                                    name="personal_career_plans"
                                    value={formData.personal_career_plans || ""}
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
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">Education Level:
                                <span className="font-normal">{educationProfessionDetails.personal_edu_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Education Details:
                                <span className="font-normal">{educationProfessionDetails.personal_edu_details}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">About Education:
                                <span className="font-normal">{educationProfessionDetails.personal_about_edu}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Profession:
                                <span className="font-normal">{educationProfessionDetails.personal_profession}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Annual Income:
                                <span className="font-normal">{educationProfessionDetails.personal_ann_inc_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Gross Annual Income:
                                <span className="font-normal">{educationProfessionDetails.personal_gross_ann_inc}</span>
                            </h5>
                        </div>

                        <div>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">Work Country:
                                <span className="font-normal">{educationProfessionDetails.personal_work_coun_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Work State:
                                <span className="font-normal">{educationProfessionDetails.personal_work_sta_name}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Work Pincode:
                                <span className="font-normal">{educationProfessionDetails.personal_work_pin}</span>
                            </h5>

                            <h5 className="text-[20px] text-ash font-semibold mb-2">Career Plans:
                                <span className="font-normal">{educationProfessionDetails.personal_career_plans}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
