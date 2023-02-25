import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styled from 'styled-components';
import {
  getPeticionActividades,
  getPeticionAspectos,
  getPeticionesListarCursos,
  getPeticionModalEvaluacion,
} from '../../dist/Capacitacion/getPeticiones';
import Spinner from '../Spinner/Spinner';
import { UserContext } from '../context/UserContext';
import {
  Modal,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { postEvaluacion } from "../../dist/Capacitacion/postPeticiones";
import { putEvaluacion, putEvaluaciones } from '../../dist/Capacitacion/putPeticion';
import { deleteEvaluacion } from "../../dist/Capacitacion/deletePeticiones";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '21rem',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    borderRadius: '0.3rem',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button_aceptar: {
    padding: '5px  12px 5px  12px',
    width: '100%',
    color: 'black',
    backgroundColor: '#f09208',
    border: '1px solid black',
    borderRadius: '5%',
  },
  button_cancelar: {
    padding: '5px  12px 5px  12px',
    width: '100%',
    color: 'white',
    backgroundColor: '#383837',
    border: '1px solid black',
    borderRadius: '5%',
  },
  error: {
    backgroundColor: 'red',
    padding: '3px  4px 3px  4px',
    color: 'white',
    textAlign: 'center',
    borderRadius: '5px',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },

  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[1],
    padding: theme.spacing(3, 5, 5),
  },

  paper2: {
    position: 'absolute',
    width: 750,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[1],
    padding: theme.spacing(3, 5, 5),
  },
}));

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export function Row(props) {
  const classesM = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const classes = useRowStyles();
  const [cursoState, setCursoState] = React.useState({});
  const [aspectos, setAspectos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [cursoActualizar, setCursoActualizar] = useState({
    Id_Evaluacion: '',
    Eva_Id_Cur: '',
    Eva_Id_Acti: "",
    Eva_Id_Aspecto: "",
    Eva_Puntaje: "",
    Eva_Desc_Acti: '',
    nombreCurso: '',
    Eva_Observaciones: '',
  });

  const [fecha, setFecha] = useState("");
  const [observacion, setObservacion] = useState("");
  const [mensajeEdit, setMensajeEdit] = useState("");
  const [hBlanda, setHBlanda] = useState("");
  const [hDura, setHDura] = useState("");
  const [loading, setLoading] = useState(true);
  const [caso, setCaso] = useState("");
  const styles = useStyles();
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [cursoId,setCursoId]= useState();
  const [curso, setCurso] = useState({
    Id_Curso: "",
    Id_Evaluacion:"",
    Tipo_Curso: "",
    Nombre:"",
    Actividad:"",
    Descripcion:"",
    Aspecto:"",
    Puntaje:"",
    Observaciones:""
  }); 

  const [onOpen, setOnOpen] = useState(false);

  const {
    Id_Curso,
    Id_Evaluacion,
    Tipo_Curso,
    Nombre,
    Actividad,
    Descripcion,
    Aspecto,
    Puntaje,
    Observaciones,
  } = curso;
  console.log(curso)

  React.useEffect(() => {
    const obj = {};
    dataCurso.cursoNombre.forEach((curso) => {
      obj[`${curso.nombre}`] = false;
    });
    dataCurso2.cursoNombre.forEach((curso) => {
      obj[`${curso.nombre}`] = false;
    });
    setCursoState(obj);
    const objC = {};
    /*row.Cursos.map((curso)=>{
      objC[`${curso.Id_Evaluacion}`] = curso;
    });
    setCurso(objC)*/
  }, []);

  React.useEffect(() => {
    getPeticionAspectos(setAspectos, setLoading);
    getPeticionActividades(setActividades, setLoading);
    getPeticionesListarCursos(setCursos, setLoading);
  }, []);

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setCurso({
        Id_Curso: "",
        Tipo_Curso: "",
        Nombre:"",
        Actividad:"",
        Descripcion:"",
        Aspecto:"",
        Puntaje:"",
        Observaciones:""
      });
    }
  };

  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (curso) => {
    console.log(curso); 
    setCursoActualizar((c) => ({
      ...c,
      Eva_Observaciones: curso.Observaciones,
      Eva_Desc_Acti: curso.Descripcion,
      nombreCurso:curso.Nombre ,
      Id_Evaluacion:curso.Id_Evaluacion,
    }));
    setOpenModal(true);
  };

  // Submit para el modal Eliminar
  const handleSubmitEliminar = () => {
    console.log(cursoId)
    deleteEvaluacion(parseInt(cursoId),setLoading)
    setLoading(true);
    setCaso("Eliminar");
    abrirCerrarModalEliminar();
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

  const bodyEliminar = (
    <div className={styles.modal}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea eliminar el registro?
        </h2>
        
        <div className="flex justify-evenly items-center mt-4">
          <button
            color="primary"
            onClick={() =>handleSubmitEliminar()}
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
            style={{ width: '1.5rem', height: '1.5rem' }}
            alt=""
          />
        </button>
      </div>
    </div>
  );

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const enviar = {
      Eva_Id_Acti:cursoActualizar.Eva_Id_Acti,
      Eva_Desc_Acti:cursoActualizar.Eva_Desc_Acti,
      Eva_Id_Aspecto:cursoActualizar.Eva_Id_Aspecto,
      Eva_Puntaje:cursoActualizar.Eva_Puntaje,
      Eva_Observaciones:cursoActualizar.Eva_Observaciones,
      Id_Evaluacion:cursoActualizar.Id_Evaluacion,
    }
    setOpenModal(false);
    await putEvaluaciones(enviar);
     props.actualizarTablaEvaluacion();
  };

  //Body editar curso
  const bodyEditarCurso = (
    <div style={modalStyle} className={classesM.paper}>
      <Modal open={onOpen} onClose={() => setOnOpen(!onOpen)}>
        {bodyConfirmar}
      </Modal>
      <h3 className="text-center text-lg font-bold">Editar Evaluacion</h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitEdit}
        // onSubmit={handleSubmitEditEval} className="flex flex-col align-middle"
      >
        {/* <FormControl fullWidth className="mb-3">
          <InputLabel id="Perfil" required>
            Perfil
          </InputLabel>
          <Select
            disabled
            labelId="Perfil"
            id="Perfil"
            label="Perfil"
            //onChange={handleChange2}
            name="perfil"
          //value={marcaId()}
          >
            {marcas.map((option, i) => {
              return (
                <MenuItem key={i + 1} value={i + 1}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}

        <FormControl fullWidth className="mb-3">
          <InputLabel id="Curso" required>
            Curso
          </InputLabel>
          <Select
            disabled
            labelId="Curso"
            id="Curso"
            label="Curso"
            value={cursoActualizar.nombreCurso}
            //onChange={(e) => setCursos(e.target.value)}
            name="Tipo_Curso"
            //value={departamentoId()}
          >
              <MenuItem key={cursoActualizar.nombreCurso} value={cursoActualizar.nombreCurso}>
                  {cursoActualizar.nombreCurso}
                </MenuItem>
            {/*{departamentos.map((option, i) => {
              return (
                <MenuItem key={i} value={option.id}>
                  {option.Unidades}
                </MenuItem>
              );
            })}*/}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Actividad" required>
            Actividad
          </InputLabel >
          <Select
            labelId="Actividad"
            className="flex-1"
            //onChange={(e) => setIdActividad(e.target.value)}
            id="Actividad"
            name="Actividad"
            label="Actividad"
           required
            value={cursoActualizar.Eva_Id_Acti}
            onChange={(e) =>setCursoActualizar((c) => ({
              ...c,
              Eva_Id_Acti: e.target.value,
            }))}
            defaultMenuIsOpen={false}
            isSearchable={false}

          >
            {/* <MenuItem>
              <em></em>
            </MenuItem>
            <MenuItem value="PPT">PPT</MenuItem>
            <MenuItem value="Formulario">Formulario</MenuItem>
            <MenuItem value="E. Final">E. Final</MenuItem>
            <MenuItem value="Caso">Caso</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
            <MenuItem value="Jamboard">Jamboard</MenuItem>
            <MenuItem>
              <em></em>
            </MenuItem> */}

            {actividades.map((option, i) => {
              return (
                <MenuItem key={i} value={option.ID}>
                  {option.Actividad}
                </MenuItem>
              );
            })}
             <MenuItem key={'none'} value=""></MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl fullWidth className="mb-3">
          <TextareaAutosize
            InputLabelProps={{ shrink: true, required: true }}
            maxRows={3}
            placeholder="Descripcion *"
            value={cursoActualizar.Eva_Desc_Acti}
            onChange={(e) => setCursoActualizar((c) => ({
              ...c,
              Eva_Desc_Acti: e.target.value,
            }))}
            //onChange={(e) => setDescripcionActividad(e.target.value)}
            //value={idActividad}
            className="mb-3"
            name="Descripción"
            required
            type="textarea"
          />
        </FormControl>
        <br />
        <FormControl fullWidth className="mb-3">
          <TextareaAutosize
            InputLabelProps={{ shrink: true, required: true }}
            maxRows={3}
            placeholder="Observaciones *"
            value={cursoActualizar.Eva_Observaciones}
            onChange={(e) => setCursoActualizar((c) => ({
              ...c,
              Eva_Observaciones: e.target.value,
            }))}
            //onChange={(e) => setObservacion(e.target.value)}
            //value={idActividad}
            className="mb-3"
            name="Observaciones"
            required
            type="textarea"
          />
        </FormControl>

        <div className="flex">
          <div>
            <FormControl fullWidth className="mb-3">
              <InputLabel id="Puntaje" required>
                Puntaje
              </InputLabel>
              <Select
                required
                labelId="Puntaje"
                id="Puntaje"
                label="Puntaje"
                style={{ width: '180px' }}
                name=""
                value={cursoActualizar.Eva_Puntaje}
                onChange={(e) => setCursoActualizar((c) => ({
                  ...c,
                  Eva_Puntaje: e.target.value,
                }))}
                // onChange={(e) => setPuntaje(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: '60px' }}></div>
          <div>
            <FormControl>
              <InputLabel id="Aspecto" required>
                Aspectos
              </InputLabel>
              <Select
                style={{ width: '180px' }}
                required
                labelId="Aspecto"
                id="Aspecto"
                label="Aspecto"
                name=""
                value={cursoActualizar.Eva_Id_Aspecto}
                onChange={(e) => setCursoActualizar((c) => ({
                  ...c,
                  Eva_Id_Aspecto: e.target.value,
                }))}
                //onChange={(e) => setIdAspecto(e.target.value)}
              >
                {/* <MenuItem>
                  <em></em>
                </MenuItem>
                <MenuItem value="Presentación">Presentación</MenuItem>
                <MenuItem value="Desenvolvimiento">Desenvolvimiento</MenuItem>
                <MenuItem value="Dominio del tema">Dominio del tema</MenuItem>
                <MenuItem>
                  <em></em>
                </MenuItem> */}
                {aspectos.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.Aspecto_Id}>
                      {option.Aspecto_Nombre}
                    </MenuItem>
                  );
                })}
                 <MenuItem key={'none'} value=""></MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/* <div className="flex">
          <div >
            <FormControl fullWidth className="mb-3">
              <InputLabel id="HabDura" required>
                Habilidades Duras
              </InputLabel>
              <Select
                required
                labelId="HabDura"
                id="HabDura"
                label="HabDura"
                style={{ width: "180px", minWidth: "80px" }}
                name=""
                onChange={(e) => setHDura(e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>

              </Select>
            </FormControl>
          </div>
          <div style={{ width: "60px" }}></div>
          <div className="flex 1" style={{ margin: 'auto' }}>
            <div>
              <span>Promedio </span>
            </div>
            <div>
              <TextField
                InputLabelProps={{ shrink: true, required: true }}
                id="outlined-secondary"
                variant="outlined"
                style={{
                  width: '100px'
                }}
              />
            </div>
          </div>
        </div> */}

        <br />
        <div className="flex justify-evenly items-center">
          <button
            type="submit"
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
  
  const bodyEditarEvaluacion = (
    <div style={modalStyle} className={classesM.paper}>
      <Modal open={onOpen} onClose={() => setOnOpen(!onOpen)}>
        {bodyConfirmar}
      </Modal>
      <h3 className="text-center text-lg font-bold">Editar Observacion</h3>
      {/* <h1>{props.row.id}</h1>
      <h1>{fecha}</h1>
      <h1>{observacion}</h1>
      <h1>{JSON.stringify(props.row.Observaciones)}</h1> */}
      <hr />
      <br />

      {/* <form className={classes.container}>
        <TextField
          id="date"
          label="Fecha"
          type="date"
          onChange={(e) => setFecha(e.target.value)}
          defaultValue={props.row.Fecha}
          className={classes.textField}
          InputLabelProps={{ shrink: true }}
        />
      </form> */}
      <form className="flex flex-col align-middle">
        <br />
        <FormControl fullWidth className="mb-6">
          <TextareaAutosize
            InputLabelProps={{ shrink: true, required: true }}
            className="mb-6"
            defaultValue={props.row.Observaciones}
            onChange={(e) => setObservacion(e.target.value)}
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
              e.preventDefault();
              putEvaluacion(props.row.id, fecha, observacion, setMensajeEdit);
              setFecha(null);
              setObservacion(null);
              setOnOpen(!onOpen);
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
          {row.Fecha}
        </TableCell>
        <TableCell align="right">{row.Dia}</TableCell>
        <TableCell align="right">{row.Encargado}</TableCell>
        <TableCell align="right">{row.PromBlanda}</TableCell>
        <TableCell align="right">{row.PromDuras}</TableCell>
        <TableCell align="right">{row.Promedio}</TableCell>
        <TableCell align="right">{row.Condicion}</TableCell>
        <TableCell align="right">{row.Observaciones}</TableCell>
        {/* <TableCell>
          <center>
            <BotonEditar
              onClick={() => {
                handleOpenModal();
                setFecha(props.row.Fecha);
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
            {bodyEditarEvaluacion}
          </Modal>
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Cursos
              </Typography>

              <div className="flex flex-col">
                {row.Cursos.map((curso) => (
                  <div>
                    <TableCell>
                      
                      <div className="flex items-center">
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() =>
                            setCursoState({
                              ...cursoState,
                              [`${curso.Codigo}`]: !cursoState[curso.Codigo],
                            })
                          }
                        >
                          {cursoState[curso.Codigo] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                        <h1 className="pl-2">{curso.Codigo}</h1>
                      </div>
                    </TableCell>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={7}
                    >
                      <Collapse
                        in={cursoState[curso.Codigo]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <b>Tipo</b>{' '}
                                </TableCell>
                                {/* <TableCell>
                                  <b>Código </b>{" "}
                                </TableCell> */}
                                <TableCell>
                                  <b>Nombre </b>{' '}
                                </TableCell>
                                <TableCell>
                                  <b>Actividades</b>{' '}
                                </TableCell>
                                <TableCell>
                                  <b>Descripcion</b>
                                </TableCell>
                                <TableCell align="right">
                                  <b>Aspecto</b>
                                </TableCell>
                                <TableCell align="right">
                                  <b>Puntaje</b>
                                </TableCell>
                                <TableCell>
                                  <b>Observaciones</b>
                                </TableCell>
                                <TableCell>
                                  <b>Acciones</b>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                
                                <TableCell>{curso.Tipo_Curso}</TableCell>
                                {/* <TableCell>{curso.Codigo}</TableCell> */}
                                <TableCell>{curso.Nombre}</TableCell>
                                <TableCell component="th" scope="row">
                                  {curso.Actividad}
                                </TableCell>
                                <TableCell>{curso.Descripcion}</TableCell>
                                <TableCell align="right">
                                  {curso.Aspecto}
                                </TableCell>
                                <TableCell align="right">
                                  {curso.Puntaje}
                                </TableCell>
                                <TableCell align="right">
                                  {curso.Observaciones}
                                </TableCell>
                                <TableCell>
                                <BotonEditar
                                    onClick={() =>
                                      handleOpenModal(curso)
                                    }
                                  >
                                    <svg
                                      style={{ fontSize: 50 }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="60"
                                      height="20"
                                      fill="currentColor"
                                      className="bi bi-pencil-square"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                      />
                                    </svg>
                              </BotonEditar >
                                  <Modal
                                    open={openModal}
                                    onClose={handleCloseModal}
                                    aria-describedby="simple-modal-description"
                                  >
                                    {bodyEditarCurso}
                                  </Modal>
                                </TableCell>
                                
                                <TableCell>
                                  <BotonEliminar
                                  onClick={() => {
                                    handleSubmitEliminar()
                                    setCursoId(curso.Id_Evaluacion);
                                  }}
                                  >
                                    
                                    <svg 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      className="h-6 w-6" 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke="currentColor" 
                                      strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" 
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                  </BotonEliminar>
                                  <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
                                    {bodyEliminar}
                                  </Modal>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </div>
                  
                ))}
                
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    fecha: PropTypes.string.isRequired,
    dia: PropTypes.number.isRequired,
    encargado: PropTypes.string.isRequired,
    promBlanda: PropTypes.string.isRequired,
    promDuras: PropTypes.string.isRequired,
    curso: PropTypes.arrayOf(
      PropTypes.shape({
        tipoCurso: PropTypes.string.isRequired,
        codigo: PropTypes.string.isRequired,
        nomre: PropTypes.string.isRequired,
        actividades: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        aspecto: PropTypes.string.isRequired,
        puntaje: PropTypes.number.isRequired,
      })
    ).isRequired,
    promedio: PropTypes.number.isRequired,
    condicion: PropTypes.string.isRequired,
    observacion: PropTypes.string.isRequired,
  }).isRequired,
};

