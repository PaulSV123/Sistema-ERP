

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import { getlistarSesionesIntegracion } from "../../../dist/ClimaCultura/getPeticiones";

const useStyles = makeStyles((theme) => ({
    modal: {
      position: "absolute",
      width: "21rem",
      backgroundColor: theme.palette.background.paper,
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

function TablaListadoSesiones () {
  
  const [data,setData] = useState([]);

  useEffect ( () => {
    getlistarSesionesIntegracion().then ( (res) => {
        setData(res)
    } )
     
  },[]) 
  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">Sesiones de Integraci??n</h3>
      </div>
      <div className="mt-3">
       
        <MaterialTable
          columns={[
            {
              title: "Titulo de sesi??n",
              field: "title",
              filtering: false,
            },
            {
              title: "Enlace de sesi??n",
              field: "Meet",
              filtering: false,
            },
            {
              title: "Fecha de Inicio",
              field: "start",
              filtering:false
            },
            {
              title: "Fecha fin",
              field: "end",
              filtering: false,
              
            },
            {
              title: "Encargado de sesi??n",
              field: "Encargado",
              filtering:false
            },
            {
              title: "Departamento",
              field: "Departamento",
              filtering: false,
            },
            {
                title: "??rea",
                field: "Area",
                filtering: false,
            },
            {
                title: "Turno",
                field: "Turno",
                filtering: false,
            },
           
            ]}
          data={data}
         /*  onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)} */
          actions={[
            {
              icon: "edit",
              tooltip: "Editar Sesi??n",
             /*  onClick: (event, rowData) => {
                 setIdPlataforma(rowData.ID);
                 setNombrePlataforma(rowData.Plataforma);
                 setModalEditar(true);
              }, */
            },

            {
                icon: "delete",
                tooltip:'Borrar Sesi??n'
            }
          ]}
          options={{
            
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
               /*  rowStyle: (rowData) => ({
                backgroundColor: selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
                }), */

            searchFieldAlignment: "left",
            showTitle: false,
           /*  exportButton: true, */
           /*  exportAllData: true, */
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
              nRowsSelected: "{0} ligne(s) s??lection??e(s)",
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
              actions: "Acciones",
            },
          }}
        />

      </div>
    </div>
  );
}

export default TablaListadoSesiones;



