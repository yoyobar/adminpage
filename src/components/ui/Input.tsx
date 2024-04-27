import { InputType } from "../../types";

export default function Input({ text, type, require, onChange }: InputType) {
  return (
    <>
      <input type={type} required={require} placeholder={text} className="outline-indigo-400 w-full px-4 py-2 rounded" onChange={onChange}></input>
    </>
  );
}
