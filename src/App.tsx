import {Navbar} from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./molecules/login-mobile-aadhar-page";
import { Toaster } from "react-hot-toast";
// @ts-ignore 
import Components from "./components";
<<<<<<< HEAD
import OtpPage from "./molecules/OTPPage";
import FeedbackPage from "./molecules/FeedbackPage";
=======
import OtpPage from "./molecules/otp-page";
import HistoryPage from "./pages/history-page";
import ComingSoonPage from "./pages/coming-soon-page";
import DowntimePage from "./pages/downtime-page";
import FAQPage from "./pages/faq-page";
import FeedbackPage from './molecules/FeedbackPage'

>>>>>>> 05ebdc1726f05a30c5971fbedce5c4f059f34386


function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage />} /> 
<<<<<<< HEAD
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/OTPPage" element={<OtpPage />} />
=======
          <Route path="/login-mobile-aadhar-page" element={<LoginPage />} />
          <Route path="/otp-page" element={<OtpPage />} />
          <Route path="/history-page" element={<HistoryPage />} />

          <Route path="/coming-soon-page" element={<ComingSoonPage />} />
          <Route path="/downtime-page" element={<DowntimePage />} />
          <Route path="/faq-page" element={<FAQPage />} />
>>>>>>> 05ebdc1726f05a30c5971fbedce5c4f059f34386
          <Route path="/FeedbackPage" element={<FeedbackPage />}/>

          <Route path="/molecules" element={<Components />}/>
        </Routes>
      </>
    </>
  );
}

export default App;
