import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface PersonalDetails {
  personal_profile_name: string;
  personal_gender: string;
  personal_age: number;
  personal_profile_dob: string;
  personal_place_of_birth: string;
  personal_time_of_birth: string;
  personal_profile_height: string;
  personal_profile_marital_status_id: number;
  personal_profile_marital_status_name: string;
  personal_blood_group: string;
  personal_about_self: string;
  personal_profile_complexion_name: string;
  personal_hobbies: string;
  personal_pysically_changed: string;
  personal_profile_for_name: string;
  marital_sts_id: number;
  height_id: number;
  complexion_id: number;
  owner_id: number;
}

interface MaritalStatus {
  marital_sts_id: number;
  marital_sts_name: string;
}

interface Height {
  height_id: number;
  height_description: string;
}

interface Complexion {
  complexion_id: number;
  complexion_description: string;
}

interface ProfileHolder {
  owner_id: number;
  owner_description: string;
}

export const Personal = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<PersonalDetails>>({});
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [selectedMaritalStatusId, setSelectedMaritalStatusId] = useState<number | string>('');

  const [heights, setHeights] = useState<Height[]>([]);
  const [selectedHeight, setSelectedHeight] = useState<number | string>('');
  const [complexions, setComplexions] = useState<Complexion[]>([]);
  const [selectedComplexion, setSelectedComplexion] = useState<number | string>('');

  const [profileHolders, setProfileHolders] = useState<ProfileHolder[]>([]);
  const [selectedProfileHolder, setSelectedProfileHolder] = useState<number | string>('');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.post("http://103.214.132.20:8000/auth/get_myprofile_personal/", {
          profile_id: loginuser_profileId
        });

        const data = response.data.data;
        setPersonalDetails(data);

        const matchedHeight = heights.find(height => height.height_description.includes(data.personal_profile_height));
        if (matchedHeight) {
          setSelectedHeight(matchedHeight.height_id);
        }

        const matchedStatus = maritalStatuses.find(status =>
          status.marital_sts_name.includes(data.personal_profile_marital_status_name)
        );
        if (matchedStatus) {
          setSelectedMaritalStatusId(matchedStatus.marital_sts_id);
        }

        const matchedComplexion = complexions.find(complexion => complexion.complexion_description.includes(data.personal_profile_complexion_name));
        if (matchedComplexion) {
          setSelectedComplexion(matchedComplexion.complexion_id);
        }

        const matchedProfileHolder = profileHolders.find(holder => holder.owner_description.includes(data.personal_profile_for_name));
        if (matchedProfileHolder) {
          setSelectedProfileHolder(matchedProfileHolder.owner_id);
        }
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };
    fetchPersonalDetails();
  }, [loginuser_profileId, heights, maritalStatuses, complexions, profileHolders]);

  useEffect(() => {
    const fetchMaritalStatuses = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Marital_Status/');
        const statuses = Object.values(response.data) as MaritalStatus[];
        setMaritalStatuses(statuses);
      } catch (error) {
        console.error('Error fetching marital statuses:', error);
      }
    };
    const fetchHeights = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Height/');
        const heightsData = Object.values(response.data) as Height[];
        setHeights(heightsData);
      } catch (error) {
        console.error('Error fetching heights:', error);
      }
    };
    const fetchComplexions = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Complexion/');
        const complexionsData = Object.values(response.data) as Complexion[];
        setComplexions(complexionsData);
      } catch (error) {
        console.error('Error fetching complexions:', error);
      }
    };
    const fetchProfileHolders = async () => {
      try {
        const response = await axios.post('http://103.214.132.20:8000/auth/Get_Profileholder/');
        const profileHoldersData = Object.values(response.data) as ProfileHolder[];
        setProfileHolders(profileHoldersData);
      } catch (error) {
        console.error('Error fetching profile holders:', error);
      }
    };

    fetchProfileHolders();
    fetchComplexions();
    fetchHeights();
    fetchMaritalStatuses();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaritalStatusId(e.target.value);
    setFormData(prevState => ({
      ...prevState,
      personal_profile_marital_status_name: e.target.value
    }));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHeight(e.target.value);
    setFormData(prevState => ({
      ...prevState,
      personal_profile_height: e.target.value
    }));
  };

  const handleComplexionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComplexion(e.target.value);
    setFormData(prevState => ({
      ...prevState,
      personal_profile_complexion_name: e.target.value
    }));
  };

  const handleProfileHolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfileHolder(e.target.value);
    setFormData(prevState => ({
      ...prevState,
      personal_profile_for_name: e.target.value
    }));
  };

  // const handleEditClick = () => {
  //     if (personalDetails) {
  //         setFormData(personalDetails);
  //     }
  //     setIsEditing(true);
  // };

  const handleEditClick = () => {
    if (isEditing) {
      // Reset form data to an empty object if exiting edit mode
      setFormData({});
    } else {
      if (personalDetails) {
        setFormData(personalDetails);
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

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (formData.personal_profile_dob) {
      const age = calculateAge(formData.personal_profile_dob);
      if (age >= 18) {
        setError(null);
        setFormData(prevState => ({
          ...prevState,
          personal_age: age
        }));
      } else {
        setError("Age must be 18 years or older.");
        setFormData(prevState => ({
          ...prevState,
          personal_profile_dob: "",
          personal_age: undefined
        }));
      }
    }
  }, [formData.personal_profile_dob]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) {
      alert(error);
      return;
    }
    try {
      const response = await axios.post("http://103.214.132.20:8000/auth/update_myprofile_personal/", {
        profile_id: loginuser_profileId,
        Profile_name: formData.personal_profile_name,
        Gender: formData.personal_gender,
        personal_age: formData.personal_age,
        Profile_dob: formData.personal_profile_dob,
        place_of_birth: formData.personal_place_of_birth,
        time_of_birth: formData.personal_time_of_birth,
        Profile_height: selectedHeight,
        Profile_marital_status: selectedMaritalStatusId,
        blood_group: formData.personal_blood_group,
        about_self: formData.personal_about_self,
        Profile_complexion: selectedComplexion,
        hobbies: formData.personal_hobbies,
        Pysically_changed: formData.personal_pysically_changed,
        Profile_for: selectedProfileHolder
      });

      if (response.data.status === "success") {
        alert(response.data.message);
        window.location.reload();

        const getResponse = await axios.post("http://103.214.132.20:8000/auth/get_myprofile_personal/", {
          profile_id: loginuser_profileId
        });

        const updatedDetails = getResponse.data.data;

        setPersonalDetails(prevState => ({
          ...prevState!,
          personal_profile_name: updatedDetails.personal_profile_name,
          personal_gender: updatedDetails.personal_gender,
          personal_age: updatedDetails.personal_age,
          personal_profile_dob: updatedDetails.personal_profile_dob,
          personal_place_of_birth: updatedDetails.personal_place_of_birth,
          personal_time_of_birth: updatedDetails.personal_time_of_birth,
          personal_profile_height: updatedDetails.personal_profile_height,
          marital_sts_id: updatedDetails.marital_sts_id,
          personal_blood_group: updatedDetails.personal_blood_group,
          personal_about_self: updatedDetails.personal_about_self,
          personal_hobbies: updatedDetails.personal_hobbies,
          personal_pysically_changed: updatedDetails.personal_pysically_changed,
          personal_profile_complexion_name: updatedDetails.personal_profile_complexion_name,
          owner_id: updatedDetails.owner_id
        }));

        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating personal details:", error);
      alert("Failed to update personal details. Please try again.");
    }
  };

  if (!personalDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">
        Personal Details
        <MdModeEdit
          className="text-2xl text-main ml-2 cursor-pointer"
          onClick={handleEditClick}
        />
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-rows-1 grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Name:
                <input
                  type="text"
                  name="personal_profile_name"
                  value={formData.personal_profile_name || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Gender:
                <div className="flex space-x-4 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="personal_gender"
                      value="male"
                      checked={formData.personal_gender === "male"}
                      onChange={handleInputChange}
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="personal_gender"
                      value="female"
                      checked={formData.personal_gender === "female"}
                      onChange={handleInputChange}
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                DOB:
                <input
                  type="date"
                  name="personal_profile_dob"
                  value={formData.personal_profile_dob || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  max={new Date().toISOString().split("T")[0]}
                />
              </label>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Age:
                <input
                  type="text"
                  name="personal_age"
                  value={formData.personal_age || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  disabled
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Place of Birth:
                <input
                  type="text"
                  name="personal_place_of_birth"
                  value={formData.personal_place_of_birth || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Time of Birth:
                <input
                  type="text"
                  name="personal_time_of_birth"
                  value={formData.personal_time_of_birth || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Height:
                <select
                  name="personal_profile_height"
                  value={selectedHeight}
                  onChange={handleHeightChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Height</option>
                  {heights.map(height => (
                    <option key={height.height_id} value={height.height_id}>
                      {height.height_description}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Marital Status:
                <select
                  name="personal_profile_marital_status"
                  value={selectedMaritalStatusId ?? ""}
                  onChange={handleSelectChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Marital Status</option>
                  {maritalStatuses.map(status => (
                    <option key={status.marital_sts_id} value={status.marital_sts_id}>
                      {status.marital_sts_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Blood Group:
                <input
                  type="text"
                  name="personal_blood_group"
                  value={formData.personal_blood_group || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                About Myself:
                <input
                  name="personal_about_self"
                  value={formData.personal_about_self || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Complexion:
                <select
                  value={selectedComplexion}
                  onChange={handleComplexionChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Complexion</option>
                  {complexions.map(complexion => (
                    <option key={complexion.complexion_id} value={complexion.complexion_id}>
                      {complexion.complexion_description}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Hobbies:
                <input
                  type="text"
                  name="personal_hobbies"
                  value={formData.personal_hobbies || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Physical Status:
                <div className="flex space-x-4 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="personal_pysically_changed"
                      value="yes"
                      checked={formData.personal_pysically_changed === "yes"}
                      onChange={handleInputChange}
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="personal_pysically_changed"
                      value="no"
                      checked={formData.personal_pysically_changed === "no"}
                      onChange={handleInputChange}
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Profile For:
                <select
                  value={selectedProfileHolder}
                  onChange={handleProfileHolderChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Profile Holder</option>
                  {profileHolders.map((holder) => (
                    <option
                      key={holder.owner_id}
                      value={holder.owner_id}
                    >
                      {holder.owner_description}
                    </option>
                  ))}
                </select>
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
          <div className="grid grid-rows-1 grid-cols-2">
            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-2">Name  :
                <span className="font-normal"> {personalDetails.personal_profile_name}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Gender :
                <span className="font-normal"> {personalDetails.personal_gender}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Age  :
                <span className="font-normal"> {personalDetails.personal_age} yrs</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">DOB :
                <span className="font-normal"> {new Date(personalDetails.personal_profile_dob).toLocaleDateString()}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Place of Birth :
                <span className="font-normal"> {personalDetails.personal_place_of_birth}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Time of Birth :
                <span className="font-normal"> {personalDetails.personal_time_of_birth}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Height :
                <span className="font-normal"> {personalDetails.personal_profile_height} cm</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Marital Status :
                <span className="font-normal">
                  {personalDetails.personal_profile_marital_status_name}
                </span>
              </h5>
            </div>

            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-2">Blood Group :
                <span className="font-normal"> {personalDetails.personal_blood_group}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">About Myself :
                <span className="font-normal"> {personalDetails.personal_about_self}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Complexion :
                <span className="font-normal"> {personalDetails.personal_profile_complexion_name}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Hobbies  :
                <span className="font-normal"> {personalDetails.personal_hobbies}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Physical Status :
                <span className="font-normal"> {personalDetails.personal_pysically_changed}</span></h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">Profile Created By :
                <span className="font-normal"> {personalDetails.personal_profile_for_name}</span></h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
