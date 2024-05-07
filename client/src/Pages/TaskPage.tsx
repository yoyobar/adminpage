import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import getToken from "../utils/getToken";
import BadRequest from "./BadRequest";
import Loading from "../components/Loading";
import Search from "../components/Search";
import Nav from "../components/Nav";
import Task from "../components/Task";
import useTask from "../store";

export default function TaskPage() {
  const { loadTask, cleanTask } = useTask();
  const nav = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    cleanTask();
    nav("/", { replace: true });
  };

  const { isLoading, data, isError } = useQuery(
    "get-token",
    () => {
      loadTask();
      return getToken();
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 5000,
    }
  );

  if (isLoading) return <Loading />;

  return isError || !data ? (
    <BadRequest />
  ) : (
    <div className="pt-2 overflow-hidden bg-white w-full h-full">
      <Search logout={logoutHandler} />
      <div className="flex w-full h-full">
        <>
          <Nav />
          <Task />
        </>
      </div>
    </div>
  );
}
