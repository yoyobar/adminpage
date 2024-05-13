import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import verifyToken from "../utils/verifyToken";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Task from "../components/task/Task";
import useTask from "../store";
import LogoutPage from "./LogoutPage";
import UserAnalyze from "../components/UserAnalyze";

export default function TaskPage() {
  const { loadTask, logoutTask } = useTask();
  const nav = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    logoutTask();
    nav("/", { replace: true });
  };

  const { isLoading, data } = useQuery(
    "Verify-token",
    () => {
      loadTask();
      return verifyToken();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading />;

  switch (data) {
    case "FALSE":
      return <LogoutPage />;
    case "USER":
      return (
        <div className="w-full h-full overflow-auto">
          <Header logout={logoutHandler} ROLE="USER" />
          <div className="w-full h-full flex dark:bg-slate-700 transition">
            <Nav />
            <Task ROLE="USER" />
          </div>
        </div>
      );
    case "ADMIN":
      return (
        <div className="w-full h-full overflow-auto">
          <Header logout={logoutHandler} ROLE="ADMIN" />
          <div className="w-full h-full flex flex-col dark:bg-slate-700 transition">
            <UserAnalyze />
            <Task ROLE="ADMIN" />
          </div>
        </div>
      );
    default:
      return <LogoutPage />;
  }
}
