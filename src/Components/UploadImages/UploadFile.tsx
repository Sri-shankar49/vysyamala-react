import uploadImg from "../../assets/icons/upload.png";

interface UploadFileProps {
  heading: string;
  desc: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const UploadFile: React.FC<UploadFileProps> = ({
  heading,
  desc,
  name,
  onChange,
  onClick,
}) => {
  return (
    <div>
      <label htmlFor="uploadImg" className="hover:cursor-pointer">
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
            />
          </div>
          <button
            onClick={onClick}
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
