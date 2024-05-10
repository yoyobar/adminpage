import { useState } from "react";
import New from "./New";
import TaskItem from "./TaskItem";
import useTask from "../store";
import Loading from "./Loading";
import Edit from "./Edit";

export default function Task() {
  const { filteredTask } = useTask();
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(0);

  const editorExitHandler = () => {
    setIsEdit(false);
  };

  const visibleHandler = () => {
    setIsVisible(!isVisible);
    editorExitHandler();
  };

  const editorHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEdit(true);
    setIsVisible(false);
    setEditId(Number(e.currentTarget.name));
  };

  return (
    <div className="flex flex-col w-full">
      {isVisible ? <New setIsVisible={setIsVisible} visibleHandler={visibleHandler} /> : null}
      <div className="font-mono flex select-none w-full bg-slate-50 items-center gap-4 border-b p-2">
        <div>Task Details</div>
        <button onClick={visibleHandler} className="cursor-pointer text-white bg-green-500 pl-2 pr-2 rounded-full hover:bg-green-700 ">
          +
        </button>
      </div>

      {isEdit ? <Edit editorExitHandler={editorExitHandler} editId={editId} /> : null}
      <div className="relative w-full h-full">
        {filteredTask ? filteredTask.map((item) => <TaskItem editorExitHandler={editorExitHandler} editorHandler={editorHandler} key={item.descID} {...item} />) : <Loading />}
      </div>
    </div>
  );
}
