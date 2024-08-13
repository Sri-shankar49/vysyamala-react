// import React, { useState, useEffect, useRef } from "react";
import NotificationsImg from "../../assets/images/NotificationsImg.png";
import { Link } from "react-router-dom";

export const Notifications = () => {
  return (
    <div className="bg-grayBg py-10">
      <div className="container mx-auto">
        {/* <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5">Notifications</h4> */}
        <div
          className="notification-dropdown bg-white rounded-md shadow-lg py-1 z-20">
          <h4 className="text-[24px] text-vysyamalaBlack font-bold px-3 py-3">Notifications</h4>

          <div className="">
            {/* Express Interest */}
            <div className="bg-lightFade-pink flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">

              <div>
                <img src={NotificationsImg} alt="Harini Image" className="w-full" />
              </div>

              <div className="">
                <h5 className="text-lg text-vysyamalaBlack font-semibold">Harini has expressed interest in your profile</h5>
                <p className="text-md text-ashSecondary font-normal mb-3">I am interested in your profile. If you are interested in my profile, please contact me.</p>
                <button className="text-main rounded-md border-[2px] border-main px-2 py-1">Message</button>
                <p className="text-sm text-ashSecondary font-semibold mt-3">Today</p>
              </div>
            </div>

            {/* Photo Request */}
            <div className="bg-lightFade-pink flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">

              <div>
                <img src={NotificationsImg} alt="Harini Image" className="w-full" />
              </div>

              <div className="">
                <h5 className="text-lg text-vysyamalaBlack font-semibold">Harini has requested your photo</h5>
                <p className="text-md text-ashSecondary font-normal mb-3">Update your profile image to get more matches</p>
                <button className="text-main rounded-md border-[2px] border-main px-2 py-1">Update my photo</button>
                <p className="text-sm text-ashSecondary font-semibold mt-3">1d ago</p>
              </div>
            </div>

            {/* Change in Photo */}
            <div className="bg-white flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">

              <div>
                <img src={NotificationsImg} alt="Harini Image" className="w-full" />
              </div>

              <div className="">
                <h5 className="text-lg text-vysyamalaBlack font-semibold">Change in Photo</h5>
                <p className="text-md text-ashSecondary font-normal mb-3">Harini the profile you have visited has uploaded a new photo. Check it out!</p>
                <p className="text-sm text-ashSecondary font-semibold mt-3">1 week ago</p>
              </div>
            </div>

            {/* Change in Photo */}
            <div className="bg-white flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">

              <div>
                <img src={NotificationsImg} alt="Harini Image" className="w-full" />
              </div>

              <div className="">
                <h5 className="text-lg text-vysyamalaBlack font-semibold">Change in Annual Income</h5>
                <p className="text-md text-ashSecondary font-normal mb-3">Harini the profile you have visited has updated her annual income. Check it out!</p>
                <p className="text-sm text-ashSecondary font-semibold mt-3">2 week ago</p>
              </div>
            </div>
          </div>

          <div className="text-center px-3 py-3">
            <Link to="/Notifications">
              <button className="w-full rounded-md text-lg text-white bg-gradient py-3 font-semibold">See previous notifications</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
