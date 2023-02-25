import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
import Spinner from "./Spinner/Spinner";
import { InputLabel, makeStyles, Modal, TextField } from "@material-ui/core";
import { getPeticionListarPermisos } from "../dist/Roles/getPeticion";
import { postPeticionAgregarPermiso } from "../dist/Roles/postPeticion";
import { putPeticionActualizarPermiso } from "../dist/Roles/putPeticion";
import { deletePeticionPermiso } from "../dist/Roles/deletePeticion";
import Error from "./item/Error";
import { UserContext } from "./context/UserContext";
//Estilos
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    borderRadius: "0.3rem",
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));
const TablaPermisos = () => {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);
  //Estado Permiso
  const [permiso, setPermiso] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [dataPermisos, setDataPermisos] = useState([]);
  const [caso, setCaso] = useState("");
  const [error, setError] = useState("");
  //Estados Modales
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  //Peticiones Api
  useEffect(() => {
    getPeticionListarPermisos(setDataPermisos, setLoading);
  }, [loading]);
  // Funcion que almacena los cambios en el state de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPermiso({
      ...permiso,
      [name]: value,
    });
  };
  // HandleSubmit modales
  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    const { name, description } = permiso;
    if (!name.includes("_")) {
      return setError("Estructura de permiso inválida");
    }
    const dataAgregar = {
      name,
      description,
    };

    setCaso("Agregar");
    await postPeticionAgregarPermiso(
      dataAgregar,
      setError,
      setLoading,
      abrirCerrarModalAgregar,
      abrirCerrarModalConfirmar
    );
  };
  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    const id = Number(permiso.id);
    const { name, description } = permiso;
    const dataEditar = {
      name,
      description,
    };
    setCaso("Editar");
    await putPeticionActualizarPermiso(
      id,
      dataEditar,
      setLoading,
      setError,
      abrirCerrarModalEditar,
      abrirCerrarModalConfirmar
    );
  };
  const handleSubmitEliminar = async () => {
    const id = Number(permiso.id);
    await deletePeticionPermiso(id, setLoading);
    setCaso("Eliminar");
    abrirCerrarModalEliminar();
    abrirCerrarModalConfirmar();
  };
  //Funcion que da valores al permiso y abre el modal
  const seleccionarPermiso = (rowData, caso) => {
    setPermiso(rowData);
    if (caso === "EDITAR") {
      abrirCerrarModalEditar();
    }
    if (caso === "ELIMINAR") {
      abrirCerrarModalEliminar();
    }
  };
  //Funciones que abren y cierran los modales
  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
    setError("");
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    setError("");
  };
  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };
  //Body Modales
  const bodyConfirmar = (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">Permiso Agregado</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Permiso Editado</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">Permiso Eliminado</h3>
        )}
        <button
          onClick={() => abrirCerrarModalConfirmar()}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
        >
          <img
            src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
            style={{ width: "1.5rem", height: "1.5rem" }}
            alt="Good"
          />
        </button>
      </div>
    </div>
  );
  const bodyAgregar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Agregar Permiso</h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitAgregar}
        className="flex flex-col align-middle"
      >
        <InputLabel>Ej: area_opcion_subOpcion_accion ó area_opcion</InputLabel>
        <TextField
          className="mb-3"
          label="Acción del permiso"
          name="name"
          onChange={handleChange}
          required
        />
        <Error errors={error}></Error>
        <TextField
          className="mb-3"
          label="Descripción del permiso"
          name="description"
          onChange={handleChange}
          required
        />
        <br />
        <div className="flex justify-evenly items-center">
          <button
            type="submit"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
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
  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Permiso</h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitEditar}
        className="flex flex-col align-middle"
      >
        <TextField
          className="mb-3"
          label="Acción del permiso"
          name="name"
          onChange={handleChange}
          value={permiso.name}
          required
          disabled
        />
        <Error errors={error}></Error>
        <TextField
          className="mb-3"
          label="Descripción del permiso"
          name="description"
          value={permiso.description}
          onChange={handleChange}
          required
        />
        <br />
        <div className="flex justify-evenly items-center">
          <button
            type="submit"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
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
  const bodyEliminar = (
    <div className={styles.modal}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea eliminar el permiso?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          <button
            color="primary"
            onClick={() => handleSubmitEliminar()}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            ELIMINAR
          </button>
          <button
            onClick={abrirCerrarModalEliminar}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
  //Parametros Material table
  const localization = {
    body: {
      emptyDataSourceMessage: "No hay Datos",
      addTooltip: "Agregar",
      deleteTooltip: "Eliminar",
      editTooltip: "Editar",
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
  };
  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "PERMISO",
      field: "name",
    },
    {
      title: "DESCRIPCIÓN",
      field: "description",
    },
  ];
  const actions = [
    permisosUser.includes("roles_permisos_editar") && {
      icon: "edit",
      tooltip: "Editar Permiso",
      onClick: (event, rowData) => seleccionarPermiso(rowData, "EDITAR"),
    },
    permisosUser.includes("roles_permisos_eliminar") && {
      icon: "delete",
      tooltip: "Eliminar Permiso",
      onClick: (event, rowData) => seleccionarPermiso(rowData, "ELIMINAR"),
    },
  ];
  const options = {
    searchFieldAlignment: "left",
    showTitle: false,
    exportButton: true,
    exportAllData: true,
    rowStyle: (data, index) =>
      index % 2 === 0 ? { background: "#fafafa" } : null,
    headerStyle: { background: "#DDD" },
  };
  return (
    <div className="container">
      <h2 className="text-center p-3 text-lg font-bold">Permisos</h2>

      {permisosUser.includes("roles_permisos_agregar") && (
        <button
          className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black "
          onClick={abrirCerrarModalAgregar}
        >
          AGREGAR
        </button>
      )}

      <MaterialTable
        columns={columns}
        data={dataPermisos}
        localization={localization}
        actions={actions}
        options={options}
        title="Tabla Permisos"
      />
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
};

export default TablaPermisos;
