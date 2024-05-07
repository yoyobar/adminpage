import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import getToken from "../utils/getToken";
import BadRequest from "./BadRequest";
import Loading from "../components/Loading";
import Search from "../components/Search";
import Nav from "../components/Nav";
import Task from "../components/Task";

export default function TaskPage() {
  const nav = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    nav("/", { replace: true });
  };

  const { isLoading, data, isError } = useQuery(
    "get-token",
    () => {
      return getToken();
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5000,
    }
  );

  if (isLoading) return <Loading />;
  return isError || !data ? (
    <BadRequest />
  ) : (
    <div className="pt-2 bg-white w-full h-full">
      <Search logout={logoutHandler} />
      <div className="flex w-full h-full">
        <Nav />
        <Task />
      </div>
    </div>
  );
}
