import React from 'react';
import Checkbox from './CheckBox';  // Import the Checkbox component

interface AnimatedMultiProps {
    initialPoruthas: string;
}

const MatchingStars: React.FC<AnimatedMultiProps> = ({ initialPoruthas }) => {
   

    return (
        <div>
            <div className="mb-5">
                <h5 className="text-[18px] text-primary font-semibold mb-2">
                    {initialPoruthas}
                </h5>

                <div className="grid grid-cols-5 grid-rows-1 justify-between items-center gap-x-3 gap-y-2">
                    <Checkbox
                        id="star1"
                        name="star1"
                        value="star1"
                        label="Star1"
                    />
                    <Checkbox
                        id="star2"
                        name="star2"
                        value="star2"
                        label="Star2"
                    />
                    <Checkbox
                        id="star3"
                        name="star3"
                        value="star3"
                        label="Star3"
                    />
                    <Checkbox
                        id="star4"
                        name="star4"
                        value="star4"
                        label="Star4"
                    />
                    <Checkbox
                        id="star5"
                        name="star5"
                        value="star5"
                        label="Star5"
                    />
                    <Checkbox
                        id="star6"
                        name="star6"
                        value="star6"
                        label="Star6"
                    />
                </div>
            </div>
        </div>
    );
};

export default MatchingStars;
