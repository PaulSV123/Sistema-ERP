import { Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import StylesModal from "../Modals/StylesModal"
import { deletePeticionEliminarActividades } from "../../../../dist/ClimaCultura/deletePeticiones";

const DeleteModal = ({ isOpen, close, data, actualizar }) => {
  const styles = StylesModal();

  const eliminarActivides = (e) => {
    // e.preventDefault();
    console.log(data.id);
    deletePeticionEliminarActividades(data.id).then((d)=>{actualizar()
      })
      close();
  };

  return (
    <div>
      <Modal open={isOpen} onClose={close}>
        <div className={styles.modalEliminar}>
          <div className="px-2 py-2">
            <h2 className="text-center text-xl font-bold">
              ¿Desea eliminar la actividad seleccionada?
            </h2>
            <div className="flex justify-evenly items-center mt-4">
              <form onSubmit={eliminarActivides}>
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
};

export default DeleteModal;
