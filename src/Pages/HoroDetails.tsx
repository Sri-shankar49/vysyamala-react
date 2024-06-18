import ContentCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
// import { useState } from "react";
import { Link } from "react-router-dom";

interface HoroDetailsProps {}

const HoroDetails: React.FC<HoroDetailsProps> = () => {
  return (
    <div className="mt-20">
      <ContentCard
        heading={"Horoscope Details"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <div className="w-full space-y-5 mb-5">
          <InputField
            label={"Time of Birth"}
            type="time"
            name={"timeOfBirth"}
          />

          <InputField label={"Place of Birth"} name={"PlaceOfBirth"} />

          <div>
            <label htmlFor="birthStar" className="block mb-1">
              Birth Star
            </label>
            <select
              name="birthStar"
              id="birthStar"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Birth Star --
              </option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">B.Sc</option>
            </select>
          </div>

          <div>
            <label htmlFor="birthStar" className="block mb-1">
              Birth Star
            </label>
            <select
              name="birthStar"
              id="birthStar"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Birth Star --
              </option>
              <option value="Ashwini">Ashwini</option>
              <option value="Bharani">Bharani</option>
              <option value="Krittika">Krittika</option>
              <option value="Rohini">Rohini</option>
              <option value="Mrigashirsha">Mrigashirsha</option>
              <option value="Ardra">Ardra</option>
              <option value="Punarvasu">Punarvasu</option>
              <option value="Pushya">Pushya</option>
              <option value="Ashlesha">Ashlesha</option>
              <option value="Magha">Magha</option>
              <option value="Purva Phalguni">Purva Phalguni</option>
              <option value="Uttara Phalguni">Uttara Phalguni</option>
              <option value="Hasta">Hasta</option>
              <option value="Chitra">Chitra</option>
              <option value="Swati">Swati</option>
              <option value="Vishaka">Vishaka</option>
              <option value="Anuradha">Anuradha</option>
              <option value="Jyeshta">Jyeshta</option>
              <option value="Moola">Moola</option>
              <option value="Purva Ashadha">Purva Ashadha</option>
              <option value="Uttara Ashadha">Uttara Ashadha</option>
              <option value="Shravana">Shravana</option>
              <option value="Dhanistha">Dhanistha</option>
              <option value="Shatabhisaa">Shatabhisaa</option>
              <option value="Purva Bhadrapada">Purva Bhadrapada</option>
              <option value="Uttara Bhadrapada">Uttara Bhadrapada</option>
              <option value="Revati">Revati</option>
            </select>
          </div>

          <div>
            <label htmlFor="rasi" className="block mb-1">
              Rasi
            </label>
            <select
              name="rasi"
              id="rasi"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Rasi --
              </option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">B.Sc</option>
            </select>
          </div>

          <div>
            <label htmlFor="lagnam" className="block mb-1">
              lagnam / Didi
            </label>
            <select
              name="lagnam"
              id="lagnam"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Rasi --
              </option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">B.Sc</option>
            </select>
          </div>

          <div className="mt-3">
            <h1 className="mb-3">Dosham</h1>

            <div className="w-full inline-flex rounded">
              <button className="w-full px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                1
              </button>
              <button className="w-full px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                2
              </button>
              <button className="w-full px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                3
              </button>
              <button className="w-full px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                4
              </button>
              <button className="w-full px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                5+
              </button>
            </div>
          </div>

          <InputField label={"Naalikai"} name={"naalikai"} />

          <InputField label={"Dasa Name"} name={"dasaName"} />

          <div>
            <label htmlFor="dasaBalance" className="block mb-1">
              Dasa Balance
            </label>
            <select
              name="dasaBalance"
              id="dasaBalance"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Dasa Balance --
              </option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">B.Sc</option>
            </select>
          </div>

          <InputField label={"Horoscope Hints"} name={"horoscopeHints"} />

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
              <Link to="/EduDetails">
                <button className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">
                  Next
                  <span>
                    <img src={arrow} alt="next arrow" className="ml-2" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <SideContent />
      </div>
    </div>
  );
};

export default HoroDetails;
