interface InputProps {
  text: string;
  type: string;
  name?: string;
  value?: string;
  require?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({ value, text, name, type, require, onChange }: InputProps) {
  return (
    <>
      <input
        autoComplete="off"
        name={name}
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
