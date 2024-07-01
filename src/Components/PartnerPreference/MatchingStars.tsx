import React from 'react';
import Checkbox from './CheckBox';  // Import the Checkbox component

interface MatchingStarsProps {
    initialPoruthas: string;
    starAndRasi: { star: string; rasi: string }[]; // Array of objects with star and rasi names
}

const MatchingStars: React.FC<MatchingStarsProps> = ({ initialPoruthas, starAndRasi }) => {

    return (
        <div>
            <div className="mb-5">
                <h5 className="text-[18px] text-primary font-semibold mb-2">
                    {initialPoruthas}
                </h5>

                <div className="grid grid-cols-5 grid-rows-1 justify-between items-center gap-x-3 gap-y-2">
                    {/* Display stars and rasi */}
                    {starAndRasi.map((item, index) => (
                        <div key={`star-rasi-${index}`}>
                            <Checkbox
                                id={`star-${index}`}
                                name={`star-${index}`}
                                value={`${item.star} - ${item.rasi}`}  // Ensure value reflects star and rasi
                                label={`${item.star} - ${item.rasi}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatchingStars;
