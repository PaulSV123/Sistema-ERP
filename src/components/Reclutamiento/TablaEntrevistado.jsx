import moment from "moment";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import "../../css/antResponsive.css";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
// import { Modal, TextField, Button,Select,MenuItem } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import {
  getPeticionAreasFiltro,
  getPeticionPerfilesFiltro, //filtros
  getPeticionListarPostEntre,
  getPeticionListarPostEntreFechas,
} from "../../dist/getPeticiones";
import Spinner from "../Spinner/Spinner";
const { RangePicker } = DatePicker;

const TablaEntrevistado = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [rPactive, setRPActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perfilesFiltro, setPerfilesFiltro] = useState([]);
  const [areasFiltro, setAreasFiltro] = useState([]);
  const dateFormat = "YYYY/MM/DD";
  const [dataBody, setDataBody] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });

  // const [data2, setData2] = useState([])
  // const [loading, setLoading] = useState([])

  const filtroTurno = {
    Mañana: "Mañana",
    "Mañana y tarde": "Mañana y tarde",
    Tarde: "Tarde",
  };
  // const estadoFiltro = { Capacitación: "Capacitación" };

  useEffect(() => {
    //setData(dataRequerimientosEntrevistado);
    const fechaActual = new Date();
    const hoy = moment(fechaActual).format(dateFormat);
    const fechaAnterior = moment(
      fechaActual.setDate(fechaActual.getDate() - 30)
    ).format(dateFormat);
    fechaActual.setDate(fechaActual.getDate() + 30);
    setDataBody({
      fecha_fin: hoy,
      fecha_inicio: fechaAnterior,
    });
    // const bodyData2 = {
    //   fecha_fin: hoy,
    //   fecha_inicio: fechaAnterior,
    // };
    setRPActive(true);
    getPeticionListarPostEntre(setData, setLoading);
    getPeticionPerfilesFiltro(setPerfilesFiltro, setLoading);
    getPeticionAreasFiltro(setAreasFiltro, setLoading);
    //getPeticionListarConducta(setData2,setData2)
  }, []);

  //Funcion que hace lista por filtro fecha
  const peticionFiltroFecha = () => {
    getPeticionListarPostEntreFechas(setData, dataBody, setLoading);
  };

  //Funcion que hace lista todo
  const peticionTodos = () => {
    getPeticionListarPostEntre(setData, setLoading);
  };

  function handlePicker(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      const b = moment(fieldsValue[1]._d).format(dateFormat);
      setDataBody({
        fecha_inicio: a,
        fecha_fin: b,
      });
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-lg font-semibold col-span-2  text-black">
        Tabla Postulantes por Entrevistar
      </h1>
      <h3 className="text-center text-lg ">Filtrar por fecha:</h3>
      <div className="flex flex-row col-span-2 justify-center content-center py-2 ml-1">
        <React.StrictMode>
          {rPactive && (
            <RangePicker
              defaultValue={[
                moment(dataBody.fecha_inicio, dateFormat),
                moment(dataBody.fecha_fin, dateFormat),
              ]}
              format={dateFormat}
              onChange={handlePicker}
              placeholder={["Inicio", "Fin"]}
            />
          )}
        </React.StrictMode>

        <button
          className="btn btn btn-warning mx-2 "
          onClick={peticionFiltroFecha}
        >
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
            style={{ width: "0.8rem", height: "0.8rem" }}
            alt="buscar"
          />
        </button>
      </div>
      <br />
      <div>
        <button className="btn btn btn-warning mx-2 " onClick={peticionTodos}>
          Mostrar todo
        </button>
      </div>
      <div className="mt-3">
        <MaterialTable
          columns={[
            {
              title: "FECHA DE ENTREVISTA",
              field: "Fecha de Entrevista",
              filtering: false,
            },
            { title: "TURNO", field: "Turno", lookup: filtroTurno },
            {
              title: "NOMBRES Y APELLIDOS",
              field: "Nombres y Apellido",
              filtering: false,
            },
            { title: "EDAD", field: "Edad", filtering: false },
            { title: "CELULAR", field: "Celular", filtering: false },
            { title: "AREA", field: "Area", lookup: areasFiltro },
            { title: "PERFIL", field: "Perfil", lookup: perfilesFiltro },
            //{title: 'ESTADO',field: 'ESTADO',lookup: estadoFiltro}
          ]}
          data={data}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            }),
            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,

            exportAllData: true,
            exportFileName: "Tabla de Postulantes a Entrevistar",
            // actionsColumnIndex: -1,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "No hay Datos",
              addTooltip: "Agregar",
              deleteTooltip: "Eliminar",
              editTooltip: "Editar",
              filterRow: {
                filterTooltip: "Filtrar",
              },
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} de {count}",
              labelRowsSelect: "filas",
              labelRowsPerPage: "filas por pagina:",
              firstAriaLabel: "Primera pagina",
              firstTooltip: "Primera pagina",
              previousAriaLabel: "Pagina anterior",
              previousTooltip: "Pagina anterior",
              nextAriaLabel: "Pagina siguiente",
              nextTooltip: "Pagina siguiente",
              lastAriaLabel: "Ultima pagina",
              lastTooltip: "Ultima pagina",
            },
            toolbar: {
              nRowsSelected: "{0} ligne(s) sélectionée(s)",
              showColumnsTitle: "Ver columnas",
              showColumnsAriaLabel: "Ver columnas",
              exportTitle: "Exportar",
              exportAriaLabel: "Exportar",
              exportCSVName: "Exportar en formato CSV",
              exportPDFName: "Exportar como PDF",
              searchTooltip: "Buscar",
              searchPlaceholder: "Buscar",
            },
            header: {
              actions: "ACCIONES",
            },
          }}
        />
      </div>
    </div>
  );
};

export default TablaEntrevistado;
