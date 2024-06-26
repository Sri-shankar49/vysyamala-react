import React, { useState } from "react";
import { RiDraggable } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

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

  // State to store dragged label
  const [draggedLabel, setDraggedLabel] = useState("");

  // State to manage contents of each rasi-box
  const [rasiContents, setRasiContents] = useState(Array(12).fill([]));

  // Drag start handler
  const handleDragStart = (e, label) => {
    setDraggedLabel(label);
  };

  // Drag over handler
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Drop handler for "rasi-box"
  const handleDropRasiBox = (e, index) => {
    e.preventDefault();
    // Check if the dragged label is not already in the box and the box is not full
    if (
      !rasiContents[index].includes(draggedLabel) &&
      rasiContents[index].length < 6
    ) {
      const newContents = [...rasiContents];
      newContents[index] = [...newContents[index], draggedLabel];
      setRasiContents(newContents);

      // Remove the dragged label from the labels array
      const updatedLabels = labels.filter((label) => label !== draggedLabel);
      setDraggedLabel("");
    }
  };

  // Remove label from rasi-box
  const handleRemoveLabel = (index, labelIndex) => {
    const newContents = [...rasiContents];
    const removedLabel = newContents[index][labelIndex];
    newContents[index].splice(labelIndex, 1);
    setRasiContents(newContents);

    // Add the removed label back to the labels array
    setDraggedLabel(removedLabel);
  };

  return (
    <div className="flex space-x-16 justify-start items-start bg-gray-200">
      {/* Labels */}
      <div className="flex flex-col space-y-2">
        {labels.map((label, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, label)}
            className="flex items-center bg-yellow-200 text-sm px-2 py-3 rounded text-center hover:cursor-grab"
          >
            <RiDraggable className="mr-2" />
            {label}
          </div>
        ))}
      </div>

      {/* Rasi Grid */}
      <div className="">
        {/* Top Row */}
        <div className="col-span-3 grid grid-cols-4 gap-2">
          {/* Render rasi-box with drag and drop functionality */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              onDrop={(e) => handleDropRasiBox(e, index)}
              onDragOver={handleDragOver}
              className="w-48 h-48 rasi-box rounded border border-ash flex items-center justify-center"
            >
              {rasiContents[index].map((label, labelIndex) => (
                <div
                  key={labelIndex}
                  className="relative bg-yellow-200 text-xs px-2 py-1 rounded text-center flex items-center justify-between"
                >
                  {label}
                  <AiOutlineClose
                    className="cursor-pointer ml-2"
                    onClick={() => handleRemoveLabel(index, labelIndex)}
                  />
                </div>
              ))}
            </div>
          ))}

          <div className="row-start-2 ras-center-box col-start-2 col-end-4 row-end-4 rounded border border-ash">
            rasi
          </div>
        </div>
      </div>
    </div>
  );
};

export default RasiGrid;
