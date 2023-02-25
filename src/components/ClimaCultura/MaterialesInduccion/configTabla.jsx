export const columnas = [
  {
    title: "Nombre del Recurso",
    field: "nombreRecurso",
  },
  { title: "Departamento", field: "departamento" },
  {
    title: "Area",
    field: "area",
  },
  {
    title: "Perfil",
    field: "perfil",
  },
  {
    title: "Fecha",
    field: "actualizacion",
  },
  {
    title: "Marca",
    field: "marca",
  },
  {
    title: "Turno",
    field: "turno",
  },
];

export const options = {
  filtering: true,
  headerStyle: {
    backgroundColor: "#E2E2E2",
  },
  actionsColumnIndex: -1,
  searchFieldAlignment: "left",
  showTitle: false,
  exportButton: {
    csv: true,
    pdf: true,
  },
};

export const localization = {
  body: {
    emptyDataSourceMessage: "Loading",
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
    nRowsSelected: "{0} row(s) selected(s)",
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
};
