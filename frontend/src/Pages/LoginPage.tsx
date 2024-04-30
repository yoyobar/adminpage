import { useEffect, useState } from "react";
import Login from "../components/Login";
import { getToken } from "../utils/getToken";

export default function LoginPage() {
  //?생각좀 해보자
  const [isLoading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="w-full h-full flex">{!token && <Login />}</div>
      <div className="w-full h-full flex">{token && <div>테스트</div>} </div>
    </>
  );
}
