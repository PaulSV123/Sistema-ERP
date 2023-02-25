
import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getPeticionAreasApi, getPeticionPerfilesApi, getPeticionMarcasApi, getPeticionDepartamentoApi } from '../Apis/getPeticonesApis';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Select } from "@mui/material";
import { Label } from "@material-ui/icons";
import { Form } from "antd";
import { putActualizarEstadosDatosIntegracion } from "../../../../dist/ClimaCultura/putPeticiones";
import { Content } from "antd/lib/layout/layout";
import { display } from "@mui/system";


const useStyles = makeStyles((theme) => ({
  Modal: {
    position: "absolute",
    width: "40rem",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    //borderRadius: "0.3rem",
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal1: {
    position: 'absolute',
    width: '60rem',
    height: '35rem',
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }, modalCulmino: {
    position: 'absolute',
    width: '23rem',
    height: '19rem',
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
  ,
  inputlarge: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "16rem",
    // [theme.breakpoints.up("lg")]: {
    //   width: "auto",
    // },
    [theme.breakpoints.between("md")]: {
      width: "100%",
    },
  },
  button_aceptar: {
    padding: '5px  12px 5px  12px',
    left: '20px',
    color: 'black',
    backgroundColor: '#f09208',
    border: '1px solid black',
    borderRadius: '5%',
    padding: "10px",
    margin: "10px"
  },
  button_cancelar: {
    padding: '5px  12px 5px  12px',
    color: 'white',
    backgroundColor: '#383837',
    border: '1px solid black',
    borderRadius: '5%',
    padding: "10px"
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
  texto: {
    flex: '1 1 0%',
    fontWeight: '600',
    color: '#4B5563',
    fontSize: '2rem',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center'
  },
  textfield: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "25rem",
    padding: "10px",

    [theme.breakpoints.between("md")]: {
      width: "100%",
    },

  },
  selects: {
    
    
    width: "25rem",
    padding: "8px",

    [theme.breakpoints.between("md")]: {
      width: "100%",
    },

  
  },
  columns: {
    display: "flex",
    justify: "center",
    justify: "space-around",
    
  },
  btnModal: {
    position:"abasolute",
    top:"0px",
    left:"0px",


  }
}));







const UpdateModal = ({ isOpen, close, data, setData, actualizar, dataArea, dataPerfil, dataMarca, dataUnidad }) => {
  const styles = useStyles();


  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const enviarDatos = (event) => {
    event.preventDefault();
    // putActualizarEstadosDatosIntegracion(data).then((message) =>{
    //   actualizar()
    //   message ? alert("Error al actualizar !!") :alert("Dato actualizado!!")
    // }
    putActualizarEstadosDatosIntegracion(data)
    .then(response => {
      actualizar()
    } 
    
    );
    
    close();
  }


  return (
    <div>
      <Modal
        open={isOpen}
        onClose={close}
        disableEnforceFocus
      >
        <div className={styles.modal1}>
          <div className={styles.texto}>
            <h2> Actualizar Formulario</h2>
          </div>
          <form onSubmit={enviarDatos} className={styles.columns}>
            <div>
              <TextField
                type="hidden"
                name="id"
                onChange={handleChange}
                value={data && data.id}
              />

              <FormControl>
                <TextField
                  label="Nombre Recurso" className={styles.textfield}
                  onChange={handleChange}
                  name="nombre" required type="text"
                  value={data && data.nombre}
                />
                <TextField
                  label="Enlace (Url)" className={styles.textfield}
                  onChange={handleChange}
                  name="enlace" required type="url"
                  value={data && data.enlace}
                />
              </FormControl>

              <FormControl className={styles.selects}>
                <InputLabel>
                  Unidad
                </InputLabel>
                <Select
                  onChange={handleChange}
                  className={styles.selects}
                  id="unidad"
                  name="unidad"
                  required
                  value={data && data.unidad}
                >

                  {dataUnidad.map((dato) => (
                    <MenuItem key={dato.id} value={dato.id}>{dato.unidad}</MenuItem>
                  ))}
                </Select>

              </FormControl>
           
              <FormControl className={styles.selects}>
                <InputLabel>
                  Perfil
                </InputLabel>
                <Select
                  onChange={handleChange}
                  className={styles.selects}
                  id="perfil"
                  required
                  name="perfil"
                  value={data && data.perfil}
                >

                  {dataPerfil.map((dato) => (
                    <MenuItem key={dato.perfil_Id} value={dato.perfil_Id}>{dato.perfil_nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            
              </div>
            <div>
              <FormControl className={styles.selects}>
                <InputLabel>
                  Area
                </InputLabel>
                <Select
                  onChange={handleChange}
                  className={styles.selects}
                  id="area"
                  name="area"
                  required
                  value={data && data.area}
                >

                  {dataArea.map((dato) => (
                    <MenuItem key={dato.value} value={dato.value}>{dato.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={styles.selects}>
                <InputLabel>
                  Marca
                </InputLabel>
                <Select
                  onChange={handleChange}
                  className={styles.selects}
                  id="marca"
                  name="marca"
                  required
                  value={data && data.marca}
                >

                  {dataMarca.map((dato) => (
                    <MenuItem key={dato.id} value={dato.id}>{dato.marca}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br></br>
              <FormControl className={styles.selects}>
                <InputLabel>
                  Turno
                </InputLabel>
                <Select
                  onChange={handleChange}
                  className={styles.selects}
                  id="turno"
                  name="turno"
                  required
                  value={data && data.turno}
                >
                  <MenuItem key={1} value={1}>Mañana</MenuItem>
                  <MenuItem key={2} value={2}>Tarde</MenuItem>

                </Select>
              </FormControl>
           

             <br></br>
              <button className={styles.button_cancelar}
                onClick={close}>CANCELAR</button>
              <button type="submit" className={styles.button_aceptar} >ACTUALIZAR</button>
              </div>

          </form>
        </div>

      </Modal>
    </div>
  )
}
export default UpdateModal;


