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

const MyModal = ({ children,openModal ,onCloseModal}) => {
  const styles = useStyles();

  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
    >
      <div className={styles.modal}>{children}</div>
    </Modal>
  );
};

export default MyModal;
