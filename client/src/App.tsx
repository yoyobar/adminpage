import LoginPage from "./pages/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import TaskPage from "./pages/TaskPage.tsx";
import WrongPage from "./pages/WrongPage.tsx";

function App() {
  return (
    <div className="w-full dark:bg-slate-700 h-full overflow-hidden">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="*" element={<WrongPage />} />
      </Routes>
    </div>
  );
}

export default App;
