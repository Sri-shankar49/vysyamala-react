import React from "react";



export interface happyStoriesType {
  couple_name: string;
  details: string;
  photo: string;
}

interface MarriedSlickProps {
  data: happyStoriesType;
}

const MarriedSlick: React.FC<MarriedSlickProps> = ({ data }) => {
  return (
    <div className="mx-3">
      <div className="relative">
        <img src={data.photo} alt={data.couple_name} />

        <div className="absolute bottom-8 left-10 text-white">
          <h1 className="text-xl">{data.couple_name}</h1>
        </div>
      </div>
    </div>
  );
};

export default MarriedSlick;
