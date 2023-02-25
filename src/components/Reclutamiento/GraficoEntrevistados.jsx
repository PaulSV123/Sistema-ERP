import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import {  getPeticionTotalEntByYear, getPeticionTotalEntByYearMonth } from "../../dist/getPeticiones";

export const GraficoTotalEntrevistados = () => {
  const [loading, setLoading] = useState(true);

  //Cantidad de entrevistas realizadas por año
  const [year, setYear] = useState('2000');
  const [reporteEntrevistadosGen, setReporteEntrevistadosGen] = useState([]);
  const mesList = reporteEntrevistadosGen.map((post) => post.Mes);
  const entrevistados = reporteEntrevistadosGen.map((post) => Number(post.Entrevistas_Realizadas));
  const noEntrevistados = reporteEntrevistadosGen.map((post) => Number(post.Entrevistas_No_Realizadas));
  const total = reporteEntrevistadosGen.map((post) => Number(post.Total));

  //Cantidad de entrevistas realizadas por año y mes
  const [yearFiltro, setYearFiltro] = useState('2000');
  const [month, setMonth] = useState('01');
  const [reporteEntrevistadosFiltro, setReporteEntrevistadosFiltro] = useState([]);
  const mesListFiltro = reporteEntrevistadosFiltro.map((post) => post.Mes);
  const entrevistadosFiltro = reporteEntrevistadosFiltro.map((post) => post.Entrevistas_Realizadas);
  const noEntrevistadosFiltro = reporteEntrevistadosFiltro.map((post) => post.Entrevistas_No_Realizadas);
  const totalFiltro = reporteEntrevistadosFiltro.map((post) => post.Total);

  useEffect(() => {
    const fechaActual = new Date();
    const yearActual = fechaActual.getFullYear();
    const monthActual = fechaActual.getMonth() + 1;
    setYear(yearActual);
    setYearFiltro(yearActual);
    setMonth(monthActual);
    getPeticionTotalEntByYear(yearActual,setReporteEntrevistadosGen, setLoading);
    getPeticionTotalEntByYearMonth(yearActual,monthActual,setReporteEntrevistadosFiltro, setLoading);
  },[]);

  const peticionTotalEntByYear = async () => {
      getPeticionTotalEntByYear(
      year, 
      setReporteEntrevistadosGen,
      setLoading
    );
  };

  const selectYear = (date) => {
    const dateFormat = new Date(date);
    const yearSelected = dateFormat.getFullYear();
    setYear(yearSelected);
  };

  const peticionTotalEntByYearMonth = async () => {
    getPeticionTotalEntByYearMonth(
      year,
      month,
      setReporteEntrevistadosFiltro,
      setLoading
    );
  }

  const selectYearFiltro = (date) => {
    const valorMes = new Date(date);
    const formatoValorMes = valorMes.getMonth() + 1;
    setMonth(formatoValorMes);
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
      <div>
        <br/>
          <div>
            <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Total de entrevistados por año
            </h2>
            <div className="flex flex-row justify-center content-center py-2 ml-1">
              <React.StrictMode>
                <DatePicker
                  picker="year"
                  value={moment(year, 'YYYY')}
                  onChange={(date) => selectYear(date)}
                  disabled={loading}
                />
              </React.StrictMode>
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">  
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionTotalEntByYear}>
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                    style={{ width: "0.8rem", height: "0.8rem" }}
                    alt=""
                  />
                  <div className="font-semibold ml-1 text-gray-700">
                    Filtrar por año
                  </div>
              </button>
            </div>
          </div>
        <br/>
        <div className="mt-0 sm:mt-2">
            <Bar
              data={{
                barThickness: '20px',
                labels: mesList,
                datasets: [
                  {
                    label: "Entrevistados",
                    data: entrevistados,
                    backgroundColor: ["#d1e9eb"],
                    borderColor: ["#72cccc"],
                    borderWidth: 1,
                    hoverBackgroundColor: ["#72cccc"],
                  },
                  {
                    label: "No entrevistados",
                    data:   noEntrevistados,
                    backgroundColor: ["#f5ecd6"],
                    borderColor: ["#fadd94"],
                    borderWidth: 1,
                    hoverBackgroundColor: ["#fadd94"],
                  },
                  {
                    label: "Total",
                    data: total,
                    backgroundColor: ["rgba(153, 102, 255, 0.2)"],
                    borderColor: ["rgba(153, 102, 255, 1)"],
                    borderWidth: 1,
                    hoverBackgroundColor: ["rgba(153, 102, 255, 1)"],
                  },
                ],
              }}
              height={400}
              width={300}
              options={{
              indexAxis: 'y',
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  stacked: true,
                },
                x: {
                  stacked: true,
                },
              },
              interaction: {
                mode: 'index',
                intersect: true,
              },
            }}
            />
        </div>
      </div>
    </div>
  );
}
export default GraficoTotalEntrevistados;
