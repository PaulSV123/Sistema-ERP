import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  Grid,
  Divider,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "./Spinner/Spinner";
import {
  getPeticionListarPermisos,
  getPeticionListarRoles,
  getPeticionMostrarRol,
} from "../dist/Roles/getPeticion";
import { postPeticionAgregarRol } from "../dist/Roles/postPeticion";
import { deletePeticionRol } from "../dist/Roles/deletePeticion";
import { putPeticionActualizarRol } from "../dist/Roles/putPeticion";
import Error from "./item/Error";
import { UserContext } from "./context/UserContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "24rem",
    height: "35rem",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 4),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal2: {
    //
    overflow: "auto",
    listStyle: "none",
    "&::-webkit-scrollbar": {
      width: "0.6em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "0px solid slategrey",
    },

    position: "absolute",
    width: "85%",
    height: "85%",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 4),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // [theme.breakpoints.down("sm")]: {
    //   height: "85%",
    //   width: "85%",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   width: "85%",
    //   height: "85%",
    // },
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
    [theme.breakpoints.down("sm")]: {
      height: "15rem",
    },
    [theme.breakpoints.between("md", "lg")]: {
      height: "20rem",
    },
    [theme.breakpoints.up("lg")]: {
      height: "25rem",
    },
  },
  overflow: {
    height: "30rem",
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

const TablaRoles = () => {
  const styles = useStyles();
  const { setLoadingGlobalRoles, permisosUser } = useContext(UserContext);
  // console.log(permisosUser);
  // States
  const [loading, setLoading] = useState(true);
  const [caso, setCaso] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [rol, setRol] = useState({
    id: ``,
    name: ``,
  });
  const [rolEditar, setRolEditar] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [permisos, setPermisos] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  //Prueba
  const [statePermisos, setStatePermisos] = useState({});
  // console.log(statePermisos);
  //
  // States de Modal
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  // Metodo para obtener los roles de cada modulo
  const permisosReclutamiento = permisos.filter((permiso) =>
    permiso.name.includes("reclutamiento")
  );
  const permisosCapacitacion = permisos.filter((permiso) =>
    permiso.name.includes("capacitacion")
  );
  const permisosClimaCultura = permisos.filter((permiso) =>
    permiso.name.includes("clima")
  );
  const permisosJefeTH = permisos.filter((permiso) =>
    permiso.name.includes("jefeth")
  );
  const permisosAdmin = permisos.filter((permiso) =>
    permiso.name.includes("admin")
  );
  const permisosRoles = permisos.filter((permiso) =>
    permiso.name.includes("roles")
  );
  useEffect(() => {
    getPeticionListarRoles(setData, setLoading);
    getPeticionListarPermisos(setPermisos, setLoading);
    // console.log("activo");
  }, [loading]);
  useEffect(() => {
    const obj = {};
    permisos.forEach((permiso) => {
      obj[`${permiso.name}`] = false;
    });
    setStatePermisos(obj);
  }, [permisos]);
  // Funcion para acceder al modal Editar
  const abrirCerrarModalEditar = () => {
    setError("");
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setRol({});
      setPermissions([]);
      const obj = {};
      permisos.forEach((permiso) => {
        obj[`${permiso.name}`] = false;
      });
      setStatePermisos(obj);
    }
  };
  // Funcion para acceder al modal Agregar
  const abrirCerrarModalAgregar = () => {
    setError("");
    setModalAgregar(!modalAgregar);
    if (modalAgregar) {
      setPermissions([]);
      const obj = {};
      permisos.forEach((permiso) => {
        obj[`${permiso.name}`] = false;
      });
      setStatePermisos(obj);
      setRol({});
    }
    setName("");
  };
  // console.log(permissions);
  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };
  // Funcion para acceder al modal Eliminar
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setPermissions([]);
      const obj = {};
      permisos.forEach((permiso) => {
        obj[`${permiso.name}`] = false;
      });
      setStatePermisos(obj);
      setRol({});
    }
  };
  // Funcion que almacena los cambios en el state de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRol({
      [name]: value,
    });
    setName("");
  };
  const handleChangeCheck = (event) => {
    const { name, value, checked } = event.target;
    // console.log(name, value, checked);
    setStatePermisos({
      ...statePermisos,
      [name]: checked,
    });
    checked
      ? setPermissions([...permissions, Number(value)])
      : setPermissions(permissions.filter((item) => item !== Number(value)));
  };
  // Submit para el modal Editar
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const name = rol.name;
    const idEdit = rolEditar.id;
    const data = { name, permissions };
    setLoadingGlobalRoles(true);
    putPeticionActualizarRol(
      idEdit,
      data,
      setError,
      setLoading,
      abrirCerrarModalEditar,
      abrirCerrarModalConfirmar,
      setLoadingGlobalRoles
    );
    setCaso("Editar");
    abrirCerrarModalEditar();
    abrirCerrarModalConfirmar();
  };
  // Submit para el modal Agregar
  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    const data = { name, permissions };
    postPeticionAgregarRol(data, setError, setLoading, abrirCerrarModalAgregar);
    setCaso("Agregar");
    abrirCerrarModalAgregar();
    abrirCerrarModalConfirmar();
  };
  // Submit para el modal Eliminar
  const handleSubmitEliminar = () => {
    deletePeticionRol(rol, setLoading);
    setCaso("Eliminar");
    abrirCerrarModalEliminar();
    abrirCerrarModalConfirmar();
  };
  //Body del modal confirmacion
  const bodyConfirmar = (
    <div className={styles.modal3}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">Rol Agregado</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Rol Editado</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">Rol Eliminado</h3>
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
    <div className={styles.modal2}>
      <div className="flex justify-between items-center pb-2">
        <h3 className="text-center text-lg font-bold">Editar Rol</h3>
        <div
          align="center"
          className="flex flex-wrap gap-2 place-content-center"
        >
          <button
            className="bg-naranja  py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            type="submit"
            onClick={handleSubmitEdit}
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
      </div>
      <hr />
      <br />
      <form onSubmit={handleSubmitEdit} className="flex flex-col">
        <Paper className="container p-3" variant="outlined">
          <TextField
            variant="outlined"
            fullWidth
            className={styles.input}
            label="Nombre Rol"
            name="name"
            onChange={handleChange}
            value={rol.name}
            required
            type="text"
            disabled
          />
          <Error errors={error}></Error>
          <Grid container spacing={3} className={styles.overflow}>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Reclutamiento</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosReclutamiento.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Capacitacion</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosCapacitacion.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Clima y Cultura</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosClimaCultura.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Jefe TH</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosJefeTH.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Gestión Usuarios</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosRoles.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );

  const bodyAgregar = (
    <div className={styles.modal2}>
      <div className="flex justify-between items-center pb-2">
        <h3 className="text-lg font-bold">Agregar Rol</h3>
        <div
          align="center"
          className="flex flex-wrap gap-2 place-content-center"
        >
          <button
            className="bg-naranja  py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            type="submit"
            onClick={handleSubmitAgregar}
          >
            AGREGAR ROL
          </button>
          <button
            onClick={() => abrirCerrarModalAgregar()}
            className="bg-gray-700 text-gray-50  py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </div>
      <hr />
      <br />

      <form onSubmit={handleSubmitAgregar} className="flex flex-col">
        <Paper className="container p-3 " variant="outlined">
          <InputLabel>Ej: area_jefe ó area_usuario</InputLabel>
          <TextField
            name="nombre"
            variant="outlined"
            label="Nombre Rol"
            fullWidth
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Error errors={error}></Error>
          <Grid container spacing={2} className={styles.overflow}>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Reclutamiento</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosReclutamiento.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Capacitación</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosCapacitacion.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Clima y Cultura</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosClimaCultura.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Jefe TH</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosJefeTH.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h5">Gestion Usuarios</Typography>
              <Divider />
              <div className={styles.overflow_auto}>
                {permisosRoles.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Checkbox
                        checked={statePermisos[`${permiso.name}`]}
                        value={permiso.id}
                        onChange={handleChangeCheck}
                        name={permiso.name}
                        color="primary"
                      />
                    }
                    label={permiso.description}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
  const bodyEliminar = (
    <div className={styles.modal3}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea eliminar el rol?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          <button
            color="primary"
            onClick={() => handleSubmitEliminar()}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            ELIMINAR
          </button>
          |
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
  // console.log(permissions);
  useEffect(() => {
    if (Object.keys(rolEditar).length !== 0) {
      const obj = {},
        arr = [];
      // console.log(rolEditar);
      rolEditar.permissions.forEach((item) => {
        arr.push(item.id);
        obj[`${item.name}`] = true;
      });
      setPermissions(arr);
      setStatePermisos({
        ...statePermisos,
        ...obj,
      });
      // console.log(obj);
      // console.log(arr);
      // console.log(permissions);
    }
    // else {
    // console.log("no tiene datos");
    // }
  }, [rolEditar]);

  const seleccionarRol = async (rol, caso) => {
    setRol(rol);
    if (caso === "EDITAR") {
      await getPeticionMostrarRol(rol.id, setRolEditar, setLoading);
      console.log(rolEditar);
      abrirCerrarModalEditar();
    } else if (caso === "ELIMINAR") {
      setRol(rol.id);
      abrirCerrarModalEliminar();
    }
  };
  return (
    <div className="container mx-auto justify-center">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold  text-center text-black">Roles</h3>
        {permisosUser.includes("roles_roles_agregar") && (
          <button
            className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black h-10 "
            onClick={abrirCerrarModalAgregar}
          >
            AGREGAR
          </button>
        )}
        <MaterialTable
          columns={[
            {
              title: "Id",
              field: "id",
            },
            {
              title: "Rol",
              field: "name",
            },
          ]}
          data={data}
          actions={[
            permisosUser.includes("roles_roles_editar") && {
              icon: "edit",
              tooltip: "Editar perfil",
              onClick: (event, rowData) => seleccionarRol(rowData, "EDITAR"),
            },
            permisosUser.includes("roles_roles_eliminar") && {
              icon: "delete",
              tooltip: "Eliminar Data",
              onClick: (event, rowData) => seleccionarRol(rowData, "ELIMINAR"),
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
            exportFileName: "Tabla de Recurso Perfil",
            // actionsColumnIndex: -1,
            //filtering: true,
            // rowStyle: {
            //   backgroundColor: '#EEE',
            // }
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
              nRowsSelected: "{0} ligne(s) sÃ©lectionÃ©e(s)",
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
        <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
          {bodyAgregar}
        </Modal>
        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
        <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
          {bodyConfirmar}
        </Modal>
      </div>
    </div>
  );
};

export default TablaRoles;
