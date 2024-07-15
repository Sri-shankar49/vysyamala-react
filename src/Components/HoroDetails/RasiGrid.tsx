// import React, { useState } from "react";
// import { RiDraggable } from "react-icons/ri";
// import { AiOutlineClose } from "react-icons/ai";

// interface RasiGridProps {
//   centerLabel: string;
// }

// const RasiGrid: React.FC<RasiGridProps> = ({ centerLabel }) => {
//   const initialLabels = [
//     "Raghu/Rahu",
//     "Mars/Chevai",
//     "Jupiter/Guru",
//     "Mercury/Budhan",
//     "Saturn/Sani",
//     "Lagnam",
//     "Sun/Suriyan",
//     "Venus/Sukran",
//     "Moon/Chandran",
//     "Kethu/Ketu",
//   ];

//   // State to store labels
//   const [labels, setLabels] = useState(initialLabels);

//   // State to manage contents of each rasi-box
//   const [rasiContents, setRasiContents] = useState(Array(12).fill([]));

//   // Drag start handler
//   const handleDragStart = (e: React.DragEvent<HTMLDivElement>, label: string) => {
//     e.dataTransfer.setData("text", label);
//   };

//   // Drag over handler
//   const handleDragOver = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//   };

//   // Drop handler for "rasi-box"
//   const handleDropRasiBox = (e: React.DragEvent<HTMLDivElement>, index: number) => {
//     e.preventDefault();
//     const draggedLabel = e.dataTransfer.getData("text");

//     // Check if the dragged label is not already in the box and the box is not full
//     if (!rasiContents[index].includes(draggedLabel) && rasiContents[index].length < 6) {
//       const newContents = [...rasiContents];
//       newContents[index] = [...newContents[index], draggedLabel];
//       setRasiContents(newContents);

//       // Remove the dragged label from the labels array
//       setLabels((prevLabels) => prevLabels.filter((label) => label !== draggedLabel));
//     }
//   };

//   // Remove label from rasi-box
//   const handleRemoveLabel = (index: number, labelIndex: number) => {
//     const newContents = [...rasiContents];
//     const removedLabel = newContents[index][labelIndex];
//     newContents[index].splice(labelIndex, 1);
//     setRasiContents(newContents);

//     // Add the removed label back to the labels array
//     setLabels((prevLabels) => [...prevLabels, removedLabel]);
//   };

//   return (
//     <div className="flex justify-start items-start bg-gray-200 space-x-16">
//       {/* Labels */}
//       <div className="flex flex-col space-y-2">
//         {labels.map((label, index) => (
//           <div
//             key={index}
//             draggable
//             onDragStart={(e) => handleDragStart(e, label)}
//             className="flex items-center bg-yellow-200 text-sm px-2 py-3 rounded text-center hover:cursor-grab"
//           >
//             <RiDraggable className="mr-2" />
//             {label}
//           </div>
//         ))}
//       </div>

//       {/* Rasi Grid */}
//       <div className="">
//         {/* Top Row */}
//         <div className="col-span-3 grid grid-cols-4 gap-2">
//           {/* Render rasi-box with drag and drop functionality */}
//           {Array.from({ length: 12 }).map((_, index) => (
//             <div
//               key={index}
//               onDrop={(e) => handleDropRasiBox(e, index)}
//               onDragOver={handleDragOver}
//               className="w-48 h-48 rasi-box rounded border border-footer-text-gray flex flex-col items-start justify-center gap-2"
//             >
//               {rasiContents[index].map(
//                 (label: string, labelIndex: number) => (
//                   <div
//                     key={labelIndex}
//                     className="w-32 h-auto mx-auto relative bg-yellow-200 text-xs px-2 py-1 rounded text-center flex items-center justify-between"
//                   >
//                     {label}
//                     <AiOutlineClose
//                       className="cursor-pointer ml-2"
//                       onClick={() => handleRemoveLabel(index, labelIndex)}
//                     />
//                   </div>
//                 )
//               )}
//             </div>
//           ))}

//           <div className="row-start-2 ras-center-box col-start-2 col-end-4 row-end-4 rounded font-semibold border border-gray bg-gray flex justify-center items-center">
//             {centerLabel}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RasiGrid;



import React, { useState, useEffect } from "react";
import { RiDraggable } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

interface RasiGridProps {
  centerLabel: string;
}

interface Label {
  id: number;
  name: string;
}

