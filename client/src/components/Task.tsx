import { useState } from "react";
import New from "./New";
import TaskItem from "./TaskItem";
import useTask from "../store";
import Loading from "./Loading";

export default function Task() {
  const { filteredTask } = useTask();
  const [isVisible, setIsVisible] = useState(false);

  const onclickHandler = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="w-full h-full overflow-y-scroll">
      {isVisible ? <New setIsVisible={setIsVisible} onClickHandler={onclickHandler} /> : null}
      <div className="font-mono flex items-center gap-4 border-b p-2">
        <div>Task Details</div>
        <button onClick={onclickHandler} className="border cursor-pointer pl-2 pr-2 rounded-full hover:bg-slate-200 ">
          +
        </button>
      </div>
      {filteredTask ? filteredTask.map((item) => <TaskItem key={item.descID} {...item} />) : <Loading />}
    </div>
  );
}
