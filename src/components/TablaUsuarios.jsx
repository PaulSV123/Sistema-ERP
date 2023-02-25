import React, { useContext } from "react";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import {
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import {
  getPeticionListarRoles,
  getPeticionListarUsuariosRol,
  getPeticionRolesUser,
} from "../dist/Roles/getPeticion";
import { postPeticionAgregarRolUsuario } from "../dist/Roles/postPeticion";
import {
  getPeticionAreasFiltro,
  getPeticionDepartamentoFiltro,
} from "../dist/getPeticiones";
import Error from "./item/Error";
import Spinner from "./Spinner/Spinner";
import { UserContext } from "./context/UserContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "24rem",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 4),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal2: {
    position: "absolute",
    width: "60%",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 4),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal3: {
    position: "absolute",
    width: "24rem",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 4),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  overflow_auto: {
    display: "flex",
    flexDirection: "column",

    height: "15rem",
    overflow: "auto",
    listStyle: "none",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "0px solid slategrey",
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
  input: {
    marginBottom: "12px",
  },
}));

function TablaUsuarios() {
  const styles = useStyles();
  const { setLoadingGlobalRoles, permisosUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [caso, setCaso] = useState("");
  const [modalEditar, setModalEditar] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [errorEditar, setErrorEditar] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
  });
  const [roles, setRoles] = useState([]);
  const [rolesUser, setRolesUser] = useState([]);

  const [areas, setAreas] = useState([]);
  const [unidad, setUnidad] = useState([]);

  const { id, nombre } = usuario;

  const seleccionarUsuario = (usuario, caso) => {
    let usuarioEdit = { ...usuario };
    if ((caso = "EDITAR")) {
      setUsuario({ id: usuarioEdit.Id, nombre: usuarioEdit.Nombres });
      getPeticionRolesUser(usuario.Id, setRolesUser, setLoading);
      abrirCerrarModalEditar();
    }
  };

  useEffect(() => {
    getPeticionListarUsuariosRol(setData, setLoading);
    getPeticionListarRoles(setRoles, setLoading);
    getPeticionAreasFiltro(setAreas, setLoading);
    getPeticionDepartamentoFiltro(setUnidad, setLoading);
    //setData(dataUsuario);
  }, []);

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setErrorEditar("");
      setRolesUser([]);
      setUsuario({
        id: "",
        nombre: "",
      });
    }
  };

  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  //buscar en array
  function buscarArray(val) {
    return rolesUser.some(function (arrVal) {
      return val === arrVal.id;
    });
  }

  // Funcion que almacena los cambios en el state de inputs
  const handleChangeCheckEdit = (e) => {
    const { name, value, checked } = e.target;
    const obj = { id: Number(value), name: name };
    checked
      ? setRolesUser([...rolesUser, obj])
      : setRolesUser(rolesUser.filter((item) => item.id !== Number(value)));
  };

  // Submit para el modal Editar
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const arrRoles = rolesUser.map((item) => {
      return item.id;
    });
    const data = { id, roles: arrRoles };
    setLoadingGlobalRoles(true);
    postPeticionAgregarRolUsuario(
      data,
      setErrorEditar,
      abrirCerrarModalEditar,
      abrirCerrarModalConfirmar,
      setLoadingGlobalRoles
    );
    setCaso("Editar");

    // abrirCerrarModalEditar();
    // abrirCerrarModalConfirmar();
  };

  //Body del modal confirmaciÃ³n
  const bodyConfirmar = (
    <div className={styles.modal2}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">Recurso Agregado</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">
            Editado Correctamente!
          </h3>
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
  // Body del modal para editar
  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Roles Usuario</h3>
      <hr />
      <br />

      <Paper className="container p-3 " variant="outlined">
        <TextField
          name="nombre"
          variant="outlined"
          label="Nombre "
          fullWidth
          disabled
          className={styles.input}
          value={nombre}
        />
        <Error errors={errorEditar}></Error>
        <Typography variant="h6">Lista de Roles</Typography>
        <form onSubmit={handleSubmitEdit} className="flex flex-col">
          <div className={styles.overflow_auto}>
            {roles.map((rol) => (
              <FormControlLabel
                key={rol.id}
                control={
                  <Checkbox
                    value={rol.id}
                    checked={buscarArray(rol.id)}
                    onChange={handleChangeCheckEdit}
                    name={rol.name}
                    color="primary"
                  />
                }
                label={rol.name}
              />
            ))}
          </div>
          <br />
          <div align="center">
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
              type="submit"
            >
              ASIGNAR ROL
            </button>
            <button
              onClick={() => abrirCerrarModalEditar()}
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </Paper>
    </div>
  );

  return (
    <div className="container mx-auto justify-center">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold text-center text-black ">
          Lista de Usuarios
        </h3>
      </div>
      <MaterialTable
        columns={[
          {
            title: "ID",
            field: "Id",
            filtering: false,
          },
          {
            title: "NOMBRE",
            field: "Nombres",
            filtering: false,
          },
          {
            title: "AREA",
            field: "Area",
            lookup: areas,
          },
          {
            title: "DEPARTAMENTO",
            field: "Departamento",
            lookup: unidad,
          },
        ]}
        data={data}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        actions={[
          permisosUser.includes("roles_usuarios_editar") && {
            icon: "edit",
            tooltip: "Editar usuario",
            onClick: (event, rowData) => seleccionarUsuario(rowData, "EDITAR"),
          },
        ]}
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
          exportButton: {
            csv: true,
            pdf: false,
          },
          // actionsColumnIndex: -1,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "No hay Datos",
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
export default TablaUsuarios;
