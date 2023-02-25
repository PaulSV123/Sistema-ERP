import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
import { makeStyles, Modal } from "@material-ui/core";
import ParametrosEvaluacion from "./ParametrosEvaluacion";
import {
  getPeticionCV,
  copyObject,
  getPeticionPerfilesFiltro,
} from "../../../dist/getPeticiones";
import { postActualizarPtCV } from "../../../dist/postPeticiones";
import Spinner from "../../Spinner/Spinner";
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
const TablaEvaluacionCV = () => {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [camposCambiados, setCamposCambiados] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [upData, setUpData] = useState([]);
  const [data, setData] = useState([]);
  const [datosActualizar, setdatosActualizar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };
  let datos = {
    Id: 0,
    Valores: {
      /* Puntaje1: 0,
      Puntaje2: 0,
      Puntaje3: 0,
      Puntaje4: 0,
      Puntaje5: 0,
      Puntaje6: 0,
      Puntaje7: 0,
      Puntaje8: 0, */
      Puntaje1: 0,
      Puntaje2: 0,
      Puntaje3: 0,
      Puntaje4: 0,
      Puntaje5: 0,
      Puntaje6: 0,
      Puntaje7: 0,
      Puntaje8: 0,
    },
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
      title: "CORREO",
      field:
        "Correo: ¿La dirección de correo electrónico facilitada transmite seriedad?",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "FOTO",
      field:
        "Foto: ¿La fotografía es reciente? ¿Sugiere optimismo y formalismo? ¿Es de buena calidad?",
      lookup: calificacion,
      filtering: false,
      //field: "foto",
      //lookup: calificacion,
    },
    {
      title: "PRESENTACIÓN",
      field: "Presentación general: tipo de letra y estructura",
      lookup: calificacion,
      filtering: false,
      //field: "foto",
      //lookup: calificacion,
    },
    {
      title: "DATOS IMPORTANTES",
      field:
        "¿Se ha dado tres o cuatro datos importantes que lo definan profesionalmente?",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "ORDEN",
      field: "Orden (cronológico/funcional)",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "OBJETIVO PROFESIONAL",
      field: "¿Se aprecia con precisión el objetivo profesional?",
      lookup: calificacion,
      filtering: false,
    },
    {
      title: "DETALLES DE ESTUDIO",
      field:
        "¿Se ha expuesto la titulación principal y el detalle de los estudios?",
      lookup: calificacion,
      filtering: false,
      //lookup: calificacion,
      cellStyle: { whiteSpace: "nowrap" },
    },
    {
      title: "REDACCIÓN/ ORTOGRAFÍA",
      field: "Redacción, Ortografía",
      lookup: calificacion,
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
    // selection: true,
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
    exportFileName: "Tabla de Evaluación CV",
    actionsColumnIndex: -1,
  };
  useEffect(() => {
    getPeticionCV(setData, setLoading);
  }, []);

  useEffect(() => {
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
  }, []);

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
          color="primary"
          onClick={() => {
            //console.log(datosActualizar);
            datosActualizar.forEach((item) => {
              postActualizarPtCV(item.Id, item.Valores, setData, setLoading);
              setLoading(true);
            });
            //setData(upData);
            setCamposCambiados([]);
            abrirCerrarModalConfirmar();
            let route = window.location;
            route['hash'] = '/reclutamiento/tabla-evaluacion-cv'; 
            window.location.reload();
          }}
          className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
        >
          Aceptar
        </button>
        |
        <button
          onClick={() => {
            setCamposCambiados([]);
            abrirCerrarModalConfirmar();
          }}
          className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold  text-center text-black ">
          Evaluacion de CV
        </h3>
        {/* Componente que establece los paramtros de la evaluacion */}
        <ParametrosEvaluacion
          calificacion="Calificacion de CV"
          califAprobado="Aprobado: 1"
          califDesaprobado="Desaprobado: 0"
          puntajeTotal="Puntaje total de CV aprobatorio"
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
                "reclutamiento_entrevista_evaluacioncv_editar"
              ) && {
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    const arrayCambios = [];
                    dataUpdate[index] = newData;
                    const objChange = cambiosCampos(oldData, newData);
                    datos.Id = parseInt(newData.Id);
                    datos.Valores.Puntaje1 = parseInt(
                      newData[
                        "¿Se aprecia con precisión el objetivo profesional?"
                      ]
                    );
                    datos.Valores.Puntaje2 = parseInt(
                      newData[
                        "¿Se ha expuesto la titulación principal y el detalle de los estudios?"
                      ]
                    );
                    datos.Valores.Puntaje3 = parseInt(
                      newData[
                        "¿Se ha dado tres o cuatro datos importantes que lo definan profesionalmente?"
                      ]
                    );
                    datos.Valores.Puntaje4 = parseInt(
                      newData["Orden (cronológico/funcional)"]
                    );
                    datos.Valores.Puntaje5 = parseInt(
                      newData["Redacción, Ortografía"]
                    );
                    datos.Valores.Puntaje6 = parseInt(
                      newData[
                        "Presentación general: tipo de letra y estructura"
                      ]
                    );
                    datos.Valores.Puntaje7 = parseInt(
                      newData[
                        "Correo: ¿La dirección de correo electrónico facilitada transmite seriedad?"
                      ]
                    );
                    datos.Valores.Puntaje8 = parseInt(
                      newData[
                        "Foto: ¿La fotografía es reciente? ¿Sugiere optimismo y formalismo? ¿Es de buena calidad?"
                      ]
                    );
                    arrayCambios.push(datos);
                    setTimeout(() => {
                      Object.keys(objChange).length > 1 &&
                        setCamposCambiados([objChange]);
                      // setUpData(dataUpdate);
                      setdatosActualizar(arrayCambios);
                      abrirCerrarModalConfirmar();
                      resolve();
                    }, 800);
                  }),
                onBulkUpdate: (changes) =>
                  new Promise((resolve, reject) => {
                    const rows = Object.values(changes);
                    const dataUpdate = [...data];
                    const arrayCambios = [...camposCambiados];
                    const arrayCambiosUpd = [];
                    let index;
                    rows.forEach((item) => {
                      const objChange = cambiosCampos(
                        item.oldData,
                        item.newData
                      );
                      datos.Id = parseInt(item.newData.Id);
                      datos.Valores.Puntaje1 = parseInt(
                        item.newData[
                          "¿Se aprecia con precisión el objetivo profesional?"
                        ]
                      );
                      datos.Valores.Puntaje2 = parseInt(
                        item.newData[
                          "¿Se ha expuesto la titulación principal y el detalle de los estudios?"
                        ]
                      );
                      datos.Valores.Puntaje3 = parseInt(
                        item.newData[
                          "¿Se ha dado tres o cuatro datos importantes que lo definan profesionalmente?"
                        ]
                      );
                      datos.Valores.Puntaje4 = parseInt(
                        item.newData["Orden (cronológico/funcional)"]
                      );
                      datos.Valores.Puntaje5 = parseInt(
                        item.newData["Redacción, Ortografía"]
                      );
                      datos.Valores.Puntaje6 = parseInt(
                        item.newData[
                          "Presentación general: tipo de letra y estructura"
                        ]
                      );
                      datos.Valores.Puntaje7 = parseInt(
                        item.newData[
                          "Correo: ¿La dirección de correo electrónico facilitada transmite seriedad?"
                        ]
                      );
                      datos.Valores.Puntaje8 = parseInt(
                        item.newData[
                          "Foto: ¿La fotografía es reciente? ¿Sugiere optimismo y formalismo? ¿Es de buena calidad?"
                        ]
                      );
                      const itemUpd = copyObject(datos);
                      arrayCambiosUpd.push(itemUpd);
                      arrayCambios.push(objChange);
                      index = item.oldData.tableData.id;
                      dataUpdate[index] = item.newData;
                    });

                    //setTimeout(() => {
                    // setUpData(dataUpdate);
                    setCamposCambiados(arrayCambios);
                    setdatosActualizar(arrayCambiosUpd);
                    abrirCerrarModalConfirmar();
                    resolve();
                    // }, 800);
                  }),
              }
            }
            localization={{
              body: {
                emptyDataSourceMessage: 'No hay postulantes para evaluar',
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
export default TablaEvaluacionCV;
