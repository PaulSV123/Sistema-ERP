import {
  AppBar,
  Box,
  CircularProgress,
  makeStyles,
  Modal,
  Tab,
  Tabs,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import Spinner from "../Spinner/Spinner";
import { getPeticionListarPostEntre } from "../../dist/getPeticiones";
import FormarGruposEntre from "./FormarGruposEntre";
import { getPeticionListarReclutadores } from "../../dist/Capacitacion/getPeticiones";
import ModalResponse from "../../partials/ModalResponse";
import ModalInfoPostulante from "./ModalInfoPostulante";
import { putPeticionActualizarPostulante } from "../../dist/putPeticiones";

const filtroTurno = {
  Mañana: "Mañana",
  "Mañana y tarde": "Mañana y tarde",
  Tarde: "Tarde",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#4b5563",
  },
  tabs: {
    width: "500px",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    position: "absolute",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    // }border: '2px solid #000',
    borderRadius: "0.3rem",
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const initGrupoEnte = {
  idEncargado:'',
  fechaEntre:new Date(),
  postulantes:[],
  link:'',
}

const initialResponse = {
  status: null,
  msg: "",
  modal: false,
};

const PostulantesEntrevistar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [left, setLeft] = useState([]);
  const [reclutadores,setReclutadores]=useState([]);
  const [grupoEntre,setGrupoEntre] = useState(initGrupoEnte);
  const [modalInfoPost, setModalInfoPost] = useState({
    infoPost: null,
    open: false,
  });
  const [response,setResponse] = useState(initialResponse);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getPeticionListarPostEntre(setData);
    getPeticionListarReclutadores(setReclutadores);
    console.log("asd");
  }, []);

  useEffect(()=>{
    if(response.status < 300){
      getPeticionListarPostEntre(setData);
      setGrupoEntre(initGrupoEnte);
    }
  },[response])

  useEffect(()=>{
    //console.log(data);
    if(data.length > 0){
      let obj1 = [];
      data.forEach(el => {
        obj1.push({idPost:el.NUMERO,descrip:`${el.Nombre_Apellido} | ${el.DNI}` })
      });
      setLeft(obj1);
      //console.log(obj1);
    }
  },[data])


  /* const bodyModalInfoPost = (
    <div className={classes.modal}>
      <div className="relative">
        <span onClick={() => setModalInfoPost({ infoPost: null, open: false })} className="absolute top-0 right-0 p-1  text-lg font-semibold cursor-pointer">X</span>
      <h1 className="font-medium text-xl text-center pt-3 mb-3">Datos del Postulante</h1>
      <div className="m-2 ">
        {modalInfoPost.infoPost ? (
          <>
          <table className="w-full">
            <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Nombres y Apellidos:</th>
              <td className="px-6 py-1" >{modalInfoPost.infoPost.Nombre_Apellido}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Dni:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.DNI}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Fecha de Nacimiento:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.FechadeNacimiento}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Celular:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.CELULAR}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Email:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.CORREO}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Carrera:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.CARRERA}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-1"><b>Ciclo Actual:</b>&nbsp;{modalInfoPost.infoPost.CicloActual}</td>
              <td className="px-6 py-1"><b>Experiencia Previa:</b>&nbsp;{modalInfoPost.infoPost.ExperienciaPrevia === 'S'?'Si':'No'}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="px-6 py-1">Turno:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.TURNO}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Link CV:</th>
              <td className="px-6 py-1"><a href={modalInfoPost.infoPost.LinkdeCV} target='_blank' rel="noreferrer" >{modalInfoPost.infoPost.LinkdeCV}</a></td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Departamento:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.DEPARTAMENTO}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Area:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.AREA}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-1">Perfil:</th>
              <td className="px-6 py-1">{modalInfoPost.infoPost.PERFIL}</td>
            </tr>
            </tbody>
            </table>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      </div>
    </div>
  ); */

  return (
    <div className="container mx-auto">
      <h1 className="mt-6 mb-8 text-center text-lg font-semibold col-span-2  text-black">
        Tabla Postulantes a Entrevistar
      </h1>
      <br />
      <br />
      <div className="bg-white">
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              label="  Postulantes a Entrevistar  "
              wrapped
              {...a11yProps(0)}
            />
            <Tab
              label="  Formar Grupos Entrevistas  "
              wrapped
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className="pt-4">
            <MaterialTable
              columns={[
                { title: "TURNO", field: "TURNO", lookup: filtroTurno },
                {
                  title: "NOMBRES Y APELLIDOS",
                  field: "Nombre_Apellido",
                  filtering: false,
                },
                { title: "DNI", field: "DNI", filtering: false },
                {
                  title: "DEPARTAMENTO",
                  field: "DEPARTAMENTO",
                  editable: false /* lookup: unidad  */,
                },
                {
                  title: "ÁREA",
                  field: "AREA",
                  editable: false /*  lookup: areas */,
                },
                {
                  title: "PERFIL",
                  field: "PERFIL",
                  editable: false /* lookup: perfilesTabla */,
                },
                {
                  title: "TURNO",
                  field: "TURNO",
                  lookup: filtroTurno,
                  editable: false,
                },
              ]}
              data={data}
              onRowClick={(event, rowData) =>
                setModalInfoPost({ infoPost: rowData, open: true })
              }
              options={{
                filtering: true,
                headerStyle: {
                  backgroundColor: "#E2E2E2  ",
                },

                searchFieldAlignment: "left",
                showTitle: false,
                exportButton: true,

                exportAllData: true,
                exportFileName: "Tabla de Postulantes a Entrevistar",
                // actionsColumnIndex: -1,
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: "No hay postulantes para entrevistar",
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormarGruposEntre
            left={left}
            setLeft={setLeft}
            grupoEntre={grupoEntre}
            setGrupoEntre={setGrupoEntre}
            reclutadores={reclutadores}sadsa
            setResponse= {setResponse}
          />
        </TabPanel>
      </div>
      {/* <Modal
        open={modalInfoPost.open}
        onClose={() => setModalInfoPost({ infoPost: null, open: false })}
      >
        {bodyModalInfoPost}
      </Modal> */}
      <ModalInfoPostulante modalInfoPost={modalInfoPost} onclose={() => setModalInfoPost({ infoPost: null, open: false })} />
      <ModalResponse
        response={response}
        handleCloseResponse={()=>setResponse(initialResponse)}
      />
    </div>
  );
};

export default PostulantesEntrevistar;
