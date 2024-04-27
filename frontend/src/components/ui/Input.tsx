import { InputType } from "../../types";

export default function Input({ value, text, type, require, onChange }: InputType) {
  return (
    <>
      <input
        autoComplete="none"
        type={type}
        value={value}
        required={require}
        placeholder={text}
        className="outline-indigo-400 w-full px-4 py-2 rounded"
        onChange={onChange}
      ></input>
    </>
  );
}
