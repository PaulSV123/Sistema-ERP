import React, { useContext, useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getPeticionAreas,
  // getPeticionDepartamento,
  getPeticionListarRecursos,
  getPeticionDepartamentoId,
  getPeticionMarcas,
  getPeticionPerfiles,
  getPeticionAreasFiltro,
  getPeticionPerfilesFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionAreasId,
  getPeticionMarcasTodas,
  getPeticionDepartamentoXMarca,
  getPeticionAreasXDepart,
  getPeticionPerfilesXArea, //filtros
} from "../../dist/getPeticiones";
import { deletePeticionRecursos } from "../../dist/deletePeticiones";
import { postPeticionAgregarRecurso } from "../../dist/postPeticiones";
import { putPeticionActualizarRecurso } from "../../dist/putPeticiones";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../context/UserContext";
import ModalResponse from "../../partials/ModalResponse";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    borderRadius: "0.3rem",
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  button_aceptar: {
    padding: "5px  12px 5px  12px",
    width: "100%",
    color: "black",
    backgroundColor: "#f09208",
    border: "1px solid black",
    borderRadius: "5%",
  },
  button_cancelar: {
    padding: "5px  12px 5px  12px",
    width: "100%",
    color: "white",
    backgroundColor: "#383837",
    border: "1px solid black",
    borderRadius: "5%",
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
}));

const initialCompetencia = 
{
    Id_Perfil: '',
    Id_Area: '',
    Id_Unidad: '',
    rec_enlace: "",
    Id_Marca: '',
    rec_nombre : "ManualCompetencias",

    AREA: "",
    DEPARTAMENTO: "",
    ENCARGADO: null,
    "FECHA DE ACTUALIZACION": "",
    ID: "",
    "ID RECURSO NOMBRE": "",
    "LINK DEL RECURSO": "",
    MARCA: "",
    "NOMBRE RECURSO": "",
    PERFIL: "",
}
const initialResponse = {
  status: null,
  msg: "",
  modal: false,
};

