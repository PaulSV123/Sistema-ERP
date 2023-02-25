// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   TextField,
//   Button,
//   FormControl,
//   makeStyles,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
// } from "@material-ui/core";
// import {
//   getPeticionAreasApi,
//   getPeticionDepartamentoApi,
//   getPeticionMarcasApi,
//   getPeticionPerfilesApi,
// } from "../Integracion/Apis/getPeticonesApis";
// import { putActualizarDatosInduccion } from "../../../dist/ClimaCultura/putPeticiones";

// const useStyles = makeStyles((theme) => ({
//   Modal: {
//     position: "absolute",
//     overflow: "scroll",
//     overflowX: "scroll",
//     backgroundColor: theme.palette.background.paper,
//     [theme.breakpoints.between("xs", "sm")]: {
//       width: "50%",
//       maxHeight: "80%",
//     },

//     //border: '2px solid #000',
//     //borderRadius: "0.3rem",
//     boxshadow: theme.shadows[5],
//     padding: theme.spacing(3, 4, 5),
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//   },
//   iconos: {
//     cursor: "pointer",
//   },
//   inputMaterial: {
//     width: "100px",
//   },
//   inputlarge: {
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     width: "16rem",
//     // [theme.breakpoints.up("lg")]: {
//     //   width: "auto",
//     // },
//     [theme.breakpoints.between("md")]: {
//       width: "100%",
//     },
//   },
//   boton: {
//     display: "center",
//   },
// }));

// const ModalDatosActualizar = ({
//   isOpen,
//   close,
//   datosSelected,
//   data,
//   setData,
//   actualizar,
// }) => {
//   const styles = useStyles();

//   const { departamentos, perfiles, areas, marcas } = datosSelected;
//   const handleChange = (event) => {
//     setData({
//       ...data,
//       [event.target.name]: event.target.value,
//     });
//   };

//   // Enviando los datos para poder actualizarlos
//   const SendData = (event) => {
//     event.preventDefault();
//     console.log(data);
//     putActualizarDatosInduccion(data).then((exito) => {
//       if (exito) {
//         actualizar();
//       } else {
//         console.log("Hay problemas al momento de Actualizar");
//       }
//     });
//     close();
//   };

//   // Creando los modals
//   return (
//     <div>
//       <Modal open={isOpen} onClose={close}>
//         <div className={styles.Modal}>
//           <div className="text-center text-lg font-bold">
//             <h2>Añada Datos del Material</h2>
//           </div>
//           <form onSubmit={SendData}>
//             <TextField
//               type="hidden"
//               name="id"
//               onChange={handleChange}
//               value={data.id && data.id}
//             />
//             <FormControl className="flex flex-col align-center">
//               <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4">
//                 <FormControl>
//                   <TextField
//                     label="Nombre Recurso"
//                     className="flex-1"
//                     onChange={handleChange}
//                     name="nombre"
//                     required
//                     type="text"
//                     value={data.nombre && data.nombre}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <TextField
//                     label="Enlace"
//                     className="flex-1"
//                     onChange={handleChange}
//                     name="enlace"
//                     required
//                     type="url"
//                     value={data.enlace && data.enlace}
//                   />
//                 </FormControl>

//                 <FormControl>
//                   <InputLabel>Unidad</InputLabel>
//                   <Select
//                     onChange={handleChange}
//                     className="flex-1"
//                     id="unidad"
//                     name="unidad"
//                     defaultValue=""
//                     required
//                     value={data.unidad && data.unidad}
//                   >
//                     {departamentos.map((opcion) => (
//                       <MenuItem key={opcion.id} value={opcion.id}>
//                         {opcion.unidad}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <FormControl>
//                   <InputLabel>Perfil</InputLabel>
//                   <Select
//                     onChange={handleChange}
//                     className="flex-1"
//                     id="perfil"
//                     defaultValue=""
//                     required
//                     name="perfil"
//                     value={data && data.perfil}
//                   >
//                     {perfiles.map((dato) => (
//                       <MenuItem key={dato.perfil_Id} value={dato.perfil_Id}>
//                         {dato.perfil_nombre}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </div>
//               <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-3  mb-4">
//                 <FormControl>
//                   <InputLabel>Area</InputLabel>
//                   <Select
//                     onChange={handleChange}
//                     className="flex-1"
//                     id="area"
//                     defaultValue=""
//                     name="area"
//                     required
//                     value={data.area && data.area}
//                   >
//                     {areas.map((dato) => (
//                       <MenuItem key={dato.value} value={dato.value}>
//                         {dato.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <FormControl>
//                   <InputLabel>Marca</InputLabel>
//                   <Select
//                     onChange={handleChange}
//                     className="flex-1"
//                     id="marca"
//                     defaultValue=""
//                     name="Marca"
//                     required
//                     value={data && data.marca}
//                   >
//                     {marcas.map((dato) => (
//                       <MenuItem key={dato.id} value={dato.id}>
//                         {dato.marca}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <FormControl>
//                   <TextField
//                     className="flex-1"
//                     label="Fecha"
//                     name="actualizacion"
//                     type="date"
//                     onChange={handleChange}
//                     required
//                     value={data.actualizacion && data.actualizacion}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <InputLabel>Turno</InputLabel>
//                   <Select
//                     onChange={handleChange}
//                     className="flex-1"
//                     id="turno"
//                     defaultValue=""
//                     name="turno"
//                     required
//                     value={data && data.turno}
//                   >
//                     <MenuItem key={1} value={1}>
//                       Mañana
//                     </MenuItem>
//                     <MenuItem key={2} value={2}>
//                       Tarde
//                     </MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//               <br />
//               <div align="center">
//                 <button
//                   className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
//                   onClick={close}
//                 >
//                   CANCELAR
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
//                 >
//                   EDITAR
//                 </button>
//               </div>
//             </FormControl>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ModalDatosActualizar;
