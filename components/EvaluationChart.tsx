"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type Props = {
  labels: string[];
  values: number[];
};

export default function EvaluationChart({ labels, values }: Props) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Average Rating",
            data: values,
            borderColor: "rgb(37, 99, 235)",
            backgroundColor: "rgba(37, 99, 235, 0.2)",
            tension: 0.35
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: { legend: { position: "top" } },
        scales: { y: { min: 0, max: 5 } }
      }}
    />
  );
}
