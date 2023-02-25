import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';
import { deletePeticionEliminarSesionIntegracion } from '../../../../dist/ClimaCultura/deletePeticiones';
// import { deleteEliminarDatosIntegracion } from '../../../../dist/ClimaCultura/deletePeticiones';



const useStyles = makeStyles((theme) => ({
    modal1: {
        position: "absolute",
        width: "23rem",
        height: "12rem",
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


const DeleteModal = ({isOpen, close, rowData, actualizarTabla}) => {
    const styles = useStyles();

    const handleEliminarRecurso =(evt)=>{
        evt.preventDefault();
        deletePeticionEliminarSesionIntegracion(Number(rowData.Id)).then(message => {
          actualizarTabla();
          message ? alert("Dato eliminado con exito") : alert("No puedes eliminar una sesion que ya ha iniciado")
      })
          // .then(response => {
          //   actualizarTabla();
          //   console.log(response);
          //   //alert(response?.msg)
          close();
    }

    return (
      <div>
        <Modal open={isOpen} onClose={close}>
          <div className={styles.modal1}>
            <div className="px-2 py-2">
              <h2 className="text-center text-xl font-bold">
                ¿Desea eliminar el recurso seleccionado?
              </h2>
              <div className="flex justify-evenly items-center mt-4">
                <form onSubmit={ handleEliminarRecurso }>
                  <button
                    color="primary"
                    type="submit"
                    className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
                  >
                    ACEPTAR
                  </button>
                </form>
                |
                <button
                  className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
                  onClick={close}
                >
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
}


export default DeleteModal;
