import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";
//import { makeStyles, Modal } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { getPeticionAspectos } from "../../../dist/Capacitacion/getPeticiones";
import { getPeticionRecursosIntegracion } from "../../../dist/ClimaCultura/getPeticiones";
import { Link } from "@material-ui/core";
import CreateModal from './Modals/CreateModal';
import UpdateModal from './Modals/UpdateModal';
import { render } from '@testing-library/react';
import DeleteModal from "./Modals/DeleteModals";
import { getPeticionAreasApi, getPeticionPerfilesApi, getPeticionMarcasApi, getPeticionDepartamentoApi } from "./Apis/getPeticonesApis";
import Spinner from './../../Spinner/Spinner';

const columnas = [
  {
    title: 'NOMBRE DEL RECURSO',
    field: 'NombredeRecurso',
    render: rowData => <div><a href={rowData.Enlace} target="_blank"> <img src="https://play-lh.googleusercontent.com/GBYSf20osBl2CRHbjGOyaOG5kQ3G4xbRau-dzScU9ozuXQJtnUZPkR3IqEDOo5OiVgU=w600-h300-pc0xffffff-pd" alt="100px" width="100px" /></a>{rowData.NombredeRecurso}</div>
  },
  {
    title: 'DEPARTAMENTO',
    field: 'Departamento'
  },
  {
    title: 'AREA',
    field: 'Area'
  },
  {
    title: 'PERFIL',
    field: 'Perfil'
  },
  {
    title: 'FECHA',
    field: 'Actualizacion'
  },
  {
    title: 'TURNO',
    field: 'Turno'
  }


];

function TablaIntegracion() {

  const [dataArea, setDataArea] = useState([])
  const [dataPerfil, setDaPerfil] = useState([])
  const [dataMarca, setDataMarca] = useState([])
  const [dataUnidad, setDataUnidad] = useState([])

  //-----------------------------------------
  const [data, setData] = useState([]);

  //------------------------------------
  const [modal, setModal] = useState(false);
  const [abrircerrarModalEliminar, setAbrircerrarModalEliminar] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [updateData, setUPdateData] = useState({
    id: "",
    enlace: "",
    area: "",
    marca: "",
    perfil: "",
    turno: "",
    unidad: "",
    nombre: ""
  });

  useEffect(() => {

    getPeticionAreasApi().then((datos) => {
      setDataArea(datos)
      //console.log(datos)
    })

    getPeticionPerfilesApi().then((datos) => {
      //console.log(datos)
      setDaPerfil(datos)
    });


    getPeticionMarcasApi().then((datos) => {
      setDataMarca(datos)
    });


    getPeticionDepartamentoApi().then((datos) => {
      {
        setDataUnidad(datos)
      }
    });

    getPeticionRecursosIntegracion().then((data) => {
      setData(data)
    });


  }, []);

  const stateModal = () => {
    setModal(!modal);
  }

  const stateModalUpdate = () => {
    setUpdateModal(!updateModal);
  }

  const stateModalEliminar = () => {
    setAbrircerrarModalEliminar(!abrircerrarModalEliminar);
  }

  const updateDataModal = (rowData) => {
    setUPdateData({
      id: rowData.Idrecurso,
      enlace: rowData.Enlace,
      area: rowData.Idarea,
      marca: rowData.Idmarca,
      perfil: rowData.Idperfil,
      turno: rowData.IdTurno,
      unidad: rowData.Idunidad,
      nombre: rowData.NombredeRecurso
    }
    );
    stateModalUpdate();
  }

  const [idRecursoEliminar, setIdRecursoEliminar] = useState({ id: '' })
  const seleccionarRecursoAeliminar = (idRecurso) => {
    setIdRecursoEliminar({ id: idRecurso })
    stateModalEliminar();
  }



  const useActualizarTabla = () => {
    setData([])
    getPeticionRecursosIntegracion().then((datos) => {
      setData(datos)
    });

  }

  return (

    <Fragment>
      {
        <button
          className="bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700"
          onClick={() => stateModal()}
        >
          AGREGAR
        </button>
      }

      <MaterialTable
        title={''}
        columns={[
          {
            title: 'NOMBRE DEL RECURSO',
            field: 'NombredeRecurso',
           // render: rowData => <div><a href={rowData.Enlace} target="_blank"> <img src="https://play-lh.googleusercontent.com/GBYSf20osBl2CRHbjGOyaOG5kQ3G4xbRau-dzScU9ozuXQJtnUZPkR3IqEDOo5OiVgU=w600-h300-pc0xffffff-pd" alt="100px" width="100px" /></a>{rowData.NombredeRecurso}</div>
           render: rowData => <a href={rowData.Enlace} target="_blank">{rowData.NombredeRecurso}</a>


          },
          {
            title: 'DEPARTAMENTO',
            field: 'Departamento'
          },
          {
            title: 'AREA',
            field: 'Area'
          },
          {
            title: 'PERFIL',
            field: 'Perfil'
          },
          {
            title: 'FECHA',
            field: 'Actualizacion'
          },
          {
            title: 'TURNO',
            field: 'Turno'
          }

        ]}
        data={data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (event, rowData) => updateDataModal(rowData)

          },
          {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => seleccionarRecursoAeliminar(rowData.Idrecurso)
          }
        ]}

        options={{

        
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
          exportFileName: "Tabla Material de Integración",
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
          header: {
            actions: "ACCIONES",
          },
        }
        }


      />



      <CreateModal
        isOpen={modal}
        close={stateModal}
        actualizar={useActualizarTabla}
        dataArea={dataArea}
        dataPerfil={dataPerfil}
        dataMarca={dataMarca}
        dataUnidad={dataUnidad}
      />
      <UpdateModal
        isOpen={updateModal}
        close={stateModalUpdate}
        data={updateData}
        setData={setUPdateData}
        actualizar={useActualizarTabla}
        dataArea={dataArea}
        dataPerfil={dataPerfil}
        dataMarca={dataMarca}
        dataUnidad={dataUnidad}
      />

      <DeleteModal
        isOpen={abrircerrarModalEliminar}
        close={stateModalEliminar}
        data={idRecursoEliminar}
        actualizar={useActualizarTabla}
      />
    </Fragment>

  );
}


function exporTablaIntegracion() {

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Material de Integración
        </h3>

      </div>
      <TablaIntegracion />

    </div>

  )
}

export default exporTablaIntegracion;