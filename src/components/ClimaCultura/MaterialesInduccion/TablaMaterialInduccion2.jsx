// import React, { useContext, useEffect, useState } from "react";
// import MaterialTable from "material-table";
// import {
//   getPeticionesPerfilApi,
//   getPeticionRecursosInduccion,
// } from "../../../dist/ClimaCultura/getPeticiones";
// import {
//   Modal,
//   TextField,
//   Button,
//   FormControl,
//   Select,
//   InputLabel,
//   MenuItem,
//   FormHelperText,
//   Tooltip,
//   IconButton,
//   TablePagination,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { style } from "@mui/system";
// import { postPeticionAgregarRecurso } from "../../../dist/ClimaCultura/postPeticiones";
// import axios from "axios";
// import { Option } from "antd/lib/mentions";
// import {
//   getPeticionAreasId,
//   getPeticionDepartamentoId,
//   getPeticionPerfiles,
// } from "../../../dist/getPeticiones";
// import { UserContext } from "../../context/UserContext";
// import { Title } from "chart.js";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import {
//   FlashAutoTwoTone,
//   SettingsBackupRestoreTwoTone,
//   Visibility,
// } from "@material-ui/icons";
// import ModalDatosInduccion from "./ModalDatosInduccion.jsx";
// import ModalDatosActualizar from "./ModalDatosActualizar.jsx";
// import ModalDatosEliminar from "./ModalDatosEliminar.jsx";
// import images from "../../../images/google_meet.png";
// import Spinner from "../../Spinner/Spinner";
// import { getPeticionAreasApi, getPeticionDepartamentoApi, getPeticionMarcasApi, getPeticionPerfilesApi } from "../Integracion/Apis/getPeticonesApis";

// // Creando los filtros para Turno
// const columnas = [
//   { title: "Nombre del Recurso", field: "NombredeRecurso" },
//   { title: "Departamento", field: "Departamento" },
//   {
//     title: "Area",
//     field: "Area",
//   },
//   {
//     title: "Perfil",
//     field: "Perfil",
//   },
//   {
//     title: "Fecha",
//     field: "Actualizacion",
//   },
//   {
//     title: "Marca",
//     field: "Marca",
//   },
//   {
//     title: "Turno",
//     field: "Turno",
//   },
// ];

// // trayendo arreglos de tabla
// const useDataSelected = () => {
//   const [departamentos, setDepartamentos] = useState([]);
//   const [marcas, setMarcas] = useState([]);
//   const [perfiles, setPerfiles] = useState([]);
//   const [areas, setAreas] = useState([]);

//   useEffect(() => {
//     getPeticionMarcasApi().then((datos) => {
//       setMarcas(datos);
//     });
//     getPeticionPerfilesApi().then((datos) => {
//       setPerfiles(datos);
//     });
//     getPeticionDepartamentoApi().then((datos) => {
//       setDepartamentos(datos);
//     });
//     getPeticionAreasApi().then((datos) => {
//       setAreas(datos);
//     });
//   }, []);
//   return [departamentos, marcas, perfiles, areas];
// };

// const TablaMaterialInduccion = () => {
//   // Creando los datos y permisos
//   const [data, setData] = useState([]);

//   const [departamentos, marcas, perfiles, areas] = useDataSelected();

//   const datosSelected = { departamentos, marcas, perfiles, areas };


//   useEffect(() => {
//     getPeticionRecursosInduccion().then((d) => {
//       setData(d);
//     });
//     console.log(data);
//   }, []);

//   // creando la funcion para actualizar
//   const actualizarTabla = () => {
//     setData([]);
//     getPeticionRecursosInduccion().then((d) => {
//       setData(d);
//     });
//   };

//   const [modal, setModal] = useState(false);
//   const [abrirCerrarEliminar, setAbrirCerrarEliminar] = useState(false);
//   const [actualizarModal, setActualizarModal] = useState(false);
//   const [actualizarData, setActualizarData] = useState({
//     id: 0,
//     enlace: "",
//     area: "",
//     departamento: "",
//     marca: "",
//     perfil: 0,
//     turno: "",
//     nombre: "",
//     actualizacion: "",
//   });

