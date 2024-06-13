// import React from 'react'
import HeroBanner from "../../assets/images/HeroBanner.webp";
import { FaArrowRightLong } from "react-icons/fa6";

export const HeroSection = () => {
    return (
        <div>
            <section className="relative h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${HeroBanner})` }}>
                <div className="absolute bottom-[100px] container mx-auto p-[24px] bg-gloss-black rounded-[8px]">
                    <h5 className="text-[20px] font-semibold text-white">A Platform to</h5>
                    <h3 className="text-[36px] font-bold text-secondary">Find your perfect partner and family</h3>

                    <div className="flex items-center justify-between">
                        <div>
                            <select name="" id="" className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0">
                                <option value="Select Profile for" hidden className="text-white">Select Profile for</option>
                                <option value="2" className="text-white">Your Self</option>
                                <option value="3" className="text-white">Son/Daughter</option>
                                <option value="4" className="text-white">Siblings</option>
                                <option value="5" className="text-white">Relative</option>
                                <option value="5" className="text-white">Friend</option>
                            </select>
                        </div>

                        <div>
                            <input type="tel" placeholder="Mobile Number" className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold" />
                        </div>

                        <div>
                            <input type="email" placeholder="Email" className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold" />
                        </div>

                        <div>
                            <input type="password" placeholder="Create Password" className="bg-gloss-black text-[16px] text-white font-semibold py-[13px] px-[24px] border-[3px] border-[white] rounded-[8px] focus-visible:outline-0 placeholder:text-[16px] placeholder:text-white placeholder:font-semibold" />
                        </div>

                        <div className="bg-gradient flex justify-center items-center py-[13px] px-[24px] rounded-[6px] space-x-2">
                            <button className="text-[16px] text-white font-semibold">Register</button>
                            <FaArrowRightLong className="text-white text-[22px]" />
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
