import { CircularProgress, makeStyles, Modal } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    appBar: {
      background: "#4b5563",
    },
    tabs: {
      width: "500px",
    },
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    modal: {
      position: "absolute",
      width: "auto",
      backgroundColor: theme.palette.background.paper,
      // }border: '2px solid #000',
      borderRadius: "0.3rem",
      boxshadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 2),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  }));

const ModalInfoPostulante = ({modalInfoPost,onclose}) => {

    const classes = useStyles();

    const bodyModalInfoPost = (
        <div className={classes.modal}>
          <div className="relative">
            <span onClick={onclose} className="absolute top-0 right-0 p-1  text-lg font-semibold cursor-pointer">X</span>
          <h1 className="font-medium text-xl text-center pt-3 mb-3">Datos del Postulante</h1>
          <div className="m-2 ">
            {modalInfoPost.infoPost ? (
              <>
              <table className="w-full">
                <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Nombres y Apellidos:</th>
                  <td className="px-6 py-1" >{modalInfoPost.infoPost.Nombre_Apellido || modalInfoPost.infoPost.Postulante}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Dni:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.DNI || modalInfoPost.infoPost.DNI_Postulante}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Fecha de Nacimiento:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.FechadeNacimiento || modalInfoPost.infoPost.Fecha_Nac}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Celular:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.CELULAR || modalInfoPost.infoPost.Telefono}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Email:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.CORREO || modalInfoPost.infoPost.Email}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Carrera:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.CARRERA || modalInfoPost.infoPost.Carrera}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-1"><b>Ciclo Actual:</b>&nbsp;{modalInfoPost.infoPost.CicloActual || modalInfoPost.infoPost.Ciclo}</td>
                  <td className="px-6 py-1"><b>Experiencia Previa:</b>&nbsp;{modalInfoPost.infoPost.ExperienciaPrevia === 'S'?'Si':'No'}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-1">Turno:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.TURNO || modalInfoPost.infoPost.Turno}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Link CV:</th>
                  <td className="px-6 py-1"><a href={modalInfoPost.infoPost.LinkdeCV || modalInfoPost.infoPost.CV } target='_blank' rel="noreferrer" >{modalInfoPost.infoPost.LinkdeCV || modalInfoPost.infoPost.CV}</a></td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Departamento:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.DEPARTAMENTO || modalInfoPost.infoPost.Unidad}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Area:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.AREA || modalInfoPost.infoPost.Area}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-1">Perfil:</th>
                  <td className="px-6 py-1">{modalInfoPost.infoPost.PERFIL || modalInfoPost.infoPost.Perfil}</td>
                </tr>
                </tbody>
                </table>
              </>
            ) : (
              <CircularProgress />
            )}
          </div>
          </div>
        </div>
      );

  return (
    <Modal
        open={modalInfoPost.open}
        onClose={onclose}
      >
        {bodyModalInfoPost}
      </Modal>
  )
}

export default ModalInfoPostulante