import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { FormData } from "../types";
import useTask from "../store";

export interface NewType {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visibleHandler: () => void;
}

export default function New({ visibleHandler, setIsVisible }: NewType) {
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const { task, createTask, viewTask } = useTask();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "title":
        return setTitle(e.target.value);

      case "content":
        return setContent(e.target.value);

      case "type":
        return setType(e.target.value);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: FormData = {
      descID: Number(new Date().getTime()),
      title: title,
      description: content,
      isDone: isChecked,
      type: type.trim() === "" ? "NO SORT" : type,
    };
    createTask(data);
    viewTask("ALL");
    setIsVisible(false);
  };

  return (
    <div className="absolute left-[320px] top-[100px]">
      <div className="p-4 rounded-md z-10 select-none w-[400px] h-[550px] opacity-95 sticky bg-slate-800">
        <h1 className="text-3xl mb-10 text-white">New Task #{task ? task.length + 1 : 1}</h1>
        <form className="w-full flex flex-col items-start gap-4" onSubmit={submitHandler}>
          <div className="font-mono text-white">Title</div>
          <Input name="title" value={title} onChange={onChangeHandler} require={true} type="input" text="New title..." />
          <div className="font-mono text-white">Content</div>
          <Input name="content" value={content} onChange={onChangeHandler} require={true} type="input" text="New subject..." />
          <div className="font-mono text-white">Type</div>
          <div className="w-[200px]">
            <Input name="type" value={type} onChange={onChangeHandler} type="input" text="NO SORT" />
          </div>
          <label className="flex w-[140px] flex-col cursor-pointer select-none items-start">
            <div className="font-mono text-white">is Finish?</div>
            <div className="relative">
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="sr-only" />
              <div className={`box block h-8 w-14 rounded-full ${isChecked ? "bg-indigo-600" : "bg-indigo-200"}`}></div>
              <div className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${isChecked ? "translate-x-full" : ""}`}></div>
            </div>
          </label>
          <div className="flex gap-4">
            <Button className="w-32" text="Apply" color="indigo" type="submit" />
            <Button className="w-32" onClick={visibleHandler} text="Cancel" color="red" type="button" />
          </div>
        </form>
      </div>
    </div>
  );
}
