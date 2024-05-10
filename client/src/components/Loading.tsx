import { useEffect, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="relative left-0 top-0 w-full h-full">
      <div className="border-gray-300  left-[50%] top-[50%] absolute w-[90px] h-[90px] animate-spin rounded-full border-8 border-t-blue-600" />
      <div className="text-2xl absolute left-[48%] top-[58%]">Task Loading...</div>
    </div>
  ) : (
    <div className="text-2xl pl-2 pt-2">No Task Data, New one!</div>
  );
}
