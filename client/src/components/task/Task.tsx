import { useState } from "react";
import NewModal from "../modal/NewModal";
import TaskItem from "./TaskItem";
import useTask from "../../store";
import Loading from "../ui/Loading";
import EditModal from "../modal/EditModal";
import TaskHeader from "./TaskHeader";

interface TaskProps {
  ROLE: "ADMIN" | "USER";
}

export default function Task({ ROLE }: TaskProps) {
  const { task, filteredTask, loadTask } = useTask();
  const [isNew, setIsNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(0);

  //? NEW
  const newHandler = () => {
    setIsNew(true);
    setIsEdit(false);
  };
  const newExitHandler = () => {
    setIsNew(false);
  };

  //? EDITOR
  const editorHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEdit(true);
    setIsNew(false);
    setEditId(Number(e.currentTarget.name));
  };
  const editorExitHandler = () => {
    setIsEdit(false);
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

  return (
    <div className="flex flex-col w-full">
      <TaskHeader newHandler={newHandler} loadingHandler={loadingHandler} isLoading={isLoading} ROLE={ROLE} />
      {isNew && <NewModal setIsNew={setIsNew} newHandler={newHandler} newExitHandler={newExitHandler} />}
      {isEdit && <EditModal editorExitHandler={editorExitHandler} editId={editId} />}
      {ROLE === "USER" && (
        <div>
          {filteredTask ? (
            filteredTask.map((item) => <TaskItem ROLE={ROLE} editorExitHandler={editorExitHandler} editorHandler={editorHandler} key={item.descID} {...item} />)
          ) : (
            <Loading />
          )}
        </div>
      )}
      {ROLE === "ADMIN" && (
        <div>
          {task ? task.map((item) => <TaskItem ROLE={ROLE} editorExitHandler={editorExitHandler} editorHandler={editorHandler} key={item.descID} {...item} />) : <Loading />}
        </div>
      )}
    </div>
  );
}