const BotonEditar = styled.div`
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: black;
  width: 16px;
  height: 16px;

  &:hover {
    background: #f2f2f2;
  }
`;
const BotonEliminar = styled.div`
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: black;
  width: 16px;
  height: 16px;

  &:hover {
    background: #f2f2f2;
  }
`;

const dataCurso = {
  cursoNombre: [
    {
      nombre: 'G1',
      actividadesLista: [
        {
          actividades: 'PPT',
          descripcion: 'Presentacion sobre la agencias',
          aspecto: 'Presentacion',
          puntaje: 8,
        },
      ],
    },
    {
      nombre: 'HB1',
      actividadesLista: [
        {
          actividades: 'PPT',
          descripcion:
            'Preguntas abiertas sobre "La cultura del Trabajo remoto"',
          aspecto: 'Desenvolvimiento ',
          puntaje: 8,
        },
      ],
    },
    {
      nombre: 'HB2',
      actividadesLista: [
        {
          actividades: 'OTRO',
          descripcion: '',
          aspecto: 'Dominio del tema',
          puntaje: 8,
        },
      ],
    },
    {
      nombre: 'HB3',
      actividadesLista: [
        {
          actividades: 'PPT',
          descripcion: 'Exposicion sobre "El manejo de Tiempo y Productividad"',
          aspecto: 'Dominio del tema',
          puntaje: 8,
        },
      ],
    },
    {
      nombre: 'HB4',
      actividadesLista: [
        {
          actividades: 'JAMBOARD',
          descripcion:
            'Cuestionario sobre "Inteligencia Emocional para Lideres"',
          aspecto: 'Dominio del tema',
          puntaje: 8,
        },
      ],
    },
  ],
};

