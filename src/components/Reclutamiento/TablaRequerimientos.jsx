import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import MaterialTable from "material-table";
import { DatePicker } from "antd";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useForm from "../../hooks/useForm";
import {
  getPeticionAreasFiltro,
  getPeticionPerfilesFiltro,
  getPeticionDepartamentoFiltro, //filtros
  getPeticionListarPerfiles,
  getPeticionPrioridades,
  getPeticionMarcasTodas,
  getPeticionDepartamentoXMarca,
  getPeticionAreasXDepart,
  getPeticionPerfilesXArea,
} from "../../dist/getPeticiones";
import { postPeticionAgregarSolicitud } from "../../dist/postPeticiones";
import { putPeticionActualizarSolicitud } from "../../dist/putPeticiones";
import { deletePeticionSolicitud } from "../../dist/deletePeticiones";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../context/UserContext";
import { Label } from "@material-ui/icons";
import { formatDateTime } from "../../helpers/fecha";
import ModalResponse from "../../partials/ModalResponse";
import MyModal from "../../partials/MyModal";
import ModalDeleteConfirm from "../../partials/ModalDeleteConfirm";
import { CircularProgress } from "@mui/material";
const { RangePicker } = DatePicker;

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    overflow: "scroll",
    overflowX: "hidden",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "45%",
      maxHeight: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "45%",
      maxHeight: "80%",
    },
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const filtroTurno = {
  Mañana: "Mañana",
  "Mañana y tarde": "Mañana y tarde",
  Tarde: "Tarde",
};
const turnos = [
  { id: 1, turno: "Mañana" },
  { id: 2, turno: "Tarde" },
  { id: 3, turno: "Mañana y tarde" },
];

const initialSolicitud = {
  sPer_Id: null,
  marca_id: "",
  empleado_id: null,
  perfil_id: "",
  unidad_id: "",
  area_id: "",
  prioridad_id: "",
  cantidad_requerimiento: "",
  fecha_requerimiento: new Date().toISOString().substring(0, 10),
  turno_requerimiento: 1,
};
const initialSolicitudActualizar = {
  sPer_Id: null,
  empleado_id: null,
  prioridad_id: "",
  traidos_requerimiento: "",
  cantidad_requerimiento: "",
  fecha_requerimiento: new Date().toISOString().substring(0, 10),
  turno_requerimiento: "",
  estado_requerimiento: "",
};

