import Button from "../ui/Button";
import { TaskItemType } from "../../types";
import useTask from "../../store";
import { useEffect, useState } from "react";

export default function TaskItem({ descID, title, description, isDone, name, ROLE, editorExitHandler, editorHandler }: TaskItemType) {
  const { task, deleteTask, deleteAdminTask, checkTask } = useTask();
  const [isChecked, setIsChecked] = useState(isDone);

  useEffect(() => {
    setIsChecked(isDone);
  }, [task]);

  //? BTN HANDLER
  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    editorExitHandler();
    deleteTask(e.currentTarget.name);
  };
  const adminButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!name) return;
    const confirm = window.confirm(`Are you Sure Delete by ${name} ?`);
    if (confirm) {
      deleteAdminTask(e.currentTarget.name, name);
    }
  };

  //? CHECK HANDLER
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkTask(e.currentTarget.name);
  };
  const adminCheckHandler = () => {
    return;
  };

  const ID = String(descID);
  return (
    <>
      <div
        className={
          isChecked
            ? "relative border-collapse font-mono w-full select-none bg-slate-300 text-slate-400 dark:bg-slate-500 "
            : "relative border-collapse border-l border- font-mono w-full select-none dark:text-white "
        }
      >
        <div className="flex flex-col w-full h-full pr-4 justify-center gap-2 transition">
          <label htmlFor={ID} className="flex flex-col">
            <div className="flex justify-center  gap-2">
              <input
                id={ID}
                name={ID}
                onChange={ROLE === "ADMIN" ? adminCheckHandler : checkHandler}
                value={Number(isChecked)}
                checked={isChecked}
                className="hidden"
                type="checkbox"
              ></input>
              <div className="flex flex-col flex-grow">
                <div className="p-2 text-xl relative">
                  {ROLE === "ADMIN" && <span className="text-sm">{name} | </span>}
                  {title}
                  {isChecked ? <span className="text-green-700 dark:text-green-500 text-right font-mono absolute right-7 top-6"> 완료</span> : ""}
                </div>

                <ul className="p-2 font-mono">{description}</ul>
              </div>
              <div className="flex justify-center items-center gap-2">
                {ROLE === "USER" && <Button name={ID} onClick={editorHandler} text="X EDIT" color="indigo" type="button" />}
                {ROLE === "USER" && <Button name={ID} onClick={buttonHandler} text="X DEL" color="red" type="button" />}
                {ROLE === "ADMIN" && <Button name={ID} onClick={adminButtonHandler} text="X DEL" color="red" type="button" />}
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="w-full border-b dark:border-black transition"></div>
    </>
  );
}
