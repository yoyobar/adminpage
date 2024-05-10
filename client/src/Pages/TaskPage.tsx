import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import verifyToken from "../utils/verifyToken";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Task from "../components/Task";
import useTask from "../store";
import LogoutPage from "./LogoutPage";

export default function TaskPage() {
  const { loadTask, logoutTask } = useTask();
  const nav = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    logoutTask();
    nav("/", { replace: true });
  };

  const { isLoading, data, isError } = useQuery(
    "Verify-token",
    () => {
      loadTask();
      return verifyToken();
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    }
  );

  if (isLoading) return <Loading />;

  return isError || !data ? (
    <LogoutPage />
  ) : (
    <div className="w-full h-full overflow-auto">
      <Header logout={logoutHandler} />
      <div className="w-full h-full flex dark:bg-slate-700 transition">
        <Nav />
        <Task />
      </div>
    </div>
  );
}
