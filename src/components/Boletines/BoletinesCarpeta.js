import {
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  deleteElliminarArchivo,
  getBoletinesCarpeta,
  postSubirArchivo,
  putEditarArchivo,
} from "../../dist/Boletines/peticiones";
import Page404 from "../Page404";
import { makeStyles } from "@material-ui/core/styles";
import MyModal from "../../partials/MyModal";
import useForm from "../../hooks/useForm";
import BackupIcon from "@material-ui/icons/Backup";
import ModalResponse from "../../partials/ModalResponse";
import SubmenuFile from "./SubmenuFile";
import ModalMoverA from "./ModalMoverA";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const initialAddFile = {
  idCarpeta: null,
  archivo: null,
  descripcion: "",
};

const validationFormFile = (form) => {
  let errors = {};

  if (!form.descripcion.trim()) {
    errors.descripcion = "El campo descripcion es requerido";
  }
  if (form.archivo !== null && form.archivo !== undefined) {
    let ext = form.archivo.name.split(".").pop().toLowerCase();
    if (
      ext == "pdf" ||
      ext == "png" ||
      ext == "jpg" ||
      ext == "jpeg" ||
      ext == "gif"
    ) {
      let sizeMegaBytes = form.archivo.size / 1024; //lo pasamos de bytes a kilobytes
      if (sizeMegaBytes > 10240) {
        errors.archivo = "Solo archivos de hasta 10mb.";
      }
    } else {
      errors.archivo = "Solo se aceptan formatos pdf o imagenes";
    }
  } else {
    errors.archivo = "Cargue un archivo";
  }

  return errors;
};

const validateOnlyFile = (file) => {
  let errorFile = "";
  if (file !== null && file !== undefined) {
    let ext = file.name.split(".").pop().toLowerCase();
    if (
      ext == "pdf" ||
      ext == "png" ||
      ext == "jpg" ||
      ext == "jpeg" ||
      ext == "gif"
    ) {
      let sizeMegaBytes = file.size / 1024; //lo pasamos de bytes a kilobytes
      if (sizeMegaBytes > 10240) {
        errorFile = "Solo archivos de hasta 10mb.";
      }
    } else {
      errorFile = "Solo se aceptan formatos pdf o imagenes";
    }
  } else {
    errorFile = "Cargue un archivo";
  }

  return errorFile;
};

const initialResponse = {
  status: null,
  msg: "",
  modal: false,
};

