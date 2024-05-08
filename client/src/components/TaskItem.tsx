import Button from "./ui/Button";
import { TaskItemType } from "../types";
import useTask from "../store";
import { useEffect, useState } from "react";

export default function TaskItem({ descID, title, description, type, isDone, editorExitHandler, editorHandler }: TaskItemType) {
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
    <div className="font-mono w-full p-4">
      <div className="flex flex-col gap-2 border-b pb-6 pt-6">
        <div className="flex gap-4 items-center">
          <input name={ID} onChange={checkHandler} value={Number(isChecked)} checked={isChecked} className="form-checkbox " type="checkbox"></input>
          <div className="flex-grow">
            {title} | {type}
          </div>
          <Button name={ID} onClick={editorHandler} text="> EDIT" color="indigo" type="button" />
          <Button name={ID} onClick={buttonHandler} text="X DEL" color="red" type="button" />
        </div>
        <ul className="font-mono">{description}</ul>
      </div>
    </div>
  );
}
