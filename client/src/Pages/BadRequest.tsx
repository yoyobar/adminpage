import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BadRequest() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/", { replace: true });
    window.location.reload();
  }, []);

  return <></>;
}
