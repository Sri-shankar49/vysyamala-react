import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";

// Define the interface for the personal details data
interface PersonalDetails {
  personal_profile_name: string;
  personal_gender: string;
  personal_age: number;
  personal_profile_dob: string;
  personal_place_of_birth: string;
  personal_time_of_birth: string;
  personal_profile_height: string;
  personal_profile_marital_status: string;
  personal_blood_group: string;
  personal_about_self: string;
  personal_profile_complexion: string;
  personal_hobbies: string;
  personal_pysically_changed: string;
  personal_profile_for: string;
}

export const Personal = () => {
  const [personalDetails, setPersonalDetails] =
    useState<PersonalDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<PersonalDetails>>({});

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/get_myprofile_personal/",
          {
            profile_id: "VY240001",
          }
        );
        setPersonalDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };

    fetchPersonalDetails();
  }, []);

  const handleEditClick = () => {
    if (personalDetails) {
      setFormData(personalDetails);
    }
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/update_myprofile_personal/",
        {
          profile_id: "VY240001",
          Profile_name: formData.personal_profile_name,
          Gender: formData.personal_gender,
          personal_age: formData.personal_age,
          Profile_dob: formData.personal_profile_dob,
          place_of_birth: formData.personal_place_of_birth,
          time_of_birth: formData.personal_time_of_birth,
          Profile_height: formData.personal_profile_height,
          Profile_marital_status: formData.personal_profile_marital_status,
          blood_group: formData.personal_blood_group,
          about_self: formData.personal_about_self,
          Profile_complexion: formData.personal_profile_complexion,
          hobbies: formData.personal_hobbies,
          Pysically_changed: formData.personal_pysically_changed,
          // Include other fields if needed
          // Profile_for: formData.personal_profile_for // Uncomment if needed
        }
      );
      if (response.data.status === "success") {
        alert(response.data.message);
        setPersonalDetails((prevState) => ({
          ...prevState!,
          ...formData,
        }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating personal details:", error);
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
                <input
                  type="text"
                  name="personal_gender"
                  value={formData.personal_gender || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Age:
                <input
                  type="number"
                  name="personal_age"
                  value={formData.personal_age || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                DOB:
                <input
                  type="date"
                  name="personal_profile_dob"
                  value={formData.personal_profile_dob || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
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
                <input
                  type="text"
                  name="personal_profile_height"
                  value={formData.personal_profile_height || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Marital Status:
                <input
                  type="text"
                  name="personal_profile_marital_status"
                  value={formData.personal_profile_marital_status || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
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
                <textarea
                  name="personal_about_self"
                  value={formData.personal_about_self || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Complexion:
                <input
                  type="text"
                  name="personal_profile_complexion"
                  value={formData.personal_profile_complexion || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
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
                <input
                  type="text"
                  name="personal_pysically_changed"
                  value={formData.personal_pysically_changed || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Profile Created By:
                <input
                  type="text"
                  name="personal_profile_for"
                  value={formData.personal_profile_for || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
          </div>

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
        </form>
      ) : (
        <div>
          <div className="grid grid-rows-1 grid-cols-2">
            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Name :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_profile_name}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Gender :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_gender}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Age :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_age} yrs
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                DOB :
                <span className="font-normal">
                  {" "}
                  {new Date(
                    personalDetails.personal_profile_dob
                  ).toLocaleDateString()}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Place of Birth :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_place_of_birth}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Time of Birth :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_time_of_birth}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Height :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_profile_height} cm
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Marital Status :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_profile_marital_status === "1"
                    ? "Unmarried"
                    : "Married"}
                </span>
              </h5>
            </div>

            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Blood Group :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_blood_group}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                About Myself :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_about_self}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Complexion :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_profile_complexion === "1"
                    ? "Wheatish"
                    : "Other"}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Hobbies :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_hobbies}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Physical Status :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_pysically_changed}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Profile Created By :
                <span className="font-normal">
                  {" "}
                  {personalDetails.personal_profile_for}
                </span>
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
