import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Error from "../../components/item/Error";
import { getPeticionListarCurso } from "../../dist/Capacitacion/getPeticiones";
import { getPeticionPerfiles } from  "../../dist/getPeticiones";
import { NavLink } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Modal, Select, TableCell, TableRow, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    overflow: "scroll",
    overflowX: "hidden",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "50%",
      height: "65%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      height: "65%",
    },
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
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

function TablaListadoCurso() {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataListado, setDataListado] = useState([]);
  const [perfilLista, setPerfilLista] = useState([]);

  useEffect(() => {  
    getPeticionListarCurso(setDataListado, setLoading);
    getPeticionPerfiles(setPerfilLista, setLoading);
  }, []);
  
  // console.log("listado", dataListado);
  // console.log("perfiles", perfilLista);
  console.log(dataListado)
  return (
    <div className="container mx-auto">
        <div className="flex right mt-3">
          <NavLink 
            exact
            to = "/capacitacion/recursos"
            className= "bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700">
            REGRESAR
          </NavLink>
      </div >
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">TEMARIO</h3>
      </div>
      <div className="mt-3">
        <MaterialTable
          columns={[
            {
              title: "TIPO DE CURSO",
              field: "Tipo_Curso",
              filtering: false,
            },
            {
              title: "PERFIL",
              filtering: false,
              field: "Perfiles",
              render: ({Perfiles}) => {
                return (
                  <div >
                    {Perfiles.map((perfil) => (
                      <TableRow className={styles.border} key={perfil.Perfil}><TableCell>{perfil.Perfil}</TableCell></TableRow>
                    ))}
                  </div>
                )
              },
          },
            {
              title: "CODIGO",
              filtering: false,
              field: "Perfiles",
              render: ({Perfiles}) => {
                const cursos2 = Perfiles.map((perfil) => perfil.Cursos);
                const cursos = cursos2.flat();
                return (
                  <>
                    {cursos.map((curso) => (
                      <TableRow className={styles.border} key={curso.Codigo}><TableCell>{curso.Codigo}</TableCell></TableRow>
                    ))}
                  </>
                )
                    },
            },
            {
              title: "CURSOS",
              filtering: false,
              field: "Perfiles",
              render: ({Perfiles}) => {
                const cursos2 = Perfiles.map((perfil) => perfil.Cursos);
                const cursos = cursos2.flat();   
                return (
                  <>
                    {cursos.map((curso) => (
                      <TableRow className={styles.border} key={curso.Nombre}><TableCell>{curso.Nombre}</TableCell></TableRow>
                    ))}
                  </>
                )
                    },
            },
            {
              title: "UBICACION",
              filtering: false,
              field: "Perfiles",
              render: ({Perfiles}) => {
                const cursos2 = Perfiles.map((perfil) => perfil.Cursos);
                const cursos = cursos2.flat(); 
                console.log(cursos)  
                return (
                  <>
                    {cursos.map((curso) => (
                      <tr className={styles.border} key={curso.Plataforma}><TableCell>{curso.Plataforma}</TableCell></tr>
                    ))}
                  </>
                )
                    },
            },
            {
              title: "TIEMPO",
              filtering: false,

              field: "Perfiles",
              render: ({Perfiles}) => {
                const cursos2 = Perfiles.map((perfil) => perfil.Cursos);
                const cursos = cursos2.flat();
                return (
                  <>
                    {cursos.map((curso) => (
                      <TableRow className={styles.border} key={curso.Tiempo}><TableCell>{curso.Tiempo}</TableCell></TableRow>
                    ))}
                  </>
                )
                    },

            },
            {
              title: "TIEMPO GENERAL",
              filtering: false,
              field: "Perfiles",
              render: ({Perfiles}) => {
                return (
                  <div >
                    {Perfiles.map((perfil) => (
                      <TableRow className={styles.border} key={perfil.Tiempo_General}><TableCell>{perfil.Tiempo_General}</TableCell></TableRow>
                    ))}
                  </div>
                )
              },

            },
            {
              title: "MODO DE EVALUAR",
              filtering: false,
              grouping: false,
              
              field: "Perfiles",
              render: ({Perfiles}) => {
                const cursos2 = Perfiles.map((perfil) => perfil.Cursos);
                const cursos = cursos2.flat();
                return (
                  <>
                    {cursos.map((curso) => (
                      <TableRow className={styles.border} key={curso.Modo_Evaluar}><TableCell>{curso.Modo_Evaluar}</TableCell></TableRow>
                    ))}
                  </>
                )
                    },
            },
          ]}
          data={dataListado}

          
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            }),
            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: false,
            exportAllData: false,
            exportFileName: "Tabla de recursos",
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

export default TablaListadoCurso;
