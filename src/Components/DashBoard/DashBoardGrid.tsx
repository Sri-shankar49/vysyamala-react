import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import React, { useContext, useEffect } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { HiUsers } from "react-icons/hi";
import ProfileImgRounded from "../../assets/images/ProfileImgRounded.png"
import { RiHeartsFill } from "react-icons/ri";
import { MdBookmark } from "react-icons/md";
import PinkLayer from "../../assets/images/pinkLayer.png"
import VioletLayer from "../../assets/images/violetLayer.png"
import YellowLayer from "../../assets/images/yellowLayer.png"
import MyProfileImg from "../../assets/images/MyProfileImg.png"
import { FaArrowRight } from "react-icons/fa6";
import InterestCard from './DashBoardGrid/InterestCard';
import { IndicatorCard } from './DashBoardGrid/IndicatorCard';
import { OptionCard } from './DashBoardGrid/OptionCard';
import { PiTrayArrowUpFill } from "react-icons/pi";
import { MdPreview } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { BiSolidUserVoice } from "react-icons/bi";
import { RiAlertFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { ProfileContext } from "../../ProfileContext"

interface DashBoardGridProps {
    onDashBoardMatchingProfiles: () => void;
    onDashBoardMutualInterest: () => void;
    onDashBoardWishlist: () => void;

    // Profile Card
    onProfileDetails: () => void;

    // Indicator Cards
    onInterestSent: () => void;
    onViewedProfiles: () => void;
    onMyVisitors: () => void;

    // Optional Cards
    onPersonalNotes: () => void;
    onOtherSettings: () => void;

}

export const DashBoardGrid: React.FC<DashBoardGridProps> = ({ onDashBoardMatchingProfiles, onDashBoardMutualInterest, onDashBoardWishlist, onProfileDetails, onInterestSent, onViewedProfiles, onMyVisitors, onPersonalNotes, onOtherSettings }) => {

    // Circular Progress bar value
    const percentage = 85;

    // Use context safely
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error('DashBoardGrid must be used within a ProfileProvider');
    }

    const { dashboardDetails, fetchDashboardDetails } = context;

    useEffect(() => {
        fetchDashboardDetails();
    }, []);


    return (
        <div className="container mx-auto">
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5">Dashboard</h4>

            <div className="space-y-10 mb-10">
                <div className="grid grid-rows-1 grid-cols-2 gap-5 items-center">

                    {/* 3 Dashboard Cards */}
                    <div>
                        <div className="grid grid-rows-2 grid-cols-2 gap-5 items-center">
                            {/* Matching Profiles */}
                            <div onClick={onDashBoardMatchingProfiles}
                                className="relative row-span-2 w-full h-full bg-vysyamalaPink shadow-lg rounded-xl p-5 cursor-pointer">
                                <div className="absolute top-0 bottom-0 right-0">
                                    <img src={PinkLayer} alt="" className="w-full h-full" />
                                </div>
                                <div>
                                    <HiUsers className="text-[36px] text-white" />
                                    <h4 className="text-[20px] text-white font-semibold mt-3">Matching Profiles</h4>
                                    <p className="text-[48px] text-white font-semibold my-5">234</p>
                                    <div>
                                        <img src={ProfileImgRounded} alt="" />
                                    </div>
                                </div>
                            </div>

                            {/* Mutual Interest */}
                            <div onClick={onDashBoardMutualInterest}
                                className="relative w-full h-full bg-vysyamalaViolet rounded-xl shadow-lg p-5 cursor-pointer">
                                <div className="absolute top-0 bottom-0 right-0">
                                    <img src={VioletLayer} alt="" className="w-full h-full" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-[20px] text-white font-semibold">Mutual Interest</h4>
                                        <p className="text-[48px] text-white font-semibold">{dashboardDetails?.mutual_int_count}</p>
                                    </div>

                                    <div className="z-10">
                                        <RiHeartsFill className="text-[48px] text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Wishlist */}
                            <div onClick={onDashBoardWishlist}
                                className="relative w-full bg-vysyamalaYellow rounded-xl shadow-lg p-5 cursor-pointer">
                                <div className="absolute top-0 bottom-0 right-0">
                                    <img src={YellowLayer} alt="" className="w-full h-full" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-[20px] text-white font-semibold">Wishlist</h4>
                                        <p className="text-[48px] text-white font-semibold">{dashboardDetails?.wishlist_count}</p>
                                    </div>

                                    <div className="z-10">
                                        <MdBookmark className="text-[48px] text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* My Profile */}
                    <div>
                        <div className="bg-white rounded-xl shadow-md p-5">

                            <div className="flex justify-between items-start mb-5">
                                <div className="flex justify-center items-center space-x-5">
                                    <div>
                                        <img src={MyProfileImg} alt="My Profile Image" className="" />
                                    </div>
                                    <div>
                                        <h4 className="text-[21px] text-vysyamalaBlackSecondary font-bold">{dashboardDetails?.profile_details.profile_name}</h4>
                                        <p className="text-primary font-semibold">{dashboardDetails?.profile_details.profile_id}</p>
                                        <p className="text-primary font-semibold">Valid Upto : 16-July-2024</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="bg-gradientGold text-primary font-semibold rounded-md px-3 py-0.5 ">Gold</p>
                                </div>
                            </div>

                            <div className="bg-vysyamalaLightSandal px-5 py-7">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h5 className="text-lg text-primary font-semibold">Your profile is now {`${dashboardDetails?.profile_details.completion_per}`} complete</h5>
                                        <p className="text-sm text-primary">Complete your profile we will suggest profiles based on your preference</p>

                                        <button onClick={onProfileDetails} className="flex items-center text-lg text-main font-semibold my-3">Complete Your Profile <FaArrowRight className="ml-2" /></button>
                                    </div>
                                    <div className="w-24 h-24 text-primary font-semibold">
                                        <CircularProgressbar value={percentage} text={`${percentage}%`}
                                            styles={buildStyles({
                                                pathColor: `rgba(47, 189, 18, ${percentage / 100})`,
                                                textColor: '#535665',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="grid grid-rows-1 grid-cols-2 gap-5 items-center">

                    {/* Received Interest */}
                    <div>
                        <h4 className="text-[21px] text-primary font-semibold mb-5">Received Interest
                            <span className="text-sm"> ({dashboardDetails?.received_int_count})</span>
                        </h4>

                        <p className="text-sm text-ashSecondary font-semibold mb-3">Today</p>

                        <div className="h-[21rem] overflow-scroll overflow-x-hidden overscroll-y-auto">
                            <InterestCard />
                        </div>
                    </div>

                    {/* My Options */}
                    <div>
                        <div className="grid grid-rows-2 grid-cols-2 gap-5">
                            <IndicatorCard
                                onClick={onInterestSent}
                                cardTitle="Interest Sent"
                                cardCount={String(dashboardDetails?.sent_int_count || 0)}
                                cardIcon={<PiTrayArrowUpFill />}
                            />
                            <IndicatorCard
                                onClick={onViewedProfiles}
                                cardTitle="Viewed Profiles"
                                cardCount={String(dashboardDetails?.viewed_profile_count || 0)}
                                cardIcon={<MdPreview />}
                            />
                            <IndicatorCard
                                onClick={onMyVisitors}
                                cardTitle="My Visitors"
                                cardCount={String(dashboardDetails?.myvisitor_count || 0)}
                                cardIcon={<FaUsers />}
                            />
                            <IndicatorCard cardTitle="Gallery" cardCount={"05"} cardIcon={<FaImages />} onClick={function (): void {
                                throw new Error('Function not implemented.');
                            }} />
                        </div>

                        {/* Other options */}
                        <div className="mt-5">
                            <div className="flex justify-between items-center gap-5">
                                <OptionCard onClick={onPersonalNotes} cardTitle="Personal Notes" cardIcon={<IoDocumentText />} />
                                <OptionCard cardTitle="Vys Assist" cardIcon={<BiSolidUserVoice />} onClick={function (): void {
                                    throw new Error('Function not implemented.');
                                }} />
                                <OptionCard cardTitle="Spot on Error" cardIcon={<RiAlertFill />} onClick={function (): void {
                                    throw new Error('Function not implemented.');
                                }} />
                                <OptionCard onClick={onOtherSettings} cardTitle="Other Settings" cardIcon={<MdManageAccounts />} />

                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}
