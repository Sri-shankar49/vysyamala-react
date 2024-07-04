import React from "react";
import uploadImg from "../../assets/icons/upload.png";
// import { RefObject } from "react";

interface UploadFileProps {
  heading: string;
  desc: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  multiple?: boolean; // Make sure multiple is optional
}

const UploadFile: React.FC<UploadFileProps> = ({
  heading,
  desc,
  name,
  onChange,
  // onClick,
  multiple, // Include multiple in props
}) => {
  // Function to trigger file input click
  const handleButtonClick = () => {
    const input = document.getElementById(name) as HTMLInputElement | null;
    if (input) {
      input.click(); // Programmatically click the input element
    }
  };

  return (
    <div>
      <label htmlFor={name} className="hover:cursor-pointer">
        <div className="bg-gray px-10 py-8 flex justify-between items-center space-x-5 border border-dashed border-primary rounded-lg">
          <div>
            <img src={uploadImg} alt="Upload Images" />
          </div>
          <div className="flex-1">
            <h1 className="text-ash font-semibold">{heading}</h1>
            <p className="text-ashSecondary">{desc}</p>
          </div>
          <div>
            <input
              type="file"
              name={name}
              id={name}
              className="hidden"
              onChange={onChange}
              multiple={multiple} // Pass multiple to input element if defined
            />
          </div>
          <button
            onClick={handleButtonClick} // Call function to trigger file input click
            className="px-6 py-1.5 text-ash rounded-md border border-ash"
          >
            Select a file
          </button>
        </div>
      </label>
    </div>
  );
};

export default UploadFile;