//   const stateModal = () => {
//     setModal(!modal);
//   };

//   const stateActualizarModal = () => {
//     setActualizarModal(!actualizarModal);
//   };

//   const stateModalEliminar = () => {
//     setAbrirCerrarEliminar(!abrirCerrarEliminar);
//   };

//   const ActualizarModal = (rowData) => {
//     setActualizarData({
//       id: rowData.Idrecurso,
//       enlace: rowData.Enlace,
//       nombre: rowData.NombredeRecurso,
//       area: rowData.Idarea,
//       marca: rowData.Idmarca,
//       perfil: rowData.Idperfil,
//       turno: rowData.IdTurno,
//       unidad: rowData.Idunidad,
//       actualizacion: rowData.Actualizacion,
//     });
//     stateActualizarModal();
//   };

//   // Creando la constante para eliminar
//   const [idRecursoDelete, setIdRecursoDelete] = useState({ id: "" });
//   const selectRecursoToDelete = (idRecurso) => {
//     console.log("id: " + idRecurso);
//     setIdRecursoDelete({ id: idRecurso });
//     stateModalEliminar();
//   };

//   return (
//     <div className="container mx-auto">
//       <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
//         Material de Inducción
//       </h3>
//       {
//         <button
//           className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black"
//           onClick={() => stateModal()}
//         >
//           AGREGAR
//         </button>
//       }
//       <MaterialTable
//         //rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]}
//         title={""}
//         columns={columnas}
//         data={data}
//         actions={[
//           {
//             icon: "edit",
//             tooltip: "Editar",
//             onClick: (event, rowData) => ActualizarModal(rowData),
//           },
//           {
//             icon: "delete",
//             tooltip: "Eliminar",
//             onClick: (event, rowData) =>
//               selectRecursoToDelete(rowData.Idrecurso),
//           },
//         ]}
//         options={{
//           filtering: true,
//           headerStyle: {
//             backgroundColor: "#E2E2E2",
//           },
//           actionsColumnIndex: -1,
//           searchFieldAlignment: "left",
//           showTitle: false,
//           exportButton: {
//             csv: true,
//             pdf: true,
//           },
//         }}
//         localization={{
//           body: {
//             emptyDataSourceMessage: "Loading",
//             filterRow: {
//               filterTooltip: "Filtrar",
//             },
//           },
//           pagination: {
//             labelDisplayedRows: "{from}-{to} de {count}",
//             labelRowsSelect: "filas",
//             labelRowsPerPage: "filas por pagina:",
//             firstAriaLabel: "Primera pagina",
//             firstTooltip: "Primera pagina",
//             previousAriaLabel: "Pagina anterior",
//             previousTooltip: "Pagina anterior",
//             nextAriaLabel: "Pagina siguiente",
//             nextTooltip: "Pagina siguiente",
//             lastAriaLabel: "Ultima pagina",
//             lastTooltip: "Ultima pagina",
//           },
//           toolbar: {
//             nRowsSelected: "{0} row(s) selected(s)",
//             showColumnsTitle: "Ver columnas",
//             showColumnsAriaLabel: "Ver columnas",
//             exportTitle: "Exportar",
//             exportAriaLabel: "Exportar",
//             exportCSVName: "Exportar en formato CSV",
//             exportPDFName: "Exportar como PDF",
//             searchTooltip: "Buscar",
//             searchPlaceholder: "Buscar",
//           },
//           header: {
//             actions: "Acciones",
//           },
//         }}
//       />

//       <ModalDatosInduccion
//         isOpen={modal}
//         close={stateModal}
//         actualizar={actualizarTabla}
//         datosSelected={datosSelected}
//       />

//       <ModalDatosActualizar
//         isOpen={actualizarModal}
//         close={stateActualizarModal}
//         data={actualizarData}
//         datosSelected = {datosSelected}
//         setData={setActualizarData}
//         actualizar={actualizarTabla}
//       />

//       <ModalDatosEliminar
//         isOpen={abrirCerrarEliminar}
//         close={stateModalEliminar}
//         data={idRecursoDelete}
//         actualizar={actualizarTabla}
//       />
//     </div>
//   );
// };

// export default TablaMaterialInduccion;
