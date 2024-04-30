import { useEffect } from "react";
import { getToken } from "../utils/getToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useVerify() {
  const nav = useNavigate();

  useEffect(() => {
    const token = getToken();

    axios
      .post("http://localhost:3001/verify", token)
      .then((res) => {
        if (res.data) return;

        localStorage.removeItem("token");
        nav("/");
      })
      .catch(() => {
        localStorage.removeItem("token");
        nav("/");
      });
  }, []);
}
