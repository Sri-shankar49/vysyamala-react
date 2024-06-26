import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";


interface PartnerSettingsProps {
  placeholder?: string;
}

const PartnerSettings: React.FC<PartnerSettingsProps> = () => {
  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Partner Preference"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <div className="w-full space-y-5 mb-5">
          <h5 className="text-[24px] font-semibold">Advanced Search</h5>

          <div className="flex justify-between items-center">
            <div>
              {/* <h5 className="text-[18px] text-primary font-semibold">Age</h5> */}
              <div className="flex items-center space-x-5">
                {/* <InputField label={""} name={""} placeholder="From" />
                <InputField label={""} name={""} placeholder="To" /> */}

                <div>
                  <label htmlFor="nativeState" className="block mb-1">
                    Age
                  </label>
                  <select
                    name="age"
                    id="age"
                    className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                  >
                    <option value="" selected disabled>
                      -- Select your Age --
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
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

          {/* Marital Status */}
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
                  Never Married
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

          {/* <InputField label={"Education"} name={"education"} /> */}
          <div>
            <label htmlFor="education" className="block mb-1">
              Education
            </label>
            <select
              name="education"
              id="education"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Education --
              </option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Kerela">Kerela</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div>

          {/* <InputField label={"Income"} name={"income"} /> */}
          {/* Annual Income */}
          <div>
            <label htmlFor="annualIncome" className="block mb-1">
              Annual Income
            </label>
            <select
              name="annualIncome"
              id="annualIncome"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Annual Income --
              </option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Kerela">Kerela</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div>

          {/* Dhosam */}
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

              <div>
                <input type="checkbox" id="unknown" name="unknown" value="unknown" />
                <label htmlFor="unknown" className="pl-1">
                  Unknown
                </label>
              </div>
            </div>
          </div>

          {/* Foreign Interest */}
          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Foreign Interest
            </h5>

            <div className="flex justify-start items-center space-x-10">
              <div>
                <input
                  type="checkbox"
                  id="yes"
                  name="yes"
                  value="yes"
                />
                <label htmlFor="yes" className="pl-1">
                  Yes
                </label>
              </div>

              <div>
                <input type="checkbox" id="no" name="no" value="no" />
                <label htmlFor="no" className="pl-1">
                  No
                </label>
              </div>

              <div>
                <input type="checkbox" id="both" name="both" value="both" />
                <label htmlFor="both" className="pl-1">
                  Both
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

          {/* Native State */}
          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Native State
            </h5>

            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="tamilNadu"
                  name="tamilNadu"
                  value="tamilNadu"
                />
                <label htmlFor="tamilNadu" className="pl-1">
                  TamilNadu and Pondhicherry
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="karnataka"
                  name="karnataka"
                  value="karnataka"
                />
                <label htmlFor="karnataka" className="pl-1">
                  Karnataka
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="andhraPradesh"
                  name="andhraPradesh"
                  value="andhraPradesh"
                />
                <label htmlFor="andhraPradesh" className="pl-1">
                  Andhra Pradesh
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="telangana"
                  name="telangana"
                  value="telangana"
                />
                <label htmlFor="telangana" className="pl-1">
                  Telangana
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="kerala"
                  name="kerala"
                  value="kerala" />
                <label htmlFor="kerala" className="pl-1">
                  Kerala
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="others"
                  name="others"
                  value="others" />
                <label htmlFor="others" className="pl-1">
                  Others
                </label>
              </div>
            </div>
          </div>

          {/* Matching Star */}
          <div>
            <label htmlFor="education" className="block mb-1">
              Matching Start
            </label>
            <select
              name="star"
              id="star"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Matching Star --
              </option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Kerela">Kerela</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div>

          <InputField label={"Work Location"} name={"workLocation"} />

          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Profile Photo
            </h5>
            <input type="checkbox" id="profilePhoto" name="profilePhoto" value="profilePhoto" />
            <label htmlFor="profilePhoto" className="pl-1">
              People only with photo
            </label>
          </div>

          <div className="mt-7 flex justify-between">
            <div className="">
              {/* <Link to={"/"}>
                <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                  Back
                </button>
              </Link> */}
            </div>

            <div className="flex space-x-4">
              <button className="py-[10px] px-14 bg-white text-main font-semibold  rounded-[6px] mt-2">
                Cancel
              </button>
              <Link to="/MembershipPlan">
                <button className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">
                  Find Match
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

export default PartnerSettings;
