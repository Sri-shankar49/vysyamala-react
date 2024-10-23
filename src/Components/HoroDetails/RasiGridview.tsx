import React, { useState, useEffect, useMemo } from "react";

interface RasiGridProps {
  centerLabel: string;
  rasiTemp: any;
  data: any;
}

interface Label {
  id: number;
  name: string;
}

const RasiGridview: React.FC<RasiGridProps> = ({
  centerLabel,
  rasiTemp,
  data,
}) => {
  const initialLabels: Label[] = useMemo(
    () => [
      { id: 8, name: "Raghu/Rahu" },
      { id: 3, name: "Mars/Chevai" },
      { id: 5, name: "Jupiter/Guru" },
      { id: 4, name: "Mercury/Budhan" },
      { id: 7, name: "Saturn/Sani" },
      { id: 10, name: "Lagnam" },
      { id: 1, name: "Sun/Suriyan" },
      { id: 6, name: "Venus/Sukran" },
      { id: 2, name: "Moon/Chandran" },
      { id: 9, name: "Kethu/Ketu" },
    ],
    []
  );

  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [rasiContents, setRasiContents] = useState<string[][]>(
    Array(12).fill([])
  );

  useEffect(() => {
    // Only update sessionStorage when "data" changes
    if (data) {
      sessionStorage.setItem("formattedDatarasi", data);
    }
  }, [data]); // Only run when "data" changes

  useEffect(() => {
    const formattedDatarasival = sessionStorage.getItem("formattedDatarasi");
    if (formattedDatarasival) {
      const parsedData = formattedDatarasival
        .slice(1, -1)
        .split(", ")
        .map((grid) => {
          const match = grid.match(/Grid \d+: (.+)/);
          return match
            ? match[1].split(",").map((id) => parseInt(id, 10))
            : [];
        });

      const newRasiContents = parsedData.map((ids) =>
        ids
          .map((id) => initialLabels.find((label) => label.id === id)?.name)
          .filter(Boolean) as string[]
      );
      setRasiContents(newRasiContents);

      const usedIds = parsedData.flat();
      setLabels((prevLabels) =>
        prevLabels.filter((label) => !usedIds.includes(label.id))
      );
    }
  }, [initialLabels]); // Only run when "initialLabels" changes

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    label: Label
  ) => {
    e.dataTransfer.setData("labelId", label.id.toString());
    e.dataTransfer.setData("source", "rasi");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropRasiBox = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    const draggedLabelId = e.dataTransfer.getData("labelId");
    const source = e.dataTransfer.getData("source");

    if (source === "rasi" && draggedLabelId) {
      const draggedLabel = labels.find(
        (label) => label.id === parseInt(draggedLabelId, 10)
      );
      if (
        draggedLabel &&
        !rasiContents[index].includes(draggedLabel.name) &&
        rasiContents[index].length < 6
      ) {
        const newContents = [...rasiContents];
        newContents[index] = [...newContents[index], draggedLabel.name];
        setRasiContents(newContents);

        setLabels((prevLabels) =>
          prevLabels.filter((label) => label.id !== draggedLabel.id)
        );
      }
    }
  };

  const formatGridData = () => {
    const formattedData = rasiContents
      .map((contents, index) => {
        const boxNumber = index + 1;
        const ids = contents
          .map((label) => initialLabels.find((l) => l.name === label)?.id)
          .filter((id) => id !== undefined);
        return `Grid ${boxNumber}: ${ids.length > 0 ? ids.join(",") : "empty"}`;
      })
      .join(", ");
    return `{${formattedData}}`;
  };

  useEffect(() => {
    const formattedData = formatGridData();
    console.log("Rasi Contents:", formattedData);

    sessionStorage.setItem("formattedData", JSON.stringify(formattedData));
  }, [rasiContents]);

  return (
    <div className="flex justify-start items-start bg-gray-200 space-x-16">
      <div className="flex flex-col space-y-2">
        {rasiTemp !== "1" &&
          labels.map((label, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, label)}
              className="flex items-center bg-yellow-200 text-sm px-2 py-3 rounded text-center hover:cursor-grab"
            >
              {label.name}
            </div>
          ))}
      </div>

      <div className="">
        <div className="grid grid-cols-4 gap-2">
          {[
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 2, col: 4 },
            { row: 3, col: 4 },
            { row: 4, col: 4 },
            { row: 4, col: 3 },
            { row: 4, col: 2 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
          ].map((pos, index) => (
            <div
              key={index}
              style={{ gridRow: pos.row, gridColumn: pos.col }}
              onDrop={(e) => handleDropRasiBox(e, index)}
              onDragOver={handleDragOver}
              className="relative w-48 h-48 rasi-box rounded border border-footer-text-gray flex flex-col items-start justify-center gap-2"
            >
              {rasiContents[index].map((label: string, labelIndex: number) => (
                <div
                  key={labelIndex}
                  className="w-32 h-auto mx-auto relative bg-yellow-200 text-xs px-2 py-1 rounded text-center flex items-center justify-between"
                >
                  {label}
                </div>
              ))}
            </div>
          ))}

          <div className="row-start-2 col-start-2 col-end-4 row-end-4 rounded font-semibold border border-gray bg-gray flex justify-center items-center">
            {centerLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RasiGridview;
