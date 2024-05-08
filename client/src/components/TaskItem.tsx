import Button from "./ui/Button";
import { TaskItemType } from "../types";
import useTask from "../store";

export default function TaskItem({ descID, title, description, type, isDone }: TaskItemType) {
  const { deleteTask } = useTask();

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteTask(e.currentTarget.name);
  };
  const ID = String(descID);
  return (
    <div className="font-mono w-full p-4">
      <div className="flex flex-col gap-2 border-b pb-6 pt-6">
        <div className="flex gap-4 items-center">
          <input id={ID} value={isDone} checked={isDone} className="form-checkbox " type="checkbox"></input>
          <label className="flex-grow" htmlFor={ID}>
            {title} | {type}
          </label>
          <Button text="> EDIT" color="indigo" type="button" />
          <Button name={ID} onClick={buttonHandler} text="X DEL" color="red" type="button" />
        </div>
        <ul className="font-thin">{description}</ul>
      </div>
    </div>
  );
}
