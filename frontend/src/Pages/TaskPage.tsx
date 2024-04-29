import { useEffect, useState } from "react";
import { verifyToken } from "../utils/Authenticate";

export default function TaskPage() {
  const [verifyRequire, setVerifyRequire] = useState(false);

  useEffect(() => {
    verifyToken();
  }, [verifyRequire]);
  return (
    <>
      <div className="w-full h-full flex">태스크테스트</div>
    </>
  );
}
