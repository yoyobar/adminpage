import { useState } from "react";
import New from "./New";
import TaskItem from "./TaskItem";
import useTask from "../store";
import Loading from "./Loading";

export default function Task() {
  const [isVisible, setIsVisible] = useState(false);
  const { task } = useTask();
  const onclickHandler = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="w-full h-full">
      {isVisible ? <New onClickHandler={onclickHandler} /> : null}
      <div className="font-mono flex items-center gap-4 border-b p-2">
        <div>Task Details</div>
        <button onClick={onclickHandler} className="border cursor-pointer pl-2 pr-2 rounded-full hover:bg-slate-200 ">
          +
        </button>
      </div>
      {task ? task.map((item) => <TaskItem key={item.descID} {...item} />) : <Loading />}
    </div>
  );
}
