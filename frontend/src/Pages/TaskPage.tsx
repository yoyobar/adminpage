import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import useVerify from "../hooks/useVerify";

export default function TaskPage() {
  const nav = useNavigate();
  useVerify();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    nav("/", { replace: true });
  };

  return (
    <>
      <div>페이지 테스트</div>
      <Button onClick={logoutHandler} text="로그아웃" color="red" type="button" />
    </>
  );
}
