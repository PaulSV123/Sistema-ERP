import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
//import { makeStyles, Modal } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { getPeticionActividades} from "../../dist/Capacitacion/getPeticiones";
import Error from "../item/Error";
import Spinner from "../Spinner/Spinner";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { postActividad } from "../../dist/Capacitacion/postPeticiones";
import { deleteActividad} from "../../dist/Capacitacion/deletePeticiones";
import { putActividad } from "../../dist/Capacitacion/putPeticion";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    // }border: '2px solid #000',
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
    height: "10rem",
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
    // [theme.breakpoints.up("lg")]: {
    //   width: "auto",
    // },
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



function TablaActividad() {
  const styles = useStyles();

  const [selectedRow, setSelectedRow] = useState(null);
  const [actividades, setActividades] = useState([]);
  console.log(actividades)
  const [caso, setCaso] = useState("");
  const [loading, setLoading] = useState(true);
  const [actualizarTabla, setActualizarTabla] = useState(true);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [error, setError] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [actividad, setActividad] = useState({
    id: "",
    nombre: "",
  }); 

  const [nombreActividad, setNombreActividad] = useState("");
  const [idActividad, setIdActividad] = useState(null);

  useEffect(() => {
    getPeticionActividades(setActividades, setLoading);
  }, []);


  const actualizarTablaDatos=()=>{
    setActividades([])
    getPeticionActividades(setActividades, setLoading);
  }

  const {
    // id,
    // numero,
    nombre,
    codigo,
  } = actividad;

  //SECCION EDITAR
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setActividad({
        nombre: "",
      });
      setErrorUpdate([]);
    }
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setActividad((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setActualizarTabla(!actualizarTabla);
    setCaso("Editar");
    abrirCerrarModalEditar();
    await putActividad(idActividad, nombreActividad, setLoading);
    abrirCerrarModalConfirmar();
    setLoading(false);
    actualizarTablaDatos();
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Actividad</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle ">
        <div className="flex justify-evenly md:flex-col ">
          <div className="flex flex-col">

            <TextField
              className="flex-1"
              onChange={(e) => setNombreActividad(e.target.value)}
              required
              id="nombre"
              label="Nombre"
              name="Nombre"
              value={nombreActividad}
            />
            <Error errors={errorUpdate["nombre"]}></Error>
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
 
  //SECCION AGREGAR
  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    setNombreActividad("");
    setCaso("Agregar");
    setIdActividad(null);
    abrirCerrarModalAgregar();
    await postActividad(nombreActividad, setLoading,setMensaje);
    abrirCerrarModalConfirmar();
    setLoading(false);
    actualizarTablaDatos();

  };

  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
    setActividad({
      id: "",
      nombre: "",
    });
    setError([]);
  };

  //SECCION ELIMINAR
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setActividad({
        id: "",
        actividad:""
      });
    }
  };

  const handleSubmitEliminar =async (id) => {
    //deletePeticionCurso(curso.numero, abrirCerrarModalEliminar);
    setLoading(true);
    setCaso("Eliminar");
    await deleteActividad(parseInt(id), setLoading);
    abrirCerrarModalConfirmar();
    actualizarTablaDatos();
 

  };


  //Body del modal confirmación
  const bodyConfirmar = (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">{mensaje}</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Recurso Editado</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">Recurso Eliminado</h3>
        )}
        <button
          onClick={() => abrirCerrarModalConfirmar()}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
          // className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
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

  const bodyAgregar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Agregar Actividad</h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitAgregar}
        className="flex flex-col align-middle "
      >
        <div className="flex  justify-evenly md:flex-col">
          <div className="flex flex-col ">
            <TextField
              className="flex-1"
              onChange={(e) => setNombreActividad(e.target.value)}
              required
              id="nombre"
              label="Nombre"
            />
            <Error errors={error["nombre"]}></Error>
            <br />

          </div>
        </div>
        <br />
        <div align="center">
          <button
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            type="submit"
          >
            AGREGAR
          </button>
          <button
            onClick={() => abrirCerrarModalAgregar()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );


  const bodyEliminar = (
    <div className={styles.modal1}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea eliminar actividad seleccionada?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          <button
            color="primary"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            onClick={handleSubmitEliminar}
          >
            ELIMINAR
          </button>
          |
          <button
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            onClick={abrirCerrarModalEliminar}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );

  const seleccionarCurso = (actividad, caso) => {
    let actividadEdit = { ...actividad };
    if (caso === "EDITAR") {
      setActividad({
        nombre: actividadEdit["NOMBRE"],
      });
      
    } else if (caso === "ELIMINAR") {
      abrirCerrarModalEliminar();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Actividades
        </h3>
      </div>
      <div className="mt-3">
        {
          <button
            className="bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700"
            onClick={abrirCerrarModalAgregar}
          >
            AGREGAR
          </button>
        }

        <MaterialTable
          columns={[
            {
              title: "NOMBRE DE ACTIVIDAD",
              field: "Actividad",
              filtering: false,
            }

          ]}
          data={actividades}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          actions={[
            {
              icon: "edit",
              tooltip: "Editar actividad",
              onClick: (event, rowData) => {
                setIdActividad(rowData.ID);
                setNombreActividad(rowData.Actividad);
                setModalEditar(true);
              },
            },
            {
              icon: "delete",
              tooltip: "Eliminar actividad",
              onClick: (event, rowData) => {
              

                handleSubmitEliminar(rowData.ID)
              },
            },
          ]}
          /*parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }*/
          /*actions={[
            {
              icon: "edit",
              tooltip: "Editar recurso",
              onClick: (event, rowData) =>
                seleccionarRecurso(rowData, "EDITAR"),
            },
          ]}*/
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
            exportFileName: "Tabla de Actividades",
            actionsColumnIndex: -1,
            filtering: true,
          }}
          localization={{
            body: {
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
      <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
        {bodyAgregar}
      </Modal>
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
      <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
          {bodyConfirmar}
        </Modal>
    </div>
  );
}

export default TablaActividad;
