import  { useEffect, useState } from "react";
import Award from "../../assets/icons/Award.png";
import { AwardCard } from "./AwardGallery/AwardCard";

import axios from "axios";

export interface AwardType {
  name: string;
  image: string;
  description: string;
}

export const AwardsGallery = () => {
  const [awards, setAwards] = useState<AwardType[]>([]);

  const happyStories = async () => {
    const response = await axios.post(
      "http://103.214.132.20:8000/auth/Awards_gallery/"
    );

    setAwards(response.data.data);
    return response.data;
  };
  useEffect(() => {
    happyStories();
  });
  return (
    <div>
      <div className="container mx-auto">
        <div className="text-center">
          <div className="">
            <img src={Award} alt="Award-icon" className="w-fit mx-auto" />
          </div>
          <h4 className="text-primary text-[36px] font-semibold">
            Awards Gallery
          </h4>
        </div>

        <div className="flex justify-between items-center my-8">
          {awards.map((data) => (
            <AwardCard
              image={data.image}
              awardName={data.name}
              awardDesc={data.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
