import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Error from "../../components/item/Error";
import { makeStyles } from "@material-ui/core/styles";
import { getPeticionCursosDuros } from "../../dist/Capacitacion/getPeticiones";
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@material-ui/core";
import { postCurso } from "../../dist/Capacitacion/postPeticiones";
import { putCurso } from "../../dist/Capacitacion/putPeticion";
import { deleteCurso } from "../../dist/Capacitacion/deletePeticiones";
import { getPeticionPerfiles } from "../../dist/getPeticiones";
import { getPeticionPlataformas } from "../../dist/Capacitacion/getPeticiones";


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
    height: "8rem",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modal2: {
    position: "absolute",
    width: "23rem",
    height: "12rem",
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

function TablaHabilidadesDuras() {
  const styles = useStyles();
  const [dataCursosDuros, setDataCursosDuros] = useState([]);
  const [caso, setCaso] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [error, setError] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [codigoCurso, setCodigoCurso] = useState("");
  const [perfilCurso, setPerfilCurso] = useState("");
  const [idCurso, setIdCurso] = useState(null);
  const [codigoNombre, setCodigoNombre] = useState("");
  const [codigoEnlace, setCodigoEnlace] = useState("");
  const [plataformaLista, setPlataFormaLista] = useState([]);
  const [plataformabyGet, setplataformabyGet] = useState([]);
  const [tiempoCurso, setTiempoCurso] = useState("");
  const [modoevaluarCurso, setModoevaluarCurso] = useState("");
  const [modoevaluarenlaceCurso, setModoevaluarenlaceCurso] = useState("");
  const [tipoCurso, setTipoCurso] = useState(null);
  const [perfilLista, setPerfilLista] = useState([]);
  const [curso, setCurso] = useState({
    id: "",
    codigo: "",
    perfil: "",
    tipo: "",
    nombre: "",
    enlace: "",
    plataforma: "",
    tiempo: new Date().toISOString().substring(0, 10),
    modoEvaluar: "",
    modoEvaluarEnlace: "",
  });

  useEffect(() => {
    getPeticionCursosDuros(setDataCursosDuros, setLoading);
    getPeticionPerfiles(setPerfilLista, setLoading);
    getPeticionPlataformas(setplataformabyGet, setLoading)
  }, [loading]);

  const {
    id,
    codigo,
    perfil,
    tipo,
    nombre,
    enlace,
    plataforma,
    tiempo,
    modoEvaluar,
    modoEvaluarEnlace,
  } = curso;

  const actualizarTabla = () => {
    setDataCursosDuros([]);
    getPeticionCursosDuros(setDataCursosDuros, setLoading);
  };

  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    postCurso(codigoCurso, perfilCurso, tipoCurso, setLoading);
    setCodigoCurso("");
    setPerfilCurso("");
    setTipoCurso("");
    setIdCurso(null);
    setCaso("Agregar");
    abrirCerrarModalAgregar();
    abrirCerrarModalConfirmar();
  };

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar);
    setCurso({
      id: "",
      perfil: "",
      codigo: "",
      tipo: "",
    });
    setError([]);
  };

  const bodyAgregar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Agregar Curso</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitAgregar} className="flex flex-col align-middle ">
        <div className="flex  justify-evenly md:flex-col">
          <div className="flex flex-col ">
            <TextField
              className="flex-1"
              onChange={(e) => setCodigoCurso(e.target.value)}
              required
              id="codigo"
              label="Codigo"
            />
            <Error errors={error["codigo"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setPerfilCurso(e.target.value)}
              required
              id="perfil"
              label="Perfil"
            />
            <Error errors={error["perfil"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setTipoCurso(e.target.value)}
              required
              id="tipo"
              label="Tipo"
            />
            <Error errors={error["tipo"]}></Error>
            <br />
          </div>
        </div>
        <br />
        <div align="center">
          <button
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            type="submit"
          >
            AGREGAR
          </button>
          <button
            onClick={() => abrirCerrarModalAgregar()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
    if (modalEditar) {
      setCurso({
        id: "",
        codigo: "",
        nombre: "",
        enlace: "",
        plataforma: "",
        tiempo: new Date().toISOString().substring(0, 10),
        modoEvaluar: "",
        modoEvaluarEnlace: "",
      });
      setErrorUpdate([]);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setCaso("Editar");
    abrirCerrarModalEditar();
    await putCurso(idCurso, codigoCurso, codigoNombre, codigoEnlace, plataformaLista,
      tiempoCurso, modoevaluarCurso, modoevaluarenlaceCurso, setLoading);
    abrirCerrarModalConfirmar();
    setLoading(false);
    actualizarTabla();
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Editar Curso</h3>
      <hr />
      <br />
      <form onSubmit={handleSubmitEdit} className="flex flex-col align-middle ">
        <div className="flex justify-evenly md:flex-col ">
          <div className="flex flex-col">
            <TextField
              className="flex-1"
              onChange={(e) => setCodigoCurso(e.target.value)}
              required
              id="codigo"
              label="Codigo"
              name="Codigo"
              value={codigoCurso}
            />
            <Error errors={errorUpdate["codigo"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setCodigoNombre(e.target.value)}
              required
              id="nombre"
              label="Nombre"
              name="nombre"
              value={codigoNombre}
            />
            <Error errors={errorUpdate["nombre"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setCodigoEnlace(e.target.value)}
              required
              id="enlace"
              label="Enlace"
              name="enlace"
              value={codigoEnlace}
            />
            <Error errors={errorUpdate["enlace"]}></Error>
            <br />

            <InputLabel id="Plataformalbl" required>
              Plataforma
            </InputLabel>
            <Select
              labelId="Plataformalbl"
              label="Plataforma"
              id="plataforma"
              name="plataforma"
              value={plataformaLista}
              onChange={(e) => setPlataFormaLista(e.target.value)}
              required
            >
              {
                plataformabyGet.map((Nombre, Id) => (
                  <MenuItem key={Id} value={Nombre.ID}>{Nombre.Plataforma}</MenuItem>
                ))
              }
            </Select>
            
            <Error errors={errorUpdate["plataforma"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setTiempoCurso(e.target.value)}
              required
              id="tiempo"
              label="Tiempo"
              name="tiempo"
              type="time"
              value={tiempoCurso}
            />
            <Error errors={errorUpdate["tiempo"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setModoevaluarCurso(e.target.value)}
              required
              id="modoEvaluar"
              label="Modo Evaluar"
              name="modoEvaluar"
              value={modoevaluarCurso}
            />
            <Error errors={errorUpdate["modoEvaluar"]}></Error>
            <br />

            <TextField
              className="flex-1"
              onChange={(e) => setModoevaluarenlaceCurso(e.target.value)}
              required
              id="modoEvaluarEnlace"
              label="Modo Evaluar Enlace"
              name="modoEvaluarEnlace"
              value={modoevaluarenlaceCurso}
            />
            <Error errors={errorUpdate["ModoEvaluarEnlace"]}></Error>
            <br />
          </div>
        </div>
        <br />
        <div align="center">
          <button
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            type="submit"
          >
            EDITAR
          </button>
          <button
            onClick={() => abrirCerrarModalEditar()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
    if (modalEliminar) {
      setCurso({
        id: "",
        codigo: "",
        perfil: "",
        tipo: "",
      });
    }
  };

  const handleSubmitEliminar = () => {
    deleteCurso(curso);
    setCaso("Eliminar")
    abrirCerrarModalEliminar();
    setLoading(true);
    abrirCerrarModalConfirmar();
  };

  const bodyEliminar = (
    <div className={styles.modal2}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">¿Desea eliminar el curso seleccionado?</h2>
        <div className="flex justify-evenly items-center mt-4">
          <button
            color="primary"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            onClick={handleSubmitEliminar}
          >
            ACEPTAR
          </button>
          |
          <button
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            onClick={abrirCerrarModalEliminar}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );

  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  const bodyConfirmar = (
    <div className={styles.modal1}>
      <div className="flex flex-col place-content-center">
        {caso === "Agregar" && (
          <h3 className="text-center text-lg font-bold">Curso agregado correctamente</h3>
        )}
        {caso === "Editar" && (
          <h3 className="text-center text-lg font-bold">Curso modificado correctamente</h3>
        )}
        {caso === "Eliminar" && (
          <h3 className="text-center text-lg font-bold">Curso eliminada correctamente</h3>
        )}
        <button
          onClick={() => {abrirCerrarModalConfirmar()}}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
        // className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
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

  const seleccionarCurso = (curso, caso) => {
    if (caso === "ELIMINAR") {
      setCurso(curso.Id_Curso);
      abrirCerrarModalEliminar();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mt-3">

        <MaterialTable
          columns={[
            {
              title: "CODIGO",
              field: "Codigo",
              filtering: false,
            },
            {
              title: "ENLACE",
              field: "Enlace",
              filtering: false,
            },
            {
              title: "MODO A EVALUAR",
              field: "Modo_Evaluar",
              filtering: false,
            },
            {
              title: "NOMBRE",
              field: "Nombre",
              filtering: false,
            },
            {
              title: "PERFIL",
              field: "Perfil",
              filtering: false,
            },
            {
              title: "PLATAFORMA",
              field: "Plataforma",
              filtering: false,
            },
            {
              title: "TIPO DE CURSO",
              field: "Tipo_Curso",
              filtering: false,
            },
          ]}
          data={dataCursosDuros}
          //onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
          actions={[
            {
              icon: "edit",
              tooltip: "Editar curso",
              onClick: (event, rowData) => {
                setIdCurso(rowData.Id_Curso);
                setCodigoCurso(rowData.Codigo);
                setCodigoNombre(rowData.Nombre);
                setCodigoEnlace(rowData.Enlace);
                setPlataFormaLista(rowData.Plataforma);
                setTiempoCurso(rowData.Tiempo);
                setModoevaluarCurso(rowData.Modo_Evaluar);
                setModoevaluarenlaceCurso(rowData.Modo_Evaluar_Enlace);
                setModalEditar(true);
              }
            },
            {
              icon: "delete",
              tooltip: "Eliminar curso",
              onClick: (event, rowData) => {
                seleccionarCurso(rowData, "ELIMINAR");
              }
            },
          ]}
          options={{
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,
            exportAllData: true,
            exportFileName: "Tabla de habilidades duras",
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
      <Modal open={modalAgregar} onClose={abrirCerrarModalAgregar}>
        {bodyAgregar}
      </Modal>
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
      <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
        {bodyConfirmar}
      </Modal>
    </div>
  );
}
export default TablaHabilidadesDuras;
