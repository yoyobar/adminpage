import TaskItem from "./TaskItem";

export default function Task() {
  return (
    <div className="w-full h-full">
      <div className="font-mono flex items-center gap-4 border-b p-2">
        <div>Task Details</div>
        <div className="border cursor-pointer pl-2 pr-2 rounded-full hover:bg-slate-200 ">+</div>
      </div>
      <TaskItem />
      <TaskItem />
    </div>
  );
}
