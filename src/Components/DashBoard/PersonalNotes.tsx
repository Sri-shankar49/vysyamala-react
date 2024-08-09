import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { PersonalNotesCard } from './PersonalNotes/PersonalNotesCard';
import { SuggestedProfiles } from '../LoginHome/SuggestedProfiles';

interface PersonalNotesProps {
    dashBoardAgain: () => void;
}

export const PersonalNotes: React.FC<PersonalNotesProps> = ({ dashBoardAgain }) => {
    return (
        <div className="bg-grayBg pt-10">
            <div className="container mx-auto">

                <div className="flex items-center mb-5">
                    <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
                    <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold"> Personal Notes
                        <span className="text-sm text-primary"> (05)</span>
                    </h4>
                </div>

                {/* Personal Notes Card */}
                <div>
                    <PersonalNotesCard />
                    {/* <PersonalNotesCard /> */}
                </div>
            </div>
            <SuggestedProfiles />
        </div>
    )
}
