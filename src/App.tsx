import { Navbar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./molecules/LoginMobileAadharPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>

    <Toaster/>
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route
            path="/LoginPage"
            element={<LoginPage />}
          />
        </Routes>
      </>
    </>
  );
}

export default App;
