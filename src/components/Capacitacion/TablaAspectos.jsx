import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
//import { makeStyles, Modal } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { getPeticionAspectos } from "../../dist/Capacitacion/getPeticiones";
import Error from "../../components/item/Error";
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
import { postAspecto } from "../../dist/Capacitacion/postPeticiones";
import { deleteAspecto } from "../../dist/Capacitacion/deletePeticiones";
import { putAspecto } from "../../dist/Capacitacion/putPeticion";

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

function TablaAspectos() {
  const styles = useStyles();
  const [aspectos, setAspectos] = useState([]);
  console.log(aspectos);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [caso, setCaso] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [error, setError] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  //const [selectedRow, setSelectedRow] = useState(null);
  const [aspecto, setAspecto] = useState({
    id: "",
    nombre: "",
  });

  const [nombreAspecto, setNombreAspecto] = useState("");
  const [idAspecto, setIdAspecto] = useState(null);

  useEffect(() => { 
    getPeticionAspectos(setAspectos, setLoading);
  }, []);

  const {
    nombre,
    codigo,
  } = aspecto;

  //SECCION EDITAR
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setAspecto({
        nombre: "",
      });
      setErrorUpdate([]);
    }
  };

  const actualizarTabla = () => {
    setAspectos([]);
    getPeticionAspectos(setAspectos, setLoading);
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setCaso("Editar");
    abrirCerrarModalEditar();
    await putAspecto(idAspecto, nombreAspecto, setLoading);
    abrirCerrarModalConfirmar();
    setLoading(false);
    actualizarTabla();
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Nombre de Aspecto a Evaluar</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle ">
        <div className="flex justify-evenly md:flex-col ">
          <div className="flex flex-col">

            <TextField
              className="flex-1"
              onChange={(e) => setNombreAspecto(e.target.value)}
              required
              id="nombre"
              label="Nombre"
              name="Nombre"
              value={nombreAspecto}
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
  const handleSubmitAgregar = async(e) => {
    e.preventDefault();
    setNombreAspecto("");
    setIdAspecto(null);
    setCaso("Agregar");
    abrirCerrarModalAgregar();
    await postAspecto(nombreAspecto, setLoading);
    abrirCerrarModalConfirmar();
    actualizarTabla();
  };

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
    setAspecto({
      id: "",
      nombre: "",
    });
    setError([]);
  };

  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  //SECCION ELIMINAR
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setAspecto({
        id: "",
        nombre: "",
      });
    }
  };

  const handleSubmitEliminar = async () => {
    setCaso("Eliminar");
    setLoading(true);
    abrirCerrarModalEliminar();
    await deleteAspecto(aspecto);
    abrirCerrarModalConfirmar();
    actualizarTabla();
  };

  const bodyConfirmar = (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">Se ha agregado un nuevo aspecto a evaluar</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Se ha actualizado el aspecto a evaluar</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">Se ha eliminado el aspecto a evaluar</h3>
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
      <h3 className="text-center text-lg font-bold">Agregar Aspecto a Evaluar</h3>
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
              onChange={(e) => setNombreAspecto(e.target.value)}
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
          ¿Desea eliminar el registro seleccionado?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          <button
            color="primary"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            onClick={handleSubmitEliminar}
          >
            ACEPTAR
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

  const seleccionarAspecto = (Aspecto, caso) => {
    if (caso === "ELIMINAR") {
      setAspecto(Aspecto.Aspecto_Id);
      abrirCerrarModalEliminar();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Aspectos a Evaluar
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
              title: "NOMBRE DE ASPECTO A EVALUAR",
              field: "Aspecto_Nombre",
              filtering: false,
            },
          ]}
          data={aspectos}
          // onRowClick={(evt, selectedRow) =>
          //   setSelectedRow(selectedRow.tableData.id)
          // }
          actions={[
            {
              icon: "edit",
              tooltip: "Editar aspecto",
              onClick: (event, rowData) => {
                setIdAspecto(rowData.Aspecto_Id);
                setNombreAspecto(rowData.Aspecto_Nombre);
                setModalEditar(true);
              },
            },
            {
              icon: "delete",
              tooltip: "Eliminar aspecto",
              onClick: (event, rowData) => {
                //deleteAspecto(parseInt(rowData.Aspecto_Id), setLoading);
                seleccionarAspecto(rowData, "ELIMINAR");
              },
            },
          ]}
          options={{
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            // rowStyle: (rowData) => ({
            //   backgroundColor:
            //     selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            // }),
            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,
            exportAllData: true,
            exportFileName: "Tabla de aspectos",
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

export default TablaAspectos;
