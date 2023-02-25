import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import { getPeticionReporteInducidos } from "../../../dist/ClimaCultura/getPeticiones";
import { getPeticionDepartamentoFiltro,getPeticionAreasFiltro } from "../../../dist/getPeticiones";
import GraficoCircular_Mes from "../Reportes/components/GraficoCircular_Mes";
import GraficoCircular_Semana from "../Reportes/components/GraficoCircular_Semana";
import GraficoCircular_Dia from "../Reportes/components/GraficoCircular_Dia";
// import LayoutView from "./views/LayoutView";


//import Spinner from "../Spinner/Spinner";
/* import { getPeticionColaboradoresInducir,
         getPeticionInductorFiltro   
} from "../../dist/ClimaCultura/getPeticiones";
 */
const useStyles = makeStyles((theme) => ({
    modal: {
      position: "absolute",
      width: "21rem",
      backgroundColor: theme.palette.background.paper,
      // }border: '2px solid #000',
      borderRadius: "0.3rem",
      boxshadow: theme.shadows[5],
      padding: theme.spacing(2, 3, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    modal1: {
      position: "absolute",
      width: "23rem",
      height: "10rem",
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
      width: "12rem",
      // [theme.breakpoints.up("lg")]: {
      //   width: "auto",
      // },
      [theme.breakpoints.between("md")]: {
        width: "100%",
      },
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

function ReportePracticantesInducidos () {
 /*  const styles = useStyles(); */
  
  const [data,setData] = useState([]);
  const [unidad,setUnidad]=useState([]);
  const [loading,setLoading] = useState(false);
  const [areas,setAreas] = useState([]);


  useEffect ( () => {
    getPeticionReporteInducidos().then ( (res) => {
        setData(res);
    } ) 

    getPeticionDepartamentoFiltro(setUnidad, setLoading)
    getPeticionAreasFiltro(setAreas, setLoading);
  },[]) 
  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">Practicantes Inducidos</h3>
      </div>
      <div className="mt-3">
      
        <MaterialTable
          columns={[
           
            {
              title: "NOMBRE COMPLETO",
              field: "Nombres",
              filtering: false,
            },
            {
              title: "DNI",
              field: "DNI",
              filtering: false,
            },
            {
              title: "DEPARTAMENTO",
              field: "Departamento",
              lookup:unidad
            },
            {
              title: "ÁREA/PERFIL",
              field: "Área",
              lookup:areas
            },
            {
              title: "FECHA DE INDUCCION",
              field: "FechadeInducción",
              filtering: false,
            },
            {
              title: "CURRICULUM",
              field: "Post_linkCv",
            },
           
            ]}
          data={data}
          
          options={{
            
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
               /*  rowStyle: (rowData) => ({
                backgroundColor: selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
                }), */

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
           /*  header: {
              actions: "ACCIONES",
            }, */
          }}
        />

      </div>
    </div>
  )
}

export default ReportePracticantesInducidos;


