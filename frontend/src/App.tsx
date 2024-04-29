import LoginPage from "./Pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import { getToken } from "./utils/Authenticate.js";
import TaskPage from "./Pages/TaskPage.tsx";

function App() {
  const ACCESS_TOKEN = getToken();

  return (
    <>
      <Routes>
        <Route path="/" element={ACCESS_TOKEN ? <TaskPage /> : <LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
