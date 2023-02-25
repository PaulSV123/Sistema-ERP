import React from "react";

import {
  Chart,
  ArcElement,
  BarElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  PieController,
} from "chart.js";

import { Pie } from "react-chartjs-2";

Chart.register(
  ArcElement,
  BarElement,
  PieController,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

const GraficoNotasIntegracion = ({ departamento, areas, notas }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: departamento,
      },

      legend: {
        labels: {
          font: {
            size: 11,
          },
        },
      },
      datalabels: {
        font: {
          weight: "bold",
          size: 24,
        },
        color:"#ffffff"
      },
    },
  };
  const data = {
    labels: [...areas],
    datasets: [
      {
        label: "PROMEDIO",
        data: notas,
        backgroundColor: ["#F4848D", "#C97FAD", "#4B93C6","#62B98E","#FFF773"],
        borderColor: "orange",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-1/2">
      <Pie data={data} options={options} />
    </div>
  );
};

export default GraficoNotasIntegracion;
