import { useEffect, useState } from "react";
import useTask from "../../store";
import Modal from "./Modal";

interface EditModalProps {
  editId: number;
  editorExitHandler: () => void;
}

export default function EditModal({ editId, editorExitHandler }: EditModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState(0);
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

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <Modal
      Props={{
        submitHandler: submitHandler,
        onChangeHandler: onChangeHandler,
        editorExitHandler: editorExitHandler,
        id: id,
        title: title,
        content: content,
        type: type,
        MODAL: "EDIT",
      }}
    />
  );
}
