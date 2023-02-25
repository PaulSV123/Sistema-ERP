import { CircularProgress, Modal } from "@material-ui/core";
import { useEffect } from "react";
import React, { useState } from "react";
import { initialNewRecurso } from "../models/initialNewRecurso";
import { useStyles } from "./ModalStyles";

const initialRecursoEliminar = {
  id:"",
  ...initialNewRecurso
};

const ModalLoadingEliminar = ({open, title}) => {
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

const ModalEliminar = ({ eliminarRecurso, ID, cerrarModals }) => {
  const [openModalLoadingEliminar, setOpenModalLoadingEliminar] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const [recursoId, setRecursoId] = useState(initialRecursoEliminar);

  const styles = useStyles();

  useEffect(()=>{
    setRecursoId({...ID});
  }, []);

  // console.log("ID "+ recursoId);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(recursoId);
    let id = recursoId.id;
    setLoading(true);
    setOpenModalLoadingEliminar(true);
    // // // Metodo para eliminar
    eliminarRecurso(id, recursoId, cerrarModals);
  };

  return (
    <div className={styles.modal1}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Estas seguro de eliminar el siguiente recurso?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          <form onSubmit={handleSubmit}>
            <button
              color="primary"
              type="submit"
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            >
              ACEPTAR
            </button>
          </form>
          <button
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            onClick={cerrarModals}
          >
            CANCELAR
          </button>
        </div>
      </div>
      <ModalLoadingEliminar
        open={openModalLoadingEliminar}
        title="Eliminando Recurso..."
      />
    </div>
  );
};
export default ModalEliminar;
