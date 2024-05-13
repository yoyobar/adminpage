import BadRequest from "./pages/LogoutPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import TaskPage from "./pages/TaskPage.tsx";

function App() {
  return (
    <div className="w-full dark:bg-slate-700 h-full overflow-hidden">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="*" element={<BadRequest />} />
      </Routes>
    </div>
  );
}

export default App;
