import { Navbar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./molecules/LoginMobileAadharPage";
import { Toaster } from "react-hot-toast";
import Components from "./components";
import OtpPage from "./molecules/OTPPage";
import DowntimePage from "./molecules/DowntimePage";


function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage />} /> 
          <Route path="/LoginMobileAadharPage" element={<LoginPage />} />
          <Route path="/OTPPage" element={<OtpPage />} />
          <Route path="/DowntimePage" element={<DowntimePage />} />
          <Route path="/molecules" element={<Components />}/>
        </Routes>
      </>
    </>
  );
}

export default App;
