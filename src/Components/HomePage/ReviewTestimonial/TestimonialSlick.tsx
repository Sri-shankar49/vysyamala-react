import React from "react";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

interface TestimonialSlickProps {
  desc: string;
  img: string;
   name: string;
  datedOn: string;
  rating:number
}

const TestimonialSlick: React.FC<TestimonialSlickProps> = ({
  desc,
  img,
   name,
  datedOn,
  rating
}) => {
  return (
    <div className="bg-white space-y-8 mx-3 p-6 rounded-md shadow-lg">
      <div className="">
        <p className="text-primary tracking-wide leading-7">{desc}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-3 items-center">
          <img src={img} alt={name} />
          <div>
            <h1 className="font-semibold text-black">{name}</h1>
            <span className="text-sm text-primary">{datedOn}</span>
          </div>
        </div>
        <div className="flex text-yellow-500 text-[20px]">
        {Array.from({ length: 5 }, (_, index) =>
            index < rating ? <FaStar key={index} /> : <FiStar key={index} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlick;
