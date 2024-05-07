import Button from "./ui/Button";
import { TaskItemType } from "../types";

export default function TaskItem({ descID, title, description, type }: TaskItemType) {
  const ID = String(descID);
  return (
    <div className="font-mono w-full p-4">
      <div className="flex flex-col gap-2 border-b pb-2">
        <div className="flex gap-4 items-center">
          <input id={ID} className="form-checkbox " type="checkbox"></input>
          <label className="flex-grow" htmlFor={ID}>
            {title} | {type}
          </label>
          <Button text=">" color="indigo" type="button" />
          <Button text="X" color="red" type="button" />
        </div>
        <ul className="font-thin">{description}</ul>
      </div>
    </div>
  );
}
