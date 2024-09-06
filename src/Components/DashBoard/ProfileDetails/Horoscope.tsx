/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import RasiGrid from "../../HoroDetails/RasiGrid";
import AmsamGrid from "../../HoroDetails/AmsamGrid";
import { useNavigate } from "react-router-dom";

// Define the interface for the horoscope details
interface HoroscopeDetails {
  personal_bthstar_id: number;
  personal_bthstar_name: string;
  personal_bth_rasi_id: number;
  personal_bth_rasi_name: string;
  personal_lagnam_didi_name: string;
  personal_chevvai_dos: string;
  personal_ragu_dos: string;
  personal_nalikai: string;
  personal_surya_goth: string;
  personal_dasa: string;
  personal_dasa_bal: string;
  personal_rasi_katt: string;
  personal_amsa_katt: string;
}

// Define the interface for Lagnam data
interface Lagnam {
  didi_id: number;
  didi_description: string;
}

interface BirthStar {
  birth_id: number;
  birth_star: string;
}

interface Rasi {
  rasi_id: number;
  rasi_name: string;
}

export const Horoscope = () => {
  const [horoscopeDetails, setHoroscopeDetails] =
    useState<HoroscopeDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<HoroscopeDetails>>({});
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const [birthStars, setBirthStars] = useState<BirthStar[]>([]);
  const [selectedBirthStarId, setSelectedBirthStarId] = useState<
    number | string
  >("");
  const [lagnams, setLagnams] = useState<Lagnam[]>([]);
  const [selectedLagnamId, setSelectedLagnamId] = useState<number | string>("");
  const [rasiList, setRasiList] = useState<Rasi[]>([]);
  const [selectedRasiId, setSelectedRasiId] = useState<number | string>("");

  useEffect(() => {
    const fetchHoroscopeDetails = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/get_myprofile_horoscope/",
          {
            profile_id: loginuser_profileId,
          }
        );
        const data = response.data.data;
        setHoroscopeDetails(data);
        console.log("jjjjjjjjj",response.data.data);

        const matchedLagnam = lagnams.find((lagnam) =>
          lagnam.didi_description.includes(data.personal_lagnam_didi_name)
        );
        if (matchedLagnam) {
          setSelectedLagnamId(matchedLagnam.didi_id);
        }

        setSelectedBirthStarId(data.personal_bthstar_id);
        setSelectedRasiId(data.personal_bth_rasi_id);
        sessionStorage.setItem("formattedDatarasi", data.personal_rasi_katt);
        sessionStorage.setItem("formattedDatamsam", data.personal_amsa_katt);
      } catch (error) {
        console.error("Error fetching horoscope details:", error);
      }
    };

    fetchHoroscopeDetails();
  }, [loginuser_profileId, lagnams]);

  useEffect(() => {
    const fetchBirthStars = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Birth_Star/",
          {
            personal_bthstar_name: "",
          }
        );
        const birthStarsData = Object.values(response.data) as BirthStar[];
        setBirthStars(birthStarsData);
      } catch (error) {
        console.error("Error fetching Birth Star data:", error);
      }
    };
    const fetchLagnams = async () => {
      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Lagnam_Didi/",
          {}
        );
        const lagnamsData = Object.values(response.data) as Lagnam[];
        setLagnams(lagnamsData);
      } catch (error) {
        console.error("Error fetching Lagnam data:", error);
      }
    };

    fetchLagnams();
    fetchBirthStars();
  }, []);

  useEffect(() => {
    const fetchRasis = async () => {
      if (!selectedRasiId) return;

      try {
        const response = await axios.post(
          "http://103.214.132.20:8000/auth/Get_Rasi/",
          {
            birth_id: selectedBirthStarId.toString(),
          }
        );
        const rasiData = Object.values(response.data) as Rasi[];
        setRasiList(rasiData);
      } catch (error) {
        console.error("Error fetching Rasi data:", error);
      }
    };

    fetchRasis();
  }, [selectedBirthStarId, selectedRasiId]);

  const handleBirthStarChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    setSelectedBirthStarId(selectedId);
    setFormData((prevState) => ({
      ...prevState,
      personal_bthstar_name:
        event.target.options[event.target.selectedIndex].text,
    }));
  };

  const handleLagnamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLagnamId(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      personal_lagnam_didi_name: e.target.value,
    }));
  };

  const handleRasiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRasiId(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      personal_bth_rasi_name: e.target.value,
    }));
  };

  // const handleRasiGridChange = (newData: string) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     personal_rasi_katt: newData,
  //   }));
  // };

  // const handleAmsamGridChange = (newData: string) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     personal_amsa_katt: newData,
  //   }));
  // };

  const handleEditClick = () => {
    if (isEditing) {
      setFormData({});
    } else {
      if (horoscopeDetails) {
        setFormData(horoscopeDetails);
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
        "http://103.214.132.20:8000/auth/update_myprofile_horoscope/",
        {
          profile_id: loginuser_profileId,
          birthstar_name: selectedBirthStarId,
          birth_rasi_name: selectedRasiId,
          lagnam_didi: selectedLagnamId,
          chevvai_dosaham: formData.personal_chevvai_dos,
          ragu_dosham: formData.personal_ragu_dos,
          nalikai: formData.personal_nalikai,
          suya_gothram: formData.personal_surya_goth,
          dasa_name: formData.personal_dasa,
          dasa_balance: formData.personal_dasa_bal,
          rasi_kattam: formData.personal_rasi_katt,
          amsa_kattam: formData.personal_amsa_katt,
        }
      );

      if (response.data.status === "success") {
        // Show success alert
        alert("Horoscope details updated successfully!");

        // Reload the page or update the state with the new data
        window.location.reload(); // Or use state to update without reloading

        // Update the local state with the new details
        setHoroscopeDetails((prevState) => ({
          ...prevState!,
          ...formData,
        }));

        // Close editing mode
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating horoscope details:", error);
    }
  };

  if (!horoscopeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">
        Horoscope Details
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
                Birthstar Name:
                <select
                  name="personal_bthstar_name"
                  value={selectedBirthStarId}
                  onChange={handleBirthStarChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Birth Star</option>
                  {birthStars.map((star) => (
                    <option key={star.birth_id} value={star.birth_id}>
                      {star.birth_star}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Rasi Name:
                <select
                  name="personal_bth_rasi_name"
                  value={selectedRasiId}
                  onChange={handleRasiChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Rasi</option>
                  {rasiList.map((rasi) => (
                    <option key={rasi.rasi_id} value={rasi.rasi_id}>
                      {rasi.rasi_name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Lagnam:
                <select
                  name="personal_lagnam_didi_name"
                  value={selectedLagnamId}
                  onChange={handleLagnamChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Lagnam</option>
                  {lagnams.map((lagnam) => (
                    <option key={lagnam.didi_id} value={lagnam.didi_id}>
                      {lagnam.didi_description}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Chevvai Dos:
                <input
                  type="text"
                  name="personal_chevvai_dos"
                  value={formData.personal_chevvai_dos || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Ragu Dos:
                <input
                  type="text"
                  name="personal_ragu_dos"
                  value={formData.personal_ragu_dos || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Nalikai:
                <input
                  type="text"
                  name="personal_nalikai"
                  value={formData.personal_nalikai || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Suya Gothram:
                <input
                  type="text"
                  name="personal_surya_goth"
                  value={formData.personal_surya_goth || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Dasa Name:
                <input
                  type="text"
                  name="personal_dasa"
                  value={formData.personal_dasa || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold">
                Dasa Balance:
                <input
                  type="text"
                  name="personal_dasa_bal"
                  value={formData.personal_dasa_bal || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
          </div>

          <div className="space-y-10 my-10">
            <div>
              <RasiGrid centerLabel={"Rasi"} />
            </div>
            <div>
              <AmsamGrid centerLabel={"Amsam"} />
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
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Birth Star:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_bthstar_name}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Rasi:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_bth_rasi_name}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Lagnam:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_lagnam_didi_name}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Dasa Balance:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_dasa_bal}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Sarpa Dhosam:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_chevvai_dos}
                </span>
              </h5>
            </div>
            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Nallikai:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_nalikai}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Suya Gothram:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_surya_goth}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Dasa:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_dasa}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-2">
                Chevai Dosham:
                <span className="font-normal">
                  {" "}
                  {horoscopeDetails.personal_chevvai_dos}
                </span>
              </h5>
            </div>
          </div>

          <div className="space-y-10 my-10">
            <div>
              <RasiGrid centerLabel={"Rasi"} />
            </div>
            <div>
              <AmsamGrid centerLabel={"Amsam"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
