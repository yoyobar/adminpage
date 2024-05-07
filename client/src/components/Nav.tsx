import { useState } from "react";
import NavItem from "./NavItem";

const navData = [
  {
    active: false,
    name: "All",
    count: 0,
  },
  {
    active: false,
    name: "Work",
    count: 0,
  },
  {
    active: false,
    name: "Personal",
    count: 0,
  },
];

export default function Nav() {
  const [data, setData] = useState(navData);

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const clickData = navData.map((item) => {
      if (e.currentTarget.value === item.name) {
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });
    setData(clickData);
  }

  return (
    <div className="h-full">
      <div className="w-[300px] h-full gap-2 border-r flex flex-col p-6 items-start">
        {data.map((item) => (
          <NavItem clickHandler={clickHandler} key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}
