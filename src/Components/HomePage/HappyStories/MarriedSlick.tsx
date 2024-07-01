import Married from "../../../assets/images/Married.png";

interface MarriedSlickProps {
  name: string;
}

const MarriedSlick: React.FC<MarriedSlickProps> = ({ name }) => {
  return (
    <div className="mx-3">
      <div className="relative">
        <img src={Married} alt={name} />

        <div className="absolute bottom-8 left-10 text-white">
          <h1 className="text-xl">{name}</h1>
        </div>
      </div>
    </div>
  );
};

export default MarriedSlick;
