import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { getListarGruposEntreResumGeneral } from '../../../dist/getPeticiones';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
   /*  maxHeight: 300,
    overflowX: 'auto', */
    height: 250,
    width: '100%',
    marginTop:'20px',
    overflow: 'auto',
  },
  columnNombre:{
    width : '150px'
  }
});

const TablaResumGeneral = () => {
  const classes = useStyles();
  const [gruposEntre,setGruposEntre] = useState([]);

  useEffect(()=>{
    getListarGruposEntreResumGeneral(setGruposEntre);
  },[])

  return (
    <div className="rounded-t-3xl text-center" style={{ margin: "1rem 1rem" }}>
      <h3 className="text-xl font-bold  text-center text-black ">
        Resumen general por Grupos
      </h3>
      <div className="my-0 mx-auto py-4" style={{ width: "97%" }}>
        <div className="main">
          <MaterialTable
            columns={[
              {
                title: "CODIGO GRUPO",
                field: "Info_grupo.Id_Grupo_Entrevista",
                filtering: false,
              },
              { title: "ENCARGADO", field: "Info_grupo.Encargado", filtering: false },
              { title: "CANTIDAD", field: "Info_grupo.Cantidad_postulantes", filtering: false },
              {
                title: "FECHA ENTREVISTA",
                field: "Info_grupo.Fecha",
                filtering: false,
              },
              {
                title: "ESTADO",
                field: "Info_grupo.Estado_Entrevista",
                filtering: false,
              },
            ]}
            data={gruposEntre}
            detailPanel={(rowData) => {
              return (
                <div className="bg-gray-100 p-1 pb-4" /* style={{width:'100%',overflowX:'auto',height:'200px'}} */>
                <TableContainer className={classes.container}>
                  <Table size="small" aria-label="purchases" stickyHeader >
                    <TableHead >
                      <TableRow>
                        <TableCell style={{minWidth:'200px'}}>NOMBRES</TableCell>
                        <TableCell>DNI</TableCell>
                        <TableCell style={{minWidth:'150px'}}>PERFIL</TableCell>
                        <TableCell>REVISION CV</TableCell>
                        <TableCell>OBSERVACION CONDUCTA</TableCell>
                        <TableCell>ENTREVISTA STAR</TableCell>
                        <TableCell>EVALUACION CONOCIMIENTOS</TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell>RESULTADO FINAL</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowData.Postulantes.map((post) => (
                        <TableRow>
                          <TableCell>{post["Nombres y Apellido"]}</TableCell>
                          <TableCell>{post["Dni"]}</TableCell>
                          <TableCell>{post["Tipo de Puesto a Postular"]}</TableCell>
                          <TableCell>{post["Revisión de Curriculum Vitae"]}</TableCell>
                          <TableCell>{post["Observación de conducta"]}</TableCell>
                          <TableCell>{post["Entrevista STAR"]}</TableCell>
                          <TableCell>{post["Evaluación de conocimientos"]}</TableCell>
                          <TableCell>{post["Porcentaje Total"]}</TableCell>
                          <TableCell>{post["Categoría de resultado final"]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </TableContainer>
                </div>
              );
            }}
            options={{
              headerStyle: {
                backgroundColor: "#E2E2E2  ",
              },
              /* rowStyle: (rowData) => ({
                backgroundColor:
                  selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
              }), */
              searchFieldAlignment: "left",
              exportFileName: "Tabla de Resumen General",
              showTitle: false,
              exportButton: true,
              actionsColumnIndex: -1,
              filtering: true,
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "No hay grupos para evaluar",
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
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TablaResumGeneral