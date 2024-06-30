import { useState } from "react";

const SearchProfiles = () => {
  const [clickedButton, setClickedButton] = useState("Occupation");

  const handleClick = (buttonName) => {
    setClickedButton(buttonName);
  };

  return (
    <div className="bg-gray">
      <div className="container py-20 mb-10">
        <div className="text-center">
          <h1 className="text-main text-2xl font-semibold">Search</h1>
          <h2 className=" text-primary text-lg font-bold">
            Matrimonial Profiles By
          </h2>
        </div>

        <div className="mt-10 space-y-8">
          <div className="flex justify-center space-x-5">
            <button
              className={`px-5 py-2 font-semibold rounded ${
                clickedButton === "Occupation" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => handleClick("Occupation")}
            >
              Occupation
            </button>
            <button
              className={`px-5 py-2 font-semibold rounded ${
                clickedButton === "Profession" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => handleClick("Profession")}
            >
              Profession
            </button>
            <button
              className={`px-5 py-2 font-semibold rounded ${
                clickedButton === "City" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => handleClick("City")}
            >
              City
            </button>
            <button
              className={`px-5 py-2 font-semibold rounded ${
                clickedButton === "State" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => handleClick("State")}
            >
              State
            </button>
          </div>
          <div className="flex justify-center items-center space-x-10 divide-x-2 divide-footer-text-gray">
            <button className="pl-10 ">Doctor</button>
            <button className="pl-10 ">Engineer</button>
            <button className="pl-10 ">Designer</button>
            <button className="pl-10 ">Govt</button>
            <button className="pl-10 ">Aggarwal</button>
            <button className="pl-10 ">Aggarwal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProfiles;
