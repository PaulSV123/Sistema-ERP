
// import React from 'react';
// import { Modal } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';
// import { deleteEliminarDatosInduccion } from '../../../dist/ClimaCultura/deletePeticiones';


// const useStyles = makeStyles((theme)=>({
//     modal1: {
//         position: "absolute",
//         width: "25rem",
//         height: "12rem",
//         backgroundColor: theme.palette.background.paper,
//         boxshadow: theme.shadows[5],
//         padding: theme.spacing(3,4,5),
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//     },
//     inputlarge:{
//         overflow: "hidden",
//         textOverflow: "ellipsis",
//         width: "12rem",
//         [theme.breakpoints.between("md")]:{
//             width: "100%",
//         },
//     }
// }));

// const ModalDatosEliminar = ({isOpen, close, data, actualizar})=>{
//     const styles = useStyles();

//     const EliminarInduccion =(e)=>{
//         e.preventDefault();
//         console.log("Delete "+ data.id);
//         deleteEliminarDatosInduccion(data.id).then((exito)=>{
//             // if (exito) {
                
//             // }else{
//             //     console.log("Hay problemas al momento de Eliminar...")
//             // }
//             actualizar();
//         });

//         close();
//     }

//     // Creando el modal de los botones de eliminar 
//     return(
//         <div>
//             <Modal
//                 open={isOpen}
//                 onClose={close}
//                 >
//                     <div className={styles.modal1}>
//                         <div className='px-2 py-2'>
//                             <h2 className='text-center text-xl font-bold'>
//                                 ¿Estas seguro de eliminar el siguiente recurso?
//                             </h2>
//                             <div className='flex justify-evenly items-center mt-4'>
//                                 <form onSubmit={EliminarInduccion}>
//                                     <button
//                                         color="primary"
//                                         type='submit'
//                                         className='bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border'>
//                                             ACEPTAR
//                                         </button>
//                                 </form>
//                                 <button
//                                     className='bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border'
//                                     onClick={close}>
//                                         CANCELAR
//                                     </button>
//                             </div>
//                         </div>
//                     </div>
//                 </Modal>
//         </div>

//     )
// }
// export default ModalDatosEliminar;