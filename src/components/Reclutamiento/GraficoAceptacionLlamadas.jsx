import React, { useEffect, useState } from 'react';

import { Select, MenuItem, CircularProgress } from '@material-ui/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { DatePicker } from 'antd';
import moment from 'moment';
import {
  getPeticionListarPlataformasPostulacion,
  getPeticionListarPostulantesAceptadosYear,
  getPeticionListarPostulantesAceptadosYearnAndPlataforma,
} from '../../dist/getPeticiones';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const dataLabels = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const adapterData = (dataTest) => {
  const plataformasObjeto = [];
  dataTest.forEach((item) => {
    plataformasObjeto[item.Plataforma] =
      plataformasObjeto[item.Plataforma] || [];
    plataformasObjeto[item.Plataforma].push(item);
  });
  const colores = [
    '#22b2da',
    '#005689',
    '#27296d',
    '#ffa323',
    '#dc2f2f',
    '#42b883',
    '#702283',
    '#004445',
    '#22313f',
    '#ffc107',
    '#2e94b9',
    '#45171d',
  ];
  let colorPosition = 0;
  const plataformasFinales = [];
  for (let plataforma in plataformasObjeto) {
    colorPosition++;
    if (colorPosition >= colores.length) {
      colorPosition = 0;
    }
    let mesesObject = {};
    for (let mes of dataLabels) {
      mesesObject[mes] = 0;
    }

    for (let mes of plataformasObjeto[plataforma]) {
      mesesObject[mes.Mes] = mes.Cantidad_Postulantes;
    }
    const meses = Object.values(mesesObject);

    plataformasFinales.push({
      label: plataforma,
      data: meses,
      borderColor: colores[colorPosition],
      backgroundColor: colores[colorPosition],
    });
  }
  return plataformasFinales;
};

const Grafico = ({ dataGrafico = [] }) => {
  return (
    <Bar
      data={{
        barThickness: '20px',
        labels: dataLabels,
        datasets: dataGrafico,
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

        plugins: {
          datalabels: {
            color: 'white',
            display: function (context) {
              return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
            },
          },
          legend: {
            position: 'bottom',
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

  const actualizarGrafico = (datos) => {
    const final = adapterData(datos);
    console.log(final);
    setDataGrafico(final);
  };

  useEffect(() => {
    const fechaActual = new Date();
    const yearActual = fechaActual.getFullYear();
    setYear(yearActual);
    getPeticionListarPostulantesAceptadosYear(yearActual).then((datos) => {
      actualizarGrafico(datos);
      setLoading(false);
    });
  }, []);

  const selectYear = (date) => {
    const dateFormat = new Date(date);
    const yearSelected = dateFormat.getFullYear();
    setYear(yearSelected);
  };
  const handleSubmitUpdate = async () => {
    setLoading(true);
    const datos = await getPeticionListarPostulantesAceptadosYear(year);
    actualizarGrafico(datos);
    setLoading(false);
  };

  return (
    <div>
      <br />
      <div className="grid grid-cols-2">
        <h2 className="text-center text-lg font-semibold col-span-2  text-black">
        Cantidad de aceptacion llamadas por año y plataforma
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
          <Grafico dataGrafico={dataGrafico} />
        )}
      </div>
    </div>
  );
};


// const GraficoFiltroFechaPlataforma = () => {
//   const [dataGrafico, setDataGrafico] = useState([]);
//   const [year, setYear] = useState('2000');
//   const [loading, setLoading] = useState(true);
//   const [plataformas, setPlataformas] = useState([]);
//   const [plataformaSelected, setPlataformaSelected] = useState('');

//   const actualizarGrafico = (datos) => {
//     const final = adapterData(datos);
//     console.log(final);
//     setDataGrafico(final);
//   };

//   const loadDataInitial = async () => {
//     const fechaActual = new Date();
//     const yearActual = fechaActual.getFullYear();
//     const plataformas_ = await getPeticionListarPlataformasPostulacion();

//     if (plataformas_.length <= 0) return false;
//     const IdfirstPlataforma = plataformas_[0].ID || 0;

//     const datosPlataforma =
//       await getPeticionListarPostulantesAceptadosYearnAndPlataforma(
//         yearActual,
//         IdfirstPlataforma
//       );
//     setYear(yearActual);
//     setPlataformas(plataformas_);
//     setPlataformaSelected(IdfirstPlataforma);
//     return datosPlataforma;
//   };

//   useEffect(() => {
//     loadDataInitial().then((datos) => {
//       if (datos) {
//         actualizarGrafico(datos);
//         setLoading(false);
//       }
//     })
//   }, []);

//   const selectYear = (date) => {
//     const dateFormat = new Date(date);
//     const yearSelected = dateFormat.getFullYear();
//     setYear(yearSelected);
//   };
//   const handleSubmitUpdate = async () => {
//     setLoading(true);
//     const datos = await getPeticionListarPostulantesAceptadosYearnAndPlataforma(
//       year,
//       plataformaSelected
//     );
//     actualizarGrafico(datos);
//     setLoading(false);
//   };

//   return (
//      {/* <div>
//       <br />
//       <div className="grid grid-cols-2">
//         <h2 className="text-center text-lg font-semibold col-span-2  text-black">
//         Cantidad de aceptacion llamadas por año y plataforma
//         </h2>
//         <div className="flex flex-row justify-center py-2">
//           <Select
//             className="flex-1 w-1/2"
//             onChange={(e) => setPlataformaSelected(e.target.value)}
//             value={plataformaSelected}
//             name="departamento"
//             label="Departamento"
//             disabled={loading}
//           >
//             {plataformas.map((_plataforma) => {
//               return (
//                 <MenuItem key={_plataforma.ID} value={_plataforma.ID}>
//                   {_plataforma.Plataforma}
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </div>
//         <div className="flex flex-row justify-center content-center py-2 ml-1">
//           <React.StrictMode>
//             <DatePicker
//               picker="year"
//               value={moment(year, 'YYYY')}
//               onChange={(date) => selectYear(date)}
//               disabled={loading}
//             />
//           </React.StrictMode>
//         </div>
//         <div className="col-span-2 flex flex-wrap justify-center mt-2 gap-2 mb-3">
//           <button
//             className=" btn btn btn-warning mx-2 px-5 flex justify-center content-center"
//             onClick={handleSubmitUpdate}
//             disabled={loading}
//           >
//             <img
//               src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
//               style={{ width: '0.8rem', height: '0.8rem' }}
//               alt=""
//             />
//             <div className="font-semibold ml-1 text-gray-700">
//               Filtrar por año
//             </div>
//           </button>
//         </div>
//       </div>
//       <hr />
//       <br />
//       <div className="mt-0 sm:mt-5">
//         {loading ? (
//           <div className="flex justify-center content-center">
//             <CircularProgress />
//           </div>
//         ) : (
//           <Grafico dataGrafico={dataGrafico} />
//         )}
//       </div>
//         </div> */}
//   );
// };

const GraficoAceptacionLlamadas = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 mt-0 sm:mt-4">
        <GraficoFiltroFecha />
      {/*  <GraficoFiltroFechaPlataforma /> */ }
      </div>
    </div>
  );
};

export default GraficoAceptacionLlamadas;
