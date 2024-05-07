import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { NewType } from "../types";

export default function New({ onClickHandler }: NewType) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="top-0 left-0 p-4 w-full h-full absolute bg-slate-800 font-mono opacity-95">
      <h1 className="text-2xl mb-10 text-white">New Task</h1>
      <form>
        <div className="text-xl text-white">Title</div>
        <div className="w-full mb-8">
          <Input type="input" text="New title..." />
        </div>
        <div className="text-xl text-white">Content</div>
        <div className="w-full mb-8">
          <Input type="input" text="New subject..." />
        </div>
        <label className="mb-8 flex w-[140px] flex-col cursor-pointer select-none items-start">
          <div className="text-xl text-white">is Finish?</div>
          <div className="relative">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="sr-only" />
            <div className={`box block h-8 w-14 rounded-full ${isChecked ? "bg-indigo-600" : "bg-indigo-200"}`}></div>
            <div className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${isChecked ? "translate-x-full" : ""}`}></div>
          </div>
        </label>
        <div className="flex gap-4">
          <Button className="w-32" text="Submit" color="green" type="submit" />
          <Button className="w-32" onClick={onClickHandler} text="Cancel" color="red" type="button" />
        </div>
      </form>
    </div>
  );
}