import ContentCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
// import { useState } from "react";
import { Link } from "react-router-dom";

interface EduDetailsProps {}

const EduDetails: React.FC<EduDetailsProps> = () => {
  return (
    <div className="pb-20">
      <ContentCard
        heading={"Education Details"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <div className="w-full space-y-5 mb-5">
          <div>
            <label htmlFor="HighestEducationLevel *" className="block mb-1">
              Highest Education Level
            </label>
            <select
              name="HighestEducationLevel"
              id="HighestEducationLevel"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Highest Education Level --
              </option>
              <option value="Ph.D">Ph.D</option>
              <option value="PG">PG</option>
              <option value="UG">UG</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="UG Degree (Only if masters selected in highest education)"
              className="block mb-1"
            >
              UG Degree (Only if masters selected in highest education)
            </label>
            <select
              name="ugDegree"
              id="ugDegree"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your UG Degree --
              </option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">B.Sc</option>
            </select>
          </div>

          <InputField
            label={"About your Education"}
            name={"aboutYourEducation"}
          />

          <div className="mt-3">
            <h1 className="mb-3">Profession</h1>

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

          <div>
            <label
              htmlFor="UG Degree (Only if masters selected in highest education)"
              className="block mb-1"
            >
              Annual Income
            </label>
            <select
              name="AnnualIncome"
              id="AnnualIncome"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select your Annual Income --
              </option>
              <option value="Greater than 10 LPA">Greater than 10 LPA</option>
              <option value="Greater than 6 LPA">Greater than 6 LPA</option>
              <option value="3 to 5 LPA">3 to 5 LPA</option>
            </select>
          </div>

          <InputField label={"Actual Income"} name={"actualIncome"} />

          <div className="!mt-12">
            <h1 className="font-bold text-xl text-primary mb-3">
              Work Location
            </h1>

            <div className="w-full space-y-5 mb-5">
              <div>
                <label htmlFor="Country" className="block mb-1">
                  Annual Income
                </label>
                <select
                  name="country"
                  id="country"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                >
                  <option value="" selected disabled>
                    -- Select your Country --
                  </option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                </select>
              </div>

              <div>
                <label htmlFor="state" className="block mb-1">
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                >
                  <option value="" selected disabled>
                    -- Select your State * (Based on Country Selection) --
                  </option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerela">Kerela</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                </select>
              </div>

              <InputField
                label={"Pincode (Based on Country Selection)"}
                name={"pincode"}
              />

              <div>
                <label htmlFor="careerPlans" className="block mb-1">
                  Career Plans / Notes
                </label>

                <textarea
                  name="careerPlans"
                  id="careerPlans"
                  rows={5}
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                >
                  Enter your message here...
                </textarea>
              </div>

              <div className="mt-7 flex justify-between">
                <div className="">
                  <Link to={"/ThankYou/ContactDetails"}>
                    <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                      Back
                    </button>
                  </Link>
                </div>

                <div className="flex space-x-4">
                  {/* <button className="py-[10px] px-14 bg-white text-main font-semibold  rounded-[6px] mt-2">
                    Skip
                  </button> */}
                  <Link to="/HoroDetails">
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
          </div>
        </div>
        <SideContent />
      </div>
    </div>
  );
};

export default EduDetails;
