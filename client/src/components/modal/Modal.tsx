import useTask from "../../store";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface NewModalProps {
  Props: {
    newExitHandler: () => void;
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange: () => void;
    title: string;
    content: string;
    type: string;
    isChecked: boolean;
    MODAL: "NEW";
  };
}
interface EditModalProps {
  Props: {
    editorExitHandler: () => void;
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    content: string;
    type: string;
    id: number;
    MODAL: "EDIT";
  };
}

export default function Modal({ Props }: NewModalProps | EditModalProps) {
  const { task } = useTask();

  return (
    <>
      <div className="absolute left-[320px] top-[100px]">
        <div className="p-4 rounded-md z-10 select-none w-[400px] h-[550px] opacity-95 sticky bg-slate-800">
          {Props.MODAL === "NEW" && <h1 className="text-3xl mb-10 text-white">New Task #{task ? task.length + 1 : 1}</h1>}
          {Props.MODAL === "EDIT" && <h1 className="text-3xl mb-10 text-white">Edit Task</h1>}
          <form className="w-full flex flex-col items-start gap-4" onSubmit={Props.submitHandler}>
            <div className="font-mono text-white">Title</div>
            <Input name="title" value={Props.title} onChange={Props.onChangeHandler} require={true} type="input" text="New title..." />
            <div className="font-mono text-white">Content</div>
            <Input name="content" value={Props.content} onChange={Props.onChangeHandler} require={true} type="input" text="New subject..." />
            <div className="font-mono text-white">Type</div>
            <div className="w-[200px]">
              <Input name="type" value={Props.type} onChange={Props.onChangeHandler} type="input" text="NO SORT" />
            </div>
            <label className="flex w-[140px] flex-col cursor-pointer select-none items-start">
              {Props.MODAL === "NEW" && (
                <>
                  <div className="font-mono text-white">is Finish?</div>
                  <div className="relative">
                    <input type="checkbox" checked={Props.isChecked} onChange={Props.handleCheckboxChange} className="sr-only" />
                    <div className={`box block h-8 w-14 rounded-full ${Props.isChecked ? "bg-indigo-600" : "bg-indigo-200"}`}></div>
                    <div
                      className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${Props.isChecked ? "translate-x-full" : ""}`}
                    ></div>
                  </div>
                </>
              )}
            </label>
            <div className="flex gap-4">
              <Button className="w-32" text="Apply" color="indigo" type="submit" />
              <Button className="w-32" onClick={Props.MODAL === "NEW" ? Props.newExitHandler : Props.editorExitHandler} text="Cancel" color="red" type="button" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
