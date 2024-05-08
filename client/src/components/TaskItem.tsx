import Button from "./ui/Button";
import { TaskItemType } from "../types";
import useTask from "../store";
import { useEffect, useState } from "react";

export default function TaskItem({ descID, title, description, isDone, editorExitHandler, editorHandler }: TaskItemType) {
  const { task, deleteTask, checkTask } = useTask();
  const [isChecked, setIsChecked] = useState(isDone);

  useEffect(() => {
    setIsChecked(isDone);
  }, [task]);

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    editorExitHandler();
    deleteTask(e.currentTarget.name);
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkTask(e.currentTarget.name);
  };

  const ID = String(descID);
  return (
    <>
      <div className={isChecked ? "relative font-mono w-full select-none bg-slate-300 text-slate-400" : "relative font-mono w-full select-none"}>
        <div className="flex flex-col w-full h-full pr-4 justify-center gap-2">
          <label htmlFor={ID} className="flex flex-col">
            <div className="flex justify-center  gap-2">
              <input id={ID} name={ID} onChange={checkHandler} value={Number(isChecked)} checked={isChecked} className="hidden" type="checkbox"></input>
              <div className="flex flex-col flex-grow">
                <div className="p-2 text-xl relative">
                  {title}
                  {isChecked ? <span className="text-green-700 text-right font-mono absolute right-7 top-6"> Complete</span> : ""}
                </div>

                <ul className="p-2 font-mono">{description}</ul>
              </div>
              <div className="flex justify-center items-center gap-2">
                <Button name={ID} onClick={editorHandler} text="> EDIT" color="indigo" type="button" />
                <Button name={ID} onClick={buttonHandler} text="X DEL" color="red" type="button" />
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="w-full border-b"></div>
    </>
  );
}
