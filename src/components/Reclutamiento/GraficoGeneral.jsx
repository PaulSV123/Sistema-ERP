import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  getPeticionPostByDepartamento,
  getPeticionPostByPlataforma,
  getPeticionTotalEntrevistados,
} from "../../dist/getPeticiones";
// import { getPeticionPostByPlataforma } from '../dist/getPeticiones';
const GraficoGeneral = () => {
  // const [plataformas, setPlataformas] = useState([]);
  const [loading, setLoading] = useState(false);
  // Plataforma
  const [postPlataforma, setPostPlataforma] = useState([]);
  const plataformas = postPlataforma.map((plataform) => plataform.Plataforma);
  const cantidadPlataforma = postPlataforma.map((plataform) =>
    Number(plataform.Cantidad)
  );

  // DepatamentoAprobados
  const [postDepartamento, setPostDepartamento] = useState([]);
  const  aprobadosDepartamento = postDepartamento.map((post) =>
    Number(post.Aprobados)
  );

  // Total Departamentos
  const totalDepartamento = postDepartamento.map((post) => Number(post.total));
  const departamentos = postDepartamento.map((post) => post.Departamento);


  // Total Entrevistados
  const [totalEntrevistados, setTotalEntrevistados] = useState(null);
  const entrevistados = totalEntrevistados
    ? Number(totalEntrevistados["Entrevistados"])
    : 0;
  const noEntrevistados = totalEntrevistados
    ? Number(totalEntrevistados["No Entrevistados"])
    : 0;
  const total = totalEntrevistados ? Number(totalEntrevistados["Total"]) : 0;

  useEffect(() => {
    getPeticionPostByPlataforma(setPostPlataforma, setLoading);
    getPeticionPostByDepartamento(setPostDepartamento, setLoading);
    getPeticionTotalEntrevistados(setTotalEntrevistados, setLoading);
  }, []);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
        <div>
          <div>
            <h2 className="text-center text-lg font-semibold  text-black">
              Postulaciones por plataforma
            </h2>
          </div>
          <hr />
          <div className="mt-0 sm:mt-5">
            <Doughnut
              data={{
                labels: plataformas,
                datasets: [
                  {
                    label: "# of Votes",
                    data: cantidadPlataforma,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                      "rgba(38, 245, 66, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(38, 245, 66, 1)",
                    ],
                    borderWidth: 1,
                    hoverOffset: 7,
                    hoverBackgroundColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(38, 245, 66, 1)",
                    ],
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                animation: {
                  animateRotate: false,
                },
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-center text-lg font-semibold  text-black">
              Postulaciones por departamento
            </h2>
          </div>
          <hr />
          <div className="mt-0 sm:mt-2">
            <Bar
              data={{
                labels: departamentos,
                datasets: [
                  {
                    label: "Total",
                    data: totalDepartamento,
                    backgroundColor: ["#c7ae1eae"],
                    borderColor: ["#c7ae1eae"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#c7ae1e"],
                  },
                  {
                    label: "Aprobados",
                    data: aprobadosDepartamento,
                    backgroundColor: ["#666666b5"],
                    borderColor: ["#666666b5"],
                    hoverBackgroundColor: ["#666666"],
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Custom Chart Title",
                    padding: {
                      top: 10,
                      bottom: 30,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-center text-lg font-semibold  text-black">
              Total de entrevistados
            </h2>
          </div>
          <hr />
          <div>
            <Bar
              data={{
                labels: ["Entrevistados", "No entrevistados", "Total"],
                datasets: [
                  {
                    label: "Total entrevistados",
                    data: [entrevistados, noEntrevistados, total],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                    ],
                    borderWidth: 2,
                    hoverBackgroundColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                    ],
                  },
                ],
              }}
              height={400}
              width={300}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                // Para ponerlo horizontal
                indexAxis: "y",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoGeneral;
