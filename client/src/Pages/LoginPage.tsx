import { useEffect } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      nav("/task", { replace: true });
    }
  }, []);

  return (
    <div className="w-full h-full bg-slate-700">
      <Login />
    </div>
  );
}