const dataCurso2 = {
  cursoNombre: [
    {
      nombre: 'CB1',
      actividadesLista: [
        {
          actividades: 'OTRO',
          descripcion: 'Metodología SCRUM',
          aspecto: 'Presentacion',
          puntaje: 8,
        },
      ],
    },
    {
      nombre: 'CB2',
      actividadesLista: [
        {
          actividades: 'PPT',
          descripcion: 'Domina las herramientas de google suite desde cero',
          aspecto: 'Desenvolvimiento   ',
          puntaje: 8,
        },
      ],
    },
    {
      nombre: 'CB3',
      actividadesLista: [
        {
          actividades: 'FROMULARIO',
          descripcion: 'Reuniones de trabajo remoto efectivo.',
          aspecto: 'Dominio del tema',
          puntaje: 8,
        },
      ],
    },
  ],
};

// const rows = [
//   {
//     fecha: "8/2/2022",
//     dia: 2,
//     encargado: "Camila",
//     promedio: 8,
//     condicion: "muy bueno",
//     observacion:
//       "El participante se presentó puntual a la reunión, demostró interés en el proceso, tuvo un muy buen desenvolvimiento. Respondió correctamente las preguntas.",
//     dataCurso,
//   },

//   {
//     fecha: "8/2/2022",
//     dia: 3,
//     encargado: "Camila",
//     promedio: 8,
//     condicion: "muy bueno",
//     observacion:
//       "El participante se presentó puntual a la reunión, demostró interés en el proceso, tuvo un muy buen desenvolvimiento. Respondió correctamente las preguntas.",
//     dataCurso,
//   },

