import React, { useEffect, useState } from "react";
import { Checkbox, makeStyles } from "@material-ui/core";
import Error from "../../components/item/Error";
import MaterialTable from "material-table";
import Spinner from "../Spinner/Spinner";
import {
  getPeticionAreasFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionPerfilesFiltro,
} from "../../dist/getPeticiones";
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import {getPeticionListarReporteCapacitados} from "../../dist/Capacitacion/getPeticiones";
import {putActualizarEvaluacionInducidos} from "../../dist/Capacitacion/putPeticion";
import { CheckBox } from "@material-ui/icons";
import { FormHelperText, textFieldClasses } from "@mui/material";

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
  modal2: {
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

export const ColaboradoresInducir = () => {
  const styles = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [caso, setCaso] = useState("");
  const [modalEditar, setModalEditar] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idEvaluacion, setIdEvaluacion] = useState(null);
  const [promedioBlandas, setPromedioBlandas] = useState(0);
  const [promedioDuras, setPromedioDuras] = useState(0);
  const [practicante, setPracticante] = useState([]);
  const [evaluacion, setEvaluacion] = useState({
    id: "",
    curso_blando: 0,
    curso_duro: 0,
  });
  
  useEffect(() => {
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
    getPeticionListarReporteCapacitados(setPracticante, setLoading);
    console.log(practicante)
  }, [loading]);

  const{
    id,
    curso_blando,
    curso_duro,
  } = evaluacion;

  const actualizarTabla = () => {
    setPracticante([]);
    getPeticionListarReporteCapacitados(setPracticante, setLoading);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setEvaluacion({
        id: "",
        curso_blando: 0,
        curso_duro: 0,
      });
      setErrorUpdate([]);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setCaso("Editar");
    abrirCerrarModalEditar();
    await putActualizarEvaluacionInducidos(idEvaluacion, parseInt(promedioBlandas), parseInt(promedioDuras), setLoading);
    abrirCerrarModalConfirmar();
    setLoading(false);
    actualizarTabla();
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Evaluaciones</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle ">
        <div className="flex justify-evenly md:flex-col ">
          <div className="flex flex-col">
            <TextField
              className="flex-1"
              onChange={(e) => setPromedioBlandas(e.target.value)}
              required
              id="curso_blando"
              label="Promedio Curso Blando"
              name="curso_blando"
              type = "number"
              value={promedioBlandas}
            />
            <Error errors={errorUpdate["curso_blando"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setPromedioDuras(e.target.value)}
              required
              id="curso_duro"
              label="Proemdio Curso Duro"
              name="curso_duro"
              type = "number"
              value={promedioDuras}
            />
            <Error errors={errorUpdate["curso_duro"]}></Error>
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
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Curso modificado correctamente</h3>
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
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
      <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">Registro de Colaboradores a Inducir</h3>
    </div>
    <div className="mt-3">
      <MaterialTable
        columns={[
          {
            title: "DEPARTAMENTO",
            field: "Departamento",
            filtering: false,
          },
          {
            title: "AREA",
            field: "Área",
            filtering: false,
          },
          {
            title: "PERFIL",
            field: "Perfil",
            lookup: perfilesTabla,
          },
          {
            title: "NOMBRES",
            field: "Nombre Completo",
            filtering: false,
          },
          { title: "PROMEDIO HABILIDADES BLANDAS", field: "PromBlanda", filtering: false },
          { title: "PROMEDIO HABILIDADES DURAS", field: "PromDura", filtering: false },
          { title: "PROMEDIO", field: "Estado", filtering: false },
          { title: "CONDICION", field: "Condicion", filtering: false },
          { title: "FECHA INICIO", field: "Fecha_Inicio", filtering: false },
          { title: "FECHA FIN", field: "Fecha_Termino", filtering: false },
          {
            title: "CULMINO LA CAPACITACION",
            field: "subEs_Nombre",
          },
        ]}
        data={practicante}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        actions={[
          {
            icon: "edit",
            tooltip: "Editar evaluacion",
            onClick: (event, rowData) => {
              setIdEvaluacion(rowData.Id);
              setPromedioBlandas(rowData?.promBlanda);
              setPromedioDuras(rowData?.promDura);
              setModalEditar(true);
            }
          },
        ]}
        options={{
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
          exportFileName: "Tabla de Requerimientos",
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
    </div>
    <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
        {bodyConfirmar}
      </Modal>
    </div>
  );
};

export default ColaboradoresInducir;
