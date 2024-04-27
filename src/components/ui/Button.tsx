import { MouseEventHandler } from "react";

interface Button {
  text: string;
  type: "indigo" | "green" | "red";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ text, type, onClick }: Button) {
  let buttonClass: string = "transition delay-100 text-white w-full px-4 py-2 rounded";
  switch (type) {
    case "indigo":
      buttonClass += " bg-indigo-400 hover:bg-indigo-500";
      break;
    case "green":
      buttonClass += " bg-green-600 hover:bg-green-700";
      break;
    case "red":
      buttonClass += " bg-red-400 hover:bg-red-500";
      break;
  }

  return (
    <>
      <button value={text} className={buttonClass} onClick={onClick}>
        {text}
      </button>
    </>
  );
}
