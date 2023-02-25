import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";
import { getPeticionListarPostulantes } from "../../dist/getPeticiones";
import { UserContext } from "../context/UserContext";
import Spinner from "../Spinner/Spinner";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ModalDatosPostulante from "./ModalDatosPostulante";
import { getPeticionListarReclutadores } from "../../dist/Capacitacion/getPeticiones";
import ModalResponse from "../../partials/ModalResponse";
import { putActualizarEstadosPostulante } from "../../dist/putPeticiones";
import DeleteIcon from '@material-ui/icons/Delete';
import { Tooltip } from "antd";
import MyModal from "../../partials/MyModal";
import { deletePeticionPostulantes } from "../../dist/deletePeticiones";
import { CircularProgress } from "@mui/material";
import ModalDeleteConfirm from "../../partials/ModalDeleteConfirm";

const filtroEstado = {
  A: "Aceptado",
  R: "Rechazado",
  E: "En espera",
};
const filtroExperiencia = {
  S: "Si",
  N: "No",
};
const filtroTurno = {
  Mañana: "Mañana",
  "Mañana y tarde": "Mañana y tarde",
  Tarde: "Tarde",
};

const initialResponse = {
  status: null,
  msg: "No puedes agregar un usuario con las mismas credenciales!",
  modal: false,
};

