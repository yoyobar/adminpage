import BadRequest from "./Pages/BadRequest.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<BadRequest />} />
      </Routes>
    </>
  );
}

export default App;
