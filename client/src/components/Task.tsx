import { useState } from "react";
import NewModal from "./modal/NewModal";
import TaskItem from "./TaskItem";
import useTask from "../store";
import Loading from "./Loading";
import EditModal from "./modal/EditModal";

export default function Task() {
  const { filteredTask, loadTask } = useTask();
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(0);

  const editorExitHandler = () => {
    setIsEdit(false);
  };

  const newExitHandler = () => {
    setIsVisible(!isVisible);
    editorExitHandler();
  };

  const loadingHandler = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        await loadTask();
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
  };

  const editorHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEdit(true);
    setIsVisible(false);
    setEditId(Number(e.currentTarget.name));
  };

  return (
    <div className="flex flex-col w-full">
      {isVisible ? <NewModal setIsVisible={setIsVisible} newExitHandler={newExitHandler} /> : null}
      <div className="font-mono flex select-none w-full bg-slate-50 items-center gap-4 border-b border-l transition dark:border-black dark:bg-slate-700 dark:text-white  p-2">
        <div>Task Details</div>
        <button onClick={newExitHandler} className="cursor-pointer p-1 h-full w-[35px] text-center text-white bg-indigo-400 rounded-md hover:bg-indigo-500 transition">
          +
        </button>
        <button onClick={loadingHandler} className="p-1 h-full w-[35px] text-center bg-slate-400 rounded-md hover:bg-slate-600 transition">
          <svg className={isLoading ? "w-5 h-5 mx-1 animate-spin text-white" : "w-5 h-5 mx-1"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isEdit ? <EditModal editorExitHandler={editorExitHandler} editId={editId} /> : null}
      <div className="relative w-full h-full">
        {filteredTask ? filteredTask.map((item) => <TaskItem editorExitHandler={editorExitHandler} editorHandler={editorHandler} key={item.descID} {...item} />) : <Loading />}
      </div>
    </div>
  );
}
