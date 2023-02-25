// import {
//     FormControl,
//     FormHelperText,
//     IconButton,
//     InputLabel,
//     makeStyles,
//     MenuItem,
//     CircularProgress, 
//     Modal,
//     Select, 
//     TextField
// } from '@material-ui/core';
// import React, { useEffect, useState } from 'react';
// import EditIcon from "@material-ui/icons/Edit";
// import CheckIcon from "@material-ui/icons/Check";
// import ClearIcon from "@material-ui/icons/Clear";
// import { postPeticionAgregarRecurso } from '../../../dist/ClimaCultura/postPeticiones';
// import { positions } from '@mui/system';
// import useForm from '../../../hooks/useForm';
// import { getPeticionAreasApi, getPeticionDepartamentoApi, getPeticionMarcasApi, getPeticionPerfilesApi } from '../Integracion/Apis/getPeticonesApis';


// const useStyles = makeStyles((theme)=>({
//     modal: {
//         position: "absolute",
//         overflow: "scroll",
//         overflowX: "scroll",
//         [theme.breakpoints.between("xs","sm")]:{
//             width: "50%",
//             maxHeight: "80%",
//         },
//         [theme.breakpoints.up("md")]: {
//             widht: "50%",
//             maxHeight: "80%",
//         },
//         backgroundColor: theme.palette.background.paper,
//         boxShadow: theme.shadows[5], 
//         padding: theme.spacing(3,4,5),
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//     },
//     modal1: {
//         position: "absolute",
//         width: "23rem",
//         height: "10rem",
//         backgroundColor: theme.palette.background.paper,
//         boxshadow: theme.shadows[5],
//         padding: theme.spacing(3, 4, 5),
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//       },
//       inputlarge: {
//         overflow: "hidden",
//         textOverflow: "ellipsis",
//         width: "12rem",
//         // [theme.breakpoints.up("lg")]: {
//         //   width: "auto",
//         // },
//         [theme.breakpoints.between("md")]: {
//           width: "100%",
//         },
//       },
//       button_aceptar: {
//         padding: "10px  12px 10px  12px",
//         width: "100%",
//         color: "black",
//         backgroundColor: "#f09208",
//         border: "1px solid black",
//         borderRadius: "5%",
//       },
//       button_cancelar: {
//         padding: "5px  12px 5px  12px",
//         width: "100%",
//         color: "white",
//         backgroundColor: "#383837",
//         border: "1px solid black",
//         borderRadius: "5%",
//       },
//       error: {
//         backgroundColor: "red",
//         padding: "3px  4px 3px  4px",
//         color: "white",
//         textAlign: "center",
//         borderRadius: "5px",
//         marginBottom: "0.5rem",
//         fontSize: "1rem",
//       },
//       texto: {
//         flex: '1 1 0%',
//         fontWeight: '600',
//         color: '#4B5563',
//         fontSize: '2rem',
//         fontFamily: 'Inter, sans-serif',
//         textAlign: 'center'
//       },
// }));



// const ModalDatosInduccion = ({datosSelected, isOpen,close,actualizar})=>{

//     const styles = useStyles();

//     const { departamentos, perfiles, areas, marcas } = datosSelected;

//     const [dataGuardar, setDataGuardar] = useState({
//         unidad: '',
//         area: '',
//         perfil: 0,
//         turno: '',
//         actualizacion: '',
//         // recursos
//         marca: '',
//         enlace:'',
//         nombre:'',
//     })


//     // metodo para saber si se guardan los datos
//     const handleChange = (event) =>{
//         console.log("funciona")
//         setDataGuardar({
//             ...dataGuardar,
//             [event.target.name]: event.target.value
//         });
//     }

//     // metodo para enviar los datos
//     const EnviarDatos = (event)=>{
//         event.preventDefault();
//         postPeticionAgregarRecurso(dataGuardar).then((exito)=>{
//             if (exito) {
//                 actualizar();   
//             }else{
//                 console.log("Error al momento de insertar datos")
//             }
//         });
//         close();
//     }

