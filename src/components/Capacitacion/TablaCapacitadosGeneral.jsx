import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { getPeticionCapacitadosGeneral } from "../../dist/Capacitacion/getPeticiones";
import { getPeticionEstadoCapacitadosGeneralFiltro } from "../../dist/getPeticiones"
import { getPeticionAreasFiltro } from "../../dist/getPeticiones";

function TablaCapacitadosGeneral() {
  const [ loading, setLoading] = useState(true);
  const [ selectedRow, setSelectedRow] = useState(null);
  const [ dataCapacitados, setDataCapacitados] = useState([]);
  const [ estadoCG, setEstadoCG ] = useState([]);
  const [ areas, setAreas ] = useState([]);
 


  useEffect(() => {
    setLoading(true);
    getPeticionAreasFiltro(setAreas,setLoading);
    getPeticionCapacitadosGeneral(setDataCapacitados, setLoading);
    getPeticionEstadoCapacitadosGeneralFiltro(setEstadoCG, setLoading);
  }, []); 

  return (
    <div className="container mx-auto">
    <div className="main mt-3 relative h-full w-full">
      <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">Practicantes Capacitados en General</h3>
    </div>
    <div className="mt-3">
        <MaterialTable
          columns={[
            {
                title: "DEPARTAMENTO",
                field: "Departamento",
                filtering: false,
              },
              {
                title: "AREA",
                field: "Area",
                //filtering: true,
                lookup: areas,
              },
              {
                title: "NOMBRE",
                field: "Nombre",
                filtering: false,
              },
              {
                title: "FECHA DE INICIO",
                field: "Fecha de Inicio",
                filtering: false,
              },
              {
                title: "FECHA DE FIN",
                field: "Fecha de Fin",
                filtering: false,
              },
              {
                title: "CURRICULUM",
                field: "Curriculum",
                filtering: false,
              },
              {
                title: "CONVENIO",
                field: "Convenio",
                filtering: false,
              },
              {
                title: "DNI",
                field: "Dni",
                filtering: false,
              },
              {
                title: "TELEFONO",
                field: "Telefono",
                filtering: false,
              },
              {
                title: "CARRERA",
                field: "Carrera",
                filtering: false,
              },
              {
                title: "ESTADO CONVENIO",
                field: "Estado_Convenio",
                filtering: false,
              },
              {
                title: "ESTADO CAPACITACION",
                field: "Estado",
                lookup: estadoCG,
              },
              {
                title: "TURNO",
                field: "Turno",
                filtering: false,
              },
          ]}
          data={dataCapacitados}
            onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
            options={{
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            rowStyle: (rowData) => ({
              backgroundColor: selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            }),
            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: {
              csv: true,
              pdf: false,
            },
            exportAllData: true,
            exportFileName: "Practicantes Capacitados en General",
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
              exportPDFName: "Exportar en formato PDF",
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

export default TablaCapacitadosGeneral;
