// import VysyamalaApp from "../../assets/images/VysyamalaApps.png";
// import VysyamalaDownload from "../../assets/images/VysyamalaDownloads.png";

// const VysyamalaApps = () => {
//   return (
//     <div className="bg-gradient">
//       <div className="container flex items-center">
//         <div>
//           <h1 className="text-white text-4xl font-semibold mb-10">
//             Vysyamala Apps
//           </h1>
//           <p className="text-white w-1/2 tracking-wide leading-7">
//             Access quick & simple search, instant updates and a great user
//             experience on your phone. Download our apps rated best in the online
//             matrimony segment.
//           </p>

//           <img
//             src={VysyamalaApp}
//             alt="VysyamalaApp"
//             className="mt-10 hover:cursor-pointer"
//           />
//         </div>

//         <div>
//           <img src={VysyamalaDownload} alt="VysyamalaDownload" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VysyamalaApps;




// import  { useState, useEffect } from "react";
// import axios from "axios";
import VysyamalaApp from "../../assets/images/VysyamalaApps.png";
import VysyamalaDownload from "../../assets/images/VysyamalaDownloads.png";

// Define the interface for the API response
// interface AppData {
//   id: number;
//   vysyamala_apps: string;
// }

const VysyamalaApps = () => {
//   // Use the interface for the state type
//   const [appData, setAppData] = useState<AppData[]>([]); // Initialize as an array

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get<AppData[]>("http://103.214.132.20:8000/api/homepage-list/");
//         setAppData(response.data); // Store the array of data
//       } catch (error) {
//         console.error("Error fetching the Vysyamala app data:", error);
//       }
//     };

//     fetchData();
//   }, []);

  return (
    <div className="bg-gradient max-2xl:px-5 max-lg:py-5 max-sm:py-0 max-sm:pt-5">
  <div className="container">
    {/* Map through appData array */}
    {/* {appData.map((app) => ( */}
      <div
      //  key={app.id} 
       className="flex items-center max-sm:flex-col-reverse mb-10 max-sm:mb-5">
        <div className="max-sm:py-5">
          <h1 className="text-white text-4xl font-semibold mb-10 max-lg:text-3xl max-lg:mb-6 max-md:text-2xl max-sm:text-xl max-sm:mb-4">
            Vysyamala Apps
          </h1>
          <p className="text-white w-1/2 tracking-wide leading-7 max-lg:w-3/4 max-md:w-4/5 max-sm:w-full">
            {/* {app.vysyamala_apps} */}
            Access quick & simple search, instant updates and a great user experience on your phone. Download our apps rated best in the online matrimony segment.
          </p>

          <img
            src={VysyamalaApp}
            alt="VysyamalaApp"
            className="mt-10 hover:cursor-pointer max-sm:mt-5"
          />
        </div>

        <div>
          <img src={VysyamalaDownload} alt="VysyamalaDownload" className="max-sm:mt-5" />
        </div>
      </div>
    {/* ))} */}
  </div>
</div>


  );
};

export default VysyamalaApps;