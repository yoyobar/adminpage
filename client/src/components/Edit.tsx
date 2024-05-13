import { useEffect, useState } from "react";
import useTask from "../store";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface EditProps {
  editId: number;
  editorExitHandler: () => void;
}

export default function Edit({ editId, editorExitHandler }: EditProps) {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const { task, editTask } = useTask();

  useEffect(() => {
    const { descID, title, description, type } = task!.filter((item) => item.descID === editId)[0];
    setId(descID);
    setTitle(title);
    setContent(description);
    setType(type);
  }, [editId]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      descID: id,
      title: title,
      description: content,
      type: type,
    };
    editTask(id, formData);
    editorExitHandler();
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "title":
        return setTitle(e.target.value);
      case "content":
        return setContent(e.target.value);
      case "type":
        return setType(e.target.value);
    }
  };

  return (
    <div className="absolute left-[320px] top-[100px]">
      <div className={`p-4 rounded-md z-10 select-none w-[400px] h-[500px] opacity-95 sticky bg-slate-800`}>
        <h1 className="text-3xl mb-10 text-white">Edit Task</h1>
        <form name={String(id)} onSubmit={submitHandler} className="w-full flex flex-col items-start gap-4">
          <span className="font-mono text-white">Title </span>
          <Input onChange={inputHandler} name="title" value={title} text="Title..." type="input" />
          <span className="font-mono text-white">Content</span>
          <Input onChange={inputHandler} name="content" value={content} text="Content..." type="input" />
          <span className="font-mono text-white">Type</span>
          <div className="w-[200px]">
            <Input onChange={inputHandler} name="type" value={type} text="Type..." type="input" />
          </div>
          <div className="mt-4 flex gap-4">
            <Button className="w-32" color="indigo" text="Apply" type="submit" />
            <Button onClick={editorExitHandler} className="w-32" color="red" text="Cancel" type="button" />
          </div>
        </form>
      </div>
    </div>
  );
}
