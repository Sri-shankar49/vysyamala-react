import React from "react";
import Checkbox from "./CheckBox";

interface MatchingStarsProps {
  initialPoruthas: string;
  starAndRasi: {
    id: string;
    matching_starname: string;
    matching_rasiname: string;
    matching_starId: string;
    matching_rasiId: string;
  }[];
  selectedStarIds: string[];
  onCheckboxChange: (updatedIds: string[], rasi: string, star: string) => void;
}

const MatchingStars: React.FC<MatchingStarsProps> = ({
  initialPoruthas,
  starAndRasi,
  selectedStarIds,
  onCheckboxChange,
}) => {
  const handleCheckboxChange = (
    id: string,
    rasi: string,
    star: string,
    checked: boolean
  ) => {
    const updatedIds = checked
      ? [...selectedStarIds, id]
      : selectedStarIds.filter((itemId) => itemId !== id);

    onCheckboxChange(updatedIds, rasi, star); // Pass updated IDs along with rasi and star
  };

  return (
    <div>
      <div className="mb-5">
        <h5 className="text-[18px] text-primary font-semibold mb-2">
          {initialPoruthas}
        </h5>
        <div className="grid grid-cols-5 grid-rows-1 justify-between items-center gap-x-3 gap-y-2">
          {starAndRasi.map((item, index) => (
            <div key={item.id}>
              <Checkbox
                id={item.id}
                name={`star-${index}`}
                value={`${item.matching_starId} - ${item.matching_rasiId}`}
                label={`${item.matching_starname} - ${item.matching_rasiname}`}
                checked={selectedStarIds.includes(item.id)}
                onChange={(e) =>
                  handleCheckboxChange(
                    item.id,
                    item.matching_rasiId,
                    item.matching_starId,
                    e.target.checked
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingStars;
