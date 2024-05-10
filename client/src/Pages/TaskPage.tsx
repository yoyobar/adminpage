import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import verifyToken from "../utils/verifyToken";
import Loading from "../components/Loading";
import Search from "../components/Search";
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
      staleTime: 5000,
    }
  );

  if (isLoading) return <Loading />;

  return isError || !data ? (
    <LogoutPage />
  ) : (
    <div className="w-full h-full overflow-auto">
      <Search logout={logoutHandler} />
      <div className="w-full h-full flex">
        <Nav />
        <Task />
      </div>
    </div>
  );
}
