// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css';
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

// Pages Components
import { HomePage } from "./Pages/HomePage";
import { ThankYou } from "./Pages/ThankYou";
import ContactDetails from "./Pages/ContactDetails";
import UploadImages from "./Pages/UploadImages";
import FamilyDetails from "./Pages/FamilyDetails";
import EduDetails from "./Pages/EduDetails";
import HoroDetails from "./Pages/HoroDetails";

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
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ThankYou" element={<ThankYou />} />
          <Route path="/ContactDetails" element={<ContactDetails />} />
          <Route path="/UploadImages" element={<UploadImages />} />
          <Route path="/FamilyDetails" element={<FamilyDetails />} />
          <Route path="/EduDetails" element={<EduDetails />} />
          <Route path="/HoroDetails" element={<HoroDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
