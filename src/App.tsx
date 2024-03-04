import { Navbar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./molecules/LoginPage";

function App() {
  return (
    <>
      <Navbar />
      <>
        <Routes>
          <Route index element={<LoginPage handleOTPPage={() => null} />} />
          <Route
            path="/LoginPage"
            element={<LoginPage handleOTPPage={() => null} />}
          />
        </Routes>
      </>
    </>
  );
}

export default App;
