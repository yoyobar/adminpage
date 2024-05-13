import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import verifyToken from "../utils/verifyToken";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Task from "../components/Task";
import useTask from "../store";
import LogoutPage from "./LogoutPage";
import AdminTask from "../components/AdminTask";

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
          <Header logout={logoutHandler} />
          <div className="w-full h-full flex dark:bg-slate-700 transition">
            <Nav />
            <Task />
          </div>
        </div>
      );
    case "ADMIN":
      return (
        <div className="w-full h-full overflow-auto">
          <Header logout={logoutHandler} admin={1} />
          <div className="w-full h-full flex dark:bg-slate-700 transition">
            <AdminTask />
          </div>
        </div>
      );
    default:
      return <LogoutPage />;
  }
}
