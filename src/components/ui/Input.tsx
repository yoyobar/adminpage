import react from "react";

interface Input {
  text: string;
  onChange?: react.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({ text, onChange }: Input) {
  return (
    <>
      <input placeholder={text} className="outline-indigo-400 w-full px-4 py-2 rounded" onChange={onChange}></input>
    </>
  );
}
