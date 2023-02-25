import React, { useEffect, useState } from "react";

import { getPeticionGraficoCircularMes } from "../apis/peticionGet";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraficoCircular_Semana = ({semanax, mesx, datos}) => {
  
  const handlesubmit =()=>{
    return datos;
  }

  // trayendo datos esenciales para pintar
  const semanas= semanax||{};
  const mesEscogido = mesx;
  
  // Sacando los valores con object keys y values
  const labelSemana = Object.keys(semanas);
  const valorSemana = Object.values(semanas);

  // // Funcion para crear colores dependiendo de las semanas
  const coloresRgbRandoms = () => {
    const randomBetween = (min, max) =>
      min + Math.floor(Math.random() * (max - min + 2));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const randomBetweenDouble = (min, max) =>
      min + Math.random() * (max - min + 1);
    const d = randomBetweenDouble(0, 1);
    const colo = `rgba(${r},${g},${b},${d})`;
    return colo;
  };

  const rgb = () => {
    let colores = [];
    for (let i = 0; i < labelSemana.length; i++) {
      if (coloresRgbRandoms() !== coloresRgbRandoms()) {
        colores.push(coloresRgbRandoms());
      }
    }
    // console.log(colores)
    return colores;
  };

  const data = {
    labels: labelSemana,
    datasets:[
      {
        data: valorSemana, 
        backgroundColor: rgb()
      }
    ]
  }

  const opciones = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          generateLabels(chart) {
            const data = chart.data;
            return data.labels.map((label, i) => {
              var backgroundColor = data.datasets[0].backgroundColor[i];
              return {
                text: label + " :" + data.datasets[0].data[i] + " Inducidos",
                fillStyle: backgroundColor,
                index: i,
              };
            });
          },
          font: {
            size: 11,
            family: "Helvetica",
          },
          margin: {
            rigth: 8,
            left: 8,
          },
          boxWidth: 15,
          color: "rgba(52, 51, 51, 0.88)",
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
      title: {
        display: true,
        text: `${mesEscogido}`,
        font: {
          size: 45,
          family: "Helvetica Neue"
        },
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={opciones}/>
    </div>
  );
};

export default GraficoCircular_Semana;
