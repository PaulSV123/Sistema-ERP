import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import ModalEvaluacion from "./ModalEvaluacion";
import Error from "../../components/item/Error";
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deleteEvaluacion } from "../../dist/Capacitacion/deletePeticiones"
import { getPeticionListarCapacitaciones } from "../../dist/Capacitacion/getPeticiones";
import { putActualizarEvaluacionPracticantes } from "../../dist/Capacitacion/putPeticion";
import {
  getPeticionAreasFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionPerfilesFiltro,
  getPeticionPerfiles,
  getPeticionDepartamentoId,
  getPeticionAreasId
} from "../../dist/getPeticiones";
import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "80%",
      height: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "80%",
      height: "80%",
    },
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
    overflowX: "hidden",
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
  modalAgregar: {
    position: "absolute",
    width: "28rem",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
}));


function TablaEvaluacion() {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [caso, setCaso] = useState("");
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [errorEditar, setErrorEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [error, setError] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [listarCapacitaciones, setlistarCapacitaciones] = useState([]);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areasId, setAreasId] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [HabilidadBlanda, setHabilidadBlanda] = useState(0);
  const [HabilidadaDura, setHabilidadaDura] = useState(0);
  const [LinkRecursoEvaluacion, setLinkRecursoEvaluacion] = useState("");
  const [idEvaluacion, setIdEvaluacion] = useState(null);
  const [evaluacion, setEvaluacion] = useState({
    id: "",
    nombre: "",
    perfil: "",
    fechainicio: "",
    fechafin: "",
    turno: "",
    habilidad_blanda: 0,
    habilidad_dura: 0,
    link_recurso_evaluacion: "",
  });

  const [practicante, setPracticante] = useState({
    nombreP: "",
    perfilP: "",
    departamentoP: "",
    areaP: "",
    fechaInicioP: new Date(),
    turnoP: "",
  });
  const {
    nombreP,
    perfilP,
    departamentoP,
    areaP,
    fechaInicioP,
    turnoP,
  } = practicante;

  const [idModal, setIdModal] = useState(null);
  const [dataEvaluacion, setDataEvaluacion] = useState([]);
  const handleEditEvaluacion = (id) => {
    abrirCerrarModalEditar();
    setIdModal(id);
  };

  useEffect(() => {
    //setData(dataEvaluacion);
    getPeticionListarCapacitaciones(setlistarCapacitaciones, setLoading);
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
    getPeticionPerfiles(setPerfiles, setLoading);
    getPeticionAreasFiltro(setAreas, setLoading);
    getPeticionDepartamentoFiltro(setUnidad, setLoading);
    getPeticionDepartamentoId(setDepartamentos, setLoading);
    getPeticionAreasId(setAreasId, setLoading);
  }, [loading]);

  const actualizarTabla = () => {
    setlistarCapacitaciones([]);
    getPeticionListarCapacitaciones(setlistarCapacitaciones, setLoading);
  };

  const { id, nombre, perfil, fechainicio, fechafin, turno } = evaluacion;
  const turnos = [
    { id: 1, turno: "Mañana" },
    { id: 2, turno: "Tarde" },
    { id: 3, turno: "Mañana y tarde" },
  ];

  /********AGREGAR******/

  const handleSubmitAgregar = async (e) => {
    setCaso("Agregar");
    abrirCerrarModalAgregar();
    abrirCerrarModalConfirmar();
    setLoading(true);
    setError(false);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPracticante((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
    setPracticante({
      nombreP: "",
      perfilP: "",
      departamentoP: "",
      areaP: "",
      fechaInicioP: new Date(),
      turnoP: ""
    });
    setError([]);
  }

  const bodyAgregar = (
    <div className={styles.modalAgregar}>
      <h3 className="text-center text-lg font-bold">Agregar Requerimiento del Personal</h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitAgregar}
        className="flex flex-col align-middle ">
        <div className="flex  justify-evenly md:flex-col">
          <div className="flex flex-col ">
            <FormControl>
              <TextField
                required
                id="nombreP"
                name="nombreP"
                label="Nombre"
                type="text">
                value={nombreP}
                style={{ width: "250px" }}
                onChange={handleChange}
              </TextField>
            </FormControl>
            <FormControl>
              <InputLabel id="perfilP" required>
                Perfil
              </InputLabel>
              <Select
                
                labelId="perfilP"
                name="perfilP"
                id="perfilP"
                label="Perfil"
                style={{ width: "250px" }}
                value={perfilP}
                defaultMenuIsOpen={false}
                isSearchable={false}
                onChange={handleChange}
              >
                {perfiles.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.perfil_Id}>
                      {option.perfil_nombre}
                    </MenuItem>                    
                    );         
                             
                })}
              </Select>
            </FormControl>
            <Error errors={errorUpdate["perfil_id"]}></Error>
            <FormControl>
              <InputLabel id="departamentoP" required>
                Departamento
              </InputLabel>
              <Select
                required
                labelId="departamentoP"
                name="departamentoP"
                id="departamentoP"
                label="Departamento"
                style={{ width: "250px" }}
                value={departamentoP}
                onChange={handleChange}
              >
                {departamentos.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Unidades}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="areaP" required>
                Area
              </InputLabel>
              <Select
                required
                labelId="areaP"
                name="areaP"
                id="areaP"
                label="Área"
                style={{ width: "250px" }}
                value={areaP}
                onChange={handleChange}
              >
                {areasId.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.Areas}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* <br /> */}
            <FormControl>
              <InputLabel id="fechaInicioP">
                Fecha de Inicio
              </InputLabel>
              <TextField
                id="fechaInicioP"
                name="fechaInicioP"
                style={{ width: "250px" }}
                type="date"
                value={fechaInicioP}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="turnoP" required>
                Turno
              </InputLabel>
              <Select
                required
                labelId="turnoP"
                name="turnoP"
                id="turnoP"
                label="Turno"
                style={{ width: "250px" }}
                value={turnoP}
                onChange={handleChange}
              >
                {turnos.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.id}>
                      {option.turno}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* <br />
            <br /> */}
          </div>
        </div>
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


  /*******EDITAR*******/
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setEvaluacion({
        id: "",
        habilidad_blanda: 0,
        habilidad_dura: 0,
        link_recurso_evaluacion: "",
      });
      setErrorEditar(false);
    }
  };

  /* const handleSubmitEdit = () => {
    if (nombre.trim() === "") {
      setErrorEditar(true);
      return;
    }
    setErrorEditar(false);
    console.log(evaluacion);
  }; */

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setCaso("Editar");
    abrirCerrarModalEditar();
    await putActualizarEvaluacionPracticantes(idEvaluacion,HabilidadBlanda, HabilidadaDura,LinkRecursoEvaluacion, setLoading);
    abrirCerrarModalConfirmar();
    setLoading(false);
    actualizarTabla();
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Registro Practicantes</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle ">
        <div className="flex justify-evenly md:flex-col ">
          <div className="flex flex-col">
            <TextField
              className="flex-1"
              onChange={(e) => setHabilidadBlanda(e.target.value)}
              required
              id="habilidad_blanda"
              label="Habilidad Blanda"
              name="habilidad_blanda"
              value={HabilidadBlanda}
            />
            <Error errors={errorUpdate["Habilidad Blanda"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setHabilidadaDura(e.target.value)}
              required
              id="habilidad_dura"
              label="Habilidad Dura"
              name="habilidad_dura"
              value={HabilidadaDura}
            />
            <Error errors={errorUpdate["Habilidad Dura"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setLinkRecursoEvaluacion(e.target.value)}
              required
              id="link_recurso_evaluacion"
              label="Link de Recuso de Evaluacion"
              name="link_recurso_evaluacion"
              value={LinkRecursoEvaluacion}
            />
            <Error errors={errorUpdate["Link de Recuso de Evaluacion"]}></Error>
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

  /******/
  //SECCION ELIMINAR
  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setEvaluacion({
        id: "",
        nombre: "",
        perfil: "",
        fechainicio: "",
        fechafin: "",
        turno: ""
      });
    }
  };

  const handleSubmitEliminar = () => {
    deleteEvaluacion(evaluacion);
    setLoading(true);
    setCaso("Eliminar");
    abrirCerrarModalEliminar()
    abrirCerrarModalConfirmar();
  };

  const bodyEliminar = (
    <div className={styles.modal1}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea eliminar la evaluación seleccionada?
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
  const bodyConfirmar = (
    <div className={styles.modal1}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">La evaluacion ha sido agregada</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Recurso Editado</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">La evaluacion ha sido eliminada</h3>
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

  const seleccionarEvaluacion = (Evaluacion, caso) => {
    if (caso === "ELIMINAR") {
      setEvaluacion(Evaluacion.id_Capacitacion);
      abrirCerrarModalEliminar();
    }
  };
  /******/

  return (
    <div className="container mx-auto justify-center">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold text-center text-black ">
          Registro Evaluacion de Practicantes
        </h3>
      </div>
      <div className="mt-3">
        {/* {<button
          className="bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700"
          onClick={abrirCerrarModalAgregar}
        >
          AGREGAR
        </button>} */}
      </div>
      <MaterialTable
        columns={[
          {
            title: "NOMBRE",
            field: "Nombres",
            filtering: false,
          },
          {
            title: "PERFIL",
            field: "Perfil",
            //filtering: true,
            lookup: perfilesTabla,
          },
          {
            title: "DEPARTAMENTO",
            field: "Departamento",
            //filtering: true,
            lookup: unidad,
          },
          {
            title: "Area",
            field: "Area",
            lookup: areas,
          },
          {
            title: "FECHA INICIO",
            field: "Fecha_Inicio",
            filtering: false,
          },
          {
            title: "FECHA FIN",
            field: "Fecha_Termino",
            filtering: false,
          },
          {
            title: "TURNO",
            field: "Turno",
            filtering: false,
          },
          {
            title: "NOTA DE HABILIDADES BLANDAS",
            field: "Nota_HabilidadBlanda",
            filtering: false,
          },
          {
            title: "NOTA DE HABILIDADES DURAS",
            field: "Nota_HabilidadDura",
            filtering: false,
          },
          {
            title: "LINK DE RECURSO DE EVALUACION",
            field: "Post_LinkRecursoEvaluacion",
            filtering: false,
          }
        ]}
        data={listarCapacitaciones}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id_Capacitacion)
        }
        actions={[
          {
            icon: "edit",
            tooltip: "Editar usuario",
            onClick: (event, rowData) => {
              setIdEvaluacion(rowData.id_Capacitacion);
              setHabilidadBlanda(rowData.Nota_HabilidadBlanda);
              setHabilidadaDura(rowData.Nota_HabilidadDura);
              setLinkRecursoEvaluacion(rowData.Post_LinkRecursoEvaluacion);
              setModalEditar(true);
              //handleEditEvaluacion(rowData.id_Capacitacion);
              // console.log(rowData.tableData.id);
            },
          },
          /* {
            icon: "delete",
            tooltip: "Eliminar curso",
            onClick: (event, rowData) => 
            {
              seleccionarEvaluacion(rowData, "ELIMINAR");
            },
          }, */
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
          exportAllData: true,
          exportFileName: "Tabla de Registro Evaluacion de Practicantes",
          actionsColumnIndex: -1,
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
export default TablaEvaluacion;
