import React from "react";

import { RiDraggable } from "react-icons/ri";

const RasiGrid = () => {
  const labels = [
    "Raghu/Rahu",
    "Mars/Chevai",
    "Jupiter/Guru",
    "Mercury/Budhan",
    "Saturn/Sani",
    "Lagnam",
    "Sun/Suriyan",
    "Venus/Sukran",
    "Moon/Chandran",
    "Kethu/Ketu",
  ];

  return (
    <div className="flex space-x-16 justify-center items-center h-screen bg-gray-200">
      {/* Labels */}
      <div className="flex flex-col space-y-2">
        {labels.map((label, index) => (
          <div
            key={index}
            className="flex items-center bg-yellow-200 px-2 py-3 rounded text-center hover:cursor-grab"
          >
            <RiDraggable className="mr-2" />
            {label}

            {label}
          </div>
        ))}
      </div>

      {/* Rasi Grid */}
      <div className="grid grid-cols-3 gap-2">
        {/* Top Row */}
        <div className="col-span-3 grid grid-cols-4 gap-2">
          {/* {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-24 h-24 border"></div>
            ))} */}
          <div className="w-32 h-32 rounded border border-ash"></div>
          <div className="w-32 h-32 rounded border border-ash"></div>
          <div className="w-32 h-32 rounded border border-ash"></div>
          <div className="w-32 h-32 rounded border border-ash"></div>
        </div>
        {/* Middle Row */}
        <div className="col-span-3 grid grid-cols-4 gap-2 relative">
          <div className="w-32 h-32 rounded border border-ash"></div>
          <div className="absolute left-[138px] w-[260px] h-[263px] bg-ashSecondary rounded flex justify-center items-center font-bold text-center">
            Rasi
          </div>
          <div className="absolute right-0 w-32 h-32 rounded border border-ash"></div>
        </div>
        {/* Bottom Row */}
        <div className="col-span-3 grid grid-cols-3 gap-2 relative">
          {/* {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-32 h-32 border"></div>
            ))} */}

          <div className="w-32 h-32  rounded border border-ash"></div>
          <div className="absolute right-0 w-32 h-32  rounded border"></div>
        </div>

        <div className="col-span-3 grid grid-cols-4 gap-2">
          {/* {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-32 h-32 border"></div>
            ))} */}
          <div className="w-32 h-32 rounded border border-ash"></div>
          <div className="w-32 h-32 rounded border border-ash"></div>
          <div className="w-32 h-32 rounded border border-ash"></div>
          <div className="w-32 h-32 rounded border border-ash"></div>
        </div>
      </div>
    </div>
  );
};

export default RasiGrid;