const BoletinesCarpeta = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [idCarpeta, setIdCarpeta] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [response, setResponse] = useState(initialResponse);
  const [modalMovera, setModalMovera] = useState({
    idArchivo: null,
    open: false,
  });
  let params = useParams();
  let location = useLocation();

  let formAddFile = useForm(initialAddFile, validationFormFile);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getBoletinesCarpeta(
      params.nomCarpeta,
      setFiles,
      setIdCarpeta,
      setError,
      setLoading
    );
    console.log(location);
  }, [location.pathname]);

  const handleCloseResponse = () => {
    setResponse(initialResponse);
  };

  const handleOpenModalAddFile = () => {
    formAddFile.setErrors({});
    formAddFile.setForm(initialAddFile);
    setOpenModalAdd(true);
  };

  const clearInputFile = () => {
    formAddFile.setForm({
      ...formAddFile.form,
      archivo: null, //destructuracion
    });
  };

  const onChangeInputFile = (e) => {
    formAddFile.setErrors({});
    //console.log(e);
    const file = e.target.files[0];
    //console.log(file);
    let errorFile = validateOnlyFile(file);
    //console.log(errorFile);
    if (errorFile === "") {
      formAddFile.handleFiled(e);
    } else {
      formAddFile.setForm({
        ...formAddFile.form,
        [e.target.name]: null,
      });
      formAddFile.setErrors({ archivo: errorFile });
    }
  };

  const handleSubmitAddFile = (e) => {
    formAddFile.setErrors({});
    e.preventDefault();
    console.log(formAddFile.form);
    let err = validationFormFile(formAddFile.form);
    formAddFile.setErrors(err);
    if (Object.keys(err).length === 0) {
      let fd = new FormData();
      fd.append("idCarpeta", idCarpeta);
      fd.append("archivo", formAddFile.form.archivo);
      fd.append("descripcion", formAddFile.form.descripcion);
      setLoadingUpload(true);
      postSubirArchivo(fd, setLoadingUpload, setResponse);
    }
  };

  useEffect(() => {
    if (!loadingUpload) {
      setOpenModalAdd(false);
      setModalMovera({ idArchivo: null, open: false });
    }
    if (response.status !== null) {
      getBoletinesCarpeta(
        params.nomCarpeta,
        setFiles,
        setIdCarpeta,
        setError,
        setLoading
      );
    }
  }, [loadingUpload, response]);

  const bodyCreateFile = (
    <div>
      <div className="flex flex-col  px-1">
        <h1 className="text-2xl font-medium text-center mb-4">
          Agregar Archivo
        </h1>
        <form onSubmit={handleSubmitAddFile}>
          <div className="flex flex-col w-full">
            <label className="border border-black px-2 py-2 cursor-pointer flex align-items hover:bg-gray-100">
              <input
                type="file"
                name="archivo"
                accept="image/jpeg,image/gif,image/png,image/jpg,application/pdf"
                onChange={onChangeInputFile}
                //onBlur={formAddFile.handleBlur}
                hidden
                disabled={loadingUpload}
              />
              <BackupIcon /> &nbsp; Cargar Archivo
            </label>
            {formAddFile.errors.archivo ? (
              <span className="text-red-500 text-xs">
                {formAddFile.errors.archivo}
              </span>
            ) : (
              <span
                onClick={clearInputFile}
                className="cursor-pointer hover:text-gray-700"
              >
                {formAddFile.form.archivo && formAddFile.form.archivo.name}
              </span>
            )}

            <br />
            <TextField
              className="flex-1"
              name="descripcion"
              value={formAddFile.form.descripcion}
              onChange={formAddFile.handleChange}
              //onBlur={formAddFile.handleBlur}
              error={formAddFile.errors.descripcion ? true : false}
              helperText={
                formAddFile.errors.descripcion && formAddFile.errors.descripcion
              }
              disabled={loadingUpload}
              id="descripcion"
              label="Descripcion"
            />
          </div>
          <br />
          <div align="center" className=" mt-6">
            {loadingUpload ? (
              <div className="flex flex-col">
                <LinearProgress />
                <span className="mt-1">Subiendo Archivo...</span>
              </div>
            ) : (
              <>
                <button
                  className={`bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border `}
                  type="submit"
                >
                  Subir
                </button>
                <button
                  onClick={() => setOpenModalAdd(false)}
                  className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
                >
                  CANCELAR
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (error !== null) {
    return <Page404 />;
  }
  return (
    <div className="container mx-auto pb-24">
      <div className="pt-4">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <NavLink
            to="/boletines"
            className='text-gray-700 text-sm'
            //style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Carpetas
          </NavLink>
          <NavLink
            to={params.nomCarpeta}
            className='text-gray-700 text-sm'
            //style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {params.nomCarpeta}
          </NavLink>
        </Breadcrumbs>
      </div>
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          Carpeta {params.nomCarpeta}
        </h3>
      </div>
      
      <div className="mt-4">
        <button
          className="bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700"
          onClick={handleOpenModalAddFile}
        >
          Agregar archivo
        </button>
      </div>
      <div>
        <MaterialTable
          columns={[
            {
              title: "Nombre Archivo",
              field: "Nombre_Archivo",
              filtering: false,
              /* validate: (rowData) => {
                let pattern = /[^A-Za-z0-9_ ]/;
                if (pattern.test(rowData.Nombre_Archivo)) {
                  return { isValid: false, helperText: "No se aceptan puntos" };
                } else if (
                  rowData.Nombre_Archivo === "" ||
                  rowData.Nombre_Archivo == undefined
                ) {
                  return { isValid: false, helperText: "Name cannot be empty" };
                } else {
                  return true;
                }
              }, */
              validate: (rowData) => Boolean(rowData.Nombre_Archivo),
            },
            {
              title: "Descripcion",
              field: "Descripcion",
              filtering: false,
              validate: (rowData) => Boolean(rowData.Descripcion),
            },
            {
              title: "Fecha Publicación",
              field: "Fecha_Publicacion",
              filtering: false,
              editable: false,
            },
            /* {
              title: "ACCIONES",
              field: "actions",
              render: rowData => (
               <SubmenuFile file={rowData} />
              ),
              filtering: false,
              editable: false,
              sorting:false,
              width: "5%",
            } */
          ]}
          data={files}
          //onRowClick={(event, rowData, togglePanel) => alert(rowData)}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                /* setTimeout(() => {
                   const dataUpdate = [...files];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setFiles([...dataUpdate]);
    
                  reject();
                }, 1000)  */
                /* let arr = newData.Nombre_Archivo.split(".");
                arr.pop(); */
                let data = {
                  nombre_archivo: newData.Nombre_Archivo,
                  descripcion: newData.Descripcion,
                };
                putEditarArchivo(
                  newData.Id_Boletin,
                  data,
                  resolve,
                  setResponse,
                  reject
                );
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                deleteElliminarArchivo(
                  oldData.Id_Boletin,
                  resolve,
                  setResponse,
                  reject
                );
              }),
          }}
          actions={[
            (rowData) => ({
              icon: () => (
                <SubmenuFile file={rowData} setModalMovera={setModalMovera} />
              ),
              //tooltip: 'Descargar',
              //onClick: (rowData)
            }),
          ]}
          options={{
            headerStyle: {
              backgroundColor: "#E2E2E2 ",
            },
            // rowStyle: (rowData) => ({
            //   backgroundColor:
            //     selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            // }),
            searchFieldAlignment: "left",
            showTitle: false,
            actionsColumnIndex: -1,
            filtering: true,
            rowStyle: {
              height: 50,
              //maxHeight: 20,
              padding: 0,
            },
          }}
          localization={{
            body: {
              addTooltip: "Agregar",
              deleteTooltip: "Eliminar",
              editRow: {
                deleteText: "Esta seguro de eliminar este archivo?",
              },
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
      {/* Modals */}

      <ModalResponse
        response={response}
        handleCloseResponse={handleCloseResponse}
      />

      <MyModal
        openModal={openModalAdd}
        onCloseModal={!loadingUpload ? () => setOpenModalAdd(false) : () => {}}
      >
        {bodyCreateFile}
      </MyModal>

      <ModalMoverA
        modalMovera={modalMovera}
        setModalMovera={setModalMovera}
        setResponse={setResponse}
      />
    </div>
  );
};

export default BoletinesCarpeta;
