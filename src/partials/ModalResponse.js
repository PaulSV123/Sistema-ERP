import { makeStyles, Modal } from "@material-ui/core";
import React from "react";

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

const ModalResponse = ({response,handleCloseResponse}) => {
    const styles = useStyles();
  return (
    <Modal open={response.modal} onClose={handleCloseResponse} >
      <div className={styles.modal}>
        <div className="flex flex-col place-content-center">
          <div className="py-3 text-center font-medium">{response.msg}</div>
          <button
            onClick={handleCloseResponse}
            className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
            // className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            <img
              src={
                response.status > 300
                  ? "https://img.icons8.com/windows/32/000000/sad.png"
                  : "https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
              }
              style={{ width: "1.5rem", height: "1.5rem" }}
              alt=""
            />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalResponse;
