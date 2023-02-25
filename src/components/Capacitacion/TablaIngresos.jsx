
//import { Bar } from "react-chartjs-2";
import { MenuItem, FormControl, Select, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  getPeticionIngRetByDepartamentoM ,
  getPeticionIngRetByDepartamentoT,
} from "../../dist/Capacitacion/getPeticiones"
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { getPeticionDepartamentoId } from "../../dist/getPeticiones";

export const TablaIngresos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoFiltroM, setDepartamentoFiltroM] = useState([]);
  const [departamentoFiltroT, setDepartamentoFiltroT] = useState([]);
  const [dataBody, setDataBody] = useState({
    fecha: "",
  });
  const dateFormat = "YYYY/MM/DD";
  const  [dataIngRetDepFechaM, setDataIngRetDepFechaM] = useState([]);
  const areaDepM = dataIngRetDepFechaM.map((post) => post.Area);
  const cantidadIngresosM = dataIngRetDepFechaM.map((post) => Number(post.Ingresos) );
  const cantidadRetirosM = dataIngRetDepFechaM.map((post) => Number(post.Retiros));

  const  [dataIngRetDepFechaT, setDataIngRetDepFechaT] = useState([]);
  const areaDepT = dataIngRetDepFechaT.map((post) => post.Area);
  const cantidadIngresosT = dataIngRetDepFechaT.map((post) => Number(post.Ingresos) );
  const cantidadRetirosT = dataIngRetDepFechaT.map((post) => Number(post.Retiros));
  //const [rPactive, setRPActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeticionDepartamentoId(setDepartamentos, setLoading);
    //setRPActive(true);
    getPeticionIngRetByDepartamentoM(setDepartamentoFiltroM,dataBody, setDataIngRetDepFechaM, setLoading);
    getPeticionIngRetByDepartamentoT(setDepartamentoFiltroT,dataBody, setDataIngRetDepFechaT, setLoading);
  }, [loading]);

  //Funcion que hace la peticion del turno Mañana
  const peticionIngRetDepFechaM = async () => {
    getPeticionIngRetByDepartamentoM(
      departamentoFiltroM.value,
      dataBody,
      setDataIngRetDepFechaM,
      setLoading
    );
  };

  // Funcion que almacena los cambios en el state de inputs del departamento del turno Mañana
  const handleChangeDepM = (e) => {
    const { value } = e.target;
    setDepartamentoFiltroM({ value });
  };

  //Funcion para los cambios para la fecha del turno Mañana
  function handlePickerTurnoM(date, dateString) {
    setDataBody({
        fecha: dateString,
      });
  }

  //Funcion que hace la peticion del turno Tarde
  const peticionIngRetDepFechaT = async () => {
    getPeticionIngRetByDepartamentoT(
      departamentoFiltroT.value,
      dataBody,
      setDataIngRetDepFechaT,
      setLoading
    );
  };

  // Funcion que almacena los cambios en el state de inputs del departamento del turno Tarde
  const handleChangeDepT = (e) => {
    const { value } = e.target;
    setDepartamentoFiltroT({ value });
  };

  //Funcion para los cambios para la fecha del turno Tarde
  function handlePickerTurnoM(date, dateString) {
    setDataBody({
        fecha: dateString,
      });
  }

  return (
    <div className="container mx-auto">
      <br /><h2 className="text-center text-lg font-semibold col-span-2  text-black">
        INGRESOS Y RETIROS
      </h2><br />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
        <div>
          <div className="grid grid-cols-2">
          <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Turno Mañana
            </h2>
            <div style={{width: '300px'}} className="flex flex-row justify-center content-center py-2 ml-1">  
              <Select 
                style={{textAlign: "center"}}
                className="flex-1 w-1/2"
                onChange={handleChangeDepM}
                value={departamentoFiltroM.value}
                name="departamento"
                label="Departamento"
                
              >
                {departamentos.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Unidades}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-row justify-center content-center py-2 ml-1">
            <DatePicker
                    selected={moment(dataBody.fecha)} 
                    format={"YYYY-MM-DD"}
                    onChange={handlePickerTurnoM}
                    size="large"
                    placeholder={["Fecha"]}
                  />
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionIngRetDepFechaM}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                  style={{ width: "0.8rem", height: "0.8rem" }}
                  alt=""
                />
                <div className="font-semibold ml-1 text-gray-700">
                   Filtrar
                </div>
              </button>
            </div>
          </div>
          <hr />
          <div className="mt-0 sm:mt-2">
            <Bar
              data={{
                labels: areaDepM,
                datasets: [
                  {
                    label: "Ingresos",
                    data: cantidadIngresosM,
                    backgroundColor: ["#d1e9eb"],
                    borderColor: ["#72cccc"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#72cccc"],
                  },
                  {
                    label: "Retiros",
                    data: cantidadRetirosM,
                    backgroundColor: ["#f5ecd6"],
                    borderColor: ["#fadd94"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#fadd94"],
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
          <div className="grid grid-cols-2">
          <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Turno Tarde
            </h2>
            <div style={{width: '300px'}} className="flex flex-row justify-center content-center py-2 ml-1">  
              <Select 
                style={{textAlign: "center"}}
                className="flex-1 w-1/2"
                onChange={handleChangeDepT}
                value={departamentoFiltroT.value}
                name="departamento"
                label="Departamento"
                
              >
                {departamentos.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Unidades}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-row justify-center content-center py-2 ml-1">
            <DatePicker
                    selected={moment(dataBody.fecha)} 
                    format={"YYYY-MM-DD"}
                    onChange={handlePickerTurnoM}
                    size="large"
                    placeholder={["Fecha"]}
                  />
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionIngRetDepFechaT}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                  style={{ width: "0.8rem", height: "0.8rem" }}
                  alt=""
                />
                <div className="font-semibold ml-1 text-gray-700">
                  Filtrar
                </div>
              </button>
            </div>
          </div>
          <hr />
          <div className="mt-0 sm:mt-2">
            <Bar
              data={{
                labels: areaDepT,
                datasets: [
                  {
                    label: "Ingresos",
                    data: cantidadIngresosT,
                    backgroundColor: ["#d1e9eb"],
                    borderColor: ["#72cccc"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#72cccc"],
                  },
                  {
                    label: "Retiros",
                    data: cantidadRetirosT,
                    backgroundColor: ["#f5ecd6"],
                    borderColor: ["#fadd94"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#fadd94"],
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
      </div>
    </div>
  );
};