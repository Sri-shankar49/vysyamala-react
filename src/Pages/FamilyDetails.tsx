import ContentCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
// import { useState } from "react";
import { Link } from "react-router-dom";

interface FamilyDetailsProps {}

const FamilyDetails: React.FC<FamilyDetailsProps> = () => {
  return (
    <div className="pb-20">
      <ContentCard
        heading={"Family Details"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis "
      />
      <div className="container mt-5 flex justify-between space-x-24">
        <div className="w-full space-y-5 mb-5">
          <InputField label={"Father name *"} name={"fathername"} />

          <div>
            <label htmlFor="fatheroccupation" className="block mb-1">
              Father Occupation
            </label>
            <select
              name="fatheroccupation"
              id="fatheroccupation"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select Occupation --
              </option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
          </div>

          <InputField label={"Mother name"} name={"mothername"} />

          <div>
            <label htmlFor="motheroccupation" className="block mb-1">
              Mother Occupation
            </label>
            <select
              name="motheroccupation"
              id="motheroccupation"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
            >
              <option value="" selected disabled>
                -- Select Occupation --
              </option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
          </div>

          <div className="mt-3 flex items-center space-x-48">
            <div>
              <h1 className="mb-3">Brother</h1>
              <div className="inline-flex rounded">
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  1
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  2
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  3
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  4
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  5+
                </button>
              </div>
            </div>

            <div>
              <h1 className="mb-3">Married</h1>
              <div className="inline-flex rounded">
                <button className="px-10 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  1
                </button>
                <button className="px-10 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  2
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-48">
            <div>
              <h1 className="mb-3">Sister</h1>
              <div className="inline-flex rounded">
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  1
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  2
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  3
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  4
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  5+
                </button>
              </div>
            </div>

            <div>
              <h1 className="mb-3">Married</h1>
              <div className="inline-flex rounded">
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  1
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  2
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  3
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  4
                </button>
                <button className="px-5 py-3 text-sm font-medium border border-gray hover:bg-secondary hover:text-white">
                  5+
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h1 className="mb-3">Family Type</h1>

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

          <div className="mt-3">
            <h1 className="mb-3">Family Value</h1>

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

          <div className="mt-3">
            <h1 className="mb-3">Family Status</h1>

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

          <InputField label={"Property Details"} name={"Property Details"} />

          <InputField label={"Property Worth"} name={"Property Worth"} />

          <InputField label={"Suya Gothram"} name={"Suya Gothram"} />

          <InputField label={"Uncle Gothram"} name={"Uncle Gothram"} />

          <InputField label={"Ancestor Origin"} name={"Ancestor Origin"} />

          <div>
            <label htmlFor="aboutMyFamily" className="block mb-1">
              About my Family
            </label>

            <textarea name="aboutMyFamily" id="aboutMyFamily" rows={5} className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded">Enter your message here...</textarea>
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

export default FamilyDetails;
