import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Error from "../../../components/item/Error"
import { getPeticionPerfilesApiPersona } from "../EvaluacionSesionesIntegracion/api/PeticionEvaluacion";
import { putActualizarRegistroPracticantes } from "../EvaluacionSesionesIntegracion/api/PutEvaluacion";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0.3rem",
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal1: {
    position: "absolute",
    width: "23rem",
    height: "8rem",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal2:{
    position: "absolute",
    width: "23rem",
    height: "12rem",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  inputlarge: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "12rem",
    [theme.breakpoints.between("md")]: {
      width: "100%",
    },
  },
  button_aceptar: {
    padding: "5px  12px 5px  12px",
    width: "100%",
    color: "black",
    backgroundColor: "#f09208",
    border: "1px solid black",
    borderRadius: "5%",
  },
  button_cancelar: {
    padding: "5px  12px 5px  12px",
    width: "100%",
    color: "white",
    backgroundColor: "#383837",
    border: "1px solid black",
    borderRadius: "5%",
  },
  error: {
    backgroundColor: "red",
    padding: "3px  4px 3px  4px",
    color: "white",
    textAlign: "center",
    borderRadius: "5px",
    marginBottom: "0.5rem",
    fontSize: "1rem",
  },
  texto: {
    flex: "1 1 0%",
    fontWeight: "600",
    color: "#4B5563",
    fontSize: "1rem",
    fontFamily: "Inter, sans-serif",
  },
}));