//     return(
//         <div>
//         <Modal open={isOpen} onClose={close}>
//             <div className={styles.modal}>
//                     <div className='text-center text-lg font-bold'>
//                         <h2>Nuevo Recurso</h2>
//                     </div>
//                     <form onSubmit={EnviarDatos}>
//                     <FormControl className='flex flex-col align-center'>
//                     <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4'>
//                         <FormControl>
//                             <TextField
//                             className='flex-1'
//                             label="Nombre del Recurso" 
//                             onChange={handleChange}
//                             name="nombre"
//                             required
//                             type="text" />
//                             </FormControl>
//                             <FormControl>
//                             <TextField
//                             className='flex-1'
//                             label="Enlace" 
//                             onChange={handleChange}
//                             name="enlace"
//                             required
//                             type="url"/>
                        
//                         </FormControl>
//                         <FormControl>
//                             <InputLabel>
//                             Departamento</InputLabel>
//                             <Select
//                             onChange={handleChange}
//                             className="flex-1"
//                             id="unidad"
//                             defaultValue=""
//                             name="unidad"
//                             required
//                             label="unidad">
//                                 {departamentos.map((opcion)=>(
//                                     <MenuItem key={opcion.id} value={opcion.id}>
//                                         {opcion.unidad}
//                                     </MenuItem>
//                                 ))}
//                                 <MenuItem key={"none"} value="" hidden></MenuItem>
//                             </Select>
                            
//                         </FormControl>

//                         <FormControl>
//                             <InputLabel>
//                                     Perfil
//                             </InputLabel>
//                             <Select
//                             onChange={handleChange}
//                             className="flex-1"
//                             id='perfil'
//                             defaultValue=""
//                             required
//                             name='perfil'>
//                                 {perfiles.map((opcion)=>(
//                                     <MenuItem key={opcion.perfil_Id} value={opcion.perfil_Id}>
//                                         {opcion.perfil_nombre}
//                                     </MenuItem>
//                                 ))}
//                                 <MenuItem key={"none"} value="" hidden></MenuItem>
//                             </Select>
//                         </FormControl>
//                         </div>
//                         <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4'>
//                         <FormControl>
//                             <InputLabel>Área</InputLabel>
//                             <Select
//                             onChange={handleChange}
//                             className="flex-1"
//                             id='area'
//                             defaultValue=""
//                             name='area'
//                             required>
//                                 {areas.map((opcion)=>(
//                                     <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
//                                 ))}
//                                 <MenuItem key={"none"} value="" hidden></MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl>
//                             <InputLabel>Marca</InputLabel>
//                             <Select
//                             onChange={handleChange}
//                             className="flex-1"
//                             id="marca"
//                             defaultValue=""
//                             name="marca"
//                             required>
//                                 {marcas.map((opcion)=>(
//                                     <MenuItem key={opcion.id} value={opcion.id}>{opcion.marca}</MenuItem>
//                                 ))}
//                                 <MenuItem key={"none"} value="" hidden></MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl>
//                             <InputLabel>Turno</InputLabel>
//                         <Select
//                         onChange={handleChange}
//                         className="flex-1"
//                         id="turno"
//                         defaultValue=""
//                         name="turno"
//                         required>
//                             <MenuItem key={1} value={1}>Mañana</MenuItem>
//                             <MenuItem key={2} value={2}>Tarde</MenuItem>
//                         </Select>
//                         </FormControl>
//                     <FormControl>
//                         <TextField
//                         label="Fecha"
//                         className='flex-1'
//                         onChange={handleChange}
//                         name="actualizacion"
//                         required
//                         type="date" />
//                     </FormControl>
//                     </div>
//                     <div align="center">
//                         <button
//                         onClick={close}
//                         className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
//                         >CANCELAR</button>

//                         <button
//                         className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
//                         type='submit'>
//                             AGREGAR
//                         </button>
//                     </div>
//                     </FormControl>
//                     </form>
//             </div>
//         </Modal>
//         </div>
//     );
// };
// export default ModalDatosInduccion;
