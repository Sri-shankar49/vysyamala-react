import { IoArrowBackOutline } from "react-icons/io5";
import { ListCard } from '../../Components/LoginHome/MatchingProfiles/ProfileCard/ListCard';
import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles';

interface DashBoardMutualInterestProps {
    dashBoardAgain: () => void;
}
export const DashBoardMutualInterest: React.FC<DashBoardMutualInterestProps> = ({ dashBoardAgain }) => {
    return (
        <div className="bg-grayBg">
            <div className="container mx-auto py-10">

                <div className="flex items-center mb-5">
                    <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
                    <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold"> Mutual Interest
                        <span className="text-sm text-primary"> (05)</span>
                    </h4>
                </div>

                {/* ListCard */}
                <div>
                    <ListCard />
                    <ListCard />
                    <ListCard />
                    <ListCard />
                    <ListCard />
                </div>
            </div>
            {/* Suggested Profiles */}
            <SuggestedProfiles />

        </div>
    )
}
