import React, { useEffect, useState } from "react";
import { Modal, TextField, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Select } from "@mui/material";
import { postPeticionAgregarSesionIntegracion } from "../../../../dist/ClimaCultura/postPeticiones";
import { getPeticionSesionesIntegracionArea } from "../../../../dist/ClimaCultura/getPeticiones";
import { handleFormatFechaHora } from "../../../../helpers/fecha";
import { putPeticionActualizarSesionIntegracion } from "../../../../dist/ClimaCultura/putPeticiones";

const useStyles = makeStyles((theme) => ({
  Modal: {
    position: "absolute",
    width: "40rem",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal1: {
    position: 'absolute',
    width: '34rem',
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
    margin: "20px 10px 0px"
  },
  button_cancelar: {
    padding: '5px  12px 5px  12px',
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
  texto: {
    flex: '1 1 0%',
    fontWeight: '600',
    color: '#4B5563',
    fontSize: '1.5rem',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center'
  },
  textfield: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "30rem",
    padding: "5px",

    [theme.breakpoints.between("md")]: {
      width: "100%",
    },
  },
  textfield__time: {
    width: "40%"
  },
  textfield__time__container: {
    display: "flex",
    justifyContent: "space-between"
  },
  input__label: {
    marginTop: "1rem",
  },
  select: {
    height: "2rem",
  },
  selects: {
    margin: theme.spacing(1),
    miniWidth: 200
  }
}));

const UpdateModal = ({ isOpen, close, datosSelects, rowData, actualizarTabla }) => {

  const [inputValues, setInputValues] = useState({
    ses_integra_turno: rowData.Id_turno,
    ses_integra_departamento: rowData.Id_departamento,
    ses_integra_encargado: rowData.Id_encargado,
    ses_integra_tipo: rowData.Id_Tipo,
    ses_integra_area: "",
    title: rowData.title,
    ses_integra_enlace: rowData.Meet,
    start: rowData.start,
    end: rowData.end,
  })

  const [selectValues, setSelectValues] = useState({ ...datosSelects })

  const { ses_integra_tipo,
    ses_integra_encargado,
    ses_integra_departamento,
    ses_integra_area,
    ses_integra_turno,
    title,
    start,
    end,
    ses_integra_enlace } = inputValues;

  const styles = useStyles();

  const handleChange = ({ target }) => {
    if (target.name === "start" || target.name === "end") {
      let dateFormat = handleFormatFechaHora(target.value)
      setInputValues({
        ...inputValues,
        [target.name]: dateFormat
      })
      return
    }

    setInputValues({
      ...inputValues,
      [target.name]: target.value
    })

    if (target.name === "ses_integra_departamento") {
      getPeticionSesionesIntegracionArea(target.value)
        .then(response => setSelectValues({ ...selectValues, ses_integra_area: response }))
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    putPeticionActualizarSesionIntegracion(rowData.Id, inputValues).then(message => {
        actualizarTabla()
        message ? alert("Dato editado con exito") : alert("No puedes editar una sesion que ya ha iniciado")
      })
      // .then(response => {
      //   actualizarTabla()
      //   alert(response?.msg)
      // });
    close()
  }

  useEffect(() => {
    getPeticionSesionesIntegracionArea(rowData.Id_departamento)
      .then(response => {
        setSelectValues({ ...selectValues, ses_integra_area: response })
        setInputValues({ ...inputValues, ses_integra_area: rowData.Id_area })
      })
  }, [])

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={close}
        disableEnforceFocus
      >
        <div className={styles.modal1}>
          {/* <h2 className={styles.texto} >{dateModal}</h2> */}
          <form
            onSubmit={handleSubmit}
          >
            <FormControl className="flex  justify-evenly md:flex-col">
              <TextField
                label="Nombre de Evento" className={styles.textfield}
                onChange={handleChange}
                name="title" required type="text" value={title}
              />
              <TextField
                label="Enlace (Url)" className={styles.textfield}
                onChange={handleChange}
                name="ses_integra_enlace" required type="url" value={ses_integra_enlace}
              />
              <div className={styles.textfield__time__container}>
                <TextField
                  label="Hora Inicio" className={styles.textfield__time}
                  onChange={handleChange}
                  name="start" required type="datetime-local" value={start}
                />
                <TextField
                  label="Hora Final" className={styles.textfield__time}
                  onChange={handleChange}
                  name="end" required type="datetime-local" value={end}
                />
              </div>
              <InputLabel className={styles.input__label}>
                Tipo Reunion
              </InputLabel>
              <Select
                onChange={handleChange}
                id="ses_integra_tipo"
                name="ses_integra_tipo"
                required
                label="Tipo Reunion"
                className={styles.select}
                value={ses_integra_tipo}
              >
                {
                  datosSelects.ses_integra_tipo.map(({ Id, Nombre }) => (
                    <MenuItem key={Id} value={Id}>{Nombre}</MenuItem>
                  ))
                }
              </Select>
              <InputLabel className={styles.input__label}>
                Encargado
              </InputLabel>
              <Select
                onChange={handleChange}
                id="ses_integra_encargado"
                name="ses_integra_encargado"
                required
                label="Encargado"
                className={styles.select}
                value={ses_integra_encargado}
              >
                {
                  datosSelects.ses_integra_encargado.map(({ Id, Encargados }) => (
                    <MenuItem key={Id} value={Id}>{Encargados}</MenuItem>
                  ))
                }
              </Select>
              <InputLabel className={styles.input__label}>
                Departamento
              </InputLabel>
              <Select
                onChange={handleChange}
                id="ses_integra_departamento"
                name="ses_integra_departamento"
                required
                label="Departamento"
                className={styles.select}
                value={ses_integra_departamento}
              >
                {
                  datosSelects.ses_integra_departamento.map(({ Id, Departamento }) => (
                    <MenuItem key={Id} value={Id}>{Departamento}</MenuItem>
                  ))
                }
              </Select>
              <InputLabel className={styles.input__label}>
                Área
              </InputLabel>
              <Select
                onChange={handleChange}
                id="ses_integra_area"
                name="ses_integra_area"
                required
                label="Área"
                className={styles.select}
                value={ses_integra_area}
              >
                {
                  selectValues?.ses_integra_area?.map(({ Id, Area }) => (
                    <MenuItem key={Id} value={Id}>{Area}</MenuItem>
                  ))
                }
              </Select>
              <InputLabel className={styles.input__label}>
                Turno
              </InputLabel>
              <Select
                onChange={handleChange}
                id="ses_integra_turno"
                name="ses_integra_turno"
                required
                label="Turno"
                className={styles.select}
                value={ses_integra_turno}
              >
                {
                  datosSelects.ses_integra_turno.map(({ Id, Turno }) => (
                    <MenuItem key={Id} value={Id}>{Turno}</MenuItem>
                  ))
                }
              </Select>
              <div aling="right">
                <button className={styles.button_cancelar} onClick={close} >CANCELAR</button>
                <button type="submit" className={styles.button_aceptar} >GUARDAR</button>
              </div>
            </FormControl>
          </form>
        </div>

      </Modal>
    </div>
  )
}
export default UpdateModal;
