import { NavItemType } from "../types";

export default function NavItem({ type, count, stat, clickHandler }: NavItemType) {
  const className = `flex justify-between rounded-md w-full ${stat ? "bg-slate-500 text-white" : "bg-slate-200 transition hover:bg-slate-500 hover:text-white"}`;

  return (
    <div className={className}>
      <button onClick={clickHandler} value={type} className="flex pb-2 pt-2 justify-between flex-grow pl-4 pr-4" name="All">
        <div>{type}</div>
        <div>{count}</div>
      </button>
    </div>
  );
}
