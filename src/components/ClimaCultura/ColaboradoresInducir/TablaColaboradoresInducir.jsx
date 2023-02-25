import React, { useEffect, useState } from "react";
import { makeStyles,TextField,FormControl,InputLabel,Modal,Select,MenuItem } from "@material-ui/core";
import MaterialTable from "material-table";
import Spinner from "../../Spinner/Spinner";
import { getPeticionColaboradoresInducir,
         getPeticionInductorFiltro,getPeticionInductorFiltro2,
         getPeticionListarAprobadosCapacitacion
} from "../../../dist/ClimaCultura/getPeticiones";
import styles from "../EstilosModal.module.css";
import style from "../estilos.module.css";
import styless from "../ModalEliminar.module.css"
//import { getPeticionAreasId, getPeticionDepartamentoId } from "../../../dist/getPeticiones";
import { postAgregarInduccion } from "../../../dist/ClimaCultura/postPeticiones";
import { putInduccion } from "../../../dist/ClimaCultura/putPeticiones";
import { deleteInduccion } from "../../../dist/ClimaCultura/deletePeticiones";
import moment from "moment";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";

//getPeticionInductorFiltro2 


function TablaColaboradoresInducir () {
  
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const [inductorTabla, setInductorTabla] = useState([]);
  // const [departamento,setDepartamento] = useState([]);
  // const [area,setArea] = useState([]);
  const [aprobados,setAprobados] = useState([]);
  const [idInductor ,setIdInductor] = useState([]);
  // const inductorArray = Object.values(inductorTabla);
  // const inductorArray_2 = Object.keys();

  //UNIDAD = INDUCTOR TABLA 
  //DEPARTAMENTO = IDINDUCTOR

 const [caso, setCaso] = useState(""); 
 //id de tabla  
 const [idaprobado, setIdaprobado] = useState(null);


 const [addInduccion, setAddInduccion] = useState({
   id:"",
   postulanteAprobado:"",
   inductor:"",
   fecha:"",
   hora:"",
 });


 //agregar inductor
 const [agregarInductor,setAgregarInductor] = useState([]);
 const [agregarFecha,setAgregarFecha] = useState("");
 const [agregarHora,setAgregarHora] = useState("");
 const [agregarpostulanteAprobado,setAgregarPostulanteAprobado] = useState([]);


 // Modal Confirmar 
 const [modalConfirmar, setModalConfirmar] = useState(false);

 const abrirCerrarModalConfirmar = () => {
   setModalConfirmar(!modalConfirmar);
 }

  
//Modal Agregar
  const[ventana,setVentana] = useState(false);

  const abrirCerrarModal = () => {
    setVentana(!ventana)

    setAddInduccion({
      postulanteAprobado:"",
      inductor:"",
      fecha:"",
      hora:"",
    })
  }

  // actualizar tabla 

  const actualizarTabla = ()  => {
    setColaboradores([]);
    getPeticionColaboradoresInducir(setColaboradores, setLoading);
  }

  // Funcion Agrgar

  const SubmitAgregar =async (e) => {
    e.preventDefault();
    setAgregarInductor();
    setAgregarPostulanteAprobado();
    setAgregarFecha();
    setAgregarHora();
    setCaso("Agregar");
    abrirCerrarModal();
    await  postAgregarInduccion(agregarpostulanteAprobado,agregarInductor,agregarFecha,agregarHora); 
    abrirCerrarModalConfirmar();
    actualizarTabla();    
  }

   //Modal Editar 

   const [modalEditar,setModalEditar] = useState(false)

   const  abrirCerrarModalEditar = () => {
     setModalEditar(!modalEditar);
     if(modalEditar){
       setAddInduccion(
         {
          id:"",
          inductor:"",
          fecha:"",
          hora:"",
         }
       )
     }
   }

   //Funcion Editar 

   const submitEditar = async (e) => {
     e.preventDefault();
     setCaso("Editar");
     abrirCerrarModalEditar();
     await putInduccion(idaprobado,agregarInductor,agregarFecha,agregarHora);
     abrirCerrarModalConfirmar();
     actualizarTabla();
   } 


   // Eliminar
   
   const [modalEliminar,setModalEliminar] = useState(false)

   const abrirCerrarModalEliminar = () =>  {
     setModalEliminar(!modalEliminar);
     if(modalEliminar){
       setAddInduccion({
        id:"",
        inductor:"",
        fecha:"",
        hora:"",
        postulanteAprobado:""
       })
     }
   }

   // Funcion Eliminar 

   const submitEliminar =  async() => {
     setCaso("Eliminar");
     abrirCerrarModalEliminar();
     await deleteInduccion(addInduccion);
     abrirCerrarModalConfirmar();
     actualizarTabla()
   }

   // Seleccionar 

const seleccionarInductor = (inducir,caso) => {
  if(caso==="ELIMINAR"){
    setAddInduccion(inducir.Id_Induccion);
    abrirCerrarModalEliminar();
  }
}

  useEffect(() => {
    setLoading(true);
    getPeticionColaboradoresInducir(setColaboradores, setLoading);
    getPeticionInductorFiltro(setInductorTabla, setLoading);
  }, []);

  // useEffect( ()=> {
  //   getPeticionDepartamentoId(setDepartamento,setLoading);
  //   getPeticionAreasId(setArea,setLoading)
  // },[]) 

    useEffect( () => {
      getPeticionInductorFiltro2().then( (respuesta) => {
      setIdInductor(respuesta);
      })
    },[])


  useEffect( () => {
    getPeticionListarAprobadosCapacitacion().then( (respuesta) => {
    setAprobados(respuesta);
    })
  },[])

  const body = (
    <div className={style.modalPrincipal}>

      <div>

        <div className={style.title}>
          <h1>Agregar Inducción</h1>
          <hr />
        </div>

        <form onSubmit={SubmitAgregar}
         className="flex flex-col align-middle"
        >
        
          <form className={style.formulario}> 
  
          <div>
          <FormControl className={style.input}>
          {/* <FormControl error={formAdd.errors.marca_id ? true : false}>*/}
              <InputLabel >Postulante Aprobado</InputLabel>
                <Select id="postulanteAprobado" onChange={(e) => setAgregarPostulanteAprobado(e.target.value)}>
                  {
                    aprobados.map( (resp,i) => {
                    return(
                      <MenuItem key={i} value={resp.Id_Apro_Capa}>{resp.Postulante}</MenuItem>
                    )
                    })
                  }
                </Select>
            </FormControl>
            <br />  
            <FormControl className={style.input}>
              <InputLabel>Inductor</InputLabel>
                <Select id="inductor" onChange={(e) => setAgregarInductor(e.target.value)}>
                  {
                    idInductor.map( (resp,index) => {
                    return(
                      <MenuItem key={index} value={resp.EMP_ID}>{resp.Inductor}</MenuItem>
                    )
                    })
                  }
                </Select>
            </FormControl> 
            <br />

            <TextField 
            label="Fecha" 
            type = "date" 
            format= "YYYY/MM/dd" 
            className={style.input}  
            InputLabelProps={{ shrink: true, required: true }}
            onChange={(e) => setAgregarFecha(e.target.value)} 
            id="fecha" 

            />
             <br /> 


            <TextField label="Hora" 
           // type = "time"
             placeholder="HH:mm:ss"
             className={style.input} InputLabelProps={{ shrink: true, required: true }}  
            onChange={(e) => setAgregarHora(e.target.value)} id="hora" 
            //cammbio de hora
             /> 

            <br/>
          </div>
         </form> 

        <div className={style.boton}>
            <button className={style.botonAgregar}>Agregar</button>
            <button className={style.botonCancelar} onClick={abrirCerrarModal}>Cancelar</button>
        </div>
      </form> 
        
      </div>
  
    </div>
   
  )

  const body2 =(
    <div className={style.modalPrincipal}>

      <div>

        <div className={style.title}>
          <h1>Editar</h1>
          <hr />
        </div>

        <form onSubmit={submitEditar}>
      
          <form  className={style.formulario}>
        
            <div>
            
              <FormControl className={style.input}>
                <InputLabel>Inductor</InputLabel>
                  <Select id="inductor" onChange={(e) => setAgregarInductor(e.target.value)}>
                  {
                    idInductor.map( (resp,index) => {
                    return(
                      <MenuItem key={index} value={resp.EMP_ID}>{resp.Inductor}</MenuItem>
                    )
                    })
                  }
                  </Select>
              </FormControl>
              <br /> 

              <TextField 
              label="Fecha" 
              type = "date" 
              format= "YYYY/MM/dd" 
              className={style.input}
              InputLabelProps={{ shrink: true, required: true }}
              onChange={(e) => setAgregarFecha(e.target.value)} id="fecha"/>
              <br />

              <TextField label="Hora" 
              placeholder="HH:mm:ss" 
               className={style.input} InputLabelProps={{ shrink: true, required: true }}  
              onChange={(e) => setAgregarHora(e.target.value)} id="hora" /> 
            
              <br />

            </div>
                
          </form>
      
          <div className={styles.boton}>
              <button className={styles.botonAgregar}>Editar</button>
              <button className={styles.botonCancelar} onClick={abrirCerrarModalEditar}>Cancelar</button>
          </div>

        </form>

      </div>
  
    </div>
  
  )
 // defaultValue={ moment().format('%H:%i:%s') }
  const bodyConfirmar = (
    <div className={styles.modalConfirmar}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">Se ha agregado una nueva inducción</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Se ha actualizado la inducción</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">Se ha eliminado el aspecto a evaluar</h3>
        )}
        <button
          onClick={() => abrirCerrarModalConfirmar()}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"

        >
          <img
            src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
            style={{ width: "1.5rem", height: "1.5rem" }}
            alt=""
          />
        </button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styless.modalPrincipal}>

      <div>

        <div className={styless.title}>
          <h1>Desea Eliminar el Registro Seleccionado</h1>
          <hr />
        </div>

          <form   className={styless.formulario}>
        
            <div className={styless.boton}>
                <button className={styless.botonAgregar} onClick={submitEliminar}>Eliminar</button>
                <button className={styless.botonCancelar} onClick={abrirCerrarModalEliminar}>Cancelar</button>
            </div>
          
        </form>
    
      </div>
  
    </div>
  )

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">Colaboradores a Inducir</h3>
      </div>
      <div className="mt-3">
        {
          <button
            className="bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700"
            onClick={abrirCerrarModal}
          >
            AGREGAR
          </button> 
        }

        <Modal open={ventana} onClose={abrirCerrarModal}>
          {body}
        </Modal>

        <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
          {body2}
        </Modal>

        <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
          {bodyConfirmar}
        </Modal>

        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>

        <MaterialTable
          columns={[
            {
              title: "NOMBRE",
              field: "Nombre",
              filtering: false,
            },
            {
              title: "DEPARTAMENTO",
              field: "Departamento",
              filtering: false,
            },
            {
              title: "AREA",
              field: "Area",
              filtering: false,
              
            },
            {
              title: "TURNO",
              field: "Turno",
              filtering: false,
            },
            {
              title: "INDUCTOR",
              field: "Inductor",
              lookup:inductorTabla, 
            },
            {
              title: "FECHA",
              field: "Fecha",
              filtering: false,
            },
            {
              title: "HORA",
              field: "Hora",
              filtering: false,
            },
            {
              title: "ESTADO",
              field: "Estado",
              filtering: false,
            }  
            ]}
          data={colaboradores}
          onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
          actions={[
            {
              icon: "edit",
              tooltip: "Editar colaborador",
              onClick: (event, rowData) => {
               // setIdInductor(rowData.Id_Induccion);
                setIdaprobado(rowData.Id_Induccion);
                setAgregarInductor(rowData.Inductor)
                setAgregarFecha(rowData.Fecha)
                setAgregarHora(rowData.Hora)
                /* setAgregarPostulanteAprobado(rowData.Id_Apro_Capa) */
                abrirCerrarModalEditar(true)
              },
            },

            {
              icon: "delete",
              tooltip: "Eliminar Inductor",
              onClick: (event, rowData) => {
               seleccionarInductor(rowData ,"ELIMINAR");
              },
            },
          ]}
          options={{
            
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
                rowStyle: (rowData) => ({
                backgroundColor: selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
                }),

            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,
            exportAllData: true,
            exportFileName: "Tabla colaboradores a inducir",
            actionsColumnIndex: -1,
            filtering: true,
          }}
          localization={{
            body: {
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
      </div>
    </div>
  );
}

export default TablaColaboradoresInducir;
