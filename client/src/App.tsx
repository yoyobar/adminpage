import BadRequest from "./Pages/LogoutPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import TaskPage from "./Pages/TaskPage.tsx";

function App() {
  return (
    <div className="w-full h-full overflow-hidden">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="*" element={<BadRequest />} />
      </Routes>
    </div>
  );
}

export default App;
