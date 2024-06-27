import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import RasiGrid from "../Components/HoroDetails/RasiGrid";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


// Define validation schema with zod
const schema = zod.object({
  timeOfBirth: zod.string().min(1, "Time of birth is required"),
  placeOfBirth: zod.string().min(3, "Place of birth is required"),
  birthStar: zod.string().min(1, "Birth star is required"),
  rasi: zod.string().min(1, "Rasi is required"),
  lagnam: zod.string().min(1, "Lagnam is required"),
  dosham: zod.string().min(1, "Dosham is required"),
  naalikai: zod.string().min(1, "Naalikai is required"),
  dasaName: zod.string().min(1, "Dasa name is required"),
  dasaBalance: zod.string().min(1, "Dasa balance is required"),
  horoscopeHints: zod.string().min(1, "Horoscope hints are required"),
});


interface HoroDetailsInputs {
  timeOfBirth: string;
  placeOfBirth: string;
  birthStar: string;
  rasi: string;
  lagnam: string;
  dosham: string;
  naalikai: string;
  dasaName: string;
  dasaBalance: string;
  horoscopeHints: string;
}

interface HoroDetailsProps { }


interface BirthStar {
  birth_id: number;
  birth_star: string;
}

interface Rasi {
  rasi_id: number;
  rasi_name: string;
}

interface Lagnam {
  didi_id: number;
  didi_description: string;
}

interface DasaBalance {
  balance_id: number;
  balance_description: string;
}

