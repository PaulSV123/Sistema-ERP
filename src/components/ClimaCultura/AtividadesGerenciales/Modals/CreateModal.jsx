import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, FormControl } from "@material-ui/core";
import StylesModal from "../Modals/StylesModal"
import { style } from "@mui/system";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Select } from "@mui/material";
import { Label } from "@material-ui/icons";
// import { Form } from "antd";
import { postPeticionAgregarActividades } from "../../../../dist/ClimaCultura/postPeticiones";
// import { margin } from "@mui/system";



const CreateModal = ({ isOpen, close, actualizar,error,data }) => {
const styles = StylesModal();

const [disableButton,setDisableButton] = useState(true) ;

useEffect(() => {

}, []);


  const [datosGuardar,setDatosGuardar] = useState ({
    actividad_tarea: "",
    fecha: "",
    observacion: "",
    enlace_reunion: ""
  });
  

  const handleChange = (event) => {

    setDatosGuardar({
      ...datosGuardar, [event.target.name]: event.target.value,
    });
    console.log (datosGuardar)
  };
  
  const enviarDatos = (event) => {
    event.preventDefault();
    postPeticionAgregarActividades(datosGuardar).then((d) => {
      actualizar();
      setDatosGuardar({
        actividad_tarea: "",
        fecha: "",
        observacion: "",
        enlace_reunion: ""
      });
    });
    
    close();
  };
    
    return (
      <Modal open={isOpen} onClose={close}>
      <div className={styles.createModal}>
      <h3 className="text-center text-lg font-bold">Agregar Actividad Gerencial</h3>
      <hr />
      <br />
      
      <form onSubmit={enviarDatos} className="flex flex-col align-middle ">

  

            <FormControl  className="flex flex-col align-middle ">
              <div className="flex  justify-evenly md:flex-col">
              <div className="flex flex-col ">
            <FormControl>
            <TextField
        
                  name="actividad_tarea"
                  label="Actividad/Tarea"
                  style={{ width: "250px" }}
                  type="text"
                  onChange={handleChange}
                  variant="outlined"
                  required="true"
                  >                 
                  </TextField>

            </FormControl>
                <hr />
                <br />
            <TextField
                  required
                  name="fecha"
                  style={{ width: "250px" }}
                  type="date"
                  onChange={handleChange}
                  variant="outlined"
            ></TextField>

                <hr />
                <br />
            <TextField                      
          
                  name="enlace_reunion"
                  label="Enlace de reunion"
                  style={{ width: "250px" }}
                  type="url"
                  onChange={handleChange}
                  variant="outlined"
          ></TextField>
                <hr />
                <br />
          <TextField                        
    
                  name="observacion"
                  label="Observaciones"
                  style={{ width: "250px" }}
                  type="text"
                  onChange={handleChange}
                  variant="outlined"
                  ></TextField>
    
              <hr />
              <br />

                <div align="center">
                <button
                type="sumit"
                className="bg-naranja  py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
                // disabled={disableButton}
                >
                AGREGAR
                </button>

            <button
              onClick={close}
              className="bg-gray-700 text-gray-50  py-2 px-3 mx-2 hover:bg-naranja border"
            >
              CANCELAR
            </button>
                </div>
              </div>
              </div>
            </FormControl>
          </form>
          </div>
          </Modal>
    );
  };
  export default CreateModal;