const TablaCompetencias = () => {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);
  const [caso, setCaso] = useState("");

  const [modalFormComp, setModalFormComp] = useState(false);
  const [formCrearEditar,setFormCrearEditar] = useState('CREAR');
  const [modalEliminar, setModalEliminar] = useState(false);
  const [perfiles, setPerfiles] = useState([]);

  const [departamentos, setDepartamentos] = useState([]);
  // console.log(unidades);
  //const [areasId, setAreasId] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [perfilesFiltro, setPerfilesFiltro] = useState([]);
  const [areasFiltro, setAreasFiltro] = useState([]);
  const [unidadFiltro, setUnidadFiltro] = useState([]);
  const [competencia, setCompetencia] = useState(
    initialCompetencia
  );
  const [response,setResponse] = useState(initialResponse);

  useEffect(() => {
    const data = {
      recurso_nombre: 1,
    };
    getPeticionListarRecursos(setData, data);
  }, [response.status]);

  useEffect(() => {
    //getPeticionAreasId(setAreasId, setLoading);  
    getPeticionMarcasTodas(setMarcas);
    getPeticionPerfilesFiltro(setPerfilesFiltro);//
    getPeticionAreasFiltro(setAreasFiltro);//
    getPeticionDepartamentoFiltro(setUnidadFiltro);//
  }, []);
  
  /* const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  }; */

  const abrirCerrarModalFormComp =(caso = '')=>{
    if(caso !== ''){
      if(caso === 'CREAR'){
        setDepartamentos([]);setAreas([]);setPerfiles([]);
        setCompetencia(initialCompetencia);
      }
      setFormCrearEditar(caso); 
    }
    setModalFormComp(!modalFormComp);
  }

  // Funcion para acceder al modal Eliminar
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setCompetencia(initialCompetencia);
    }
  };

  // console.log(competencia);
  // Funcion que almacena los cambios en el state de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "Id_Marca" ){
      competencia.Id_Unidad = '';competencia.Id_Perfil='';competencia.Id_Area='';
      getPeticionDepartamentoXMarca(value,setDepartamentos);
      setAreas([]);setPerfiles([]);
    }
    if(name === "Id_Unidad"){
      competencia.Id_Perfil='';competencia.Id_Area='';
      setAreas([]);setPerfiles([]);
      getPeticionAreasXDepart(value,setAreas);
    }
    if(name === "Id_Area"){
      competencia.Id_Perfil='';
      getPeticionPerfilesXArea(value,setPerfiles);
    }
    setCompetencia({
      ...competencia,
      [name]: value,
    });
  };

  // Submit para el modal Editar
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const compActualizado = {
      rec_nombre_id: Number(competencia["ID RECURSO NOMBRE"]),
      rec_nombre: competencia["NOMBRE RECURSO"],
      //
      rec_id: Number(competencia["ID"]),
      rec_enlace: competencia.rec_enlace,
      rec_perfil_id_pk: competencia.Id_Perfil,
      rec_area_id_pk:  competencia.Id_Area,
      rec_marca_id_pk:  competencia.Id_Marca,
      rec_unidad_id_pk: competencia.Id_Unidad,
    };
    putPeticionActualizarRecurso(compActualizado, setResponse,abrirCerrarModalFormComp);
    setCaso("Editar");
  };

  // Submit para el modal Agregar
  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    //console.log(competencia)

    let newForm = {
      rec_nombre:competencia.rec_nombre,
      rec_enlace:competencia.rec_enlace,
      perfil_id:competencia.Id_Perfil,
      area_id:competencia.Id_Area,
      marca_id:competencia.Id_Marca,
      unidad_id:competencia.Id_Unidad,
    }
    
    postPeticionAgregarRecurso(newForm, setResponse,abrirCerrarModalFormComp);
    setCaso("Agregar");
  };

  // Submit para el modal Eliminar
  const handleSubmitEliminar = () => {
    //console.log(competencia)
    deletePeticionRecursos(competencia,setResponse,abrirCerrarModalEliminar);
    setCaso("Eliminar");
  };

  const bodyModalFormComp = (
    <div className={styles.modal}>
      {/* {console.log(perfilNuevo)} */}
      <h3 className="text-center text-lg font-bold">{formCrearEditar === 'CREAR' ? 'Agregar Manual Competencia' : 'Editar Manual Competencia'}</h3>
      <hr />
      <br />
      <form
        onSubmit={formCrearEditar === 'CREAR' ? handleSubmitAgregar : handleSubmitEdit}
        className="flex flex-col align-middle"
      >
       <FormControl fullWidth className="mb-3">
          <InputLabel id="Marca" required>
            Marca
          </InputLabel>
          <Select
            required
            labelId="Marca"
            id="Marca"
            value={competencia.Id_Marca}
            label="Marca"
            name="Id_Marca"
            onChange={handleChange}
          >
            {marcas.map((option, i) => {
              return (
                <MenuItem key={i + 1} value={option.mEmp_id}>
                {option.mEmp_nombre}
              </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Departamento" required>
            Departamento
          </InputLabel>
          <Select
            required
            labelId="Departamento"
            id="Departamento"
            value={competencia.Id_Unidad}
            label="Departamento"
            name="Id_Unidad"
            onChange={handleChange}
          >
            {departamentos.map((option, i) => {
              return (
                <MenuItem key={i} value={option.Unidad_Id}>
                  {option.Unidad_Nombre}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Area">
            Area
          </InputLabel>
          <Select
            labelId="Area"
            className="flex-1"
            onChange={handleChange}
            value={competencia.Id_Area}
            id="Area"
            name="Id_Area"
            label="Area"
          >
            {areas.map((option, i) => {
              return (
                <MenuItem key={i + 1} value={option.Area_Id}>
                  {option.Area_Nombre}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-3">
          <InputLabel id="Perfil">
            Perfil
          </InputLabel>
          <Select
            className="flex-1 "
            onChange={handleChange}
            id="Estado Falta"
            value={competencia.Id_Perfil}
            name="Id_Perfil"
            label="Perfil"
            defaultMenuIsOpen={false}
            isSearchable={false}
            
          >
            {perfiles.map((option, i) => {
              return (
                <MenuItem key={i} value={option.perfil_Id}>
                  {option.perfil_nombre}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          className="mb-3"
          label="Link del recurso"
          name="rec_enlace"
          value={competencia.rec_enlace}
          onChange={handleChange}
          required
          type="url"
        />
        <br />
        <div className="flex justify-evenly items-center">
          <button
            type="submit"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            {formCrearEditar === 'CREAR' ?'AGREGAR':'EDITAR' }
          </button>

          <button
            onClick={() => abrirCerrarModalFormComp()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
  const bodyEliminar = (
    <div className={styles.modal}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea eliminar el registro?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          <button
            color="primary"
            onClick={handleSubmitEliminar}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            Aceptar
          </button>
          |
          <button
            onClick={abrirCerrarModalEliminar}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  const seleccionarCompetencia = (compe, caso) => {
    let competenciaEdit = { ...compe, rec_enlace:compe["LINK DEL RECURSO"],rec_nombre:"ManualCompetencias" };
    // empleadoEdit['Estado Falta']==='Falta Justificada'?empleadoEdit['Estado Falta']=3:empleadoEdit['Estado Falta']=4;
    setCompetencia(competenciaEdit);

    //(caso === "EDITAR") && abrirCerrarModalEditar();
    if (caso === "EDITAR") {

      getPeticionDepartamentoXMarca(competenciaEdit.Id_Marca,setDepartamentos);
        getPeticionAreasXDepart(competenciaEdit.Id_Unidad,setAreas);
        getPeticionPerfilesXArea(competenciaEdit.Id_Area,setPerfiles);

      setCompetencia(competenciaEdit);
      abrirCerrarModalFormComp(caso);
    } else if (caso === "ELIMINAR") {
      setCompetencia(compe.ID);
      abrirCerrarModalEliminar();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold text-center text-black ">
          Manual de competencias
        </h3>
        {
          (permisosUser.includes("reclutamiento_recursos_manucomp_agregar")) && 
          (
            <button
              className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black"
              onClick={()=>abrirCerrarModalFormComp('CREAR')}
            >
              AGREGAR
            </button>
          )
        }
        <MaterialTable
          columns={[
            {
              title: "PERFIL",
              field: "PERFIL",
              lookup: perfilesFiltro,
            },
            {
              title: "DEPARTAMENTO",
              field: "DEPARTAMENTO",
              lookup: unidadFiltro,
            },
            {
              title: "AREA",
              field: "AREA",
              lookup: areasFiltro,
            },
            // {
            //   title: "SUBAREA",
            //   field: "subarea",
            //   lookup: {
            //     Frontend: "Frontend",
            //     Calidad: "Calidad",
            //     "Analisis y Bases de datos": "Analisis y Bases de datos",
            //   },
            // },
            /* {
              title: "ENCARGADO",
              field: "ENCARGADO",
              filtering: false,
              lookup: { null: "vacio" },
            }, */
            {
              title: "LINK DE RECURSO",
              field: "LINK DEL RECURSO",
              filtering: false,
            },
            {
              title: "FECHA DE ACTUALIZACION",
              field: "FECHA DE ACTUALIZACION",
              filtering: false,
              // lookup: { null: "Sin Fecha" },
            },
          ]}
          data={data}
          actions={[
            (permisosUser.includes("reclutamiento_recursos_manucomp_editar")) && 
            (
              {
                icon: "edit",
                tooltip: "Editar Competencia",
                onClick: (event, rowData) =>
                  seleccionarCompetencia(rowData, "EDITAR"),
              }
            ),
            (permisosUser.includes("reclutamiento_recursos_manucomp_eliminar")) && 
            (
              {
                icon: "delete",
                tooltip: "Delete Competencia",
                onClick: (event, rowData) =>
                  seleccionarCompetencia(rowData, "ELIMINAR"),
              }
            ),
          ]}
          options={{
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            // rowStyle: (rowData) => ({
            //   backgroundColor:
            //     selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            // }),
            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,
            exportAllData: true,
            exportFileName: "Tabla de Recurso Competencia",
            // actionsColumnIndex: -1,
            filtering: true,
            // rowStyle: {
            //   backgroundColor: '#EEE',
            // }
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

        <Modal open={modalFormComp} onClose={abrirCerrarModalFormComp}>
          {bodyModalFormComp}
        </Modal>
        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>

        <ModalResponse
        response={response}
        handleCloseResponse={()=>setResponse(initialResponse)}
      />
      </div>
    </div>
  );
};

export default TablaCompetencias;
