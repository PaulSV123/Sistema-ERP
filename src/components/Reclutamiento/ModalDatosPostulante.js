import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  CircularProgress,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getPeticionAreasXDepart,
  getPeticionDepartamentoXMarca,
  getPeticionMarcasTodas,
  getPeticionPerfilesXArea,
  getPeticionPlataforma,
} from "../../dist/getPeticiones";
import useForm from "../../hooks/useForm";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { putPeticionActualizarPostulante } from "../../dist/putPeticiones";
import { postPeticionAgregarPostulante } from "../../dist/postPeticiones";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    overflow: "scroll",
    overflowX: "hidden",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "80%",
      maxHeight: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
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

const initialPostulante = {
  idPostulante: null,
  nombres: "",
  apellidos: "",
  dni: "",
  telefono: "",
  email: "",
  fecha_nacimiento: "1990-01-01",
  carrera: "",
  ciclo_actual: 0,
  exp_previa: "N",
  link_cv: "",
  //link_convenio: "",
  id_turno: 1,
  id_marca: 0,
  id_unidad: 0,
  id_area: 0,
  id_perfil: 0,
  id_plataforma: 0,
  //id_convenio: 0,
};

export const validationFormPostulante = (form) => {
  let errors = {};
  let regexDni = /^\d{8}$/,
    regexTelf = /^\d{9}$/,
    regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
    regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  if (!form.nombres.trim()) {
    errors.nombres = "El campo nombre es requerido";
  }
  if (!form.apellidos.trim()) {
    errors.apellidos = "El campo apellido es requerido";
  }
  if (!form.fecha_nacimiento.trim()) {
    errors.fecha_nacimiento = "El campo fecha de nacimiento es requerido";
  }
  if (!form.carrera.trim()) {
    errors.carrera = "El campo carrera es requerido";
  }
  if (!form.dni.trim()) {
    errors.dni = "El campo dni es requerido";
  } else if (!regexDni.test(form.dni.trim())) {
    errors.dni = "El campo dni debe ser de 8 digitos";
  }
  if (!form.telefono.trim()) {
    errors.telefono = "El campo telefono es requerido";
  } else if (!regexTelf.test(form.telefono.trim())) {
    errors.telefono = "El campo telefono debe ser de 9 digitos";
  }
  if (!form.email.trim()) {
    errors.email = "El campo email es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo email es incorrecto";
  }
  if (!form.ciclo_actual.toString().trim()) {
    errors.ciclo_actual = "El campo ciclo es requerido";
  }
  if (!form.link_cv.trim()) {
    errors.link_cv = "El campo link cv es requerido";
  } else if (!regexUrl.test(form.link_cv.trim())) {
    errors.link_cv = "El campo debe ser una url";
  }
  if (form.id_marca == 0) {
    errors.id_marca = "Escoja una opcion";
  }
  if (form.id_unidad == 0) {
    errors.id_unidad = "Escoja una opcion";
  }
  if (form.id_area == 0) {
    errors.id_area = "Escoja una opcion";
  }
  if (form.id_perfil == 0) {
    errors.id_perfil = "Escoja una opcion";
  }
  if (form.id_plataforma == 0) {
    errors.id_plataforma = "Escoja una opcion";
  }
  return errors;
};

