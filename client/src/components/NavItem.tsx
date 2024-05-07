import { useState } from "react";
import { NavType } from "../types";

export default function NavItem({ active, name, count, clickHandler }: NavType) {
  const className = `flex justify-between rounded-md w-full ${active ? "bg-slate-500 text-white" : "bg-slate-200 transition hover:bg-slate-500 hover:text-white"}`;

  return (
    <div className={className}>
      <button onClick={clickHandler} value={name} className="flex pb-2 pt-2 justify-between flex-grow pl-4 pr-4" name="All">
        <div>{name}</div>
        <div>{count}</div>
      </button>
    </div>
  );
}
