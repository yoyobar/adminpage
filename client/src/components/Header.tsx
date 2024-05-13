import Button from "./ui/Button";
import { useDark } from "../store";
import { useEffect } from "react";

interface HeaderProps {
  logout: () => void;
  ROLE: "ADMIN" | "USER";
}
export default function Header({ logout, ROLE }: HeaderProps) {
  const { dark, lightMode, darkMode } = useDark();

  useEffect(() => {
    const dark = localStorage.getItem("dark");
    if (dark === "true") return darkMode();
    if (dark === "false") return lightMode();
  }, []);

  const darkHandler = () => {
    if (dark) {
      lightMode();
    } else {
      darkMode();
    }
  };
  return (
    <div className="z-10 bg-slate-50 transition dark:bg-slate-900 w-full pt-2 select-none border-b-2 dark:border-black">
      <div className="flex h-8 gap-4 justify-end items-center mb-2">
        {ROLE === "ADMIN" && null}
        {ROLE === "USER" && <Button className="w-18 text-center " onClick={darkHandler} text={dark ? "✷" : "☽"} color={dark ? "gray" : "black"} type="button" />}
        <Button className="w-18 mr-4 w-32 " onClick={logout} text="Logout" color={dark ? "gray" : "black"} type="button" />
      </div>
    </div>
  );
}
