import { ResponsiveCalendar } from "@nivo/calendar";
import useTask from "../store";
import { useEffect, useState } from "react";

type data = {
  day: string;
  value: number;
}[];

export default function UserAnalyze() {
  const nowYear = new Date().getFullYear();
  const formatForm = `${nowYear}-1-1`;
  const formatTo = `${nowYear}-12-31`;
  const { task } = useTask();
  const [data, setData] = useState<data>();

  const taskLoading = () => {
    if (task) {
      const newData = task.reduce((acc: data, curr) => {
        const date = new Date(curr.descID);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const format = `${year}-${month}-${day}`;
        const existIndex = acc.findIndex((item) => item.day === format);

        if (existIndex !== -1) {
          acc[existIndex].value++;
        } else {
          acc.push({
            value: 1,
            day: format,
          });
        }
        return acc;
      }, []);
      setData(newData);
    }
  };

  useEffect(() => {
    taskLoading();
  }, [task]);

  return (
    <div className="w-full h-[300px] pt-4 border-b pb-8">
      <div className="text-3xl font-mono flex justify-center items-center h-14">USER RESULT</div>
      {data ? (
        <ResponsiveCalendar
          data={data}
          from={formatForm}
          to={formatTo}
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ right: 80, left: 80 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      ) : null}
    </div>
  );
}
