import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles, Modal } from "@material-ui/core";
import ParametrosEvaluacion from "./ParametrosEvaluacion";
import {
  getPeticionListarConducta,
  getPeticionPerfilesFiltro,
} from "../../../dist/getPeticiones";
import Spinner from "../../Spinner/Spinner";
import { postPeticionActualizarConducta } from "../../../dist/postPeticiones";
import { UserContext } from "../../context/UserContext";
//Estilos
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  //Estilo para tener la primera columna de la tabla fija
  stickyActionsColumn: {
    "& table:first-child": {
      "& tr": {
        "& td:first-child, th:first-child": {
          backgroundColor: "#EEE",
          position: "sticky",
          left: 0,
          zIndex: 1,
        },
        "& th:first-child": {
          zIndex: 11,
        },
      },
    },
  },
}));

const TablaEvaluacionConducta = () => {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [camposCambiados, setCamposCambiados] = useState([]);
  // const [upData, setUpData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  //
  const [datosUpdate, setDatosUpdate] = useState([]);
  //
  const [perfilesTabla, setPerfilesTabla] = useState([]);

  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };
  //Funcion que devuelve los cambios en un objeto
  const cambiosCampos = (oldObj, newObj) => {
    const keys1 = Object.keys(oldObj);
    let objChange = {
      nombreApellido: newObj["Nombres y Apellido"],
    };
    for (let key of keys1) {
      if (oldObj[key] !== newObj[key] && key !== "tableData") {
        objChange[key] = newObj[key];
      }
    }
    return objChange;
  };
  //Funcion que enlista los cambios en el modal
  const listarCambios = () => {
    if (camposCambiados.length !== 0) {
      return camposCambiados.map((data) => {
        return <li className="m-1 p-1">{data.nombreApellido}</li>;
      });
    } else {
      return "";
    }
  };
  let calificacion = {null:'-', 0: "0", 1: "1" };
  const columns = [
    {
      title: "NOMBRES Y APELLIDOS",
      field: "Nombres y Apellido",
      editable: "never",
      cellStyle: { whiteSpace: "nowrap" },
      filtering: false,
    },
    { title: "EDAD", field: "Edad", editable: "never", filtering: false },
    { title: "DNI", field: "Dni", editable: "never", filtering: false },
    {
      title: "PERFIL",
      field: "Tipo de Puesto a Postular",
      editable: "never",
      lookup: perfilesTabla,
    },
    {
      title: "ATENCI??N A EXPLICACIONES",
      field: "Est?? atento/a a las explicaciones que se le da",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "COMPRENSI??N DE INSTRUCCIONES",
      field: "Comprende las instrucciones de forma r??pida",
      filtering: false,
      lookup: calificacion,
      // cellStyle: { whiteSpace: "nowrap" },
    },
    {
      title: "ROPA ADECUADA",
      field: "Se presenta con ropa adecuada a la entrevista",
      lookup: calificacion,
      filtering: false,
      // cellStyle: { whiteSpace: "nowrap" },
    },
    {
      title: "PREGUNTAS ANTE DIFICULTAD",
      field: "Pregunta ante la presencia de alguna dificultad",
      lookup: calificacion,
      filtering: false,
      // cellStyle: { whiteSpace: "nowrap" },
    },
    {
      title: "INTERES",
      field: "Muestra inter??s durante el desarrollo de las sesiones",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "POSTURA",
      field: "Mantiene una postura adecuada",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "LENGUAJE",
      field: "NO Utiliza un lenguaje soez y/o vulgar para expresarse",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "RESPUESTAS ASERTIVAS",
      field: "Responde de manera asertiva",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "TENSO O NERVIOSO",
      field: "NO Se muestra tenso/a  y/o nervioso/a",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "FATIGA O IRRITABILIDAD",
      field: "NO Muestra fatiga y/o irritabilidad durante las sesiones",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "DISTRACCI??N",
      field:
        "NO Usa objetos distractores durante las sesiones (tel??fono, MP4, tablet, etc)",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "OBSERVACIONES",
      field: "Observaciones",
      filtering: false,
    },
    {
      title: "PUNTAJE TOTAL",
      field: "Puntaje Total",
      editable: "never",
      filtering: false,
    },
    {
      title: "RESULTADO",
      field: "Resultado final",
      editable: "never",
      filtering: false,
    },
  ];
  const options = {
    filtering: true,
    headerStyle: {
      backgroundColor: "#E2E2E2  ",
    },
    rowStyle: (rowData) => ({
      backgroundColor:
        selectedRow === rowData.tableData.id ? "#F5F5F5" : "#FFF",
    }),
    searchFieldAlignment: "left",
    showTitle: false,
    exportButton: {
      csv: true,
      pdf: false,
    },
    exportAllData: true,
    exportFileName: "Tabla de Evaluaci??n Conducta",
    actionsColumnIndex: -1,
  };
  useEffect(() => {
    getPeticionListarConducta(setData, setLoading);
  },[]);
  useEffect(() => {
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
  }, []);

  //Funcion que devuelve la dataPuntaje
  const dataPuntajePostulante = (newData) => {
    const Puntaje1 = Number(
      newData["Est?? atento/a a las explicaciones que se le da"]
    );
    const Puntaje2 = Number(
      newData["Comprende las instrucciones de forma r??pida"]
    );
    const Puntaje3 = Number(
      newData["Pregunta ante la presencia de alguna dificultad"]
    );
    const Puntaje4 = Number(
      newData["Muestra inter??s durante el desarrollo de las sesiones"]
    );
    const Puntaje5 = Number(newData["Mantiene una postura adecuada"]);
    const Puntaje6 = Number(
      newData["NO Utiliza un lenguaje soez y/o vulgar para expresarse"]
    );
    const Puntaje7 = Number(newData["Responde de manera asertiva"]);
    const Puntaje8 = Number(newData["NO Se muestra tenso/a  y/o nervioso/a"]);
    const Puntaje9 = Number(
      newData["NO Muestra fatiga y/o irritabilidad durante las sesiones"]
    );
    const Puntaje10 = Number(
      newData[
        "NO Usa objetos distractores durante las sesiones (tel??fono, MP4, tablet, etc)"
      ]
    );
    const Puntaje11 = Number(
      newData["Se presenta con ropa adecuada a la entrevista"]
    );
    const Observaciones = newData["Observaciones"];

    const dataPuntaje = {
      Puntaje1,
      Puntaje2,
      Puntaje3,
      Puntaje4,
      Puntaje5,
      Puntaje6,
      Puntaje7,
      Puntaje8,
      Puntaje9,
      Puntaje10,
      Puntaje11,
      Observaciones,
    };
    return dataPuntaje;
  };
  //Funcion que actualiza al postulante
  const actualizarPuntajePostulante = () => {
    datosUpdate.forEach((item) => {
      postPeticionActualizarConducta(item.idPostulante, item.dataPuntaje);
      // console.log(item);
    });
  };
  //Modal de confirmacion
  const bodyConfirmar = (
    <div className={styles.modal}>
      <h3 className="text-center text-xl font-bold">Confirmar Cambios</h3>
      <hr />
      <div className="flex flex-col align-middle">
        <div className="flex flex-col py-2 text-center ">
          <h1 className="font-bold text-lg ">
            {camposCambiados.length !== 0 ? "Postulantes" : "No hubo Cambios"}
          </h1>
          <ul className="flex flex-col">{listarCambios()}</ul>
        </div>
      </div>
      <br />
      <div className="flex justify-evenly items-center">
        <button
          className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          onClick={async () => {
            await actualizarPuntajePostulante();
            setCamposCambiados([]);
            setDatosUpdate([]);
            abrirCerrarModalConfirmar();
            getPeticionListarConducta(setData, setLoading);
          }}
        >
          ACEPTAR
        </button>

        {camposCambiados.length !== 0 && (
          <button
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            onClick={() => {
              setCamposCambiados([]);
              setDatosUpdate([]);
              abrirCerrarModalConfirmar();
            }}
          >
            CANCELAR
          </button>
        )}
      </div>
    </div>
  );
  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold  text-center text-black ">
          Evaluacion de Conducta
        </h3>
        {/* Componente que establece los paramtros de la evaluacion */}
        <ParametrosEvaluacion
          calificacion="Calificacion de la observaci??n de la conducta"
          califAprobado="Aprobado: 1"
          califDesaprobado="Desaprobado: 0"
          puntajeTotal="Puntaje total de la observaci??n de la conducta"
          puntTotAprobado="Aprobado: 6"
          puntTotDesaprobado="Desaprobado: 5"
        />
        {/* div con el estilo para la columna fija */}
        <div className={styles.stickyActionsColumn}>
          <MaterialTable
            options={options}
            columns={columns}
            data={data}
            onRowClick={(evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            }
            editable={
              permisosUser.includes(
                "reclutamiento_entrevista_evaluacion_cond_editar"
              ) && {
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    const idPostulante = Number(oldData.Id);
                    const dataPuntaje = dataPuntajePostulante(newData);
                    setDatosUpdate([{ idPostulante, dataPuntaje }]);
                    const objChange = cambiosCampos(oldData, newData);
                    Object.keys(objChange).length > 1 &&
                      setCamposCambiados([objChange]);
                    abrirCerrarModalConfirmar();
                    resolve();
                  }),
                onBulkUpdate: (changes) =>
                  new Promise((resolve, reject) => {
                    const rows = Object.values(changes);
                    const arrayCambios = [...camposCambiados];
                    const arrayDatosUpdate = [...datosUpdate];
                    rows.forEach((item) => {
                      const objChange = cambiosCampos(
                        item.oldData,
                        item.newData
                      );
                      arrayCambios.push(objChange);
                      let idPostulante = Number(item.oldData.Id);
                      let dataPuntaje = dataPuntajePostulante(item.newData);
                      arrayDatosUpdate.push({ idPostulante, dataPuntaje });
                    });
                    setDatosUpdate(arrayDatosUpdate);
                    setCamposCambiados(arrayCambios);
                    abrirCerrarModalConfirmar();
                    resolve();
                  }),
              }
            }
            localization={{
              body: {
                emptyDataSourceMessage: 'No hay postulantes para Evaluar',
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
                nRowsSelected: "{0} ligne(s) s??lection??e(s)",
                showColumnsTitle: "Ver columnas",
                showColumnsAriaLabel: "Ver columnas",
                exportTitle: "Exportar",
                exportAriaLabel: "Exportar",
                exportCSVName: "Exportar en formato CSV",
                exportPDFName: "Exportar como PDF",
                searchTooltip: "Buscar",
                searchPlaceholder: "Buscar",
              },
            }}
          />
          <Modal
            open={modalConfirmar}
            onClose={abrirCerrarModalConfirmar}
            disableBackdropClick
          >
            {bodyConfirmar}
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default TablaEvaluacionConducta;