const RasiGrid: React.FC<RasiGridProps> = ({ centerLabel }) => {
  const initialLabels: Label[] = [
    { id: 1, name: "Raghu/Rahu" },
    { id: 2, name: "Mars/Chevai" },
    { id: 3, name: "Jupiter/Guru" },
    { id: 4, name: "Mercury/Budhan" },
    { id: 5, name: "Saturn/Sani" },
    { id: 6, name: "Lagnam" },
    { id: 7, name: "Sun/Suriyan" },
    { id: 8, name: "Venus/Sukran" },
    { id: 9, name: "Moon/Chandran" },
    { id: 10, name: "Kethu/Ketu" },
  ];

  // State to store labels
  const [labels, setLabels] = useState<Label[]>(initialLabels);

  // State to manage contents of each rasi-box
  const [rasiContents, setRasiContents] = useState<string[][]>(Array(12).fill([]));

  // Drag start handler
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, label: Label) => {
    e.dataTransfer.setData("labelId", label.id.toString());
    e.dataTransfer.setData("source", "rasi");
  };

  // Drag over handler
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Drop handler for "rasi-box"
  const handleDropRasiBox = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const draggedLabelId = e.dataTransfer.getData("labelId");
    const source = e.dataTransfer.getData("source");

    if (source === "rasi" && draggedLabelId) {
      const draggedLabel = labels.find((label) => label.id === parseInt(draggedLabelId, 10));
      if (draggedLabel && !rasiContents[index].includes(draggedLabel.name) && rasiContents[index].length < 6) {
        const newContents = [...rasiContents];
        newContents[index] = [...newContents[index], draggedLabel.name];
        setRasiContents(newContents);

        // Remove the dragged label from the labels array
        setLabels((prevLabels) => prevLabels.filter((label) => label.id !== draggedLabel.id));
      }
    }
  };

  // Remove label from rasi-box
  const handleRemoveLabel = (index: number, labelIndex: number) => {
    const newContents = [...rasiContents];
    const removedLabel = newContents[index][labelIndex];
    newContents[index].splice(labelIndex, 1);
    setRasiContents(newContents);

    // Find the removed label object from initialLabels
    const removedLabelObj = initialLabels.find((label) => label.name === removedLabel);
    if (removedLabelObj) {
      // Add the removed label back to the labels array
      setLabels((prevLabels) => [...prevLabels, removedLabelObj]);
    }
  };

  // Logging grid contents to console
  useEffect(() => {
    console.log("Amsam Contents:");
    rasiContents.forEach((contents, index) => {
      if (contents.length === 0) {
        console.log(`Grid ${index + 1}: Empty`);
      } else if (contents.length === 1) {
        const labelId = initialLabels.find(label => label.name === contents[0])?.id;
        console.log(`Grid ${index + 1}: ${labelId}`);
      } else {
        const ids = contents.map(label => {
          const labelId = initialLabels.find(l => l.name === label)?.id;
          return labelId || '';
        });
        console.log(`Grid ${index + 1}: [${ids.join(", ")}]`);
      }
    });
  }, [rasiContents]);
  

  return (
    // <div className="flex justify-start items-start bg-gray-200 space-x-16">
    //   {/* Labels */}
    //   <div className="flex flex-col space-y-2">
    //     <ul>
    //       {labels.map((label, index) => (
    //         <li
    //           key={index}
    //           draggable
    //           onDragStart={(e) => handleDragStart(e, label)}
    //           className="flex items-center bg-yellow-200 text-sm px-2 py-3 rounded text-center hover:cursor-grab"
    //         >
    //           <RiDraggable className="mr-2" />
    //           {label.name}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>

    <div className="flex justify-start items-start bg-gray-200 space-x-16">
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
          {label.name}
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
              className="w-48 h-48 rasi-box rounded border border-footer-text-gray flex flex-col items-start justify-center gap-2"
            >
              {rasiContents[index].map(
                (label: string, labelIndex: number) => (
                  <div
                    key={labelIndex}
                    className="w-32 h-auto mx-auto relative bg-yellow-200 text-xs px-2 py-1 rounded text-center flex items-center justify-between"
                  >
                    {label}
                    <AiOutlineClose
                      className="cursor-pointer ml-2"
                      onClick={() => handleRemoveLabel(index, labelIndex)}
                    />
                  </div>
                )
              )}
            </div>
          ))}

          <div className="row-start-2 ras-center-box col-start-2 col-end-4 row-end-4 rounded font-semibold border border-gray bg-gray flex justify-center items-center">
            {centerLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RasiGrid;
