import { MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import {
  getPeticionCantLlamadYEntrevGnral,
  getPeticionCantLlamadYEntrevReclutador
} from "../../dist/getPeticiones";
import { getPeticionListarReclutadores } from "../../dist/Capacitacion/getPeticiones";

const { RangePicker } = DatePicker;
const GraficoLlamadasEntrevistas = () => {
  const [loading, setLoading] = useState(true);
  const [rPactive, setRPActive] = useState(false);
  const dateFormat = "YYYY-MM-DD";

  //Canrtidad de llamadas y entrevistas general
  const [dataBodyGeneral, setDataBodyGeneral] = useState({
    FechaI: "",
    FechaF: "",
  });
  const [dataLlamEntreFecha, setDataLlamEntreFecha] = useState([]);
  const encargados = dataLlamEntreFecha.map((post) => post.Encargado);
  const cantidadLlamadasRealizadas = dataLlamEntreFecha.map((post) => Number(post.Cant_Llamadas_Rea));
  const cantidadEntrevistasAceptadas = dataLlamEntreFecha.map((post) => Number(post.Can_Entrevistas_Rea));

  //Cantidad de llamadas y entrevistas por reclutador
  const [dataBodyFecReclutador, setDataBodyFecReclutador] = useState({
    fecha_inicial: "",
    fecha_final: "",
    id_encargado: "",
  });
  const [reclutadores, setReclutadores] = useState([]);
  const [reclutadorFiltro, setReclutadorFiltro] = useState({ value: 12 });
  const [dataLlamEntreFechaFiltro, setDataLlamEntreFechaFiltro] = useState([]);
  const nombreEncargado = dataLlamEntreFechaFiltro.map((post) => post.Encargado);
  const cantidadLlamRealEncargado = dataLlamEntreFechaFiltro.map((post) => Number(post.Cant_Llamadas_Rea));
  const cantidadEnAcepEncargado = dataLlamEntreFechaFiltro.map((post) => Number(post.Can_Entrevistas_Rea));

  useEffect(() => {
    getPeticionListarReclutadores(setReclutadores);
    const fechaActual = new Date();
    const hoy = moment(fechaActual).format("YYYY-MM-DD");
    const fechaAnterior = moment(
      fechaActual.setDate(fechaActual.getDate() - 30)
    ).format("YYYY-MM-DD");
    fechaActual.setDate(fechaActual.getDate() + 30);
    setDataBodyFecReclutador({
      fecha_final: hoy,
      fecha_inicial: fechaAnterior,
    });
    setDataBodyGeneral({
      FechaF: hoy,
      FechaI: fechaAnterior,
    });
    const bodyData = {
      FechaF: hoy,
      FechaI: fechaAnterior,
    };
    const bodyDataRec = {
      fecha_final: hoy,
      fecha_inicial: fechaAnterior,
      id_encargado: "12",
    };
    setRPActive(true);
    getPeticionCantLlamadYEntrevGnral(
        bodyData,
        setDataLlamEntreFecha,
        setLoading
      );

    getPeticionCantLlamadYEntrevReclutador (setDataLlamEntreFechaFiltro, bodyDataRec, setLoading);
  }, []);

  //Funcion que hace la peticion para el reporte general
  const peticionLlamEntrevFechaGnral = async () => {
    getPeticionCantLlamadYEntrevGnral(
      dataBodyGeneral,
      setDataLlamEntreFecha,
      setLoading
    );
  };
  function handlePickerGeneral(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setDataBodyGeneral({
        FechaI: a,
        FechaF: b,
      });
    }
  }

  //Funcion que hace la peticion para el reporte por reclutador
  const peticionLlamEntrevReclutFecha = async () => {
    dataBodyFecReclutador.id_encargado = reclutadorFiltro.value;
    getPeticionCantLlamadYEntrevReclutador(setDataLlamEntreFechaFiltro, dataBodyFecReclutador, setLoading);
  };
  const handleChangeReclutador = (e) => {
    const { value } = e.target;
    setReclutadorFiltro({ value });
  };
  function handlePickerRecluter(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setDataBodyFecReclutador({
        fecha_inicial: a,
        fecha_final: b,
      });
    }
  }

  return (
    <div className="container mx-auto">
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
        <div>
          <div className="grid grid-cols-2">
            <h2 className="text-center text-lg font-semibold col-span-2  text-black">
              Cantidad de llamadas y entrevistas por fecha
            </h2>
            <div className="flex flex-row col-span-2 justify-center content-center py-2 ml-1">
              <React.StrictMode>
                {rPactive && (
                  <RangePicker
                    defaultValue={[
                      moment(dataBodyGeneral.FechaI, dateFormat),
                      moment(dataBodyGeneral.FechaF, dateFormat),
                    ]}
                    format={dateFormat}
                    onChange={handlePickerGeneral}
                    placeholder={["Inicio","Fin"]}
                  />
                )}
              </React.StrictMode>
            </div>
            <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
              <button
                className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                onClick={peticionLlamEntrevFechaGnral}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                  style={{ width: "0.8rem", height: "0.8rem" }}
                  alt=""
                />
                <div className="font-semibold ml-1 text-gray-700">
                  Filtrar por fecha
                </div>
              </button>
              </div>
          </div>
          <hr />
          <div className="mt-0 sm:mt-5">
            <Bar
              data={{
                labels: encargados,
                datasets: [
                  {
                    label: "Suma de # Llamadas Realizadas",
                    data: cantidadLlamadasRealizadas,
                    backgroundColor: ["#c7ae1eae"],
                    borderColor: ["#c7ae1eae"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#c7ae1e"],
                  },
                  {
                    label: "Suma de # Entrevistas Aceptadas",
                    data: cantidadEntrevistasAceptadas,
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
                    ticks: {
                      stepSize: 2,
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
              Cantidad de llamadas y entrevistas por fecha y reclutador 
            </h2>
            <div className="flex flex-row justify-center py-2">
              <Select
                className="flex-1 w-1/2"
                  onChange={handleChangeReclutador}
                  value={reclutadorFiltro.value}
                  name="reclutador"
                  label="Reclutador"
                >
                  {reclutadores.map((option, i) => {
                    return (
                      <MenuItem key={i} value={option.Emp_Id}>
                        {option.Reclutador}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div className="flex flex-row justify-center content-center py-2 ml-1">
                <React.StrictMode>
                    {rPactive && (
                      <RangePicker
                        defaultValue={[
                          moment(dataBodyFecReclutador.fecha_inicial, dateFormat),
                          moment(dataBodyFecReclutador.fecha_final, dateFormat),
                        ]}
                        format={dateFormat}
                        onChange={handlePickerRecluter}
                        placeholder={["Inicio","Fin"]}
                      />
                    )}
                </React.StrictMode>
              </div>
                <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
                <button
                  className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
                  onClick={peticionLlamEntrevReclutFecha}
                >
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                    style={{ width: "0.8rem", height: "0.8rem" }}
                    alt=""
                  />
                   <div className="font-semibold ml-1 text-gray-700">
                    Filtrar por fecha
                    </div>
                  </button>
                </div>
              </div>
              <hr />
              <div className="mt-0 sm:mt-2">
              <Bar
                data={{
                  labels: nombreEncargado,
                  datasets: [
                    {
                      label: "Suma de # Llamadas Realizadas",
                      data: cantidadLlamRealEncargado,
                      backgroundColor: ["#c7ae1eae"],
                      borderColor: ["#c7ae1eae"],
                      borderWidth: 2,
                      hoverBackgroundColor: ["#c7ae1e"],
                    },
                    {
                      label: "Suma de # Entrevistas Aceptadas",
                      data: cantidadEnAcepEncargado,
                      backgroundColor: ["#666666b5"],
                      borderColor: ["#666666b5"],
                      hoverBackgroundColor: ["#666666"],
                    },
                  ],
                }}
                height={400}
                width={400}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 2,
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

export default GraficoLlamadasEntrevistas;
