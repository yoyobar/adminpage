import { useEffect } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) nav("-1", { replace: true });
  });

  return (
    <>
      <Login />
    </>
  );
}
