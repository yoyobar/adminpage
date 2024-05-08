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
  const [editView, setEditView] = useState(0);

  const visibleHandler = () => {
    setIsVisible(!isVisible);
  };

  const editorHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEdit(true);
    setEditView(Number(e.currentTarget.name));
  };

  const editorExitHandler = () => {
    setIsEdit(false);
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      {isVisible ? <New setIsVisible={setIsVisible} visibleHandler={visibleHandler} /> : null}
      <div className="font-mono flex items-center gap-4 border-b p-2">
        <div>Task Details</div>
        <button onClick={visibleHandler} className="border cursor-pointer pl-2 pr-2 rounded-full hover:bg-slate-200 ">
          +
        </button>
      </div>
      {isEdit ? <Edit editorExitHandler={editorExitHandler} editView={editView} /> : null}
      {filteredTask ? filteredTask.map((item) => <TaskItem editorExitHandler={editorExitHandler} editorHandler={editorHandler} key={item.descID} {...item} />) : <Loading />}
    </div>
  );
}
