import React, { useEffect, useState } from 'react';
import { makeStyles, Modal, TextField } from '@material-ui/core';
import MaterialTable from 'material-table';
import Spinner from '../Spinner/Spinner';
import {
  getPeticionAreasFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionPerfilesFiltro,
} from '../../dist/getPeticiones';
import { getPeticionPracticante } from '../../dist/Capacitacion/getPeticiones';
import { putCulminoCapacitacion } from '../../dist/Capacitacion/putPeticion';
import { deleteNoTerminoCapacitacion } from '../../dist/Capacitacion/deletePeticiones';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '21rem',
    backgroundColor: theme.palette.background.paper,
    // }border: '2px solid #000',
    borderRadius: '0.3rem',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modal1: {
    position: 'absolute',
    width: '23rem',
    height: '12rem',
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },  modalCulmino: {
    position: 'absolute',
    width: '23rem',
    height: '19rem',
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 5),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
  ,
  inputlarge: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '12rem',
    // [theme.breakpoints.up("lg")]: {
    //   width: "auto",
    // },
    [theme.breakpoints.between('md')]: {
      width: '100%',
    },
  },
  button_aceptar: {
    padding: '5px  12px 5px  12px',
    width: '100%',
    color: 'black',
    backgroundColor: '#f09208',
    border: '1px solid black',
    borderRadius: '5%',
  },
  button_cancelar: {
    padding: '5px  12px 5px  12px',
    width: '100%',
    color: 'white',
    backgroundColor: '#383837',
    border: '1px solid black',
    borderRadius: '5%',
  },
  error: {
    backgroundColor: 'red',
    padding: '3px  4px 3px  4px',
    color: 'white',
    textAlign: 'center',
    borderRadius: '5px',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  texto: {
    flex: '1 1 0%',
    fontWeight: '600',
    color: '#4B5563',
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif',
  },
}));

