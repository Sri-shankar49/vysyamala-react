// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css';
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import LoginLayout from "./Layout/LoginLayout";

// Pages Components
import { HomePage } from "./Pages/HomePage";
import { ThankYou } from "./Pages/ThankYou";
import ContactDetails from "./Pages/ContactDetails";
import UploadImages from "./Pages/UploadImages";
import FamilyDetails from "./Pages/FamilyDetails";
import EduDetails from "./Pages/EduDetails";
import HoroDetails from "./Pages/HoroDetails";
import PartnerSettings from "./Pages/PartnerSettings";
import { MembershipPlan } from "./Pages/MembershipPlan";
import { PayNow } from "./Pages/PayNow";
import { ThankYouReg } from "./Pages/ThankYouReg";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <BrowserRouter>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* Login Layout Routes */}
          <Route element={<LoginLayout />}>
            <Route path="/ThankYou" element={<ThankYou />} />
            <Route path="/ContactDetails" element={<ContactDetails />} />
            <Route path="/UploadImages" element={<UploadImages />} />
            <Route path="/FamilyDetails" element={<FamilyDetails />} />
            <Route path="/EduDetails" element={<EduDetails />} />
            <Route path="/HoroDetails" element={<HoroDetails />} />
            <Route path="/PartnerSettings" element={<PartnerSettings />} />
            <Route path="/MembershipPlan" element={<MembershipPlan />} />
            <Route path="/PayNow" element={<PayNow />} />
            <Route path="/ThankYouReg" element={<ThankYouReg />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
