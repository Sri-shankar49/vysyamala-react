import { SetStateAction, useEffect, useState } from "react";
import { GetProfession, GetState } from "../../commonapicall";

interface professionType {
  profession_id: number;
  profession_name: string;
}

interface stateType {
  State_Pref_id: number;
  State_name: string;
}
const SearchProfiles = () => {
  const [clickedButton, setClickedButton] = useState("Occupation");
  const [professions, setProfessions] = useState<professionType[]>([]);
  const [states, setStates] = useState<stateType[]>([]);
  // countryList

  // ProfessionList
  const getProfessionData = async () => {
    const response = await GetProfession();
    const object = Object.values(response?.data) as professionType[];
    setProfessions(object);
    setStates([]);
    setClickedButton("Profession");
  };
  const getStateList = async () => {
    const response = await GetState();
    const object = Object.values(response?.data) as stateType[];
    setStates(object);

    setProfessions([]);
    setClickedButton("State");
  };

  useEffect(() => {}, []);

  const handleClick = (buttonName: SetStateAction<string>) => {
    setClickedButton(buttonName);
  };
  console.log(professions)
console.log(states)
  return (
    <div className="bg-gray">
      <div className="container py-20 max-lg:py-14 max-sm:py-10 max-sm:pb-0">
        <div className="text-center">
          <h1 className="text-main text-2xl font-semibold pb-2 max-md:text-xl max-sm:text-base ">Search</h1>
          <h2 className=" text-primary text-lg font-bold">
            Matrimonial Profiles By
          </h2>
        </div>
        <hr className="my-10 text-footer-text-gray max-sm:hidden" />

        <div className="mt-10 space-y-8 max-lg:space-y-5 max-lg:mt-8 max-sm:mt-5 max-sm:space-y-0">
          <div className="flex justify-center space-x-5 max-sm:flex-wrap max-sm:flex-col max-sm:space-x-0">
            <button
              className={`px-5 py-2 font-semibold rounded max-sm:font-medium max-sm:bg-gray max-sm:text-start max-sm:text-[16px] max-sm:p-3 max-sm:text-primary  max-sm:border-b-[1px] max-sm:border-t-[1px] max-sm:rounded-none max-sm:border-footer-text-gray ${
                clickedButton === "Occupation" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => handleClick("Occupation")}
            >
              Occupation
            </button>
            <button
              className={`px-5 py-2 font-semibold rounded max-sm:font-medium max-sm:bg-gray max-sm:text-start max-sm:text-[16px] max-sm:p-3 max-sm:text-primary  max-sm:border-b-[1px] max-sm:rounded-none max-sm:border-footer-text-gray ${
                clickedButton === "Profession" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={getProfessionData}
            >
              Profession
            </button>
            <button
              className={`px-5 py-2 font-semibold rounded max-sm:font-medium max-sm:bg-gray max-sm:text-start max-sm:text-[16px] max-sm:p-3 max-sm:text-primary  max-sm:border-b-[1px] max-sm:rounded-none max-sm:border-footer-text-gray ${
                clickedButton === "City" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => handleClick("City")}
            >
              City
            </button>
            <button
              className={`px-5 py-2 font-semibold rounded max-sm:font-medium max-sm:bg-gray max-sm:text-start max-sm:text-[16px] max-sm:p-3 max-sm:text-primary  max-sm:border-b-[1px] max-sm:rounded-none max-sm:border-footer-text-gray ${
                clickedButton === "State" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => getStateList()}
            >
              State
            </button>
          </div>
          <div className="flex justify-center items-center space-x-10 divide-x-2 divide-footer-text-gray max-md:flex-wrap max-sm:flex-col max-sm:items-start max-sm:space-x-0  max-sm:divide-x-0  ">
            {professions &&
              professions.map((profession) => (
                <button key={profession.profession_id} className="pl-10 max-sm:p-2">
                  {String(profession.profession_name)}
                </button>
              ))}

            {states &&
              states.map((state) => (
                <button key={state.State_Pref_id} className="pl-10 max-sm:p-2 ">
                  {String(state.State_name)}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProfiles;
