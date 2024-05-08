import { useEffect, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { NewType, FormData } from "../types";
import useTask from "../store";

export default function New({ onClickHandler, setIsVisible }: NewType) {
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [option, setOption] = useState<string[]>([]);
  const [optionSel, setOptionSel] = useState<string>("NO SORTED");
  const { task, createTask, viewTask } = useTask();

  useEffect(() => {
    if (task === null) return;

    const types = new Set<string>();
    task.forEach((item) => {
      types.add(item.type);
    });
    setOption(Array.from(types));
  }, [task]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "title":
        return setTitle(e.target.value);

      case "content":
        return setContent(e.target.value);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionSel(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: FormData = {
      title: title,
      description: content,
      isDone: isChecked,
      type: optionSel,
    };
    createTask(data);
    viewTask("ALL");
    setIsVisible(false);
    console.log(task);
  };

  return (
    <div className="top-0 left-0 p-4 w-full h-full absolute bg-slate-800 font-mono opacity-95">
      <h1 className="text-2xl mb-10 text-white">New Task</h1>
      <form onSubmit={submitHandler}>
        <div className="text-xl text-white">Title</div>
        <div className="w-full mb-8">
          <Input name="title" value={title} onChange={onChangeHandler} require={true} type="input" text="New title..." />
        </div>
        <div className="text-xl text-white">Content</div>
        <div className="w-full mb-8">
          <Input name="content" value={content} onChange={onChangeHandler} require={true} type="input" text="New subject..." />
        </div>
        <label className="mb-8 flex w-[140px] flex-col cursor-pointer select-none items-start">
          <div className="text-xl text-white">is Finish?</div>
          <div className="relative">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="sr-only" />
            <div className={`box block h-8 w-14 rounded-full ${isChecked ? "bg-indigo-600" : "bg-indigo-200"}`}></div>
            <div className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${isChecked ? "translate-x-full" : ""}`}></div>
          </div>
        </label>
        <div className="font-mono text-xl mb-2 text-white">TYPES</div>
        <select className="mb-8 p-2 rounded-md" value={"NO SORTED"} onChange={selectHandler}>
          {option.map((item, index) => (
            <option className="" key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          <Button className="w-32" text="Submit" color="green" type="submit" />
          <Button className="w-32" onClick={onClickHandler} text="Cancel" color="red" type="button" />
        </div>
      </form>
    </div>
  );
}
