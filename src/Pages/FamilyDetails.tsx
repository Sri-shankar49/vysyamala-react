import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"


// Define validation schema with zod
const schema = zod.object({
  fathername: zod.string().min(3, 'Father name is required'),
  fatherOccupation: zod.string().min(3, "Father's Occupation is required"),
  mothername: zod.string().min(3, 'Mother name is required'),
  motherOccupation: zod.string().min(3, "Mother's Occupation is required"),
  brother: zod.number().min(0, "Brother count is required"),
  marriedBrother: zod.number().min(0, "Married Brother count is required"),
  sister: zod.number().min(0, "Sister count is required"),
  marriedSister: zod.number().min(0, "Married Sister count is required"),
  familyType: zod.string().min(1, "Family Type is required"),
  familyValue: zod.string().min(1, "Family Value is required"),
  familyStatus: zod.string().min(1, "Family Status is required"),
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
  familyType?: string;
  familyValue?: string;
  familyStatus?: string;
  propertyDetails?: string;
  propertyWorth?: string;
  suyaGothram?: string;
  uncleGothram?: string;
  ancestorOrigin?: string;
  aboutMyFamily?: string;
  brother: number;
  marriedBrother: number;
  sister: number;
  marriedSister: number;
}

const FamilyDetails: React.FC = () => {

  // Navigate to next page
  const navigate = useNavigate();

  // React Hook form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FamilyDetailsInputs>({
    resolver: zodResolver(schema),
  });


  // Select buttons state
  const [selectedBrother, setSelectedBrother] = useState<number | null>(null);
  const [selectedMarriedBrother, setSelectedMarriedBrother] = useState<number | null>(null);
  const [selectedSister, setSelectedSister] = useState<number | null>(null);
  const [selectedMarriedSister, setSelectedMarriedSister] = useState<number | null>(null);

  const [selectedFamilyType, setSelectedFamilyType] = useState<string | null>(null);
  const [selectedFamilyValue, setSelectedFamilyValue] = useState<string | null>(null);
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<string | null>(null);

  // Background getting selected
  const buttonClass = (isSelected: boolean) => isSelected ? "bg-secondary text-white" : "border-gray hover:bg-secondary hover:text-white";


  // Update form values on state change
  const handleFamilyTypeChange = (value: string) => {
    setSelectedFamilyType(value);
    setValue("familyType", value, { shouldValidate: true });
  };

  const handleFamilyValueChange = (value: string) => {
    setSelectedFamilyValue(value);
    setValue("familyValue", value, { shouldValidate: true });
  };

  const handleFamilyStatusChange = (value: string) => {
    setSelectedFamilyStatus(value);
    setValue("familyStatus", value, { shouldValidate: true });
  };

  const handleBrotherChange = (value: number) => {
    setSelectedBrother(value);
    setValue("brother", value, { shouldValidate: true });
  };

  const handleMarriedBrotherChange = (value: number) => {
    setSelectedMarriedBrother(value);
    setValue("marriedBrother", value, { shouldValidate: true });
  };

  const handleSisterChange = (value: number) => {
    setSelectedSister(value);
    setValue("sister", value, { shouldValidate: true });
  };

  const handleMarriedSisterChange = (value: number) => {
    setSelectedMarriedSister(value);
    setValue("marriedSister", value, { shouldValidate: true });
  };


  const onSubmit: SubmitHandler<FamilyDetailsInputs> = async (data) => {
    // console.log(data);
    console.log({ ...data, selectedBrother, selectedMarriedBrother, selectedSister, selectedMarriedSister, selectedFamilyType, selectedFamilyValue, selectedFamilyStatus });

    navigate('/EduDetails'); //  EduDetails next page route
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
            {/* Brother Section */}
            <div>
              <h1 className="mb-3">Brother</h1>
              <div className="flex flex-col">
                <div className="inline-flex rounded">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`px-5 py-3 text-sm font-medium border ${buttonClass(selectedBrother === num)}`}
                      onClick={() => handleBrotherChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {errors.brother && <span className="text-red-500">{errors.brother.message}</span>}
              </div>
            </div>

            <div>
              <h1 className="mb-3">Married</h1>
              <div className="flex flex-col">
                <div className="inline-flex rounded">
                  {[0, 1, 2].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`px-10 py-3 text-sm font-medium border ${buttonClass(selectedMarriedBrother === num)}`}
                      onClick={() => handleMarriedBrotherChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {errors.marriedBrother && <span className="text-red-500">{errors.marriedBrother.message}</span>}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-48">
            <div>
              <h1 className="mb-3">Sister</h1>
              <div className="flex flex-col">
                <div className="inline-flex rounded">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`px-5 py-3 text-sm font-medium border ${buttonClass(selectedSister === num)}`}
                      onClick={() => handleSisterChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {errors.sister && <span className="text-red-500">{errors.sister.message}</span>}
              </div>
            </div>

            <div>
              <h1 className="mb-3">Married</h1>
              <div className="flex flex-col">
                <div className="inline-flex rounded">
                  {[0, 1, 2].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`px-10 py-3 text-sm font-medium border ${buttonClass(selectedMarriedSister === num)}`}
                      onClick={() => handleMarriedSisterChange(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {errors.marriedSister && <span className="text-red-500">{errors.marriedSister.message}</span>}
              </div>
            </div>
          </div>

          {/* Family Type Section */}
          <div className="mt-3">
            <h1 className="mb-3">Family Type</h1>

            <div className="flex flex-col">
              <div className="w-full inline-flex rounded">
                {["Joint", "Nuclear"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(selectedFamilyType === type)}`}
                    onClick={() => handleFamilyTypeChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.familyType && <span className="text-red-500">{errors.familyType.message}</span>}
            </div>
          </div>

          {/* Family Value Section */}
          <div className="mt-3">
            <h1 className="mb-3">Family Value</h1>

            <div className="w-full inline-flex rounded">
              {["Orthodox", "Traditional", "Moderate", "Liberal"].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(selectedFamilyValue === value)}`}
                  onClick={() => handleFamilyValueChange(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            {errors.familyValue && <span className="text-red-500">{errors.familyValue.message}</span>}
          </div>

          {/* Family Status Section */}
          <div className="mt-3">
            <h1 className="mb-3">Family Status</h1>

            <div className="w-full inline-flex rounded">
              {["Middle Class", "Upper Middle Class", "Rich"].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(selectedFamilyStatus === status)}`}
                  onClick={() => handleFamilyStatusChange(status)}
                >
                  {status}
                </button>
              ))}
            </div>
            {errors.familyStatus && <span className="text-red-500">{errors.familyStatus.message}</span>}
          </div>

          {/* Additional Input Fields */}
          <div>
            <InputField label={"Property Details"} {...register("propertyWorth")} />
          </div>

          <div>
            <InputField label={"Property Worth"} {...register("propertyWorth")} />
          </div>

          <div>
            <InputField label={"Suya Gothram"} {...register("suyaGothram")} />
          </div>

          <div>
            <InputField label={"Uncle Gothram"} {...register("uncleGothram")} />
          </div>

          <div>
            <InputField label={"Ancestor Origin"} {...register("ancestorOrigin")} />
          </div>

          <div>
            <label htmlFor="aboutMyFamily" className="block mb-1">
              About my Family
            </label>

            <textarea id="aboutMyFamily" rows={5} className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded" {...register("aboutMyFamily")}>Enter your message here...</textarea>
          </div>

          <div className="mt-7 flex justify-between">
            <div className="">
              <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                Back
              </button>
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

export default FamilyDetails;
