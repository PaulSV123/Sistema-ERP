//TABLA DETALLE DE CURSO

import React, { useEffect, useState, useContext} from "react";
import MaterialTable from "material-table";
import Error from "../../components/item/Error";
import Spinner from "../Spinner/Spinner";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Collapse from "@material-ui/core/Collapse";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { getPeticionActividades, getPeticionDetalleCurso, getPeticionPlataformas } from "../../dist/Capacitacion/getPeticiones";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    overflow: "scroll",
    overflowX: "hidden",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "50%",
      height: "75%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      height: "75%",
    },
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  codigo,
  nombre,
  material,
  tipoMaterial,
  plataforma,
  tiempo,
  actividades,
  observaciones,
  enlaces,
  apoyos
){
  return { codigo, nombre, material, tipoMaterial, plataforma, tiempo, actividades, observaciones, enlaces, apoyos };
}


export function Row(props) {
  const classesM = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const classes = useRowStyles();
  const [detalle, setDetalle] = React.useState([]);
  const [mensajeEdit, setMensajeEdit] = useState("");

  const styles = useStyles();

  const [onOpen, setOnOpen] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  function getModalStyle() {
    const top = 45;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const bodyConfirmar = (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        <h3 className="text-center text-lg font-bold">{mensajeEdit}</h3>

        <button
          onClick={() => {
            setOnOpen(!onOpen);
            handleCloseModal();
          }}
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
  const bodyEditarDetalle = (
    <div style={modalStyle} className={classesM.paper}>
      <Modal open={onOpen} onClose={() => setOnOpen(!onOpen)}>
        {bodyConfirmar}
      </Modal>
      <h3 className="text-center text-lg font-bold">Editar ...</h3>
      <hr />
      <br />

      <form className="flex flex-col align-middle">
        <br />
        <FormControl fullWidth className="mb-6">
          <TextareaAutosize
            InputLabelProps={{ shrink: true, required: true }}
            className="mb-6"
            // defaultValue={props.row.Observaciones}
            // onChange={(e) => setObservacion(e.target.value)}
            placeholder="Observacion *"
            name="OBSERVACION"
            required
            type="textarea"
          />
        </FormControl>
        <br />
        <div className="flex justify-evenly items-center">
          <button
            onClick={(e) => {
              // e.preventDefault();
              // putEvaluacion(props.row.id, fecha, observacion, setMensajeEdit);
              // setFecha(null);
              // setObservacion(null);
              // setOnOpen(!onOpen);
            }}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            EDITAR
          </button>

          <button
            onClick={handleCloseModal}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Codigo_Curso}
        </TableCell>
        <TableCell align="right">{row.Nombre_Curso}</TableCell>
        <TableCell align="right">{row.Material}</TableCell>
        <TableCell align="right">{row.Tipo_Material}</TableCell>
        <TableCell align="right">{row.Plataforma}</TableCell>
        <TableCell align="right">{row.Tiempo}</TableCell>
        <TableCell align="right">{row.Actividades}</TableCell>
        <TableCell align="right">{row.Observaciones}</TableCell>
        <TableCell align="right">{row.Enlaces}</TableCell>
        <TableCell align="right">{row.Apoyos}</TableCell>
        <TableCell>
          <center>
            <BotonEditar
              onClick={() => {
                handleOpenModal();
                //setFecha(props.row.Fecha);
              }}
            >
              <svg
                style={{ fontSize: 50 }}
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="20"
                fill="currentColor"
                className="bi bi-pencil-square"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              </svg>
            </BotonEditar>
          </center>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-describedby="simple-modal-description"
          >
            {bodyEditarDetalle}
          </Modal>
        </TableCell>
      </TableRow>
    </>
  );

}

Row.propTypes = {
  row: PropTypes.shape({
    codigo: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    tipoMaterial: PropTypes.string.isRequired,
    plataforma: PropTypes.string.isRequired,
    tiempo: PropTypes.string.isRequired,
    actividades: PropTypes.string.isRequired,
    observaciones: PropTypes.string.isRequired,
    enlaces: PropTypes.string.isRequired,
    apoyos: PropTypes.string.isRequired,
    }).isRequired,
};
const BotonEditar = styled.div`
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #black;
  width: 16px;
  height: 16px;

  &:hover {
    background: #f2f2f2;
  }
`;

export default function TablaDetalleCursos({ ID, onOpen }) {

  const classesM = useStyles();
  const styles = useStyles();
  const [caso, setCaso] = useState("");
  const [tablaDetalleCursos, setTablaDetalleCursos] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);

  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loader, SetLoader] = useState(true);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [curso, setCurso] = useState(false);
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [mensaje, setMensaje] = useState("");

  const [error, setError] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [detalleCurso, setDetalleCurso] = useState([]);
  const [listaDetalleCurso, setListaDetalleCurso] = useState({
    id: "",
    codigo: "",
    nombre: "",
    material: "",
    tipoMaterial: "",
    plataforma: "",
    tiempo: "",
    actividades: "",
    observaciones: "",
    enlaces: "",
    apoyos: "",
  });

  const [dataPlataformas, setDataPlataformas] = useState([]);
  const [dataActividades, setDataActividades] = useState([]);

  useEffect(() => {  
    getPeticionPlataformas(setDataPlataformas, setLoading);
    getPeticionActividades(setDataActividades, setLoading);
  }, []);


  console.log("detalle curso", detalleCurso);

  function getModalStyle() {
    const top = 45;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


  const {
    codigo,
    nombre,
    material,
    tipoMaterial,
    plataforma,
    tiempo,
    actividades,
    observaciones,
    enlaces,
    apoyos,
  } = listaDetalleCurso;

  //SECCION AGREGAR
  const handleSubmitAgregar = async (e) => {
    e.preventDefault();

    const form = e.target.elements;
    const data = {
      codigo: form.codigo.value,
      material: form.material.value,
      tipoMaterial: form.tipoMaterial.value,
      id_plataforma: Number(form.plataforma.value),
      tiempo: form.tiempo.value,
      id_actividades: Number(form.actividades.value),
      observaciones: form.observaciones.value,
      enlaces: form.enlaces.value,
      apoyos: form.apoyos.value,
    };
    setLoading(false);
    abrirCerrarModalAgregar();
    setError(false);
  }; 

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
    setListaDetalleCurso({
        codigo: "",
        material: "",
        tipoMaterial: "",
        plataforma:  "",
        tiempo: "",
        actividades: "",
        observaciones: "",
        enlaces: "",
        apoyos: "",
    });
    setError([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListaDetalleCurso((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmitEliminar = () => {
    //deletePeticionCurso(curso.numero, abrirCerrarModalEliminar);
    setLoading(true);
  };

  const bodyConfirmar = (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">{mensaje}</h3>
        )}

        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Se edito correctamente</h3>
        )}

        <button
          onClick={() => {
            //abrirCerrarModalConfirmar();
          }}
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
      <h3 className="text-center text-lg font-bold">Agregar Detalle del Curso</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitAgregar} className="flex flex-col align-middle ">
        <div className="flex  justify-evenly md:flex-col">
          <div className="flex flex-col ">
          
            <TextField
              required
              className="flex-1"
              style={{ width: "200px" }}
              onChange={handleChange}
              id="codigo"
              name="codigo"
              label="Codigo"
              value={codigo}
            />
            <Error errors={error["codigo"]}></Error>
            <br />

            <TextField
              required
              className="flex-1"
              style={{ width: "200px" }}
              onChange={handleChange}
              id="material"
              label="Material"
              name="material"
              value={material}
            />
            <Error errors={error["material"]}></Error>
            <br />
            
            <TextField
              required
              className="flex-1"
              style={{ width: "200px" }}
              onChange={handleChange}
              id="tipoMaterial"
              label="Tipo de material"
              name="tipomaterial"
              value={tipoMaterial}
            />
            <Error errors={error["tipoMaterial"]}></Error>
            <br />

            <FormControl>
              <InputLabel id="perfil" required>
                Plataforma
              </InputLabel>
              <Select
                className="flex-1"
                onChange={handleChange}
                value={plataforma}
                style={{ width: "200px" }}
                id="plataforma"
                label="Plataforma"
                name="plataforma"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {dataPlataformas.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.ID + ""}>
                      {option.Plataforma}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["id_plataforma"]}></Error>
            <br />

            <TextField
              required
              className="flex-1"
              style={{ width: "200px" }}
              onChange={handleChange}
              id="tiempo"
              label="Tiempo"
              name="tiempo"
              value={tiempo}
              type="number"
            />
            <Error errors={error["tiempo"]}></Error>
            <br />
          </div>

          <div className="flex flex-col ">

          <FormControl>
              <InputLabel id="perfil" required>
                Actividades
              </InputLabel>
              <Select
                className="flex-1"
                onChange={handleChange}
                value={actividades}
                style={{ width: "200px" }}
                id="actividades"
                label="Actividades"
                name="actividades"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                {dataActividades.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.ID + ""}>
                      {option.Actividad}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["id_actividad"]}></Error>
            <br />

          <InputLabel id="observaciones" required>
              Observaciones
            </InputLabel>
            <TextareaAutosize
              className="flex-1" 
              style={{ width: "200px" }}
              onChange={handleChange}
              InputLabelProps={{ shrink: true, required: true }}
              required
              id="observaciones"
              label="Observaciones"
              name="observaciones"
              value={observaciones}
            />
            <Error errors={errorUpdate["observaciones"]}></Error>
            <br />
          
          <InputLabel id="enlaces" required>
              Enlace
            </InputLabel>
            <TextareaAutosize
              className="flex-1" 
              style={{ width: "200px" }}
              onChange={handleChange}
              InputLabelProps={{ shrink: true, required: true }}
              required
              id="enlaces"
              label="Enlaces"
              name="enlaces"
              value={enlaces}
            />
            <Error errors={errorUpdate["enlaces"]}></Error>
            <br />
          
          <TextField
              required
              className="flex-1"
              style={{ width: "200px" }}
              onChange={handleChange}
              id="apoyos"
              label="Apoyos"
              name="apoios"
              value={apoyos}
          />
          <Error errors={error["apoyos"]}></Error>
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

  // return (
  //   <div className="container mx-auto">
  //     <div className="flex right mt-3">
  //         <NavLink 
  //           exact
  //           to = "/capacitacion/recursos"
  //           className= "bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-1 border-orange-900 font-semibold text-white hover:bg-gray-700">
  //           REGRESAR
  //         </NavLink>
          
  //         <button
  //           className= "bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-1 border-orange-900 font-semibold text-white hover:bg-gray-700"
  //           onClick={abrirCerrarModalAgregar}
  //         >
  //           AGREGAR
  //         </button>
        
  //     </div >
  //     <div className="main mt-3 relative h-full w-full">
  //       <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
  //         Detalle del Curso
  //       </h3>
  //     </div>
  //     <div className="mt-3">
  //       <MaterialTable
  //         columns={[
  //           {
  //             title: "CODIGO",
  //             field: "Codigo_Curso",
  //             filtering: false,
  //           },
  //           {
  //             title: "NOMBRE",
  //             field: "Nombre_Curso",
  //             filtering: false,
  //           },
  //           {
  //             title: "MATERIAL",
  //             field: "Material",
  //             filtering: false,
  //           },
  //           {
  //             title: "TIPO DE MATERIAL",
  //             field: "Tipo_Material",
  //             filtering: false,
  //           },
  //           {
  //             title: "PLATAFORMA",
  //             field: "Plataforma",
  //             filtering: false,
  //           },
  //           {
  //             title: "TIEMPO",
  //             field: "Tiempo",
  //             filtering: false,
  //           },
  //           {
  //             title: "ACTIVIDADES",
  //             field: "Actividades",
  //             filtering: false,
  //           },
  //           {
  //             title: "OBSERVACIONES",
  //             field: "Observaciones",
  //             filtering: false,
  //           },
  //           {
  //             title: "ENLACES",
  //             field: "Enlaces",
  //             filtering: false,
  //           },
  //           {
  //             title: "APOYOS",
  //             field: "Apoyos",
  //             filtering: false,
  //           },
  //         ]}
  //         //data={detalleCurso}
  //         data={detalleCurso.map((n) => {
  //           return (
  //             <>
  //               <Row row ={{ ...n, id: id,setDetalleCurso }} />
  //             </>
  //           );
  //         })}
  //         onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
  //         actions={[
  //           {
  //             icon: "edit",
  //             tooltip: "Editar detalle del curso",
  //             onClick: (event, rowData) => {
  //               // setIdCurso(rowData.ID);
  //               // setCodigoCurso(rowData.Curso);
  //               // setPerfilCurso(rowData.Perfil);
  //               // setModalEditar(true);
  //             },
  //           },
  //           {
  //             icon: "delete",
  //             tooltip: "Eliminar detalle del curso",
  //             // onClick: (event, rowData) => {
  //             //   deleteCurso(parseInt(rowData.ID), setLoading);
  //             // },
  //           },
  //         ]}
  //         options={{
  //           headerStyle: {
  //             backgroundColor: "#E2E2E2  ",
  //           },
  //           rowStyle: (rowData) => ({
  //             backgroundColor: selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
  //           }),
  //           searchFieldAlignment: "left",
  //           showTitle: false,
  //           exportButton: true,
  //           exportAllData: true,
  //           exportFileName: "Tabla detalle de Curso",
  //           actionsColumnIndex: -1,
  //           filtering: true,
  //         }}
  //         localization={{
  //           body: {
  //             addTooltip: "Agregar",
  //             deleteTooltip: "Eliminar",
  //             editTooltip: "Editar",
  //             filterRow: {
  //               filterTooltip: "Filtrar",
  //             },
  //           },
  //           pagination: {
  //             labelDisplayedRows: "{from}-{to} de {count}",
  //             labelRowsSelect: "filas",
  //             labelRowsPerPage: "filas por pagina:",
  //             firstAriaLabel: "Primera pagina",
  //             firstTooltip: "Primera pagina",
  //             previousAriaLabel: "Pagina anterior",
  //             previousTooltip: "Pagina anterior",
  //             nextAriaLabel: "Pagina siguiente",
  //             nextTooltip: "Pagina siguiente",
  //             lastAriaLabel: "Ultima pagina",
  //             lastTooltip: "Ultima pagina",
  //           },
  //           toolbar: {
  //             nRowsSelected: "{0} ligne(s) sélectionée(s)",
  //             showColumnsTitle: "Ver columnas",
  //             showColumnsAriaLabel: "Ver columnas",
  //             exportTitle: "Exportar",
  //             exportAriaLabel: "Exportar",
  //             exportCSVName: "Exportar en formato CSV",
  //             exportPDFName: "Exportar como PDF",
  //             searchTooltip: "Buscar",
  //             searchPlaceholder: "Buscar",
  //           },
  //           header: {
  //             actions: "ACCIONES",
  //           },
  //         }}
  //       />
  //     </div>
  //     <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
  //       {bodyAgregar}
  //     </Modal>
  //     {/* <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
  //       {bodyEditar}
  //     </Modal>
  //     <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
  //       {bodyEliminar}
  //     </Modal> */}
  //   </div>
  // );

  useEffect(() => {
    getPeticionDetalleCurso(setTablaDetalleCursos, ID, setLoading);
  }, [ID]);


  return (
    <div className="container mx-auto">
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>

        <div className="flex right mt-3">
          <NavLink 
            exact
            to = "/capacitacion/recursos"
            className= "bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700">
            REGRESAR
          </NavLink>
          
          <button
            className= "bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700"
            onClick={abrirCerrarModalAgregar}
          >
            AGREGAR
          </button>
        
      </div >
          <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
           Detalle del Curso
         </h3>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Codigo</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Material</TableCell>
                  <TableCell align="right">Tipo Material</TableCell>
                  <TableCell align="right">Plataforma</TableCell>
                  <TableCell align="right">Tiempo</TableCell>
                  <TableCell align="right">Actividades</TableCell>
                  <TableCell align="right">Observaciones</TableCell>
                  <TableCell align="right">Enlace</TableCell>
                  <TableCell align="right">Apoyos</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
              <Row row={row} />
            ))} */}
                {tablaDetalleCursos.map((n) => {
                  return (
                    <>
                      <Row row={{ ...n, id: ID, setTablaDetalleCursos }} />
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    
      <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
        {bodyAgregar}
      </Modal>
    </>
    </div>
  );

}

//export default TablaDetalleCursos;
