import Button from "./ui/Button";
import { SearchType } from "../types";

export default function Search({ logout }: SearchType) {
  return (
    <div className="flex justify-end border-b-2">
      <div className="flex h-8 gap-4 justify-end items-center mb-2">
        <Button className="w-18" onClick={logout} text="Logout" color="gray" type="button" />
        <input className="p-2 mr-12 w-58 outline-none border-blue-400 focus:border-b" placeholder="Search tasks..." />
      </div>
    </div>
  );
}
