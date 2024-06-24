import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useNavigate } from "react-router-dom";


// Define validation schema with zod
const schema = zod.object({
  fathername: zod.string().min(3, 'Father name is required'),
  fatherOccupation: zod.string().min(3, "Father's Occupation is required"),
  mothername: zod.string().min(3, 'Mother name is required'),
  motherOccupation: zod.string().min(3, "Mother's Occupation is required"),
  propertyDetails: zod.string().optional(),
  propertyWorth: zod.string().optional(),
  suyaGothram: zod.string().optional(),
  uncleGothram: zod.string().optional(),
  ancestorOrigin: zod.string().optional(),
  aboutMyFamily: zod.string().optional(),
}).required();

interface FamilyDetailsInputs {
  fathername: string;
  fatherOccupation: string;
  mothername?: string;
  motherOccupation?: string;
  propertyDetails?: string;
  propertyWorth?: string;
  suyaGothram?: string;
  uncleGothram?: string;
  ancestorOrigin?: string;
  aboutMyFamily?: string;
}

const FamilyDetails: React.FC = () => {

  // Navigate to next page
  const navigate = useNavigate();

  // React Hook form
  const { register, handleSubmit, formState: { errors } } = useForm<FamilyDetailsInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FamilyDetailsInputs> = data => {
    console.log(data);
    navigate('/EduDetails');
    // navigate to next page or handle data submission
  };


  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Family Details"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis "
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mb-5">
          <div>
            <InputField label={"Father name"} required {...register("fathername")} />
            {errors.fathername && <span className="text-red-500">{errors.fathername.message}</span>}
          </div>

          <div>
            <label htmlFor="fatheroccupation" className="block mb-1">
              Father Occupation
            </label>
            <select
              id="fatheroccupation"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("fatherOccupation")}
            >
              <option value="" selected disabled>
                -- Select Occupation --
              </option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
            {errors.fatherOccupation && <span className="text-red-500">{errors.fatherOccupation.message}</span>}

          </div>

          <div>
            <InputField label={"Mother name"} required {...register("mothername")} />
            {errors.mothername && <span className="text-red-500">{errors.mothername.message}</span>}
          </div>

          <div>
            <label htmlFor="motheroccupation" className="block mb-1">
              Mother Occupation
            </label>
            <select
              id="motheroccupation"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("motherOccupation")}
            >
              <option value="" selected disabled>
                -- Select Occupation --
              </option>
              <option value="HomeMaker">Home Maker</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
            {errors.motherOccupation && <span className="text-red-500">{errors.motherOccupation.message}</span>}

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

          <div>
            <InputField label={"Property Details"} name={"Property Details"} />
          </div>

          <div>
            <InputField label={"Property Worth"} name={"Property Worth"} />
          </div>

          <div>
            <InputField label={"Suya Gothram"} name={"Suya Gothram"} />
          </div>

          <div>
            <InputField label={"Uncle Gothram"} name={"Uncle Gothram"} />
          </div>

          <div>
            <InputField label={"Ancestor Origin"} name={"Ancestor Origin"} />
          </div>

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

        </form>

        <SideContent />
      </div>
    </div>
  );
};

export default FamilyDetails;
