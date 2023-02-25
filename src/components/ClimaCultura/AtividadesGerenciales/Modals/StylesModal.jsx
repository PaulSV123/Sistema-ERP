import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { style } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  createModal: {
      position: "absolute",
      width: "20rem",
      backgroundColor: theme.palette.background.paper,
      border: "",
      //borderRadius: "0.3rem",
      boxshadow: theme.shadows[5],
      padding: theme.spacing(2, 3, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    modalEliminar: {
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
    modalUpdate: {
      position: "absolute",
      width: "20rem",
      backgroundColor: theme.palette.background.paper,
      border: "",
      //borderRadius: "0.3rem",
      boxshadow: theme.shadows[5],
      padding: theme.spacing(2, 3, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    modalCulmino: {
      position: "absolute",
      width: "23rem",
      height: "19rem",
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
      width: "16rem",
      // [theme.breakpoints.up("lg")]: {
      //   width: "auto",
      // },
      [theme.breakpoints.between("md")]: {
        width: "100%",
      },
    },
    button_aceptar: {
      padding: "5px  12px 5px  12px",
      left: "20px",
      color: "black",
      backgroundColor: "#f09208",
      border: "1px solid black",
      borderRadius: "5%",
      padding: "10px",
      margin: "10px",
    },
    button_cancelar: {
      padding: "5px  12px 5px  12px",
      color: "white",
      backgroundColor: "#383837",
      border: "1px solid black",
      borderRadius: "5%",
      padding: "10px",
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
      fontSize: "2rem",
      fontFamily: "Inter, sans-serif",
      textAlign: "center",
    },
    textfield: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      width:  "350px",
      padding: "10px",
  
      [theme.breakpoints.between("md")]: {
        width: "100%",
      },
      /*[theme.breakpoints.up("lg")]: {
           width: "100%",
        },*/
    },
    selects: {
      //  width: '100%',
      //padding: '1px',
      //  marginBottom: '30px'
      margin: theme.spacing(1),
      miniWidth: 200,
    },
  }));

export default useStyles ;