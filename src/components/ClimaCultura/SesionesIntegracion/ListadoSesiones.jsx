// import { SettingsInputComponentSharp } from '@material-ui/icons'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { getPeticionSesionesIntegracion, getPeticionSesionesIntegracionDepartamento, getPeticionSesionesIntegracionEncargado, getPeticionSesionesIntegracionTipo, getPeticionSesionesIntegracionTurno } from '../../../dist/ClimaCultura/getPeticiones'
import DeleteModal from './Modals/DeleteModal'
import UpdateModal from './Modals/UpdateModal'

export const ListadoSesiones = () => {

  const [data, setData] = useState([])
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [datosSelects, setDatosSelects] = useState({
    ses_integra_tipo: [],
    ses_integra_encargado: [],
    ses_integra_departamento: [],
    ses_integra_area: [],
    ses_integra_turno: []
  })
  const [rowData, setRowData] = useState({})

  useEffect(() => {
    Promise.all([
      getPeticionSesionesIntegracion(),
      getPeticionSesionesIntegracionTipo(),
      getPeticionSesionesIntegracionEncargado(),
      getPeticionSesionesIntegracionDepartamento(),
      getPeticionSesionesIntegracionTurno()
    ])
      .then( values => {
        const [sesiones, tipos, encargados, departamentos, turno] = values;

        setDatosSelects({
          ses_integra_tipo: tipos,
          ses_integra_encargado: encargados,
          ses_integra_departamento: departamentos,
          ses_integra_turno: turno
        })
        setData([...sesiones])
      })
  },[])

  const handleActualizarTabla = () => {
    getPeticionSesionesIntegracion()
      .then( sesiones => setData([...sesiones]))
  }

  const handleUpdateModal = rowData => {
    setUpdateModal(!updateModal)
    setRowData(rowData)
  }
  const handleDeleteModal = rowData => {
    setDeleteModal(!deleteModal)
    setRowData(rowData)
  }

  return (
    <div className="main mt-3 relative h-full w-full">
      <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">Listado de Sesiones</h3>
      <div className="mt-3 mx-4">
    
      <MaterialTable
        columns={[  
          {
            title: "Título de Sesión",
            field: "title"
          },
          {
            title: "Enlace de Sesión",
            field: "Meet"
          },
          {
            title: "Fecha Inicio",
            field: "start"
          },
          {
            title: "Fecha Fin",
            field: "end"
          },
          {
            title: "Encargado de Sesión",
            field: "Encargado"
          },
          {
            title: "Departamento",
            field: "Departamento"
          },
          {
            title: "Área",
            field: "Area"
          },
          {
            title: "Turno",
            field: "Turno"
          }          
          ]}
        data={ data }
        
        actions={[
          {
            icon: "edit",
            tooltip: "Editar requerimiento del personal",
            onClick: (event, rowData) => {
              handleUpdateModal(rowData)
            },
          },
          {
            icon: "delete",
            tooltip: "Eliminar requerimiento del personal",
            onClick: (event, rowData) => {
              handleDeleteModal(rowData)
            },
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
          exportFileName: "Tabla Listado de Sesiones",
          actionsColumnIndex: -1,
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

      {
        updateModal 
          ? 
            <UpdateModal
              isOpen={updateModal}
              close={handleUpdateModal}
              datosSelects={ datosSelects }
              rowData={ rowData }
              actualizarTabla = {handleActualizarTabla}
            />
          : <></>
      }
      {
        deleteModal
          ?
            <DeleteModal 
              isOpen={deleteModal}
              close={handleDeleteModal}
              rowData={ rowData }
              actualizarTabla = { handleActualizarTabla }
            /> 
          : <></>
      }
      </div>
    </div>
  )
}
