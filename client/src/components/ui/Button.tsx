interface ButtonProps {
  text: string;
  color: "indigo" | "green" | "red" | "gray" | "black" | "white";
  type: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  name?: string;
}

export default function Button({ text, color, type, name, onClick, className }: ButtonProps) {
  let buttonClass: string = "transition delay-100 text-white px-4 py-2 rounded";
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
    case "black":
      buttonClass += " bg-black hover:bg-gray-400";
      break;
    case "white":
      buttonClass += " bg-white hover:bg-white";
      break;
  }
  buttonClass += ` ${className}`;

  return (
    <>
      <button name={name} type={type} value={text} className={buttonClass} onClick={onClick}>
        {text}
      </button>
    </>
  );
}
