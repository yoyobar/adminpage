import NavItem from "./NavItem";
import useTask from "../store";
import { useEffect, useState } from "react";
import { NavType } from "../types";

export default function Nav() {
  const { task, viewTask, view } = useTask();
  const [countData, setCountData] = useState<NavType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalView, setTotalView] = useState(true);

  function countSort() {
    if (!task) return;
    let total = 0;
    const countData: NavType[] = [];
    task.forEach((item) => {
      const type = item.type;
      const index = countData.findIndex((data) => data.type === type);

      if (index !== -1) {
        countData[index].count++;
      } else {
        countData.push({ type, count: 1, stat: view === item.type ? true : false });
      }
    });
    countData.forEach((item) => {
      total += item.count;
    });

    setTotalCount(total);
    setCountData(countData); // 상태 업데이트
  }

  useEffect(() => {
    if (task === null) return;
    countSort();
  }, [task]);

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (countData === null) return;
    const clickData = countData.map((item) => {
      if (e.currentTarget.value === item.type) {
        setTotalView(false);
        return {
          ...item,
          stat: true,
        };
      }
      if (e.currentTarget.value === "ALL") {
        setTotalView(true);
        return {
          ...item,
          stat: false,
        };
      }
      return {
        ...item,
        stat: false,
      };
    });
    setCountData(clickData);
    viewTask(e.currentTarget.value);
  }

  return (
    <div className="h-full select-none flex">
      <div className="w-[300px] h-full gap-2 flex flex-col rounded-sm p-6 transition items-start">
        <div className="w-full flex gap-4"></div>
        <NavItem clickHandler={clickHandler} type="ALL" count={totalCount} stat={totalView} />
        {task ? countData.map((item) => <NavItem clickHandler={clickHandler} key={item.type} {...item} />) : null}
      </div>
    </div>
  );
}
