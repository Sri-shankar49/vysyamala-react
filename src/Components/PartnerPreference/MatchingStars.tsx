import React from 'react';
import Checkbox from './CheckBox';

interface MatchingStarsProps {
    initialPoruthas: string;
    starAndRasi: { star: string; rasi: string }[];
}

const MatchingStars: React.FC<MatchingStarsProps> = ({ initialPoruthas, starAndRasi }) => {
    // Handler for checkbox change events
    const handleCheckboxChange = (id: string, checked: boolean) => {
        console.log(`Checkbox with ID ${id} is ${checked ? 'checked' : 'unchecked'}`);
    };

    return (
        <div>
            <div className="mb-5">
                <h5 className="text-[18px] text-primary font-semibold mb-2">
                    {initialPoruthas}
                </h5>
                <div className="grid grid-cols-5 grid-rows-1 justify-between items-center gap-x-3 gap-y-2">
                    {starAndRasi.map((item, index) => {
                        const uniqueId = `star-${item.star}-${item.rasi}-${index}`;
                        return (
                            <div key={uniqueId}>
                                <Checkbox
                                    id={uniqueId}
                                    name={`star-${index}`}
                                    value={`${item.star} - ${item.rasi}`}
                                    label={`${item.star} - ${item.rasi}`}
                                    onChange={(e) => handleCheckboxChange(uniqueId, e.target.checked)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MatchingStars;
