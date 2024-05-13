import { useState } from "react";
import { FormData } from "../../types";
import useTask from "../../store";
import Modal from "./Modal";

interface NewModalProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newExitHandler: () => void;
}

export default function NewModal({ newExitHandler, setIsVisible }: NewModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const { createTask, viewTask } = useTask();

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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: FormData = {
      descID: Number(new Date().getTime()),
      title: title,
      description: content,
      isDone: isChecked,
      type: type.trim() === "" ? "NO SORT" : type,
    };
    createTask(data);
    viewTask("ALL");
    setIsVisible(false);
  };

  return (
    <Modal
      Props={{
        submitHandler: submitHandler,
        newExitHandler: newExitHandler,
        onChangeHandler: onChangeHandler,
        handleCheckboxChange: handleCheckboxChange,
        isChecked: isChecked,
        title: title,
        content: content,
        type: type,
        MODAL: "NEW",
      }}
    />
  );
}
