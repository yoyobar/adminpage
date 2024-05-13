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
      <TaskHeader newExitHandler={newExitHandler} loadingHandler={loadingHandler} isLoading={isLoading} ROLE={ROLE} />
      {isEdit ? <EditModal editorExitHandler={editorExitHandler} editId={editId} /> : null}
      {ROLE === "USER" && (
        <div>
          {filteredTask ? filteredTask.map((item) => <TaskItem editorExitHandler={editorExitHandler} editorHandler={editorHandler} key={item.descID} {...item} />) : <Loading />}
        </div>
      )}
      {ROLE === "ADMIN" && (
        <div>{task ? task.map((item) => <TaskItem editorExitHandler={editorExitHandler} editorHandler={editorHandler} key={item.descID} {...item} />) : <Loading />}</div>
      )}
    </div>
  );
}
