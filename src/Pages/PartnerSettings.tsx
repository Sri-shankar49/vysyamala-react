import ContentCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
// import { useState } from "react";
import { Link } from "react-router-dom";

interface PartnerSettingsProps {}

const PartnerSettings: React.FC<PartnerSettingsProps> = () => {
  return (
    <div className="pb-20">
      <ContentCard
        heading={"Partner Settings"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <div className="w-full space-y-5 mb-5">
          <h5 className="text-[24px] font-semibold">Advanced Search</h5>

          <div className="flex justify-between items-center">
            <div>
              <h5 className="text-[18px] text-primary font-semibold">Age</h5>
              <div className="flex items-center space-x-5">
                <InputField label={""} name={""} placeholder="From" />
                <InputField label={""} name={""} placeholder="To" />
              </div>
            </div>

            <div>
              <h5 className="text-[18px] text-primary font-semibold">Height</h5>
              <div className="flex items-center space-x-5">
                <InputField label={""} name={""} placeholder="From" />
                <InputField label={""} name={""} placeholder="To" />
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Marital Status
            </h5>

            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="neverMarried"
                  name="neverMarried"
                  value="neverMarried"
                />
                <label htmlFor="neverMarried" className="pl-1">
                  I have a bike
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="married"
                  name="married"
                  value="married"
                />
                <label htmlFor="married" className="pl-1">
                  Married
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="divorced"
                  name="divorced"
                  value="divorced"
                />
                <label htmlFor="divorced" className="pl-1">
                  Divorced
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="seperated"
                  name="seperated"
                  value="seperated"
                />
                <label htmlFor="seperated" className="pl-1">
                  Seperated
                </label>
              </div>

              <div>
                <input type="checkbox" id="widow" name="widow" value="widow" />
                <label htmlFor="widow" className="pl-1">
                  Widow / Widower
                </label>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Profession
            </h5>

            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="employed"
                  name="employed"
                  value="employed"
                />
                <label htmlFor="employed" className="pl-1">
                  Employed
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="business"
                  name="business"
                  value="business"
                />
                <label htmlFor="business" className="pl-1">
                  Business
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="student"
                  name="student"
                  value="student"
                />
                <label htmlFor="student" className="pl-1">
                  Student
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="notWorking"
                  name="notWorking"
                  value="notWorking"
                />
                <label htmlFor="notWorking" className="pl-1">
                  Not Working
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="notMentioned"
                  name="notMentioned"
                  value="notMentioned"
                />
                <label htmlFor="notMentioned" className="pl-1">
                  Not Mentioned
                </label>
              </div>
            </div>
          </div>

          <InputField label={"Education"} name={"education"} />

          <InputField label={"Income"} name={"income"} />

          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Dhosam
            </h5>

            <div className="flex justify-start items-center space-x-10">
              <div>
                <input
                  type="checkbox"
                  id="chevvai"
                  name="chevvai"
                  value="chevvai"
                />
                <label htmlFor="chevvai" className="pl-1">
                  Chevvai
                </label>
              </div>

              <div>
                <input type="checkbox" id="rehu" name="rehu" value="rehu" />
                <label htmlFor="rehu" className="pl-1">
                  Rehu / Ketu
                </label>
              </div>
            </div>
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

          <InputField label={"Work Location"} name={"workLocation"} />

          <div>
            <label htmlFor="nativeState" className="block mb-1">
              Native State
            </label>
            <select
              name="nativeState"
              id="nativeState"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Native State --
              </option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Kerela">Kerela</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div>
        </div>
        <SideContent />
      </div>
    </div>
  );
};

export default PartnerSettings;