const HoroDetails: React.FC<HoroDetailsProps> = () => {

  // Navigate to next page
  const navigate = useNavigate();

  // React Hook form
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<HoroDetailsInputs>({
    resolver: zodResolver(schema),
  });



  // Dhosam State
  const [selectedDosham, setSelectedDosham] = useState<string | null>(null);
  const [birthStar, setBirthStar] = useState<BirthStar[]>([]);
  const [rasi, setRasiOptions] = useState<Rasi[]>([]);
  const [lagnam, setLagnamOptions] = useState<Lagnam[]>([]);
  const [dasa, setDasaOptions] = useState<DasaBalance[]>([]);

  const selectedStar = watch("birthStar");






  useEffect(() => {
    const fetchBirthStar = async () => {
      try {
        const response = await axios.post("http://103.214.132.20:8000/auth/Get_Birth_Star/");
        const options = Object.values(response.data) as BirthStar[];
        setBirthStar(options);
      } catch (error) {
        console.error("Error fetching birth star options:", error);
      }
    };
    fetchBirthStar();
  }, []);


  useEffect(() => {
    if (selectedStar) {
      const fetchStateStatus = async () => {
        try {
          const response = await axios.post("http://103.214.132.20:8000/auth/Get_Rasi/", { birth_id: selectedStar });
          const options = Object.values(response.data) as Rasi[];
          setRasiOptions(options);
        } catch (error) {
          console.error("Error fetching state options:", error);
        }
      };
      fetchStateStatus();
    }
  }, [selectedStar]);



  useEffect(() => {
    const fetchLagnam = async () => {
      try {
        const response = await axios.post("http://103.214.132.20:8000/auth/Get_Lagnam_Didi/");
        const options = Object.values(response.data) as Lagnam[];
        setLagnamOptions(options);
      } catch (error) {
        console.error("Error fetching Laganam options:", error);
      }
    };
    fetchLagnam();
  }, []);


  useEffect(() => {
    const fetchDasa = async () => {
      try {
        const response = await axios.post("http://103.214.132.20:8000/auth/Get_Dasa_Balance/");
        const options = Object.values(response.data) as DasaBalance[];
        setDasaOptions(options);
      } catch (error) {
        console.error("Error fetching Dasa options:", error);
      }
    };
    fetchDasa();
  }, []);



  // Background getting selected
  const buttonClass = (isSelected: boolean) => isSelected ? "bg-secondary text-white" : "border-gray hover:bg-secondary hover:text-white";

  const handleDoshamChange = (value: string) => {
    setSelectedDosham(value);
    setValue("dosham", value, { shouldValidate: true })
  };

  const onSubmit: SubmitHandler<HoroDetailsInputs> = (data) => {
    console.log(data);
    navigate("/PartnerSettings");
  };




  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Horoscope Details"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mb-5">

          <div>
            <InputField
              label={"Time of Birth"}
              type="time"
              {...register("timeOfBirth")}
            />
            {errors.timeOfBirth && (
              <span className="text-red-500">{errors.timeOfBirth.message}</span>
            )}
          </div>

          <div>
            <InputField label={"Place of Birth"} {...register("placeOfBirth")} />
            {errors.placeOfBirth && (
              <span className="text-red-500">{errors.placeOfBirth.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="birthStar" className="block mb-1">
              Birth Star
            </label>
            <select
              id="birthStar"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("birthStar")}
            >
              <option value="" selected disabled>
                -- Select your Birth Star --
              </option>
              {birthStar.map((option) => (
                <option key={option.birth_id} value={option.birth_id}>
                  {option.birth_star}
                </option>
              ))}
            </select>
          </div>



          <div>
            <label htmlFor="rasi" className="block mb-1">
              Rasi
            </label>
            <select
              id="rasi"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("rasi")}
            >
              <option value="" selected disabled>
                -- Select your Rasi --
              </option>
              {rasi.map((option) => (
                <option key={option.rasi_id} value={option.rasi_id}>
                  {option.rasi_name}
                </option>
              ))}
            </select>
            {errors.rasi && (
              <span className="text-red-500">{errors.rasi.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="lagnam" className="block mb-1">
              lagnam / Didi
            </label>
            <select
              id="lagnam"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("lagnam")}
            >
              <option value="" selected disabled>
                -- Select your lagnam / Didi --
              </option>
              {lagnam.map((option) => (
                <option key={option.didi_id} value={option.didi_id}>
                  {option.didi_description}
                </option>
              ))}
            </select>
            {errors.lagnam && (
              <span className="text-red-500">{errors.lagnam.message}</span>
            )}
          </div>

          <div className="mt-3">
            <h1 className="mb-3">Dosham</h1>

            <div className="w-full inline-flex rounded">
              {["1", "2", "3", "4", "5+"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(selectedDosham === type)}`}
                  onClick={() => handleDoshamChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.dosham && (
              <span className="text-red-500">{errors.dosham.message}</span>
            )}
          </div>

          <div>
            <InputField label={"Naalikai"} {...register("naalikai")} />
            {errors.naalikai && (
              <span className="text-red-500">{errors.naalikai.message}</span>
            )}
          </div>

          <div>
            <InputField label={"Dasa Name"} {...register("dasaName")} />
            {errors.dasaName && (
              <span className="text-red-500">{errors.dasaName.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="dasaBalance" className="block mb-1">
              Dasa Balance
            </label>
            <select
              id="dasaBalance"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("dasaBalance")}
            >
              <option value="" selected disabled>
                -- Select your Dasa Balance --
              </option>
              {dasa.map((option) => (
                <option key={option.balance_id} value={option.balance_id}>
                  {option.balance_description}
                </option>
              ))}
            </select>
            {errors.dasaBalance && (
              <span className="text-red-500">{errors.dasaBalance.message}</span>
            )}
          </div>

          <div>
            <InputField label={"Horoscope Hints"} {...register("horoscopeHints")} />
            {errors.horoscopeHints && (
              <span className="text-red-500">{errors.horoscopeHints.message}</span>
            )}
          </div>

          <DndProvider backend={HTML5Backend}>
            <RasiGrid />
          </DndProvider>
          
          <div className="mt-7 flex justify-between">
            <div className="">
              <Link to={"/"}>
                <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                  Back
                </button>
              </Link>
            </div>

            <div className="flex space-x-4">
              <button className="py-[10px] px-14 bg-white text-main font-semibold  rounded-[6px] mt-2">
                Skip
              </button>
              <button type="submit" className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">
                Next
                <span>
                  <img src={arrow} alt="next arrow" className="ml-2" />
                </span>
              </button>
            </div>
          </div>
        </form>
        <SideContent />
      </div>
    </div>
  );
};

export default HoroDetails;
