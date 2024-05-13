import { useQuery } from "react-query";
import verifyToken from "../utils/verifyToken";
import Loading from "../components/ui/Loading";
import Header from "../components/Header";
import Task from "../components/task/Task";
import useTask from "../store";
import UserAnalyze from "../components/UserAnalyze";
import Category from "../components/category/Category";
import { useNavigate } from "react-router-dom";

export default function TaskPage() {
  const router = useNavigate();
  const { logoutTask, loadTask } = useTask();

  const logoutHandler = () => {
    logoutTask();
    router("/", { replace: true });
    window.location.reload();
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
      return logoutHandler();
    case "USER":
      return (
        <div className="w-full h-full overflow-auto">
          <Header logout={logoutHandler} ROLE="USER" />
          <div className="w-full h-full flex dark:bg-slate-700 transition">
            <Category />
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
      return logoutHandler();
  }
}
