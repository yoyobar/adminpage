import { ButtonType } from "../../types";

export default function Button({ text, color, type, onClick }: ButtonType) {
  let buttonClass: string = "transition delay-100 text-white w-full px-4 py-2 rounded";
  switch (color) {
    case "indigo":
      buttonClass += " bg-indigo-400 hover:bg-indigo-500";
      break;
    case "green":
      buttonClass += " bg-green-600 hover:bg-green-700";
      break;
    case "red":
      buttonClass += " bg-red-400 hover:bg-red-500";
      break;
    case "gray":
      buttonClass += " bg-gray-400 hover:bg-gray-500";
      break;
  }

  return (
    <>
      <button type={type} value={text} className={buttonClass} onClick={onClick}>
        {text}
      </button>
    </>
  );
}
