import { Navbar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./molecules/login-mobile-aadhar-page";
import { Toaster } from "react-hot-toast";
import Components from "./components";
import OtpPage from "./molecules/otp-page";
import ChatUiWindow from "./molecules/ChatUI";
import HistoryPage from "./pages/history-page";


function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage />} /> 
          <Route path="/ChatUI" element={<ChatUiWindow />} />
          <Route path="/login-mobile-aadhar-page" element={<LoginPage />} />
          <Route path="/otp-page" element={<OtpPage />} />
          <Route path="/history-page" element={<HistoryPage />} />
          <Route path="/ChatUI" element={<ChatUiWindow />} />
          <Route path="/molecules" element={<Components />}/>
        </Routes>
      </>
    </>
  );
}

export default App;
