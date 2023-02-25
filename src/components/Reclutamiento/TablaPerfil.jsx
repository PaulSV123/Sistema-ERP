import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  TextField,
  // button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getPeticionAreas,
  getPeticionPerfiles,
  // getPeticionPerfilId,
  getPeticionDepartamentoId,
  getPeticionMarcas,
  getPeticionListarRecursos,
  getPeticionAreasId,
  getPeticionAreasFiltro,
  getPeticionPerfilesFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionMarcasTodas,
  getPeticionDepartamentoXMarca,
  getPeticionAreasXDepart,
  getPeticionPerfilesXArea, //filtros
} from "../../dist/getPeticiones";
import { postPeticionAgregarRecurso } from "../../dist/postPeticiones";
import { deletePeticionRecursos } from "../../dist/deletePeticiones";
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
  texto: {
    flex: "1 1 0%",
    fontWeight: "600",
    color: "#4B5563",
    fontSize: "1rem",
    fontFamily: "Inter, sans-serif",
  },
}));

const initialPerfilEmpleado = 
{
    Id_Perfil: '',
    Id_Area: '',
    Id_Unidad: '',
    rec_enlace: "",
    Id_Marca: '',
    rec_nombre : "Perfil",

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

const TablaPerfil = () => {
  const styles = useStyles();
  const { permisosUser } = useContext(UserContext);

  const [caso, setCaso] = useState("");
  //
  const [modalFormPerfil, setModalFormPerfil] = useState(false);
  const [formCrearEditar,setFormCrearEditar] = useState('CREAR');

  const [modalEliminar, setModalEliminar] = useState(false);
  const [data, setData] = useState([]);
  const [perfilEmpleado, setPerfilEmpleado] = useState(
    initialPerfilEmpleado
  );
  
  const [areas, setAreas] = useState([]);
  //const [areasId, setAreasId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marcas, setMarcas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [perfilesFiltro, setPerfilesFiltro] = useState([]);
  const [areasFiltro, setAreasFiltro] = useState([]);
  const [unidadFiltro, setUnidadFiltro] = useState([]);

  const [response,setResponse] = useState(initialResponse);


  useEffect(() => {
    const data = {
      recurso_nombre: 2,
    };
    // setData(dataEmpleados);
    getPeticionListarRecursos(setData, data);
  }, [response.status]);

  useEffect(() => {
    //getPeticionAreasId(setAreasId, setLoading);
    getPeticionMarcasTodas(setMarcas);
    getPeticionPerfilesFiltro(setPerfilesFiltro);//
    getPeticionAreasFiltro(setAreasFiltro);//
    getPeticionDepartamentoFiltro(setUnidadFiltro);//
  }, []);

 
  // Funcion para acceder al modal Eliminar
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setPerfilEmpleado(initialPerfilEmpleado);
    }
  };

  const abrirCerrarModalFormPerfil =(caso = '')=>{
    if(caso !== ''){
      if(caso === 'CREAR'){
        setDepartamentos([]);setAreas([]);setPerfiles([]);
        setPerfilEmpleado(initialPerfilEmpleado);
      }
      setFormCrearEditar(caso); 
    }
    setModalFormPerfil(!modalFormPerfil);
  }

  // Funcion que almacena los cambios en el state de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "Id_Marca" ){
      perfilEmpleado.Id_Unidad = '';perfilEmpleado.Id_Perfil='';perfilEmpleado.Id_Area='';
      getPeticionDepartamentoXMarca(value,setDepartamentos);
      setAreas([]);setPerfiles([]);
    }
    if(name === "Id_Unidad"){
      perfilEmpleado.Id_Perfil='';perfilEmpleado.Id_Area='';
      setAreas([]);setPerfiles([]);
      getPeticionAreasXDepart(value,setAreas);
    }
    if(name === "Id_Area"){
      perfilEmpleado.Id_Perfil='';
      getPeticionPerfilesXArea(value,setPerfiles);
    }
    setPerfilEmpleado({
      ...perfilEmpleado,
      [name]: value,
    });
  };

  // Submit para el modal Editar
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const perfilActualizado = {
      rec_nombre_id: Number(perfilEmpleado["ID RECURSO NOMBRE"]),
      rec_nombre: perfilEmpleado["NOMBRE RECURSO"],
      //
      rec_id: Number(perfilEmpleado["ID"]),
      rec_enlace: perfilEmpleado.rec_enlace,
      rec_perfil_id_pk: perfilEmpleado.Id_Perfil,
      rec_area_id_pk:  perfilEmpleado.Id_Area,
      rec_marca_id_pk:  perfilEmpleado.Id_Marca,
      rec_unidad_id_pk: perfilEmpleado.Id_Unidad,
    };
    putPeticionActualizarRecurso(perfilActualizado, setResponse,abrirCerrarModalFormPerfil);
    setCaso("Editar");
  };

  // Submit para el modal Agregar
  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    let newForm = {
      rec_nombre:perfilEmpleado.rec_nombre,
      rec_enlace:perfilEmpleado.rec_enlace,
      perfil_id:perfilEmpleado.Id_Perfil,
      area_id:perfilEmpleado.Id_Area,
      marca_id:perfilEmpleado.Id_Marca,
      unidad_id:perfilEmpleado.Id_Unidad,
    }
    postPeticionAgregarRecurso(newForm,setResponse,abrirCerrarModalFormPerfil);
    setCaso("Agregar");
  };

  // Submit para el modal Eliminar
  const handleSubmitEliminar = () => {
    //console.log(perfilEmpleado)
    deletePeticionRecursos(perfilEmpleado,setResponse,abrirCerrarModalEliminar);
    setCaso("Eliminar");

  };

  const bodyModalFormPerfil = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">{formCrearEditar === 'CREAR' ? 'Agregar Recurso Perfil' : 'Editar Recurso Pefil'}</h3>
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
            value={perfilEmpleado.Id_Marca}
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
            value={perfilEmpleado.Id_Unidad}
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
          <InputLabel id="Area" required>
            Area
          </InputLabel>
          <Select
            labelId="Area"
            className="flex-1"
            onChange={handleChange}
            value={perfilEmpleado.Id_Area}
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
          <InputLabel id="Perfil" required>
            Perfil
          </InputLabel>
          <Select
            className="flex-1 "
            onChange={handleChange}
            id="Estado Falta"
            value={perfilEmpleado.Id_Perfil}
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
          value={perfilEmpleado.rec_enlace}
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
            onClick={() => abrirCerrarModalFormPerfil()}
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
          {/* <div>
                        <button className={styles.button_aceptar} onClick={() => handleSubmitEliminar()} >Aceptar</button>
                    </div>
                    |
                    <div>
                        <button className={styles.button_cancelar} onClick={() => abrirCerrarModalEliminar()}>Cancelar</button>
                    </div> */}
          <button
            color="primary"
            onClick={() => handleSubmitEliminar()}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            ELIMINAR
          </button>
          |
          <button
            onClick={abrirCerrarModalEliminar}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );

  const seleccionarEmpleado = (empleado, caso) => {
    let empleadoEdit = { ...empleado, rec_enlace:empleado["LINK DEL RECURSO"],rec_nombre:"Perfil" };
    //console.log(empleadoEdit);
    // empleadoEdit['Estado Falta']==='Falta Justificada'?empleadoEdit['Estado Falta']=3:empleadoEdit['Estado Falta']=4;
    setPerfilEmpleado(empleadoEdit);
    console.log(empleado);
    //setAreas([]);setPerfiles([]);setDepartamentos([]);
    if (caso === "EDITAR") {

        getPeticionDepartamentoXMarca(empleadoEdit.Id_Marca,setDepartamentos);
        getPeticionAreasXDepart(empleadoEdit.Id_Unidad,setAreas);
        getPeticionPerfilesXArea(empleadoEdit.Id_Area,setPerfiles);
      
      setPerfilEmpleado(empleadoEdit);
      //abrirCerrarModalEditar();
      abrirCerrarModalFormPerfil(caso);
    } else if (caso === "ELIMINAR") {
      setPerfilEmpleado(empleado.ID);
      abrirCerrarModalEliminar();
    }
  };

  return (
    <div className="container mx-auto justify-center">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold  text-center text-black">Perfiles</h3>
        {permisosUser.includes("reclutamiento_recursos_perfil_agregar") && (
          <button
            className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black "
            onClick={()=>abrirCerrarModalFormPerfil('CREAR')}
          >
            AGREGAR
          </button>
        )}

        <MaterialTable
          columns={[
            // {
            //   title: "NOMBRE",
            //   field: "NOMBRE RECURSO",
            // },
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
            },
          ]}
          data={data}
          actions={[
            permisosUser.includes("reclutamiento_recursos_perfil_editar") && {
              icon: "edit",
              tooltip: "Editar perfil",
              onClick: (event, rowData) =>
                seleccionarEmpleado(rowData, "EDITAR"),
            },
            permisosUser.includes("reclutamiento_recursos_perfil_eliminar") && {
              icon: "delete",
              tooltip: "Eliminar Perfil",
              onClick: (event, rowData) =>
                seleccionarEmpleado(rowData, "ELIMINAR"),
              // onClick: () => tableRef.current && tableRef.current.onQueryChange(),
            },
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
            exportFileName: "Tabla de Recurso Perfil",
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

        <Modal open={modalFormPerfil} onClose={() => abrirCerrarModalFormPerfil}>
          {bodyModalFormPerfil}
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

export default TablaPerfil;
