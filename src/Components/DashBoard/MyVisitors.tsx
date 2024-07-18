import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { MyVisitorsCard } from './MyVisitors/MyVisitorsCard';
import { SuggestedProfiles } from '../LoginHome/SuggestedProfiles';

interface MyVisitorsProps {
    dashBoardAgain: () => void;
}

export const MyVisitors: React.FC<MyVisitorsProps> = ({ dashBoardAgain }) => {
    return (
        <div className="bg-grayBg py-10">
            <div className="container mx-auto">

                <div className="flex justify-between items-center mb-5">

                    <div className="flex justify-center items-center">
                        <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
                        <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold"> My Visitors
                            <span className="text-sm text-primary"> (05)</span>
                        </h4>
                    </div>

                    <div>
                        <select name="month" id="month" className="rounded-md p-3 shadow focus-visible:outline-none">
                            <option value="jan">January</option>
                            <option value="feb">February</option>
                            <option value="mar">March</option>
                            <option value="Apr">April</option>
                            <option value="may">May</option>
                            <option value="jun">June</option>
                            <option value="jul">July</option>
                            <option value="aug">August</option>
                            <option value="sep">September</option>
                            <option value="oct">October</option>
                            <option value="nov">November</option>
                            <option value="dec">December</option>
                        </select>
                    </div>
                </div>

                {/* My Visitors Card */}
                <div className="bg-white rounded-xl shadow px-5 py-5 mb-10">
                    <p className="text-ashSecondary font-semibold">Today</p>
                    <MyVisitorsCard />
                    <MyVisitorsCard />
                </div>
            </div>
            <SuggestedProfiles />
        </div>
    )
}
