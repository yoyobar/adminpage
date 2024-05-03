import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useQuery } from "react-query";
import getToken from "../utils/getToken";
import BadRequest from "./BadRequest";
import Loading from "../components/Loading";

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
  if (isError) {
    localStorage.removeItem("token");
    return <BadRequest />;
  }
  if (!data) {
    localStorage.removeItem("token");
    return <BadRequest />;
  }

  return (
    <>
      <div>페이지 테스트</div>
      <Button onClick={logoutHandler} text="로그아웃" color="red" type="button" />
    </>
  );
}