const TablaPostulantes = () => {
  const { permisosUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState([]);
  const [reclutadores,setReclutadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVerEditarDatosPost, setModalVerEditarDatosPost] = useState(false);
  const [response,setResponse]=useState(initialResponse);
  const [deletePost,setDeletePost] = useState({post:null,open:false});

  useEffect(() => {
    getPeticionListarPostulantes(setData);
    //setRPActive(true);
    getPeticionListarReclutadores(setReclutadores);
  }, []);

  useEffect(() => {
    if (response.status !== null) {
      setLoading(false);
      getPeticionListarPostulantes(setData);
    }
  }, [response]);


  const handleOpenModalVerEditarDatosPost = (rowData)=>{
    setDataToEdit(rowData);
    setModalVerEditarDatosPost(true);
  }

  const handleOpenModalForRegisterPost = ()=>{
    setDataToEdit(null);
    setModalVerEditarDatosPost(true);
  }
  const handleSubmitDeletePost = ()=>{
    if(deletePost.post !== null){
      setLoading(true)
      //console.log(deletePost.post);
      deletePeticionPostulantes(deletePost.post.NUMERO,setResponse,setDeletePost);
    }
  }

  /* const bodyModalDeletePost = (
    <div >
      <div className="flex flex-col">
        <div className="py-2">
          <h2 className="text-xl font-medium text-center">¿Realmente desea eliminar este Postulante? {deletePost.Nombres}</h2>
        </div>
        <div align="center" className="">
          {
            loading ? 
            <CircularProgress/>:
              <>
              <button
                className={`bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border `}
                onClick={handleSubmitDeletePost}
              >
                Eliminar
              </button>
              <button
                onClick={()=>setDeletePost({post:null,open:false})}
                className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              >
                CANCELAR
              </button>
            </>
          }
            
        </div>
      </div>
    </div>
  ); */

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold text-center text-black ">
          Lista de postulantes
        </h3>
      </div>
      <br />
      {permisosUser.includes("reclutamiento_listapostulantes_agregar") && (
        <button
          className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black"
          onClick={handleOpenModalForRegisterPost}
        >
          AGREGAR
        </button>
      )}

      <MaterialTable
        columns={[
          {
            title: "",
            render: (rowData) => {
              const actions = (
                <div className="flex">
                <Tooltip title="Eliminar Postulante">
                <IconButton
                  color="inherit"
                  onClick={()=>setDeletePost({post:rowData,open:true})}
                >
                  <DeleteIcon />
                </IconButton>
                </Tooltip>
                <IconButton
                  color="inherit"
                  onClick={()=>handleOpenModalVerEditarDatosPost(rowData)}
                >
                  <VisibilityIcon />
                </IconButton>
                </div>
                
              );
              return actions;
            },
          },
          //{ title: "NÚMERO", field: "NUMERO", hidden: true, filtering: false,editable:false },
          {
            title: "FECHA DE REGISTRO",
            field: "FechadeRegistro",
            filtering: false,
            editable:false
          },
          {
            title: "PLATAFORMA",
            field: "PLATAFORMA",
            editable:false
            //lookup: plataformasFiltro,
          },
          {
            title: "NOMBRES ",
            field: "Nombres",
            cellStyle: { whiteSpace: "nowrap", filtering: false },
            filtering: false,
            editable:false
          },
          {
            title: "APELLIDOS",
            field: "Apellidos",
            cellStyle: { whiteSpace: "nowrap", filtering: false },
            filtering: false,
            editable:false
          },

          { title: "DNI", field: "DNI",editable:false, filtering: false },
          {
            title: "DEPARTAMENTO",
            field: "DEPARTAMENTO",
            editable:false,/* lookup: unidad  */
          },
          { title: "ÁREA", field: "AREA",editable:false /*  lookup: areas */ },
          { title: "PERFIL", field: "PERFIL",editable:false /* lookup: perfilesTabla */ },
          { title: "TURNO", field: "TURNO", lookup: filtroTurno,editable:false },
          {
            title: "EXPERIENCIA PREVIA",
            field: "ExperienciaPrevia",
            lookup: filtroExperiencia,
            editable:false
          },
          /* { title: "LINK DE CV", field: "LinkdeCV", filtering: false },
          { title: "CICLO ACTUAL", field: "CicloActual", filtering: false }, */
          {
            title: "ESTADO LLAMADA",
            field: "Estado_Llamada",
            lookup: filtroEstado,
          },
          {
            title: "ESTADO ENTREVISTA",
            field: "Estado_Entrevista",
            lookup: filtroEstado,
          },
          { 
            title: "ENCARGADO", 
            field: "Encargado_Llamada",
           filtering: false ,
           render: rowData => (
             rowData.Encargado_Llamada != null ? rowData.Encargado:'-'
           ),
           editComponent: props => (
            <FormControl className="w-full">
            <InputLabel >Encargado</InputLabel>
            <Select
              fullWidth
              className="flex-1"
              //onChange={handleChange}
              //disabled={disabledEdit}
              //value=''
              value={props.value?props.value:''}
              onChange={e => props.onChange(e.target.value)}
              name="id_encargado"
              defaultMenuIsOpen={false}
              isSearchable={false}
            >
              {
                reclutadores.map(option=>(
                  <MenuItem key={option.Emp_Id} value={option.Emp_Id}>{option.Reclutador}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
           )
          },
        ]}
        data={data}
        /* actions={[
          permisosUser.includes("reclutamiento_listapostulantes_eliminar") && {
            icon: "delete",
            tooltip: "Eliminar postulante",
            onClick: (event, rowData) => () => {},
            //seleccionarPostulante(rowData, "ELIMINAR"),
            // onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
        ]} */
        editable={{
          isEditHidden: rowData => rowData.Estado_Entrevista === 'A',
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              let formEstados = {
                _Id:oldData.NUMERO,
                _Result_Entrevista:newData.Estado_Llamada,
                _Estado_Entrevista:newData.Estado_Entrevista,
                _Post_Encargado_Llamada:newData.Encargado_Llamada
              }
              putActualizarEstadosPostulante(formEstados,setResponse,resolve,reject);
            }),
        }}
        options={{
          filtering: true,
          headerStyle: {
            backgroundColor: "#E2E2E2  ",
          },
          /* rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }), */
          actionsColumnIndex: -1,
          searchFieldAlignment: "left",
          showTitle: false,
          exportButton: {
            csv: true,
            pdf: false,
          },
          exportFileName: "Tabla de Lista de postulantes",
          // actionsColumnIndex: -1,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "No hay Datos",
            addTooltip: "Agregar",
            deleteTooltip: "Eliminar",
            editTooltip: "Editar",
            filterRow: {
              filterTooltip: "Filtrar",
            },
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "filas",
            labelRowsPerPage: "filas por pagina:",
            firstAriaLabel: "Primera pagina",
            firstTooltip: "Primera pagina",
            previousAriaLabel: "Pagina anterior",
            previousTooltip: "Pagina anterior",
            nextAriaLabel: "Pagina siguiente",
            nextTooltip: "Pagina siguiente",
            lastAriaLabel: "Ultima pagina",
            lastTooltip: "Ultima pagina",
          },
          toolbar: {
            nRowsSelected: "{0} ligne(s) sélectionée(s)",
            showColumnsTitle: "Ver columnas",
            showColumnsAriaLabel: "Ver columnas",
            exportTitle: "Exportar",
            exportAriaLabel: "Exportar",
            exportCSVName: "Exportar en formato CSV",
            exportPDFName: "Exportar como PDF",
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar",
          },
          header: {
            actions: "ACCIONES",
          },
        }}
      />
      {/* <MyModal
        openModal={deletePost.open}
        onCloseModal={()=>setDeletePost({post:null,open:false})}
      >
        {bodyModalDeletePost}
      </MyModal> */}
      <ModalDeleteConfirm
        msg={`¿Realmente desea eliminar este Postulante? ${deletePost.post && deletePost.post.Nombres}`}
        openModal={deletePost.open}
        onCloseModal={()=>setDeletePost({post:null,open:false})}
        submitDelete={handleSubmitDeletePost}
        loading={loading}
      />
      <ModalResponse
        //msg={`No puedes agregar un usuario con las mismas credenciales!`}
        response={response}
        handleCloseResponse={()=>setResponse(initialResponse)}
      />
      <ModalDatosPostulante
        modalVerEditarDatosPost={modalVerEditarDatosPost}
        setModalVerEditarDatosPost={setModalVerEditarDatosPost}
        data={dataToEdit}
        setResponse ={setResponse}
      />
    </div>
  );
};

export default TablaPostulantes;
