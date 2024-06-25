import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// Define validation schema with zod
const schema = zod.object({
  highestEducationLevel: zod.string().min(1, "Highest education level is required"),
  ugDegree: zod.string().optional(),
  aboutYourEducation: zod.string().min(3, "About your education is required"),
  profession: zod.string().min(1, "Profession count is required"),
  annualIncome: zod.string().min(1, "Annual income is required"),
  actualIncome: zod.string().min(1, "Actual income is required"),
  country: zod.string().min(1, "Country is required"),
  state: zod.string().min(1, "State is required"),
  pincode: zod.string().min(1, "Pincode is required"),
  careerPlans: zod.string().min(1, "Career plans are required"),
});

interface EduDetailsInputs {
  highestEducationLevel: string;
  ugDegree?: string;
  aboutYourEducation: string;
  profession: string;
  annualIncome: string;
  actualIncome: string;
  country: string;
  state: string;
  pincode: string;
  careerPlans: string;
}

interface EduDetailsProps { }

const EduDetails: React.FC<EduDetailsProps> = () => {

  // Navigate to next page
  const navigate = useNavigate();

  // React Hook form
  const { register, handleSubmit, formState: { errors }, setValue, } = useForm<EduDetailsInputs>({
    resolver: zodResolver(schema),
  });

  // Profession State
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);

  // Background getting selected
  const buttonClass = (isSelected: boolean) => isSelected ? "bg-secondary text-white" : "border-gray hover:bg-secondary hover:text-white";

  const handleProfessionChange = (value: string) => {
    setSelectedProfession(value);
    setValue("profession", value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<EduDetailsInputs> = (data) => {
    console.log(data);
    navigate("/HoroDetails");
  };

  return (
    <div className="pb-20">
      <ContentBlackCard
        heading={"Education Details"}
        desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis"
      />

      <div className="container mt-5 flex justify-between space-x-24">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mb-5">
          <div>
            <label htmlFor="HighestEducationLevel" className="block mb-1">
              Highest Education Level <span className="text-main">*</span>
            </label>
            <select
              id="HighestEducationLevel"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("highestEducationLevel")}
            >
              <option value="" disabled>
                -- Select your Highest Education Level --
              </option>
              <option value="Ph.D">Ph.D</option>
              <option value="PG">PG</option>
              <option value="UG">UG</option>
              <option value="Diploma">Diploma</option>
            </select>
            {errors.highestEducationLevel && (
              <span className="text-red-500">{errors.highestEducationLevel.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="ugDegree" className="block mb-1">
              UG Degree (Only if masters selected in highest education)
            </label>
            <select
              id="ugDegree"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("ugDegree")}
            >
              <option value="" disabled>
                -- Select your UG Degree --
              </option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">B.Sc</option>
            </select>
            {errors.ugDegree && <span className="text-red-500">{errors.ugDegree.message}</span>}
          </div>

          <div>
            <InputField
              label={"About your Education"}
              required
              {...register("aboutYourEducation")}
            />
            {errors.aboutYourEducation && (
              <span className="text-red-500">{errors.aboutYourEducation.message}</span>
            )}
          </div>

          <div className="mt-3">
            <h1 className="mb-3">Profession</h1>

            <div className="w-full inline-flex rounded">
              {["0", "1", "2", "3", "4", "5"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(selectedProfession === type)}`}
                  onClick={() => handleProfessionChange(type)}
                  {...register("profession")}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.profession && <span className="text-red-500">{errors.profession.message}</span>}
          </div>

          <div>
            <label htmlFor="annualIncome" className="block mb-1">
              Annual Income
            </label>
            <select
              id="annualIncome"
              className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              {...register("annualIncome")}
            >
              <option value="" disabled>
                -- Select your Annual Income --
              </option>
              <option value="Greater than 10 LPA">Greater than 10 LPA</option>
              <option value="Greater than 6 LPA">Greater than 6 LPA</option>
              <option value="3 to 5 LPA">3 to 5 LPA</option>
            </select>
            {errors.annualIncome && (
              <span className="text-red-500">{errors.annualIncome.message}</span>
            )}
          </div>

          <div>
            <InputField label={"Actual Income"} {...register("actualIncome")} />
            {errors.actualIncome && (
              <span className="text-red-500">{errors.actualIncome.message}</span>
            )}
          </div>

          <div className="!mt-12">
            <h1 className="font-bold text-xl text-primary mb-3">Work Location</h1>

            <div className="w-full space-y-5 mb-5">
              <div>
                <label htmlFor="country" className="block mb-1">
                  Country
                </label>
                <select
                  id="country"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                  {...register("country")}
                >
                  <option value="" disabled>
                    -- Select your Country --
                  </option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                </select>
                {errors.country && <span className="text-red-500">{errors.country.message}</span>}
              </div>

              <div>
                <label htmlFor="state" className="block mb-1">
                  State
                </label>
                <select
                  id="state"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                  {...register("state")}
                >
                  <option value="" disabled>
                    -- Select your State * (Based on Country Selection) --
                  </option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerela">Kerela</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                </select>
                {errors.state && <span className="text-red-500">{errors.state.message}</span>}
              </div>

              <InputField label={"Pincode (Based on Country Selection)"} {...register("pincode")} />
              {errors.pincode && <span className="text-red-500">{errors.pincode.message}</span>}

              <div>
                <label htmlFor="careerPlans" className="block mb-1">
                  Career Plans / Notes
                </label>

                <textarea
                  id="careerPlans"
                  rows={5}
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                  {...register("careerPlans")}
                >
                  Enter your message here...
                </textarea>
                {errors.careerPlans && (
                  <span className="text-red-500">{errors.careerPlans.message}</span>
                )}
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
                  <button
                    type="submit"
                    className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2"
                  >
                    Next
                    <span>
                      <img src={arrow} alt="next arrow" className="ml-2" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <SideContent />
      </div>
    </div>
  );
};

export default EduDetails;
