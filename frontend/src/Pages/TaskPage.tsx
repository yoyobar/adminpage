import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getToken from "../utils/getToken";

function verifyToken() {
  const token = getToken();
  if (!token) return false;

  return axios.post("http://localhost:3001/verify", token).then((res) => res.data);
}

export default function TaskPage() {
  const nav = useNavigate();
  const { isLoading, isError, data } = useQuery("verifyToken", verifyToken, {
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return null;

  if (isError || !data) {
    localStorage.removeItem("token");
    nav("/");
    window.location.reload();
  }

  return (
    <>
      <div>페이지 테스트</div>
    </>
  );
}