function TablaUsuarios() {
  const styles = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [practicantes, setPracticantes] = useState([]);
  const [modalCulmino, setModalCulmino] = useState(false);
  const [modalNoTermino, setModalNoTermino] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [error, setError] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [caso, setCaso] = useState('');
  const [linkConvenio, setLinkConvenio] = useState('')

  const [practicante, setPracticante] = useState({
    id: '',
    departamento: '',
    area: '',
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    turno: '',
    estado: '',
  });

  const [idCapacitacion, setIdCapacitacion] = useState(null);
  const [idPracticante, setIdPracticante] = useState(null);
  const [estadoCap, setEstadoCap] = useState('');

  useEffect(() => {
    getPeticionPracticante(setPracticantes, setLoading);
    getPeticionPerfilesFiltro(setPerfilesTabla, setLoading);
    getPeticionAreasFiltro(setAreas, setLoading);
    getPeticionDepartamentoFiltro(setUnidad, setLoading);
  }, [loading]);

  const actualizarTabla = () => {
    setPracticantes([]);
    getPeticionPracticante(setPracticantes, setLoading);
  };

  console.log(practicantes);

  const { departamento, area, nombre, fechaInicio, fechaFin, turno, estado } =
    practicante;

  // const abrirCerrarModalCulmino = () => {
  //   setModalCulmino(!modalCulmino);
  //   if (modalCulmino) {
  //     setPracticante({
  //       numero: "",
  //       estado: "",
  //     });
  //     setErrorUpdate([]);
  //   }
  // };

  const abrirCerrarModalConfirmar = () => {
    setModalConfirmar(!modalConfirmar);
  };

  const abrirCerrarModalCulmino = () => {
    setModalCulmino(!modalCulmino);
    if (modalCulmino) {
      setPracticante({
        estado: '',
      });
      setLinkConvenio('');
      setErrorUpdate([]);
    }
  };

  const handleSubmitCulmino = async (e) => {
    e.preventDefault();
     setCaso("Culmino");
     abrirCerrarModalCulmino();
     await putCulminoCapacitacion(idCapacitacion,linkConvenio , setLoading);
     abrirCerrarModalConfirmar();
     setLoading(false);
     actualizarTabla()
  };

  const abrirCerrarModalNoTermino = () => {
    setModalNoTermino(!modalNoTermino);
    if (modalNoTermino) {
      setPracticante({
        id: '',
        estado: '',
      });
    }
  };

  const handleSubmitNoTermino = () => {
    deleteNoTerminoCapacitacion(practicante);
    setCaso('NoTermino');
    abrirCerrarModalNoTermino();
    setLoading(true);
    abrirCerrarModalConfirmar();
  };

  /* const handleSubmitNoTermino = async (e) => {
    setCaso('NoTermino');
    abrirCerrarModalNoTermino();
    await putNoTerminoCapacitacion(idCapacitacion, setLoading);
    abrirCerrarModalConfirmar();
    setLoading(false);
    actualizarTabla();
  }; */

  const bodyConfirmar = (
    <div className={styles.modal}>
      <div className="flex flex-col place-content-center">
        {caso === 'Culmino' && (
          <h3 className="text-center text-lg font-bold">
            El estado de la capacitación se actualizó correctamente
          </h3>
        )}
        {caso === 'NoTermino' && (
          <h3 className="text-center text-lg font-bold">
            El registro ha cambiado de subestado correctamente
          </h3>
        )}
        <button
          onClick={() => abrirCerrarModalConfirmar()}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
          // className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
        >
          <img
            src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
            style={{ width: '1.5rem', height: '1.5rem' }}
            alt=""
          />
        </button>
      </div>
    </div>
  );

  const bodyCulmino = (
    <div className={styles.modalCulmino}>
      <form onSubmit={handleSubmitCulmino}>
        <div className="px-2 py-2">
          <h2 className="text-center text-xl font-bold">
            Culminar Capacitación
          </h2>
          <p>Para culminar la capacitación por favor ingrese el link del convenio</p>

          <div className="flex">  
          <TextField
            // disabled={loading}
            required
            className="flex-1"
            style={{ width: '200px' }}
            name="url"
            label="Link de Convenio"
            type="url"
             onChange={(e) => setLinkConvenio(e.target.value)}
             value={linkConvenio}
          />
</div>

          <div className="flex justify-evenly items-center mt-5">
            <button
              type="submit"
              color="primary"
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            >
              ACEPTAR
            </button>
            |
            <button
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              onClick={abrirCerrarModalCulmino}
            >
              CANCELAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const bodyNoTermino = (
    <div className={styles.modal1}>
      <div className="px-2 py-2">
        <h2 className="text-center text-xl font-bold">
          ¿Desea cancelar la capacitación?
        </h2>
        <div className="flex justify-evenly items-center mt-4">
          <button
            color="primary"
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
            onClick={handleSubmitNoTermino}
          >
            ACEPTAR
          </button>
          |
          <button
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            onClick={abrirCerrarModalNoTermino}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );

  const seleccionarPracticante = (Practicante, caso) => {
    if (caso === 'NoTermino') {
      setPracticante(Practicante.Capa_Id);
      abrirCerrarModalNoTermino();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Practicantes Seleccionados
        </h3>
      </div>
      <div className="mt-3">
        <MaterialTable
          columns={[
            {
              title: 'DEPARTAMENTO',
              field: 'Departamento',
              lookup: unidad,
            },
            {
              title: 'AREA',
              field: 'Area',
              lookup: areas,
            },
            { title: 'FECHA DE FIN', field: 'Fecha de Fin' },
            { title: 'FECHA DE INICIO', field: 'Fecha de Inicio' },
            { title: 'NOMBRE', field: 'Nombre', filtering: false },
            { title: 'DNI', field: 'Dni', filtering: false },
            { title: 'CELULAR', field: 'Telefono', filtering: false },
            { title: 'TURNO', field: 'Turno', filtering: false },
            { title: 'ESTADO', field: 'Estado', filtering: false },
            { title: 'LINK DE CV', field: 'Curriculum', filtering: false },
          ]}
          data={practicantes}
          actions={[
            {
              icon: 'check',
              tooltip: 'Culmino capacitacion',
              onClick: (event, rowData) => {
                setIdCapacitacion(rowData.Capa_Id);
                setEstadoCap(parseInt(rowData.Estado));
                abrirCerrarModalCulmino();
                //seleccionarPracticante(rowData, "CULMINO");
                //putCulminoCapacitacion(parseInt(rowData.ID), setLoading);
              },
            },
            {
              icon: 'cancel',
              tooltip: 'No termino capacitacion',
              onClick: (event, rowData) => {
                //setIdCapacitacion(rowData.Capa_Id);
                seleccionarPracticante(rowData, "NoTermino");
                //setEstadoCap(parseInt(rowData.Estado));
                abrirCerrarModalNoTermino();
              },
            },
          ]}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            headerStyle: {
              backgroundColor: '#E2E2E2  ',
            },
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? '#EEE' : '#FFF',
            }),
            searchFieldAlignment: 'left',
            showTitle: false,
            exportButton: true,
            exportAllData: true,
            exportFileName: 'Tabla de Practicantes Seleccionados',
            actionsColumnIndex: -1,
            filtering: true,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "No hay Datos",
              addTooltip: 'Agregar',
              deleteTooltip: 'Eliminar',
              editTooltip: 'Editar',
              filterRow: {
                filterTooltip: 'Filtrar',
              },
            },
            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'filas',
              labelRowsPerPage: 'filas por pagina:',
              firstAriaLabel: 'Primera pagina',
              firstTooltip: 'Primera pagina',
              previousAriaLabel: 'Pagina anterior',
              previousTooltip: 'Pagina anterior',
              nextAriaLabel: 'Pagina siguiente',
              nextTooltip: 'Pagina siguiente',
              lastAriaLabel: 'Ultima pagina',
              lastTooltip: 'Ultima pagina',
            },
            toolbar: {
              nRowsSelected: '{0} ligne(s) sélectionée(s)',
              showColumnsTitle: 'Ver columnas',
              showColumnsAriaLabel: 'Ver columnas',
              exportTitle: 'Exportar',
              exportAriaLabel: 'Exportar',
              exportCSVName: 'Exportar en formato CSV',
              exportPDFName: 'Exportar como PDF',
              searchTooltip: 'Buscar',
              searchPlaceholder: 'Buscar',
            },
            header: {
              actions: 'ACCIONES',
            },
          }}
        />
      </div>
      <Modal open={modalCulmino} onClose={abrirCerrarModalCulmino}>
        {bodyCulmino}
      </Modal>
      <Modal open={modalConfirmar} onClose={abrirCerrarModalConfirmar}>
        {bodyConfirmar}
      </Modal>
      <Modal open={modalNoTermino} onClose={abrirCerrarModalNoTermino}>
        {bodyNoTermino}
      </Modal>
    </div>
  );
}
export default TablaUsuarios;
