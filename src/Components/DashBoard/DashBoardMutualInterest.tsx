import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MutualInterestCard } from '../../Components/LoginHome/MatchingProfiles/ProfileCard/MutualInterestCard';
import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles';

interface DashBoardMutualInterestProps {
  dashBoardAgain: () => void;
  profile: Profile; // Ensure that profile is passed here
}

export const DashBoardMutualInterest: React.FC<DashBoardMutualInterestProps> = ({ dashBoardAgain, profile }) => {
  return (
    <div className="bg-grayBg">
      <div className="container mx-auto py-10">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
            Mutual Interest
            <span className="text-sm text-primary"> (05)</span>
          </h4>
        </div>

        <div>
          <MutualInterestCard profile={profile} />
        </div>
      </div>
      <SuggestedProfiles />
    </div>
  );
};
