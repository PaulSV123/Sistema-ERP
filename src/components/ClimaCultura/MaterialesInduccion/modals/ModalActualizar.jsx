import React, { useEffect, useState } from "react";
import { useStyles } from "./ModalStyles";
import { initialNewRecurso } from "../models/initialNewRecurso";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@material-ui/core";

export const initialRecursoUpdate = {
  id: "",
  ...initialNewRecurso,
};

const ModalLoadingActualizar = ({ open, title }) => {
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
                <h2 className="text-xl font-medium text-center">{title}</h2>
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

const ModalActualizar = ({
  datosSelect,
  actualizarRecurso,
  cerrarModals,
  datosRecursoFila,
}) => {
  const [loading, setLoading] = useState(false);

  const [recurso, setRecurso] = useState(initialRecursoUpdate);
  const [openModalLoadingActualizar, setOpenModalLoadingActualizar] =
    useState(false);
  const { departamentos, perfiles, areas, marcas } = datosSelect;

  const styles = useStyles();
  useEffect(() => {
    // COLOCAR ID
    setRecurso({ ...datosRecursoFila });
  }, []);

  const guardarCambiosEstadoActualizado = (event) => {
    setRecurso({
      ...recurso,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(recurso);
    let id = recurso.id;
    setLoading(true);
    setOpenModalLoadingActualizar(true);
    actualizarRecurso(id, recurso, cerrarModals);
  };

  return (
    <div className={styles.modal}>
      <div className="text-center text-lg font-bold">
        <h2>Añada Datos del Material</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          type="hidden"
          name="id"
          onChange={guardarCambiosEstadoActualizado}
          value={recurso.id}
        />
        <FormControl className="flex flex-col align-center">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4">
            <FormControl>
              <TextField
                label="Nombre Recurso"
                className="flex-1"
                onChange={guardarCambiosEstadoActualizado}
                name="nombreRecurso"
                required
                type="text"
                value={recurso.nombreRecurso}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Enlace"
                className="flex-1"
                onChange={guardarCambiosEstadoActualizado}
                name="enlace"
                required
                type="url"
                value={recurso.enlace}
              />
            </FormControl>

            <FormControl>
              <InputLabel>Unidad</InputLabel>
              <Select
                onChange={guardarCambiosEstadoActualizado}
                className="flex-1"
                id="departamento"
                defaultValue={recurso.departamento}
                name="departamento"
                required
                value={recurso.departamento}
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
                onChange={guardarCambiosEstadoActualizado}
                className="flex-1"
                id="perfil"
                defaultValue=""
                required
                name="perfil"
                value={recurso.perfil}
              >
                {perfiles.map((dato) => (
                  <MenuItem key={dato.perfil_Id} value={dato.perfil_Id}>
                    {dato.perfil_nombre}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value="" hidden></MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4">
            <FormControl>
              <InputLabel>Area</InputLabel>
              <Select
                onChange={guardarCambiosEstadoActualizado}
                className="flex-1"
                id="area"
                defaultValue=""
                name="area"
                required
                value={recurso.area}
              >
                {areas.map((dato) => (
                  <MenuItem key={dato.value} value={dato.value}>
                    {dato.label}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value="" hidden></MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Marca</InputLabel>
              <Select
                onChange={guardarCambiosEstadoActualizado}
                className="flex-1"
                id="marca"
                name="marca"
                required
                defaultValue=""
                value={recurso.marca}
              >
                {marcas.map((dato) => (
                  <MenuItem key={dato.id} value={dato.id}>
                    {dato.marca}
                  </MenuItem>
                ))}
                <MenuItem key={"none"} value="" hidden></MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <TextField
                className="flex-1"
                label="Fecha"
                name="actualizacion"
                type="date"
                onChange={guardarCambiosEstadoActualizado}
                required
                value={recurso.actualizacion}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Turno</InputLabel>
              <Select
                onChange={guardarCambiosEstadoActualizado}
                className="flex-1"
                id="turno"
                name="turno"
                required
                value={recurso.turno}
              >
                <MenuItem key={1} value={1}>
                  Mañana
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Tarde
                </MenuItem>
                <MenuItem key={"none"} value="" hidden></MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div align="center">
            <button
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              type="submit"
              onClick={cerrarModals}
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            >
              EDITAR
            </button>
          </div>
        </FormControl>
      </form>
      <ModalLoadingActualizar
        open={openModalLoadingActualizar}
        title="Recurso Actualizando..."
      />
    </div>
  );
};

export default ModalActualizar;