const validationsFormCrearSolicitud = (form) => {
  let errors = {};
  if (!form.marca_id.toString().trim()) {
    errors.marca_id = "Seleccione una marca";
  }
  if (!form.unidad_id.toString().trim()) {
    errors.unidad_id = "Seleccione un Departamento";
  }
  if (!form.area_id.toString().trim()) {
    errors.area_id = "Seleccione una area";
  }
  if (!form.perfil_id.toString().trim()) {
    errors.perfil_id = "Seleccione un perfil";
  }
  if (!form.cantidad_requerimiento.toString().trim()) {
    errors.cantidad_requerimiento = "Ingrese la cantidad del requerimiento";
  }
  if (!form.prioridad_id.toString().trim()) {
    errors.prioridad_id = "Seleccione la prioridad";
  }
  return errors;
};
const initialResponse = {
  status: null,
  msg: "",
  modal: false,
};
function TablaRequerimientos() {
  const { user } = useContext(UserContext);
  const styles = useStyles();
  const [areasFiltro, setAreasFiltro] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [data, setData] = useState([]);
  const formAdd = useForm(initialSolicitud);
  const formUpdt = useForm(initialSolicitudActualizar);
  const [marcas, setMarcas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [openModalSolicitud, setOpenModalSolicitud] = useState(false);
  const [openModalUpdtSoli, setOpenModalUpdtSoli] = useState(false);
  const [response, setResponse] = useState(initialResponse);
  const [modalDeleteReque, setModalDeleteReque] = useState({
    idReque: null,
    open: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPeticionListarPerfiles(setData);
    getPeticionPerfilesFiltro(setPerfilesTabla);
    getPeticionAreasFiltro(setAreasFiltro);
    getPeticionDepartamentoFiltro(setUnidad);
    getPeticionMarcasTodas(setMarcas);
    getPeticionPrioridades(setPrioridades);
  }, []);

  useEffect(() => {
    if (response.status < 300) {
      getPeticionListarPerfiles(setData);
    }
    handleCloseModalFormSoli();
    handleCloseModalUpdtSoli();
    setModalDeleteReque({
      idReque: null,
      open: false,
    })
  }, [response]);

  const handleChangeSelectAnidados = (e) => {
    let { name, value } = e.target;
    if (name === "marca_id") {
      formAdd.form.unidad_id = "";
      formAdd.form.area_id = "";
      formAdd.form.perfil_id = "";
      getPeticionDepartamentoXMarca(value, setDepartamentos);
      setAreas([]);
      setPerfiles([]);
    }
    if (name === "unidad_id") {
      formAdd.form.perfil_id = "";
      formAdd.form.area_id = "";
      setAreas([]);
      setPerfiles([]);
      getPeticionAreasXDepart(value, setAreas);
    }
    if (name === "area_id") {
      formAdd.form.perfil_id = "";
      getPeticionPerfilesXArea(value, setPerfiles);
    }
    formAdd.handleChange(e);
  };

  const handleCloseModalFormSoli = () => {
    formAdd.setForm(initialSolicitud);
    setOpenModalSolicitud(false);
  };
  const handleCloseModalUpdtSoli = () => {
    formUpdt.setForm(initialSolicitudActualizar);
    setOpenModalUpdtSoli(false);
  };

  const handleOpenModalUpdtSoli = (data) => {
    let data2 = {
      sPer_Id: data.Id_Solicitud,
      empleado_id: null,
      prioridad_id: data.Id_Prioridad,
      traidos_requerimiento: data.Postulantes_Traidos,
      cantidad_requerimiento: data.Cantidad,
      fecha_requerimiento: data.Fecha_de_requerimiento,
      turno_requerimiento: data.Id_Turno,
      estado_requerimiento: data.Id_Estado,
    };

    formUpdt.setForm(data2);
    setOpenModalUpdtSoli(true);
    console.log(data2);
  };

  const handleSubmitRegistrarSoli = (e) => {
    e.preventDefault();
    let er = validationsFormCrearSolicitud(formAdd.form);
    formAdd.setErrors(er);
    if (Object.keys(er).length === 0) {
      formAdd.setErrors({});
      let newForm = {
        ...formAdd.form,
        empleado_id: user["id_Empleado"],
      };
      /* formAdd.setForm({
        ...formAdd.form,
        empleado_id:user["id_Empleado"]
      }) */
      setLoading(true);
      postPeticionAgregarSolicitud(newForm, setResponse,setLoading);
    }
  };

  const handleSubmitActualizarSoli = (e) => {
    e.preventDefault();
    let newForm = {
      ...formUpdt.form,
      estado_requerimiento: Number(formUpdt.form.estado_requerimiento),
      empleado_id: user["id_Empleado"],
    };
    setLoading(true);
    putPeticionActualizarSolicitud(newForm, setResponse,setLoading);
  };

  const handleSubmitDeleteSoliReq = () => {
    if (modalDeleteReque.idReque != null) {
      setLoading(true);
      deletePeticionSolicitud(
        modalDeleteReque.idReque,
        setResponse,
        setLoading
      );
    }
    //console.log(modalDeleteReque);
  };

  const bodyFormModalReque = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">
        Agregar Requerimiento del Personal
      </h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitRegistrarSoli}
        className="flex flex-col align-middle "
      >
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4">
          <FormControl error={formAdd.errors.marca_id ? true : false}>
            <InputLabel id="marca">Marca *</InputLabel>
            <Select
              className="flex-1"
              onChange={handleChangeSelectAnidados}
              value={formAdd.form.marca_id}
              //style={{ width: "200px" }}
              id="marca"
              label="Marca"
              name="marca_id"
              defaultMenuIsOpen={false}
              isSearchable={false}
            >
              {marcas.map((option, i) => {
                return (
                  <MenuItem key={i + 1} value={option.mEmp_id}>
                    {option.mEmp_nombre}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {formAdd.errors.marca_id && formAdd.errors.marca_id}
            </FormHelperText>
          </FormControl>

          <FormControl error={formAdd.errors.unidad_id ? true : false}>
            <InputLabel id="departamento">Departamento *</InputLabel>
            <Select
              className="flex-1"
              onChange={handleChangeSelectAnidados}
              value={formAdd.form.unidad_id}
              // style={{ width: "200px" }}
              id="departamento"
              label="Unidad"
              name="unidad_id"
              defaultMenuIsOpen={false}
              isSearchable={false}
            >
              {departamentos.map((option, i) => {
                return (
                  <MenuItem key={i} value={option.Unidad_Id}>
                    {option.Unidad_Nombre}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {formAdd.errors.unidad_id && formAdd.errors.unidad_id}
            </FormHelperText>
          </FormControl>

          <FormControl error={formAdd.errors.area_id ? true : false}>
            <InputLabel id="area">Area *</InputLabel>
            <Select
              fullWidth
              className="flex-1"
              onChange={handleChangeSelectAnidados}
              value={formAdd.form.area_id}
              //style={{ width: "200px" }}
              id="area"
              name="area_id"
              label="Area"
              defaultMenuIsOpen={false}
              isSearchable={false}
            >
              {areas.map((option, i) => {
                return (
                  <MenuItem key={i + 1} value={option.Area_Id}>
                    {option.Area_Nombre}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {formAdd.errors.area_id && formAdd.errors.area_id}
            </FormHelperText>
          </FormControl>

          <FormControl error={formAdd.errors.perfil_id ? true : false}>
            <InputLabel id="perfil">Perfil *</InputLabel>
            <Select
              className="flex-1"
              onChange={handleChangeSelectAnidados}
              value={formAdd.form.perfil_id}
              //style={{ width: "200px" }}
              id="perfil"
              label="Perfil"
              name="perfil_id"
              defaultMenuIsOpen={false}
              isSearchable={false}
            >
              {perfiles.map((option, i) => {
                return (
                  <MenuItem key={i} value={option.perfil_Id}>
                    {option.perfil_nombre}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {formAdd.errors.perfil_id && formAdd.errors.perfil_id}
            </FormHelperText>
          </FormControl>
          {/* <Error errors={error["perfil_id"]}></Error> */}

          <TextField
            //required
            className="flex-1"
            //style={{ width: "200px" }}
            name="cantidad_requerimiento"
            label="Cantidad *"
            onChange={formAdd.handleChange}
            value={formAdd.form.cantidad_requerimiento}
            type="number"
            error={formAdd.errors.cantidad_requerimiento ? true : false}
            helperText={formAdd.errors.cantidad_requerimiento}
          />
          {/* <Error errors={error["cantidad"]}></Error> */}
          <FormControl error={formAdd.errors.prioridad_id ? true : false}>
            <InputLabel id="prioridad">Prioridad *</InputLabel>
            <Select
              className="flex-1"
              onChange={formAdd.handleChange}
              value={formAdd.form.prioridad_id}
              //style={{ width: "200px" }}
              id="prioridad"
              label="Prioridad"
              name="prioridad_id"
              defaultMenuIsOpen={false}
              //isSearchable={false}
            >
              {prioridades.map((option, i) => {
                return (
                  <MenuItem key={i} value={option.pri_Id + ""}>
                    {option.pri_nombre}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {formAdd.errors.prioridad_id && formAdd.errors.prioridad_id}
            </FormHelperText>
          </FormControl>

          <TextField
            required
            InputLabelProps={{ shrink: true, required: true }}
            className="flex-1"
            name="fecha_requerimiento"
            label="Fecha Registro"
            type="date"
            onChange={formAdd.handleChange}
            value={formAdd.form.fecha_requerimiento}
          />

          <FormControl>
            <InputLabel id="turnos">Turno *</InputLabel>
            <Select
              className="flex-1"
              onChange={formAdd.handleChange}
              value={formAdd.form.turno_requerimiento}
              id="turnos"
              label="Turno"
              name="turno_requerimiento"
              defaultMenuIsOpen={false}
              //isSearchable={false}
            >
              <MenuItem value={1}>Mañana</MenuItem>
              <MenuItem value={2}>Tarde</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        <div align="center">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <button
                className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
                type="submit"
              >
                AGREGAR
              </button>
              <button
                onClick={handleCloseModalFormSoli}
                type="button"
                className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              >
                CANCELAR
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );

  const bodyModalActualizarSoli = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">
        Actualizar Requerimiento del Personal
      </h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitActualizarSoli}
        className="flex flex-col align-middle "
      >
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4">
          <TextField
            required
            className="flex-1"
            name="cantidad_requerimiento"
            label="Cantidad"
            onChange={formUpdt.handleChange}
            value={formUpdt.form.cantidad_requerimiento}
            type="number"
            error={formUpdt.errors.cantidad_requerimiento ? true : false}
            helperText={formUpdt.errors.cantidad_requerimiento}
          />

          <TextField
            required
            className="flex-1"
            name="traidos_requerimiento"
            label="Ingresos"
            onChange={formUpdt.handleChange}
            value={formUpdt.form.traidos_requerimiento}
            type="number"
            error={formUpdt.errors.traidos_requerimiento ? true : false}
            helperText={formUpdt.errors.traidos_requerimiento}
          />

          <FormControl error={formUpdt.errors.prioridad_id ? true : false}>
            <InputLabel id="prioridad">Prioridad *</InputLabel>
            <Select
              className="flex-1"
              onChange={formUpdt.handleChange}
              value={formUpdt.form.prioridad_id}
              //style={{ width: "200px" }}
              id="prioridad"
              label="Prioridad"
              name="prioridad_id"
              defaultMenuIsOpen={false}
              //isSearchable={false}
            >
              {prioridades.map((option, i) => {
                return (
                  <MenuItem key={i} value={option.pri_Id + ""}>
                    {option.pri_nombre}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {formUpdt.errors.prioridad_id && formUpdt.errors.prioridad_id}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel id="turnos">Turno *</InputLabel>
            <Select
              className="flex-1"
              onChange={formUpdt.handleChange}
              value={formUpdt.form.turno_requerimiento}
              id="turnos"
              label="Turno"
              name="turno_requerimiento"
              defaultMenuIsOpen={false}
              //isSearchable={false}
            >
              <MenuItem value={1}>Mañana</MenuItem>
              <MenuItem value={2}>Tarde</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="prioridad">Estado *</InputLabel>
            <Select
              className="flex-1"
              onChange={formUpdt.handleChange}
              value={formUpdt.form.estado_requerimiento}
              label="Estado"
              name="estado_requerimiento"
              defaultMenuIsOpen={false}
              //isSearchable={false}
            >
              <MenuItem value={16}>Pendiente</MenuItem>
              <MenuItem value={17}>Procesado</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        <div align="center">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <button
                className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
                type="submit"
              >
                ACTUALIZAR
              </button>
              <button
                onClick={handleCloseModalUpdtSoli}
                type="button"
                className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              >
                CANCELAR
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Requerimiento de personal
        </h3>
      </div>
      <div className="mt-3">
        {
          <button
            className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black"
            onClick={() => setOpenModalSolicitud(true)}
          >
            AGREGAR
          </button>
        }
        <MaterialTable
          columns={[
            {
              title: "ID",
              field: "Id_Solicitud",
              hidden: true,
              filtering: false,
            },
            {
              title: "FECHA",
              field: "Fecha_de_requerimiento",
              filtering: false,
              cellStyle: {
                minWidth: "130px",
              },
            },
            {
              title: "MARCA",
              field: "Marca",
              filtering: false,
            },
            {
              title: "DEPARTAMENTO",
              field: "Unidad",
              lookup: unidad,
            },
            { title: "AREA", field: "Area", lookup: areasFiltro },
            { title: "PERFIL", field: "Perfil", lookup: perfilesTabla },
            { title: "ENCARGADO", field: "Encargado", filtering: false },
            { title: "CANTIDAD", field: "Cantidad", filtering: false },
            {
              title: "INGRESOS",
              field: "Postulantes_Traidos",
              filtering: false,
            },
            { title: "TURNO", field: "Turno", lookup: filtroTurno },
            { title: "PRIORIDAD", field: "Prioridad", filtering: false },
            {
              title: "ESTADO",
              field: "Estado_requerimiento",
              filtering: false,
            },
          ]}
          data={data}
          //onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
          actions={[
            {
              icon: "edit",
              tooltip: "Editar requerimiento del personal",
              onClick: (event, rowData) => {
                handleOpenModalUpdtSoli(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Eliminar requerimiento del personal",
              onClick: (event, rowData) => {
                setModalDeleteReque({
                  idReque: rowData.Id_Solicitud,
                  open: true,
                });
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            /* rowStyle: (rowData) => ({
              backgroundColor: selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            }), */
            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,
            exportAllData: true,
            exportFileName: "Tabla de Requerimiento de personal",
            actionsColumnIndex: -1,
            //filtering: true,
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
      <ModalDeleteConfirm
        msg={`¿ Desea eliminar este requerimiento ?`}
        openModal={modalDeleteReque.open}
        onCloseModal={() => setModalDeleteReque({ idReque: null, open: false })}
        submitDelete={handleSubmitDeleteSoliReq}
        loading={loading}
      />
      <Modal open={openModalSolicitud} onClose={handleCloseModalFormSoli}>
        {bodyFormModalReque}
      </Modal>
      <Modal open={openModalUpdtSoli} onClose={handleCloseModalUpdtSoli}>
        {bodyModalActualizarSoli}
      </Modal>
      <ModalResponse
        response={response}
        handleCloseResponse={() => setResponse(initialResponse)}
      />
    </div>
  );
}

export default TablaRequerimientos;