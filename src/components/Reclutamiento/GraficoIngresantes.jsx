import { Pie } from 'react-chartjs-2';
import { makeStyles, MenuItem, Select } from '@material-ui/core';
import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getPeticionIngNoIngresantes, getPeticionListarCantPostulAceptadosODenegados, getPeticionListarCantPostulIngYNoIng } from '../../dist/getPeticiones';
import { layouts } from 'chart.js';
import { padding } from '@mui/system';
import { CircularProgress } from '@mui/material';


const colors = {
  color: [
    '#649abe',
    '#70e3cc',
    '#b2982e',
    '#677779',
    '#502264',
    'rgba(28, 40, 51,1)',
    '#852f26',
    '#a1334b',
    '#6c911b',
    '#1b7b8a',
    '#1d3383',
    '#8a9312',
  ],
  hover_background: [
    'rgba(133, 193, 233 ,1)',
    'rgba(118, 215, 196,1)',
    'rgba(244, 208, 63,1)',
    'rgba(153, 163, 164, 1)',
    'rgba(142, 68, 173, 1)',
    'rgba(28, 40,51,1)',
    'rgba(231, 76,60,1)',
    'rgba(255,99,132,1)',
    'rgba(174, 248, 16, 1)',
    'rgba(39, 221, 249, 1)',
    'rgba(25, 73, 250, 1)',
    'rgba(232, 249, 18, 1)',
  ],
  background: [
    '#b1dfff',
    '#b2f3e6',
    '#fff0bb',
    '#bdf9ff',
    '#edc4fd',
    '#919fac',
    '#ffbdb5',
    '#ffc2cf',
    '#eaffbc',
    '#c3f8ff',
    '#c6d2ff',
    '#fbffbe',
  ],
};


const GraficoCircular = ({meses,data}) => {
  return (
    <Pie
      data={{
        labels: meses,
        datasets: [
          {
            label: '# of Votes',
            data: data,
            backgroundColor: colors.background,
            borderColor: colors.color,
            hoverBorderColor: colors.hover_background,
            borderWidth: 1,
            hoverOffset: 7,
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

        plugins: {
          datalabels: {
            align: 'end',
            offset: -40,
            anchor: 'end',
            borderRadius: 4,

            font: {
              weight: 'bold',
              size: '12',
            },
            backgroundColor: colors.background,
            color: colors.color,
          },

          legend: {
            labels: {
              font: { size: 10 },
              color: '#282828',
            },

            position: 'right',
          },
        },
      }}
    />
  );
};



const GraficoFiltroFecha = () => {
  const [dataGrafico, setDataGrafico] = useState([]);
  const [year, setYear] = useState('2000');
  const [loading, setLoading] = useState(true);

  const meses = dataGrafico.map((item) => item.Mes);
  const data = dataGrafico.map((item) => item.Cantidad_Postulantes);


  const loadDataInitial = async () => {
    const fechaActual = new Date();
    const yearActual = fechaActual.getFullYear();
    const datosAceptacion =
      await getPeticionListarCantPostulIngYNoIng(
        yearActual,
      );
    setYear(yearActual);
    return datosAceptacion;
  };

  useEffect(() => {
    loadDataInitial().then((datos) => {
      if (datos) {
        setDataGrafico(datos);
        setLoading(false);
      }
    })
  }, []);

  const selectYear = (date) => {
    const dateFormat = new Date(date);
    const yearSelected = dateFormat.getFullYear();
    setYear(yearSelected);
  };
  const handleSubmitUpdate = async () => {
    setLoading(true);
    const datos = await getPeticionListarCantPostulIngYNoIng(
      year,
    );
    setDataGrafico(datos);
    setLoading(false);
  };

  return (
    <div>
      <br />
      <div className="grid grid-cols-2">
        <h2 className="text-center text-lg font-semibold col-span-2  text-black">
        Cantidad de ingresantes y no ingresantes por año
        </h2>
        <div className="flex flex-row col-span-2 justify-center content-center py-2 ml-1">
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
            onClick={handleSubmitUpdate}
            disabled={loading}
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
              style={{ width: '0.8rem', height: '0.8rem' }}
              alt=""
            />
            <div className="font-semibold ml-1 text-gray-700">
              Filtrar por año
            </div>
          </button>
        </div>
      </div>
      <hr />
      <br />
      <div className="mt-0 sm:mt-5">
        {loading ? (
          <div className="flex justify-center content-center">
            <CircularProgress />
          </div>
        ) : (
          <GraficoCircular  meses={meses} data={data} />
        )}
      </div>
    </div>
  );
};



const GraficoFiltroFechaAceptacion = () => {
  const [dataGrafico, setDataGrafico] = useState([]);
  const [year, setYear] = useState('2000');
  const [loading, setLoading] = useState(true);
  const [AceptacionSelected, setAceptacionSelected] = useState('A');

  const meses = dataGrafico.map((item) => item.Mes);
  const data = dataGrafico.map((item) => item.Cantidad_Postulantes);


  const loadDataInitial = async () => {
    const fechaActual = new Date();
    const yearActual = fechaActual.getFullYear();
    const datosAceptacion =
      await getPeticionListarCantPostulAceptadosODenegados(
        yearActual,
        "A"
      );
    setYear(yearActual);
    return datosAceptacion;
  };

  useEffect(() => {
    loadDataInitial().then((datos) => {
      if (datos) {
        setDataGrafico(datos);
        setLoading(false);
      }
    })
  }, []);

  const selectYear = (date) => {
    const dateFormat = new Date(date);
    const yearSelected = dateFormat.getFullYear();
    setYear(yearSelected);
  };
  const handleSubmitUpdate = async () => {
    setLoading(true);
    const datos = await getPeticionListarCantPostulAceptadosODenegados(
      year,
      AceptacionSelected
    );
    setDataGrafico(datos);
    setLoading(false);
  };

  return (
    <div>
      <br />
      <div className="grid grid-cols-2">
        <h2 className="text-center text-lg font-semibold col-span-2  text-black">
        Cantidad de ingresantes y no ingresantes por año y selección
        </h2>
        <div className="flex flex-row justify-center py-2">
          <Select
            className="flex-1 w-1/2"
            onChange={(e) => setAceptacionSelected(e.target.value)}
            value={AceptacionSelected}
            name="departamento"
            label="Departamento"
            disabled={loading}
          >
            <MenuItem key="D" value="D">
                  NO Aceptados
                </MenuItem>
            <MenuItem key="A" value="A">
                  Aceptados
                </MenuItem>
          </Select>
        </div>
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
            onClick={handleSubmitUpdate}
            disabled={loading}
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
              style={{ width: '0.8rem', height: '0.8rem' }}
              alt=""
            />
            <div className="font-semibold ml-1 text-gray-700">
              Filtrar por año
            </div>
          </button>
        </div>
      </div>
      <hr />
      <br />
      <div className="mt-0 sm:mt-5">
        {loading ? (
          <div className="flex justify-center content-center">
            <CircularProgress />
          </div>
        ) : (
          <GraficoCircular  meses={meses} data={data} />
        )}
      </div>
    </div>
  );
};

const GraficoIngresantes = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
         <GraficoFiltroFecha/>
        <GraficoFiltroFechaAceptacion />
      </div>
    </div>
  );
};

export default GraficoIngresantes;
