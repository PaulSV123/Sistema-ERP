import React, { useEffect, useState } from "react";
import Error from "../../../components/item/Error";
import MaterialTable from "material-table";
import Spinner from "../../Spinner/Spinner";
import { getActividadesGerenciales } from "../../../dist/ClimaCultura/getPeticiones";
import CreateModal from "./Modals/CreateModal";
import DeleteModal from "./Modals/DeleteModal";
import UpdateModal from "./Modals/UpdateModal";

function TablaActividadesGerenciales() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getActividadesGerenciales().then((dataActividades) => {
      setData(dataActividades);
    });
  }, []);

  const actualizarTabla = () => {
    setData([]);
    getActividadesGerenciales().then((dataActividades) => {
      setData(dataActividades);
    });
  };

  //Agregar modal
  const [modal, setModal] = useState(false);
  const [abrircerrarModalEliminar, setAbrircerrarModalEliminar] =
    useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [updateData, setUPdateData] = useState({
    id:"",
    actividad_tarea: "",
    fecha: "",
    observacion: "",
    enlace: ""
  });
  const stateModal = () => {
    setModal(!modal);
  };

  const stateModalUpdate = () => {
    setUpdateModal(!updateModal);
  };

  const stateModalEliminar = () => {
    setAbrircerrarModalEliminar(!abrircerrarModalEliminar);
  };

  const updateDataModal = (rowData) => {
    setUPdateData({
      id: rowData.ID,
      actividad_tarea:rowData["ACTIVIDAD/TAREA"],
      fecha: rowData.FECHA,
      observacion: rowData.OBSERVACIONES,
      enlace: rowData["ENLACE/REUNION"]

    });
    stateModalUpdate();
    //console.log (updateData)
  };

  const [idActividadEliminar, setIdActividadEliminar] = useState({ 
    id: "" });

  const seleccionarActiviadEliminar = (rowData) => {
    setIdActividadEliminar({
      id:rowData.ID,
    });
    stateModalEliminar();
  };

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Actividades Gerenciales
        </h3>
      </div>
      <div className="mt-3">
        {
          <button
          className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black"
            onClick={() => stateModal()}
          >
            AGREGAR
          </button>
        }

        <MaterialTable
          columns={[
            {
              title: "ACTIVIDAD/TAREA",
              field: "ACTIVIDAD/TAREA",
              filtering: false,
            },
            {
              title: "OBSERVACIONES",
              field: "OBSERVACIONES",
              filtering: false,
            },
            {
              title: "FECHA ",
              field: "FECHA",
              filtering: false,
            },
            {
              title: "ENLACE DE REUNION",
              field: "ENLACE/REUNION",
              filtering: false,
            },
          ]}
          data={data}
          // onRowClick={(evt, selectedRow) =>
          //   setSelectedRow(selectedRow.tableData.id)
          // }
          actions={[
            {
              icon: "edit",
              tooltip: "Editar",
              onClick: (event, rowData) => updateDataModal(rowData),
            },
            {
              icon: "delete",
              tooltip: "Eliminar",
              onClick: (event, rowData) =>
              seleccionarActiviadEliminar(rowData),
            },
          ]}
          options={{
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            // rowStyle: (rowData) => ({
            //   backgroundColor:
            //     selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            // }),

            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,
            exportAllData: true,
            exportFileName: "Tabla Actividades Gerenciales",
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
            header: {
              actions: "ACCIONES",
            },
          }}
        />
      </div>

      <CreateModal
        isOpen={modal}
        close={stateModal}
        actualizar={actualizarTabla}
      />
      <UpdateModal
        isOpen={updateModal}
        close={stateModalUpdate}
        data={updateData}
        setData={setUPdateData}
        actualizar={actualizarTabla}
      />
      <DeleteModal
        isOpen={abrircerrarModalEliminar}
        close={stateModalEliminar}
        data={idActividadEliminar}
        actualizar={actualizarTabla}
      /> 
    </div>
  );
}

export default TablaActividadesGerenciales;
