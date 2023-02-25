import { CircularProgress, makeStyles, Modal } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    modal: {
      position: "absolute",
      width: "25rem",
      backgroundColor: theme.palette.background.paper,
      // }border: '2px solid #000',
      borderRadius: "0.3rem",
      boxshadow: theme.shadows[5],
      padding: theme.spacing(2, 3, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  }));

const ModalDeleteConfirm = ({ msg,openModal,submitDelete ,onCloseModal,loading,confirmBtn = "Eliminar"}) => {
    let styles = useStyles();
  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
    >
      <div className={styles.modal}>
      <div >
      <div className="flex flex-col">
        <div className="py-2">
          <h2 className="text-xl font-medium text-center">{msg}</h2>
        </div>
        <div align="center" className="">
          {
            loading ? 
            <CircularProgress/>:
              <>
              <button
                className={`bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border `}
                onClick={submitDelete}
              >
                {confirmBtn}
              </button>
              <button
                onClick={onCloseModal}
                className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              >
                CANCELAR
              </button>
            </>
          }
        </div>
      </div>
    </div>
      </div>
    </Modal>
  )
}

export default ModalDeleteConfirm