//   {
//     fecha: "8/2/2022",
//     dia: 2,
//     encargado: "Camila",
//     promedio: 8,
//     condicion: "muy bueno",
//     observacion:
//       "El participante se presentó puntual a la reunión, demostró interés en el proceso, tuvo un muy buen desenvolvimiento. Respondió correctamente las preguntas.",
//     dataCurso,
//   },

//   {
//     fecha: "8/2/2022",
//     dia: 3,
//     encargado: "Camila",
//     promedio: 8,
//     condicion: "muy bueno",
//     observacion:
//       "El participante se presentó puntual a la reunión, demostró interés en el proceso, tuvo un muy buen desenvolvimiento. Respondió correctamente las preguntas.",
//     dataCurso,
//   },
// ];

export default function CollapsibleTable({ id, onOpen }) {
  const classesM = useStyles();
  const styles = useStyles();
  const [modalEvaluacion, setModalEvaluacion] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [loader, SetLoader] = useState(true);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(true);
  const [evaluacion, setEvaluacion] = useState(false);
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const { user } = useContext(UserContext);

  const [curso, setCurso] = useState('');
  const [descripcionActividad, setDescripcionActividad] = useState('');
  const [puntaje, setPuntaje] = useState('');

  const [observacion, setObservacion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [aspectos, setAspectos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [idAspecto, setIdAspecto] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [idActividad, setIdActividad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [caso, setCaso] = useState([]);

  useEffect(() => {
    getPeticionAspectos(setAspectos, setLoading);
    getPeticionActividades(setActividades, setLoading);
    getPeticionesListarCursos(setCursos, setLoading);
  }, []);

  function getModalStyle() {
    const top = 45;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluacion({
      ...evaluacion,
      [name]: value,
    });
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  };
  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    postEvaluacion(
      id,
      user['id_Empleado'],
      idActividad,
      curso,
      descripcionActividad,
      idAspecto,
      puntaje,
      observacion,
      setMensaje,
      setLoading
    );
    setCaso('Agregar');
    abrirCerrarModalAgregar();
    abrirCerrarModalConfirmar();
    setIdActividad(null);
    setIdAspecto(null);
    setCurso(null);
    setDescripcionActividad(null);
    setPuntaje(null);
    setObservacion(null);
  };

  const handleChange2 = ({ target }) => {
    const { value, name } = target;
    let valor = '';
    if (name === 'FECHA') {
      setEvaluacion((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === 'ENCARGADO') {
      setEvaluacion((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === 'OBSERVACION') {
      setEvaluacion((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const bodyConfirmar = (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        {caso === 'Agregar' && (
          <h3 className="text-center text-lg font-bold">{mensaje}</h3>
        )}

        {caso === 'Editar' && (
          <h3 className="text-center text-lg font-bold">Evaluacion editada</h3>
        )}

        <button
          onClick={() => {
            abrirCerrarModalConfirmar();
          }}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
          // className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
        >
          <img
            src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
            style={{ width: '1.5rem', height: '1.5rem' }}
            alt=""
          />
        </button>
      </div>
    </div>
  );

  const bodyAgregar = (
    <div style={modalStyle} className={classes.paper2}>
      {/* {console.log(perfilNuevo)} */}
      <h3 className="text-center text-lg font-bold">Agregar Evaluación</h3>
      <hr />
      <br />
      <form
        onSubmit={handleSubmitAgregar}
        className="flex flex-col align-middle"
      >
        <div className="row p-2">
          <div className="col-md-6">
            {/*Cursos*/}
            <div className="form-group">
              <FormControl fullWidth className="mb-3">
                <InputLabel id="Curso" required>
                  Curso
                </InputLabel>
                <Select
                  required
                  style={{ width: '300px' }}
                  name=""
                  onChange={(e) => setCurso(e.target.value)}
                  //onChange={handleChange}
                >
                  <MenuItem value={2}>Habilidades Blandas</MenuItem>
                  <MenuItem value={4}>Habilidades Duras</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth className="mb-3">
                <InputLabel id="Actividades" required>
                  Actividades
                </InputLabel>
                <Select
                  required
                  labelId="Actividades"
                  id="Actividades"
                  label="Actividades"
                  style={{ width: '300px' }}
                  name="Actividad"
                  onChange={(e) => setIdActividad(e.target.value)}
                  //onChange={handleChange}
                >
                  {actividades.map((option, i) => {
                    return (
                      <MenuItem key={i} value={option.ID}>
                        {option.Actividad}
                      </MenuItem>
                    );
                  })}
                </Select>
                <h1>{idActividad}</h1>
              </FormControl>
              <div className="form-group">
                <FormControl fullWidth className="mb-3">
                  <InputLabel id="Aspecto" required>
                    Aspectos
                  </InputLabel>
                  <Select
                    required
                    labelId="Aspecto"
                    id="Aspecto"
                    label="Aspecto"
                    style={{ width: '300px' }}
                    name="Aspecto_Id"
                    onChange={(e) => setIdAspecto(e.target.value)}
                    //onChange={handleChange}
                  >
                    {aspectos.map((option, i) => {
                      return (
                        <MenuItem key={i} value={option.Aspecto_Id}>
                          {option.Aspecto_Nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <h1>{idAspecto}</h1>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            {/*Descripción*/}
            <div className="form-group">
              <TextareaAutosize
                InputLabelProps={{ shrink: true, required: true }}
                maxRows={3}
                placeholder="Descripcion Actividades *"
                className="mb-3"
                name="Descripción"
                required
                type="textarea"
                style={{ width: '300px' }}
                onChange={(e) => setDescripcionActividad(e.target.value)}
              />
            </div>

            {/*Aspectos*/}

            {/*Puntaje*/}
            <div className="form-group">
              <FormControl fullWidth className="mb-3">
                <InputLabel id="Puntajes" required>
                  Puntaje
                </InputLabel>
                <Select
                  required
                  labelId="Puntajes"
                  id="Puntajes"
                  label="Puntajes"
                  style={{ width: '300px' }}
                  name=""
                  onChange={(e) => setPuntaje(e.target.value)}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>13</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={17}>17</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={19}>19</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*Observación*/}
            <div className="form-group">
              <TextareaAutosize
                InputLabelProps={{ shrink: true, required: true }}
                className="mb-3"
                placeholder="Observacion *"
                name="OBSERVACION"
                required
                type="textarea"
                style={{ width: '300px' }}
                onChange={(e) => setObservacion(e.target.value)}
              />
            </div>
          </div>
        </div>

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

  useEffect(() => {
    getPeticionModalEvaluacion(setModalEvaluacion, id, setLoading);
  }, [id]);

  const actualizarTablaEvaluacion = async () => {
    setModalEvaluacion([]);
    await getPeticionModalEvaluacion(setModalEvaluacion, id, setLoading);
  }

  //console.log("DATA!!",modalEvaluacion[id])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border m-3"
              onClick={abrirCerrarModalAgregar}
            >
              AGREGAR
            </button>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Fecha</TableCell>
                  <TableCell align="right">Dia</TableCell>
                  <TableCell align="right">Encargado</TableCell>
                  <TableCell align="right">Hab. Blanda</TableCell>
                  <TableCell align="right">Hab. Dura</TableCell>
                  <TableCell align="right">Promedio</TableCell>
                  <TableCell align="right">Condicion</TableCell>
                  {/* <TableCell align="right">Acciones</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
              <Row row={row} />
            ))} */}
                {modalEvaluacion.map((n) => {
                  return (
                    <>
                     <Row actualizarTablaEvaluacion={actualizarTablaEvaluacion} row={{ ...n, id: id, setModalEvaluacion }} />
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <div>
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border m-3"
              // onClick={() => window.location.reload(false)}
              onClick={() => onOpen()}
            >
              Atrás
            </button>
          </div>
        </>
      )}
      <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
        {bodyAgregar}
      </Modal>
      <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
        {bodyConfirmar}
      </Modal>
    </>
  );
}
