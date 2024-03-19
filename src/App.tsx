import {Navbar} from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./molecules/login-mobile-aadhar-page";
import { Toaster } from "react-hot-toast";
// @ts-ignore 
import Components from "./components";
import OtpPage from "./molecules/otp-page";
import HistoryPage from "./pages/history-page";
import ComingSoonPage from "./pages/coming-soon-page";
import DowntimePage from "./pages/downtime-page";
import FAQPage from "./pages/faq-page";
import FeedbackPage from './molecules/FeedbackPage'



function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage />} /> 
          <Route path="/login-mobile-aadhar-page" element={<LoginPage />} />
          <Route path="/otp-page" element={<OtpPage />} />
          <Route path="/history-page" element={<HistoryPage />} />

          <Route path="/coming-soon-page" element={<ComingSoonPage />} />
          <Route path="/downtime-page" element={<DowntimePage />} />
          <Route path="/faq-page" element={<FAQPage />} />
          <Route path="/FeedbackPage" element={<FeedbackPage />}/>

          <Route path="/molecules" element={<Components />}/>
        </Routes>
      </>
    </>
  );
}

export default App;
