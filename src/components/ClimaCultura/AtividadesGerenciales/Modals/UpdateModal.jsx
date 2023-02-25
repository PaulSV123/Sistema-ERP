import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, FormControl } from "@material-ui/core";
import StylesModal from "../Modals/StylesModal"
import { putActualizarActivadesGerenciales } from "../../../../dist/ClimaCultura/putPeticiones";


const UpdateModal = ({ isOpen, close, data, setData, actualizar }) => {
const styles = StylesModal();


  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    putActualizarActivadesGerenciales(data).then((d) => {
      actualizar();
    });   
    close();
  };

  return (
    <div>
      <Modal open={isOpen} onClose={close}>
      <div className={styles.modalUpdate}>
        <h3 className="text-center text-lg font-bold">Editar Actividad Gerencial</h3>
        <hr />
        <br />
        <form onSubmit={enviarDatos} className="flex flex-col align-middle ">
        <TextField
              required
              type="hidden"
              name="ID"
              onChange={handleChange}
              value={data&&data.id}
              />
          <div className="flex  justify-evenly md:flex-col">
            <div className="flex flex-col ">
              <FormControl>
            <hr />
                <br />
                <TextField
                  required
                  name="actividad_tarea"
                  label="Actividad/Tarea"
                  style={{ width: "250px" }}
                  type="text"
                  onChange={handleChange}
                  value={data&&data.actividad_tarea}
                  variant="outlined"
                  >
                </TextField>
                <br />
                <TextField
                  Label="Fecha"
                  name="fecha"
                  type="date"
                  style={{ width: "250px" }}
                  onChange={handleChange}
                  value={data&&data.fecha}
                  variant="outlined"
                  required
                />
                <br />
                <TextField
                  className="flex-1"
                  name="enlace"
                  label="Enlace de reunión"
                  onChange={handleChange}
                  value={data&&data.enlace}
                  variant="outlined"
                  type="url"
                />
            
              <hr />
                <br />
            
                <TextField
                  className="flex-1"
                  onChange={handleChange}
                  multiline
                  name="observacion"
                  label="Observaciones"
                  value={data&&data.observacion}
                  variant="outlined"
                />
              </FormControl>
              <hr />
                <br />
            </div>
          </div>
          <br />
          <div align="center">
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
              type="submit"
            >
            ACTUALIZAR
            </button>
            <button
              onClick={close}
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
      </Modal>
    </div>
  );
};
export default UpdateModal;
