import { Navbar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./molecules/LoginMobileAadharPage";
import { Toaster } from "react-hot-toast";
import Components from "./components";
import OtpPage from "./molecules/OTPPage";
import ComingSoonPage from "./molecules/ComingSoonPage";


function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage />} /> 
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/OTPPage" element={<OtpPage />} />
          <Route path="/ComingSoonPage" element={<ComingSoonPage />} />
          <Route path="/molecules" element={<Components />}/>
        </Routes>
      </>
    </>
  );
}

export default App;
