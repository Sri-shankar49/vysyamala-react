import React from 'react';
import { AddOns } from '../Components/PayNow/AddOns';
import { Link } from "react-router-dom";

export const PayNow: React.FC = () => {
    return (
        <div>
            <div className="container mx-auto">
                <div className="w-1/3 mx-auto font-semibold rounded-2xl shadow-xl p-10 my-10">
                    <h5 className="text-footer-gray mb-2">Selected Plan</h5>

                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-[24px] text-footer-gray font-bold mb-2">Platinum</h4>
                            <Link to="/MembershipPlan">
                                <p className="text-main underline font-normal">Change Plan</p>
                            </Link>                        </div>

                        <div>
                            <p className="text-ash">&#8377; 6,900.00/-</p>
                        </div>
                    </div>

                    <hr className="text-footer-text-gray my-5" />

                    <h5 className="text-footer-gray font-semibold mb-2">Add-On Packages</h5>

                    <AddOns label={"Vys Assist"} desc={"5 Members"} name={"vysAssist"} rate={900} />

                    <AddOns label={"Astro Service"} desc={"10 Profiles"} name={"astroService"} rate={900} />

                    <AddOns label={"Profile Booster"} desc={"3 Months"} name={"profileBooster"} rate={900} />

                    <AddOns label={"Portrait Photography"} desc={"6 Shots - Physical Presence required"} name={"potraitPhotography"} rate={4900} />

                    <AddOns label={"Video Profile"} desc={"60 Seconds - Video input required"} name={"videoProfile"} rate={2900} />

                    <AddOns label={"Pre-marriage Nutrition Consultant"} desc={"2 Sessions - 30 minutes each"} name={"preMarriage"} rate={2900} />

                    <hr className="text-footer-text-gray my-5" />

                    <div className="flex justify-between items-center">
                        <p className="text-footer-gray">Total</p>
                        <p className="text-[24px] text-primary font-bold">&#8377; 3199.00/-</p>
                    </div>

                    <Link to="/ThankYouReg">
                        <button type="submit" className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-5" >Pay Now</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};
