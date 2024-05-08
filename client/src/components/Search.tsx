import Button from "./ui/Button";
import { SearchType } from "../types";

export default function Search({ logout }: SearchType) {
  return (
    <div className="z-10 bg-slate-50 w-full pt-2 select-none border-b-2">
      <div className="flex h-8 gap-4 justify-end items-center mb-2">
        <Button className="w-18 mr-4 w-32" onClick={logout} text="Logout" color="gray" type="button" />
      </div>
    </div>
  );
}
