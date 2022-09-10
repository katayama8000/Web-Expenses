import React, { FC, memo, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const salesGoals = 10000000;
let team1 = 2800000;
let team2 = 3800000;

const data = {
  labels: ["team1", "team2", "left"],
  datasets: [
    {
      label: "売上",
      data: [team1, team2, salesGoals - (team1 + team2)],
      backgroundColor: [
        "rgb(255, 0, 0)",
        "rgba(255, 165, 0)",
        "rgba(201, 203, 207)",
      ],
      // borderColor: [
      //   "rgba(255, 99, 132, 1)",
      //   "rgba(54, 162, 235, 1)",
      //   "rgba(255, 206, 86, 1)",
      // ],
      // borderWidth: 1,
    },
  ],
};

type Props = {
  width: number;
  height: number;
};

export const PieChart: FC<Props> = memo(({ width, height }) => {
  const [style, setStyle] = useState("");
  useEffect(() => {
    setStyle(`w-[${width}px] h-[${height}px]`);
  }, [width, height]);
  return (
    <div className={style}>
      <Doughnut data={data} />
    </div>
  );
});

PieChart.displayName = "PieChart";
