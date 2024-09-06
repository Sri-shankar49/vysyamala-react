import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { VysAssistCard } from './VysAssist/VysAssistCard';
import { SuggestedProfiles } from '../LoginHome/SuggestedProfiles';

interface VysassistNotesPopupProps {
    dashBoardAgain: () => void;
}

export const VysAssist: React.FC<VysassistNotesPopupProps> = ({ dashBoardAgain }) => {
    return (
        <div className="bg-grayBg pt-10">
            <div className="container mx-auto">

                <div className="flex items-center mb-5">
                    <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
                    <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold"> Vysassist Notes
                        <span className="text-sm text-primary"> (05)</span>
                    </h4>
                </div>

                {/* Personal Notes Card */}
                <div>
                    <VysAssistCard />
                    {/* <PersonalNotesCard /> */}
                </div>
            </div>
            <SuggestedProfiles />
        </div>
    )
}
