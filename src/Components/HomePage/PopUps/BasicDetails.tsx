import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

interface BasicDetailsProps {
  onNext: () => void;
  onClose: () => void;
}

export const BasicDetails: React.FC<BasicDetailsProps> = ({
  onNext,
  onClose,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary text-[22px] text-center mb-4 font-semibold">
        Great! Now some basic <br />
        details about your daughter
      </h2>
      <div className="mb-5 space-y-5">
        <input
          type="text"
          id="name"
          placeholder="Daughter name (based on create profile for)"
          className="outline-none px-3 py-2 w-full text-primary border border-footer-text-gray rounded"
        />

        <select
          id="maritalStatus"
          className="text-ash font-medium block w-full px-3 py-2 border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
        >
          <option value="Select your Marital Status" selected disabled>
            Select your Marital Status
          </option>
          <option value="Single">Single</option>
          <option value="Widow / Widower">Widow / Widower</option>
          <option value="Divorced">Divorced</option>
        </select>

        <input
          type="date"
          placeholder="Date of Birth"
          className="outline-none px-3 py-2 w-full text-primary border border-footer-text-gray rounded"
        />

        <input
          type="number"
          placeholder="Height in cms"
          className="outline-none px-3 py-2 w-full text-primary border border-footer-text-gray rounded"
        />

        <select
          id="complexion"
          className="text-ash font-medium block w-full px-3 py-2 border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
        >
          <option value="Select your complexion" selected disabled>
            Select your complexion
          </option>
          <option value="Fair">Fair</option>
          <option value="White">White</option>
          <option value="Brown">Brown</option>
          <option value="Black">Black</option>
        </select>
      </div>

      <Link to="/ThankYou">
        <button
          type="submit"
          onClick={onClose}
          className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-2"
        >
          Save Details
        </button>
      </Link>

      <IoIosCloseCircle
        onClick={onClose}
        className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
      />
    </form>
  );
};