const ModalDatosPostulante = ({
  modalVerEditarDatosPost,
  setModalVerEditarDatosPost,
  data,
  setResponse,
}) => {
  const styles = useStyles();
  const [marcas, setMarcas] = useState([]);
  const [departs, setDeparts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [platfor, setPlatfor] = useState([]);
  const [disabledEdit, setDisabledEdit] = useState(true);
  const { form, setForm, handleChange, setErrors, errors } =
    useForm(initialPostulante);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    getPeticionMarcasTodas(setMarcas);
    getPeticionPlataforma(setPlatfor);
  }, []);

  const handleSubmitActualizarPost = (e) => {
    e.preventDefault();
    let er = validationFormPostulante(form);
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setLoading(true)
      setDisabledEdit(true);
      setErrors({});
      putPeticionActualizarPostulante(form,setResponse,handleCloseModal,setLoading)
      //console.log(form);
    }
  };

  const handleSubmitRegistrarPost = (e)=>{
    e.preventDefault();
    let er = validationFormPostulante(form);
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setLoading(true)
      setDisabledEdit(true);
      setErrors({});
      postPeticionAgregarPostulante(form,setResponse,handleCloseModal,setLoading)
      //console.log(form);
    }
  }

  const handleCloseModal = () => {
    setDisabledEdit(true);
    setDeparts([]);
    setAreas([]);
    setPerfiles([]);
    setErrors({});
    setModalVerEditarDatosPost(false);
  };

  const handleNoEdit = () => {
    setErrors({});
    resetPostInitial();
    setDisabledEdit(true);
  };

  const resetPostInitial = () => {
    getPeticionDepartamentoXMarca(data.Id_Marca, setDeparts);
    getPeticionAreasXDepart(data.Id_Departamento, setAreas);
    getPeticionPerfilesXArea(data.Id_Area, setPerfiles);
    let postu = {
      idPostulante: data.NUMERO,
      nombres: data.Nombres,
      apellidos: data.Apellidos,
      dni: data.DNI,
      telefono: data.CELULAR,
      email: data.CORREO,
      fecha_nacimiento: data.FechadeNacimiento,
      carrera: data.CARRERA,
      ciclo_actual: data.CicloActual,
      exp_previa: data.ExperienciaPrevia,
      link_cv: data.LinkdeCV,
      //link_convenio: data.LinkdeConvenio,
      id_turno: data.Id_Turno,
      id_marca: data.Id_Marca,
      id_unidad: data.Id_Departamento,
      id_area: data.Id_Area,
      id_perfil: data.Id_Perfil,
      id_plataforma: data.Id_Plataforma,
      //id_convenio: data.Id_Convenio,
    };
    //console.log(postu);
    setForm(postu);
  };

  useEffect(() => {
    if (modalVerEditarDatosPost) {
      if (data !== null) {
        /* getPeticionDepartamentoXMarca(data.Id_Marca,setDeparts);
            getPeticionAreasXDepart(data.Id_Departamento,setAreas);
            getPeticionPerfilesXArea(data.Id_Area,setPerfiles); */
        resetPostInitial();
      } else {
        setDisabledEdit(false);
        setForm(initialPostulante);
      }
    }
  }, [modalVerEditarDatosPost]);

  const handleSelectAnidados = (e) => {
    let { name, value } = e.target;
    if (name === "id_marca" && value != 0) {
      getPeticionDepartamentoXMarca(value, setDeparts);
    } else if (name === "id_marca" && value == 0) {
      form.id_unidad = 0;
      form.id_area = 0;
      form.id_perfil = 0;
      setAreas([]);
      setDeparts([]);
      setPerfiles([]);
    }
    if (name === "id_unidad" && value != 0) {
      form.id_area = 0;
      form.id_perfil = 0;
      getPeticionAreasXDepart(value, setAreas);
    } else if (name === "id_unidad" && value == 0) {
      form.id_area = 0;
      form.id_perfil = 0;
      setAreas([]);
      setPerfiles([]);
    }
    if (name === "id_area" && value != 0) {
      form.id_perfil = 0;
      getPeticionPerfilesXArea(value, setPerfiles);
    } else if (name === "id_area" && value == 0) {
      form.id_perfil = 0;
      setPerfiles([]);
    }
    handleChange(e);
  };

  const bodyModalVerEditarDatosPost = (
    <div className={styles.modal}>
      <form onSubmit={data===null? handleSubmitRegistrarPost : handleSubmitActualizarPost}>
        <div className="flex flex-col">
          <div className="float-right flex items-center justify-between">
            {data === null ? (
              <h3 className="text-center text-lg font-bold">
                REGISTRAR POSTULANTE
              </h3>
            ) : (   
              <>
                <h3 className="text-center text-lg font-bold">
                  DATOS DEL POSTULANTE
                </h3>
                {
                  loading ?
                  <CircularProgress size={30} />:(
                  disabledEdit ? (
                    <IconButton onClick={() => setDisabledEdit(false)}>
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <div className="flex">
                      <IconButton type="submit">
                        <CheckIcon />
                      </IconButton>
                      <IconButton onClick={handleNoEdit}>
                        <ClearIcon />
                      </IconButton>
                    </div>
                  )
                  )
                }
                
              </>    
            )}
          </div>
          <div className=" mt-4 grid gap-4 grid-cols-2">
            <TextField
              id="outlined-basic"
              size="small"
              name="nombres"
              value={form.nombres}
              onChange={handleChange}
              disabled={disabledEdit}
              label="Nombres"
              error={errors.nombres ? true : false}
              helperText={errors.nombres && errors.nombres}
            />

            <TextField
              id="outlined-basic"
              size="small"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              disabled={disabledEdit}
              label="Apellidos"
              error={errors.apellidos ? true : false}
              helperText={errors.apellidos && errors.apellidos}
            />

            <TextField
              id="outlined-basic"
              size="small"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              disabled={disabledEdit}
              type="number"
              label="Dni"
              error={errors.dni ? true : false}
              helperText={errors.dni && errors.dni}
            />

            <TextField
              id="outlined-basic"
              size="small"
              type="number"
              label="Celular"
              name="telefono"
              value={form.telefono}
              disabled={disabledEdit}
              onChange={handleChange}
              error={errors.telefono ? true : false}
              helperText={errors.telefono && errors.telefono}
            />

            <TextField
              id="outlined-basic"
              size="small"
              label="Email"
              name="email"
              value={form.email}
              disabled={disabledEdit}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email}
            />

            <TextField
              className="flex-1"
              label="Fecha Nacimiento"
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              disabled={disabledEdit}
              onChange={handleChange}
              error={errors.fecha_nacimiento ? true : false}
              helperText={errors.fecha_nacimiento && errors.fecha_nacimiento}
            />

            <TextField
              id="outlined-basic"
              size="small"
              label="Carrera"
              name="carrera"
              disabled={disabledEdit}
              value={form.carrera}
              onChange={handleChange}
              error={errors.carrera ? true : false}
              helperText={errors.carrera && errors.carrera}
            />

            <TextField
              className="flex-1"
              name="ciclo_actual"
              label="Ciclo Actual"
              value={form.ciclo_actual}
              disabled={disabledEdit}
              onChange={handleChange}
              error={errors.ciclo_actual ? true : false}
              helperText={errors.ciclo_actual && errors.ciclo_actual}
            />

            <FormControl>
              <InputLabel id="area">Experiencia</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChange}
                disabled={disabledEdit}
                value={form.exp_previa}
                id="experiencia"
                label="Experiencia"
                name="exp_previa"
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="S">Sí</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </Select>
            </FormControl>

            <TextField
              className="flex-1"
              name="link_cv"
              label="Link CV"
              value={form.link_cv}
              onChange={handleChange}
              disabled={disabledEdit}
              type="url"
              error={errors.link_cv ? true : false}
              helperText={errors.link_cv && errors.link_cv}
            />

            {/* <TextField
              className="flex-1"
              name="link_convenio"
              label="Link Convenio"
              onChange={handleChange}
              value={form.link_convenio}
              disabled={disabledEdit}
              type="url"
            />

            <FormControl>
              <InputLabel>Estado Convenio</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChange}
                value={form.id_convenio}
                id="id_convenio"
                name="id_convenio"
                label="id_convenio"
                disabled={disabledEdit}
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="1">Firmado</MenuItem>
                <MenuItem value="2">Enviado para Firmar</MenuItem>
                <MenuItem value="3">No Firmado</MenuItem>
                <MenuItem value="4">Termino Convenio</MenuItem>
                <MenuItem value="5">En Proceso</MenuItem>
                <MenuItem value="6">Retirado</MenuItem>
              </Select>
            </FormControl> */}

            <FormControl>
              <InputLabel id="area">Turno</InputLabel>
              <Select
                fullWidth
                className="flex-1"
                onChange={handleChange}
                value={form.id_turno}
                id="turno"
                name="id_turno"
                label="Turno"
                disabled={disabledEdit}
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="1">Mañana</MenuItem>
                <MenuItem value="2">Tarde</MenuItem>
                <MenuItem value="3">Mañana y Tarde</MenuItem>
              </Select>
            </FormControl>

            <FormControl error={errors.id_marca ? true : false}>
              <InputLabel id="area">Marca</InputLabel>
              <Select
                className="flex-1 "
                nowrap
                onChange={handleSelectAnidados}
                value={form.id_marca}
                id="marca"
                label="Marca"
                name="id_marca"
                defaultMenuIsOpen={false}
                disabled={disabledEdit}
                isSearchable={false}
              >
                <MenuItem value="0">--- Elija una marca ---</MenuItem>
                {marcas.map((op) => (
                  <MenuItem key={op.mEmp_id} value={op.mEmp_id}>
                    {op.mEmp_nombre}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.id_marca && errors.id_marca}
              </FormHelperText>
            </FormControl>

            <FormControl error={errors.id_unidad ? true : false}>
              <InputLabel id="departamento">Departamento</InputLabel>
              <Select
                className="flex-1"
                onChange={handleSelectAnidados}
                value={form.id_unidad}
                id="departamento"
                label="Departamento"
                name="id_unidad"
                defaultMenuIsOpen={false}
                disabled={disabledEdit}
                isSearchable={false}
              >
                <MenuItem value="0">--- Elija un depart ---</MenuItem>
                {departs.map((op) => (
                  <MenuItem key={op.Unidad_Id} value={op.Unidad_Id}>
                    {op.Unidad_Nombre}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.id_unidad && errors.id_unidad}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors.id_area ? true : false}>
              <InputLabel id="area">Area</InputLabel>
              <Select
                className="flex-1"
                onChange={handleSelectAnidados}
                value={form.id_area}
                id="area"
                label="area"
                name="id_area"
                disabled={disabledEdit}
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="0">--- Elija una Area ---</MenuItem>
                {areas.map((op) => (
                  <MenuItem key={op.Area_Id} value={op.Area_Id}>
                    {op.Area_Nombre}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.id_area && errors.id_area}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors.id_perfil ? true : false}>
              <InputLabel id="perfil">Perfil</InputLabel>
              <Select
                className="flex-1"
                onChange={handleSelectAnidados}
                value={form.id_perfil}
                id="perfil"
                label="perfil"
                name="id_perfil"
                disabled={disabledEdit}
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="0">--- Elija una Perfil ---</MenuItem>
                {perfiles.map((op) => (
                  <MenuItem key={op.perfil_Id} value={op.perfil_Id}>
                    {op.perfil_nombre}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.id_perfil && errors.id_perfil}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors.id_plataforma ? true : false}>
              <InputLabel id="plataforma">Plataforma</InputLabel>
              <Select
                className="flex-1"
                onChange={handleChange}
                value={form.id_plataforma}
                id="plataforma"
                label="plataforma"
                name="id_plataforma"
                disabled={disabledEdit}
                defaultMenuIsOpen={false}
                isSearchable={false}
              >
                <MenuItem value="0">--- Elija una Plataforma ---</MenuItem>
                {platfor.map((op) => (
                  <MenuItem key={op.pPost_Id} value={op.pPost_Id}>
                    {op.pPost_nombre}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.id_plataforma && errors.id_plataforma}
              </FormHelperText>
            </FormControl>
          </div>
          <br />
          <br />
          <div className="flex justify-evenly items-center">
            {
              loading ? 
              <CircularProgress  size={40} />:
              <>
                {data === null && (
                  <button
                    type="submit"
                    className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
                  >
                    REGISTRAR
                  </button>
                )}

                <button
                  onClick={handleCloseModal}
                  className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
                >
                  CANCELAR
                </button>
              </>
            }
            
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <Modal open={modalVerEditarDatosPost} onClose={handleCloseModal}>
      {bodyModalVerEditarDatosPost}
    </Modal>
  );
};

export default ModalDatosPostulante;
