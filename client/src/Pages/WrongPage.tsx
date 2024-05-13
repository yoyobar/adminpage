import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function WrongPage() {
  const [timer, setTImer] = useState(3);
  const router = useNavigate();

  const time = setInterval(() => {
    if (timer === 1) {
      clearInterval(time);
      router("/", { replace: true });
    }
    setTImer(timer - 1);
  }, 1000);

  return <div>잘못된 경로 요청입니다. {timer}초뒤 복귀합니다...</div>;
}
