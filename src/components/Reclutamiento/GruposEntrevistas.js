import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { getListarGruposEntrevistas } from "../../dist/getPeticiones";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ModalInfoPostulante from "./ModalInfoPostulante";
import ModalDeleteConfirm from "../../partials/ModalDeleteConfirm";
import {
  deleteDeshacerGrupoEntrev,
  deleteEliminarEntredelGrupo,
} from "../../dist/deletePeticiones";
import ModalResponse from "../../partials/ModalResponse";
import EditIcon from "@material-ui/icons/Edit";
import { TextField } from "@mui/material";
import TableLinkReuEntre from "./GrupoEntrevistas/TableLinkReuEntre";
import { putActualizarEstadoEntrevGrupo } from "../../dist/putPeticiones";

const initialResponse = {
  status: null,
  msg: "",
  modal: false,
};



const GruposEntrevistas = () => {
  const [grupos, setGrupos] = useState([]);
  const [modalInfoPost, setModalInfoPost] = useState({
    infoPost: null,
    open: false,
  });
  const [response, setResponse] = useState(initialResponse);
  const [deleteGrupEntre, setDeleteGrupEntre] = useState({
    idGrup: null,
    open: false,
  });
  const [deleteEntreGrup, setDeleteEntreGrup] = useState({
    idPost: null,
    open: false,
  });
  const [entreGrupo, setEntreGrupo] = useState({ idGrup: null, open: false });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getListarGruposEntrevistas(setGrupos);
    setDeleteGrupEntre({ idGrup: null, open: false });
    setDeleteEntreGrup({ idPost: null, open: false });
    setEntreGrupo({ idGrup: null, open: false });
  }, [response]);

  const handleSubmitDeleteGrupoEntre = () => {
    setLoading(true);
    deleteDeshacerGrupoEntrev(deleteGrupEntre.idGrup, setResponse, setLoading);
  };

  const handleSubmitDeleteEntreGrupo = () => {
    setLoading(true);
    deleteEliminarEntredelGrupo(
      deleteEntreGrup.idPost,
      setResponse,
      setLoading
    );
  };

  const handleSubmitEstadoGrupoEntre = ()=>{
    setLoading(true);
    putActualizarEstadoEntrevGrupo(entreGrupo.idGrup,{Grup_Estado_Entrevista:20},setResponse,setLoading)
  }

  return (
    <div className="container mx-auto">
      <h1 className="mt-6 mb-8 text-center text-lg font-semibold col-span-2  text-black">
        Grupos de Entrevistas
      </h1>
      <br />
      <MaterialTable
        columns={[
          {
            title: "ENCARGADO",
            field: "Encargado",
            filtering: false,
          },
          {
            title: "FECHA ENTREVISTA",
            field: "Fecha",
            editable: false,
            filtering: false,
          },
          {
            title: "# Postulantes",
            field: "Numero_postulantes",
            editable: false,
            filtering: false,
          },
          {
            title: "ESTADO",
            field: "Estado",
            editable: false,
            filtering: false,
          },
        ]}
        data={grupos}
        detailPanel={(rowData) => {
          return (
            <div className="bg-gray-100 p-2 pb-4">
              <TableLinkReuEntre data={{linkEntrevista:rowData.Link_entrevista,idGrupo:rowData.Id_grupo,estado:rowData.Id_Estado}} />
              {/* <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>LINK DE LA REUNIÓN:</b>
                    </TableCell>
                    <TableCell>                    
                        <a
                          href={rowData.Link_entrevista}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {rowData.Link_entrevista}
                        </a>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <IconButton
                        //onClick={() => setOnEditLink(!onEditLink)}
                        className="p-1"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>POSTULANTE</TableCell>
                    <TableCell>DEPARTAMENTO</TableCell>
                    <TableCell>AREA</TableCell>
                    <TableCell>PERFIL</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.Postulantes.map((post) => (
                    <TableRow>
                      <TableCell>{post.Postulante}</TableCell>
                      <TableCell>{post.Unidad}</TableCell>
                      <TableCell>{post.Area}</TableCell>
                      <TableCell>{post.Perfil}</TableCell>
                      <TableCell className="w-28">
                        <div className="flex align-items justify-between">
                          <IconButton
                            aria-label="eye"
                            className="p-1"
                            onClick={() =>
                              setModalInfoPost({ infoPost: post, open: true })
                            }
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          {rowData.Id_Estado == 19 && (
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                setDeleteEntreGrup({
                                  idPost: post.Id_Postulante,
                                  open: true,
                                })
                              }
                              className="p-1"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        }}
        actions={[
          (rowData) => ({
            icon: "check",
            tooltip: "Entrevistar",
            onClick: (event, rowData) =>
              setEntreGrupo({ idGrup: rowData.Id_grupo, open: true }),
            disabled: rowData.Id_Estado != 19,
          }),
          (rowData) => ({
            icon: "delete",
            tooltip: "Deshacer Grupo",
            onClick: (event, rowData) =>
              setDeleteGrupEntre({ idGrup: rowData.Id_grupo, open: true }),
            disabled: rowData.Id_Estado != 19,
          }),
          /* {
            icon: 'delete',
            tooltip: 'Deshacer Grupo',
            onClick: (event, rowData) => alert("You saved " + rowData.name),
            hidden: rowData => {  return rowData.Id_Estado == 18 ? true:false}
          } */
        ]}
        options={{
          filtering: true,
          headerStyle: {
            backgroundColor: "#E2E2E2  ",
          },
          actionsColumnIndex: -1,
          searchFieldAlignment: "left",
          showTitle: false,
          exportButton: true,
          exportAllData: true,
          exportFileName: "Tabla de Grupos de Entrevistas",
          // actionsColumnIndex: -1,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "No hay grupos de Entrevistas",
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
      <ModalInfoPostulante
        modalInfoPost={modalInfoPost}
        onclose={() => setModalInfoPost({ infoPost: null, open: false })}
      />
      <ModalDeleteConfirm
        msg={`¿Entrevistar a este grupo?`}
        openModal={entreGrupo.open}
        onCloseModal={() => setEntreGrupo({ idGrup: null, open: false })}
        submitDelete={handleSubmitEstadoGrupoEntre}
        loading={loading}
        confirmBtn={"Si"}
      />
      <ModalDeleteConfirm
        msg={`¿Realmente desea eliminar este Grupo de Entrevista?`}
        openModal={deleteGrupEntre.open}
        onCloseModal={() => setDeleteGrupEntre({ idGrup: null, open: false })}
        submitDelete={handleSubmitDeleteGrupoEntre}
        loading={loading}
      />
      <ModalDeleteConfirm
        msg={`¿Realmente desea eliminar al postulante de este grupo?`}
        openModal={deleteEntreGrup.open}
        onCloseModal={() => setDeleteEntreGrup({ idPost: null, open: false })}
        submitDelete={handleSubmitDeleteEntreGrupo}
        loading={loading}
      />
      <ModalResponse
        response={response}
        handleCloseResponse={() => setResponse(initialResponse)}
      />
    </div>
  );
};

export default GruposEntrevistas;
