import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  getPeticionListarResumen,
  getPeticionPerfilesFiltro,
} from "../../dist/getPeticiones";
import Spinner from "../Spinner/Spinner";

// const dataRes = [
//     {
//         id:1,
//         nombre: 'Noemi Cuellar Checa',
//         edad: '21',
//         dni: '53598926',
//         revision: '50%',
//         observacion: '75%',
//         entrevista: '50%',
//         evaluacion: '60%',
//         resultado: 'Aprobado',
//         porcentaje: '90%',
//         perfil: '2'
//     },
//     {
//         id:2,
//         nombre: 'Garciano Plana Ballester',
//         edad: '26',
//         dni: '40974866',
//         revision: '100%',
//         observacion: '95%',
//         entrevista: '100%',
//         evaluacion: '80%',
//         resultado: 'Aprobado',
//         porcentaje: '99%',
//         perfil: '3'
//     },
//     {
//         id:3,
//         nombre: 'Oriana Soto Calderon',
//         edad: '19',
//         dni: '79358776',
//         revision: '30%',
//         observacion: '45%',
//         entrevista: '50%',
//         evaluacion: '30%',
//         resultado: 'Desaprobado',
//         porcentaje: '40%',
//         perfil: '1'
//     },
//     {
//         id:4,
//         nombre: 'Violet Contreras Rojas',
//         edad: '21',
//         dni: '53598926',
//         revision: '50%',
//         observacion: '55%',
//         entrevista: '50%',
//         evaluacion: '50%',
//         resultado: 'Aprobado',
//         porcentaje: '50%',
//         perfil: '4'
//     },
//     {
//         id:5,
//         nombre: 'Miguel Ramos Ramos',
//         edad: '22',
//         dni: '78547812',
//         revision: '50%',
//         observacion: '75%',
//         entrevista: '50%',
//         evaluacion: '60%',
//         resultado: 'Aprobado',
//         porcentaje: '90%',
//         perfil: '4'
//     },
//     {
//         id:6,
//         nombre: 'Clever Quispe Quispe',
//         edad: '21',
//         dni: '45788965',
//         revision: '50%',
//         observacion: '75%',
//         entrevista: '50%',
//         evaluacion: '60%',
//         resultado: 'Aprobado',
//         porcentaje: '80%',
//         perfil: '2'
//     },
// ]

const TablaResumenGen = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  // console.log(data);
  useEffect(() => {
    // setData(dataRes)
    getPeticionListarResumen(setData, setLoading);
  }, []);

  useEffect(() => {
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
  }, []);

  return (
    <div className="rounded-t-3xl text-center" style={{ margin: "1rem 1rem" }}>
      <h3 className="text-xl font-bold  text-center text-black ">
        Resumen general
      </h3>
      <div className="my-0 mx-auto py-4" style={{ width: "97%" }}>
        <div className="main">
          <MaterialTable
            columns={[
              {
                title: "NOMBRES",
                field: "Nombres y Apellido",
                filtering: false,
              },
              { title: "EDAD", field: "Edad", filtering: false },
              { title: "DNI", field: "Dni", filtering: false },
              {
                title: "PERFIL",
                field: "Tipo de Puesto a Postular",
                lookup: perfilesTabla,
              },
              {
                title: "REVISION CV",
                field: "Revisión de Curriculum Vitae",
                filtering: false,
              },
              {
                title: "OBSERVACION CONDUCTA",
                field: "Observación de conducta",
                filtering: false,
              },
              {
                title: "ENTREVISTA STAR",
                field: "Entrevista STAR",
                filtering: false,
              },
              {
                title: "EVALUACION DE CONOCIMIENTOS",
                field: "Evaluación de conocimientos",
                filtering: false,
              },
              //{title: 'RESULTADO FINAL',field: 'resultado'},
              {
                title: "PORCENTAJE TOTAL",
                field: "Porcentaje Total",
                filtering: false,
              },
              {
                title: "RESULTADO FINAL",
                field: "Categoría de resultado final",
                filtering: false,
              },
            ]}
            data={data}
            onRowClick={(evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            }
            // editable={{
            //     onBulkUpdate: changes =>
            //       new Promise((resolve, reject) => {
            //         setTimeout(() => {
            //             const rows=Object.values(changes)
            //             const  updateRows=[...data]
            //             let index;
            //             rows.map(row=>{
            //                 index=row.oldData.tableData.id
            //                 updateRows[index]=row.newData
            //             })
            //             setData(updateRows)
            //             resolve();
            //         }, 1000);
            //       }),
            //     onRowDelete: oldData =>
            //       new Promise((resolve, reject) => {
            //         setTimeout(() => {
            //           resolve();
            //         }, 1000);
            //       }),
            //   }}

            options={{
              headerStyle: {
                backgroundColor: "#E2E2E2  ",
              },
              rowStyle: (rowData) => ({
                backgroundColor:
                  selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
              }),
              searchFieldAlignment: "left",
              exportFileName: "Tabla de Resumen General",
              showTitle: false,
              exportButton: true,
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
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TablaResumenGen;