function EvaluacionSesionIntegracion() {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [caso, setCaso] = useState("");
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [error, setError] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [listarSesiones, setlistarSesiones] = useState([]);
  const [idEvaluacionPracticantes, setIdEvaluacionPracticantes] = useState(null);
  const [evaluacionIntegracion, setEvaluacionIntegracion] = useState("");
  const [notaPuntajeUno, setNotaPuntajeUno] = useState("");
  const [notaPuntajeDos, setNotaPuntajeDos] = useState("");
  const [notaPuntajeTres, setNotaPuntajeTres] = useState("");
  const [notaPuntajeCuatro, setNotaPuntajeCuatro] = useState("");
  const [integracionObseracion, setIntegracionEvaluacion] = useState("");
  const [evaluacionPracticantes, setevaluacionPracticantes] = useState({
    id: "",
    evaluacion_descripcion: "",
    nota1: 0,
    nota2: 0,
    nota3: 0,
    nota4: 0,
    evaluacion_observacion: "",
  });

  useEffect(() => {
    getPeticionPerfilesApiPersona(setlistarSesiones,setLoading);
  }, [loading]);

  const {
    id,
    evaluacion_descripcion,
    nota1,
    nota2,
    nota3,
    nota4,
    evaluacion_observacion,
  } = evaluacionPracticantes;

  const actualizarTabla = () => {
    setlistarSesiones([]);
    getPeticionPerfilesApiPersona(setlistarSesiones, setLoading);
  };

  /*******EDITAR*******/
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setevaluacionPracticantes({
        id: "",
        evaluacion_descripcion: "",
        nota1: 0,
        nota2: 0,
        nota3: 0,
        nota4: 0,
        evaluacion_observacion: "",
      });
      setErrorUpdate([loading]);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setCaso("Editar");
    abrirCerrarModalEditar();
    await putActualizarRegistroPracticantes(idEvaluacionPracticantes,evaluacionIntegracion,
       notaPuntajeUno,notaPuntajeDos,notaPuntajeTres,notaPuntajeCuatro,integracionObseracion, setLoading);
    abrirCerrarModalConfirmar();
    setLoading(false);
    actualizarTabla();
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Registro Evaluacion de Practicantes</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle ">
        <div className="flex justify-evenly md:flex-col ">
          <div className="flex flex-col">
            <TextField
              className="flex-1"
              onChange={(e) => setEvaluacionIntegracion(e.target.value)}
              required
              id="evaluacion_descripcion"
              label="Descripcion"
              name="evaluacion_descripcion"
              value={evaluacionIntegracion}
            />
            <Error errors={errorUpdate["evaluacion_descripcion"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setNotaPuntajeUno(e.target.value)}
              required
              id="nota1"
              label="Participacion"
              name="nota1"
              value={notaPuntajeUno}
            />
            <Error errors={errorUpdate["nota1"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setNotaPuntajeDos(e.target.value)}
              required
              id="nota2"
              label="Comunicacion"
              name="nota2"
              value={notaPuntajeDos}
            />
            <Error errors={errorUpdate["nota2"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setNotaPuntajeTres(e.target.value)}
              required
              id="nota3"
              label="Habilidad Analitica"
              name="nota3"
              value={notaPuntajeTres}
            />
            <Error errors={errorUpdate["nota3"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setNotaPuntajeCuatro(e.target.value)}
              required
              id="nota4"
              label="Iniciativa"
              name="nota4"
              value={notaPuntajeCuatro}
            />
            <Error errors={errorUpdate["nota4"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setIntegracionEvaluacion(e.target.value)}
              required
              id="evaluacion_observacion"
              label="Observaciones"
              name="evaluacion_observacion"
              value={integracionObseracion}
            />
            <Error errors={errorUpdate["evaluacion_observacion"]}></Error>
            <br />

          </div>
        </div>
        <br />
        <div align="center">
          <button
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            type="submit"
          >
            EDITAR
          </button>
          <button
            onClick={() => abrirCerrarModalEditar()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );

  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  const bodyConfirmar = (
    <div className={styles.modal1}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">Curso agregado correctamente</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Evaluacion editada correctamente</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">Curso eliminada correctamente</h3>
        )}
        <button
          onClick={() => {abrirCerrarModalConfirmar()}}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
        >
          <img
            src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
            style={{ width: "1.5rem", height: "1.5rem" }}
            alt=""
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto justify-center">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold text-center text-black ">
          Registro Evaluacion de Practicantes
        </h3>
      </div>
      <div className="mt-3">
      </div>
      <MaterialTable
        columns={[
          {
            title: "FECHA INICIO",
            field: "date",
            filtering: false,
          },
          {
            title: "FECHA FIN",
            field: "date2",
            filtering: false,
          },
          {
            title: "SESION",
            field: "Sesion",
            filtering: false,
          },
          {
            title: "TURNO",
            field: "Turno",
            filtering: false,
          },
          {
            title: "PARTICIPANTE",
            field: "Nombres",
            filtering: false,
          },
          {
            title: "DEPARTAMENTO",
            field: "Departamento",
            //filtering: true,
            filtering: false,
          },
          {
            title: "AREA/PERFIL",
            field: "Area",
            //filtering: true,
            filtering: false,
          },
          {
            title: "ENCARGADO",
            field: "Encargado",
            filtering: false,
          },
          {
            title: "DESCRIPCION",
            field: "descripcion",
            filtering: false,
          },
          {
            title: "PARTICIPACION",
            field: "pun1",
            filtering: false,
          },
          {
            title: "COMUNICACION",
            field: "pun2",
            filtering: false,
          },
          {
            title: "HABILIDAD ANALITICA",
            field: "pun3",
            filtering: false,
          },
          {
            title: "INICIATIVA",
            field: "pun4",
            filtering: false,
          },
          {
            title: "Promedio",
            field: "prom",
            filtering: false,
          },
          {
            title: "CONDICION",
            field: "condicion",
            filtering: false,
          },
          {
            title: "OBSERVACIONES",
            field: "obs",
            filtering: false,
          }
        ]}
        data={listarSesiones}
        onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.Id_Evaluacion)}
        actions={[
          {
            icon: "edit",
            tooltip: "Editar evaluacion",
            onClick: (event, rowData) => 
            {
              setIdEvaluacionPracticantes(rowData.Id_Evaluacion);
              setEvaluacionIntegracion(rowData.eva_integra_descripcion);
              setNotaPuntajeUno(rowData.puntaje1);
              setNotaPuntajeDos(rowData.puntaje2);
              setNotaPuntajeTres(rowData.puntaje3);
              setNotaPuntajeCuatro(rowData.puntaje4);
              setIntegracionEvaluacion(rowData.eva_integra_observacion);
              setModalEditar(true);
            },
          },
        ]}
        options={{
          headerStyle: {
            backgroundColor: "#E2E2E2  ",
          },
          rowStyle: (rowData) => ({
            backgroundColor: selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }),
          searchFieldAlignment: "left",
          showTitle: false,
          exportButton: {
            csv: true,
            pdf: false,
          },
          exportAllData: true,
          exportFileName: "Tabla de Registro Evaluacion de Practicantes",
          actionsColumnIndex: -1,
          filtering: true,
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
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
        {bodyConfirmar}
      </Modal>
    </div>
  );
}
export default EvaluacionSesionIntegracion;