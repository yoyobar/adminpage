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
  });

  if (isLoading) return null;
  if (isError || !data) {
    localStorage.removeItem("token");
    nav("/");
  }

  return (
    <>
      <div className="w-full h-full flex">태스크테스트</div>
    </>
  );
}
