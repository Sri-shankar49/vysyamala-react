import VysyamalaApp from "../../assets/images/VysyamalaApps.png";
import VysyamalaDownload from "../../assets/images/VysyamalaDownloads.png";

const VysyamalaApps = () => {
  return (
    <div className="bg-gradient">
      <div className="container flex items-center">
        <div>
          <h1 className="text-white text-4xl font-semibold mb-10">
            Vysyamala Apps
          </h1>
          <p className="text-white w-1/2 tracking-wide leading-7">
            Access quick & simple search, instant updates and a great user
            experience on your phone. Download our apps rated best in the online
            matrimony segment.
          </p>

          <img
            src={VysyamalaApp}
            alt="VysyamalaApp"
            className="mt-10 hover:cursor-pointer"
          />
        </div>

        <div>
          <img src={VysyamalaDownload} alt="VysyamalaDownload" />
        </div>
      </div>
    </div>
  );
};

export default VysyamalaApps;
