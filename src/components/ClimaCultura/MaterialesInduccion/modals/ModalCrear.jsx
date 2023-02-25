import {
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { initialNewRecurso } from "../models/initialNewRecurso";
import { useStyles } from "./ModalStyles";


const ModalLoading = ({open, title}) => {

  const styles = useStyles();

  return (
    <Modal
      open={open}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <div className={styles.modalLoading}>
          <div>
            <div className="flex flex-col">
              <div className="py-2">
                <h2 className="text-xl font-medium text-center">
                  {title}
                </h2>
                <p className="text-center">(Porfavor, Espere)</p>
              </div>
              <div align="center" className="">
                <CircularProgress />
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};
const ModalCrear = ({ datosSelect, agregarRecurso, cerrarModals }) => {
  const [newRecurso, setNewRecurso] = useState(initialNewRecurso);


  const [loading, setLoading] = useState(false);
  const [openModalLoading, setOpenModalLoading] = useState(false);



  const styles = useStyles();

  const { departamentos, perfiles, areas, marcas } = datosSelect;

  const guardarCambiosEstado = (event) => {
    setNewRecurso({
      ...newRecurso,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newRecurso);
    setLoading(true);
    setOpenModalLoading(true);
    agregarRecurso(newRecurso, cerrarModals);
  };

  return (
    <div className={styles.modal}>
      <div className="text-center text-lg font-bold">
        <h2>Nuevo Recurso</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl className="flex flex-col align-center">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4">
            <FormControl>
              <TextField
                disabled={loading}
                className="flex-1"
                label="Nombre del Recurso"
                onChange={guardarCambiosEstado}
                name="nombreRecurso"
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <TextField
                disabled={loading}
                className="flex-1"
                label="Enlace"
                onChange={guardarCambiosEstado}
                name="enlace"
                required
                type="url"
              />
            </FormControl>
            <FormControl>
              <InputLabel>Departamento</InputLabel>
              <Select
                defaultValue=""
                onChange={guardarCambiosEstado}
                className="flex-1"
                disabled={loading}
                id="unidad"
                name="departamento"
                required
                label="unidad"
              >
                {departamentos.map((opcion) => (
                  <MenuItem key={opcion.id} value={opcion.id}>
                    {opcion.unidad}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value="" hidden></MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Perfil</InputLabel>
              <Select
                onChange={guardarCambiosEstado}
                className="flex-1"
                disabled={loading}
                id="perfil"
                required
                name="perfil"
                defaultValue=""
              >
                {perfiles.map((opcion) => (
                  <MenuItem key={opcion.perfil_Id} value={opcion.perfil_Id}>
                    {opcion.perfil_nombre}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value="" hidden></MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4">
            <FormControl>
              <InputLabel>Área</InputLabel>
              <Select
                onChange={guardarCambiosEstado}
                className="flex-1"
                disabled={loading}
                id="area"
                name="area"
                required
                defaultValue=""
              >
                {areas.map((opcion) => (
                  <MenuItem key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value="" hidden></MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Marca</InputLabel>
              <Select
                onChange={guardarCambiosEstado}
                className="flex-1"
                id="marca"
                disabled={loading}
                name="marca"
                required
                defaultValue=""
              >
                {marcas.map((opcion) => (
                  <MenuItem key={opcion.id} value={opcion.id}>
                    {opcion.marca}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value="" hidden></MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Turno</InputLabel>
              <Select
                onChange={guardarCambiosEstado}
                className="flex-1"
                id="turno"
                name="turno"
                disabled={loading}
                required
                defaultValue=""
              >
                <MenuItem key={1} value={1}>
                  Mañana
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Tarde
                </MenuItem>
                <MenuItem key={"none"} value=" " hidden></MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                //label="Fecha"
                disabled={loading}
                className="flex-1"
                onChange={guardarCambiosEstado}
                name="actualizacion"
                required
                type="date"
              />
            </FormControl>
          </div>
          <div align="center">
            <button
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              disabled={loading}
              onClick={cerrarModals}
            >
              CANCELAR
            </button>

            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
              disabled={loading}
              type="submit"
            >
              AGREGAR
            </button>
          </div>
        </FormControl>
      </form>
      <ModalLoading 
      open={openModalLoading}
      title="Creando Nuevo Recurso..."/>
    </div>
  );
};

export default ModalCrear;
