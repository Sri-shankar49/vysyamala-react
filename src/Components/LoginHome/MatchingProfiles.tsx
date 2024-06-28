import { FiFilter } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { FaSuitcase } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniViewColumns } from "react-icons/hi2";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
import { BsSortDown } from "react-icons/bs";
// import { BsSortUp } from "react-icons/bs";
import { GridView } from "./MatchingProfiles/GridView";

export const MatchingProfiles = () => {
    return (
        <div>
            <div className="container mx-auto">
                <div>
                    <h4 className="text-[24px] text-vysyamalaBlack font-semibold">Matching Profiles <span className="text-as">(234)</span></h4>
                </div>

                <div className="bg-white flex justify-center items-center rounded-lg space-x-5 shadow-lg my-5 px-3 py-3">
                    <div className="relative w-[150rem]">
                        <input
                            type="text"
                            placeholder="Search Profile ID on Matching Profiles"
                            className="w-full bg-white border-r-2 border-gray pl-10 py-3 focus-visible:outline-0" />
                        <HiOutlineSearch className="absolute top-4 text-[22px] text-ashSecondary" />
                    </div>

                    <div className="relative w-[100rem]">
                        <select name="" id="" className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0">
                            <option value="">Profession</option>
                            <option value="two">two</option>
                            <option value="three">three</option>
                            <option value="four">four</option>
                        </select>
                        <FaSuitcase className="absolute top-3 text-[22px] text-ashSecondary" />

                    </div>

                    <div className="relative w-full">
                        <select name="" id="" className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0">
                            <option value="">Age</option>
                            <option value="two">two</option>
                            <option value="three">three</option>
                            <option value="four">four</option>
                        </select>
                        <IoCalendar className="absolute top-3 text-[22px] text-ashSecondary" />
                        <div className="absolute top-0 left-[-12px]  w-0.5 h-full bg-gray"></div>
                        <div className="absolute top-0 right-[-12px]  w-0.5 h-full bg-gray"></div>
                    </div>

                    <div className="relative w-full">
                        <select name="" id="" className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0">
                            <option value="">Location</option>
                            <option value="two">two</option>
                            <option value="three">three</option>
                            <option value="four">four</option>
                        </select>
                        <FaLocationDot className="absolute top-3 text-[22px] text-ashSecondary" />
                        <div className="absolute top-0 right-[-12px]  w-0.5 h-full bg-gray"></div>
                    </div>

                    <div className="w-fit">
                        <FiFilter className="text-[22px] text-secondary mx-5 my-3" />
                    </div>

                    <div className="w-full">
                        <button className="w-full bg-gradient text-white rounded-r-[6px] font-semibold px-8 py-3">Find Match</button>
                    </div>
                </div>

                {/* Icon Sort */}
                <div className="flex justify-between items-center">
                    {/* View icons */}
                    <div className="flex justify-start items-start">
                        <div className="border-[1px] border-ashSecondary rounded-l-md p-2 cursor-pointer">
                            <HiMiniViewColumns className="text-[22px] text-ashSecondary hover:text-secondary" />
                        </div>
                        <div className="border-[1px] border-ashSecondary p-2 cursor-pointer">
                            <ImMenu className="text-[22px] text-ashSecondary hover:text-secondary" />
                        </div>
                        <div className="border-[1px] border-ashSecondary rounded-r-md p-2 cursor-pointer">
                            <BsFillGrid3X3GapFill className="text-[22px] text-ashSecondary hover:text-secondary" />
                        </div>
                    </div>

                    {/* Sort my date */}
                    <div className="flex justify-start items-center">
                        <BsSortDown className="text-[22px] text-ashSecondary hover:text-secondary mr-2" />
                        {/* <BsSortUp /> */}
                        <p className="text-vysyamalaBlack font-semibold">Sort by date</p>
                    </div>
                </div>


                {/* GridView */}
                <GridView />

            </div>
        </div>
    )
}
