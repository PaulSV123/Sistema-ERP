import {
  CircularProgress,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getCarpetasBoletines,
  postCrearCarpetaBoletin,
  deleteCarpetaBoletin,
  putEditarCarpetaBoletin,
} from "../../dist/Boletines/peticiones";
import FolderIcon from "@material-ui/icons/Folder";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Menu } from "antd";
import Carpeta from "./Carpeta";
import useForm from "../../hooks/useForm";
import Error from "../item/Error";
import MyModal from "../../partials/MyModal";
import ModalResponse from "../../partials/ModalResponse";


export const validationFormCarpeta = (form) => {
  let errors = {};

  if (!form.AnioCarpeta.trim()) {
    errors.AnioCarpeta = "El campo nombre es requerido";
  }

  return errors;
};

const initialCarpeta = {
  idCarpeta:null,
  AnioCarpeta: "",
};

const initialResponse = {
  status: null,
  msg: "",
  modal:false
};
const initialDeleteCarpeta = {
  idcarp: null,
  openModal: false,
};

const ListaCarpetas = () => {

  const [carpetas, setCarpetas] = useState([]);
  const [openModalCarpeta, setOpenModalCarpeta] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [modalResponse, setModalResponse] = useState(false);
  const [deleteCarp, setDeleteCarp] = useState(initialDeleteCarpeta);
  const [response, setResponse] = useState(initialResponse);
  const { form, setForm, handleChange, errors, setErrors } = useForm(
    initialCarpeta,
    validationFormCarpeta
  );
  let history = useHistory();

  useEffect(() => {
    getCarpetasBoletines(setCarpetas);
  }, []);

  const closeModalCarpeta = () => {
    setOpenModalCarpeta(false);
  };

  const handleCloseResponse = () => {
    setResponse(initialResponse)
  };

  const handleOpenModalCarpetaCreate = () => {
    setErrors({});
    setResponse(initialResponse);
    setForm(initialCarpeta);
    setOpenModalCarpeta(true);
  };

  const handleOpenModalCarpetaUpdate = (carp) => {
    setErrors({});
    setResponse(initialResponse);
    setForm({idcarp:carp.Id_Año,AnioCarpeta:carp.Año.replace("_", " ")});
    setOpenModalCarpeta(true);
  };
  const handleSubmitCreateCarpeta = (e) => {
    e.preventDefault();
    let errores = validationFormCarpeta(form);
    setErrors(errores);
    if (Object.keys(errores).length === 0) {
      setLoading(true);
      postCrearCarpetaBoletin(form, setLoading, setResponse);
      //setOpenModalCarpeta(false);
    } else {
    }
    console.log(form, errores);
  };
  const handleSubmitUpdateCarpeta = (e) => {
    e.preventDefault();
    let errores = validationFormCarpeta(form);
    setErrors(errores);
    if (Object.keys(errores).length === 0) {
      setLoading(true);
      putEditarCarpetaBoletin(form, setLoading, setResponse);
      //setOpenModalCarpeta(false);
    } else {
    }
    console.log(form, errores);
  };
  const handleDeleteCarp = ()=>{
    setLoading(true);
    deleteCarpetaBoletin(deleteCarp.idcarp,setLoading,setResponse);
    
    console.log(deleteCarp);
  }

  useEffect(() => {
    if (!loading) {
      setOpenModalCarpeta(false);
      setDeleteCarp(initialDeleteCarpeta);
    }
    if (response.status !== null) {
      //setModalResponse(true);
      getCarpetasBoletines(setCarpetas);
    }
  }, [loading, response]);

  const bodyConfirmDelete = (
    <div >
      <div className="flex flex-col">
        <div className="py-2">
          <h2 className="text-xl font-medium text-center">¿Realmente desea eliminar esta carpeta? {deleteCarp.idcarp}</h2>
          <p>Se eliminaron todos los archivos dentro de esta carpeta.</p>
        </div>
        <div align="center" className="">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <button
                className={`bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border `}
                onClick={handleDeleteCarp}
              >
                Eliminar
              </button>
              <button
                onClick={()=>setDeleteCarp(initialDeleteCarpeta)}
                className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              >
                CANCELAR
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  //Body del modal confirmación
  /* const bodyResponse = (
    <div >
      <div className="flex flex-col place-content-center">
        <div className="py-3 text-center font-medium">{response.msg}</div>
        <button
          onClick={() => setResponse(initialResponse)}
          className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
          // className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
        >
          <img
            src={
              response.status > 300
                ? "https://img.icons8.com/windows/32/000000/sad.png"
                : "https://img.icons8.com/external-becris-lineal-becris/64/000000/external-check-mintab-for-ios-becris-lineal-becris.png"
            }
            style={{ width: "1.5rem", height: "1.5rem" }}
            alt=""
          />
        </button>
      </div>
    </div>
  ); */

  const bodyModalCarpeta = (
    <div >
      <h3 className="text-center text-lg font-bold">
        {
          form.idcarp? 'Actualizar Carpeta' : 'Crear Carpeta'
        }
      </h3>
      <hr />
      <br />
      <form
        onSubmit={form.idcarp? handleSubmitUpdateCarpeta :handleSubmitCreateCarpeta}
        className="flex flex-col align-middle "
      >
        <div className="flex  ">
          <div className="flex flex-col w-full">
            <TextField
              className="flex-1"
              name="AnioCarpeta"
              value={form.AnioCarpeta}
              onChange={handleChange}
              required
              disabled={loading}
              id="AnioCarpeta"
              label="Nombre Carpeta"
            />
            <Error className="pt-2" errors={errors.AnioCarpeta}></Error>
            <br />
          </div>
        </div>
        <div align="center">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <button
                className={`bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border `}
                type="submit"
              >
                {
                  form.idcarp? 'EDITAR' : 'CREAR'
                }
              </button>
              <button
                onClick={closeModalCarpeta}
                className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
              >
                CANCELAR
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto pb-24">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          LISTADO DE BOLETINES
        </h3>
      </div>
      <div className="mt-4">
        <button
          className="bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700"
          onClick={handleOpenModalCarpetaCreate}
        >
          Crear Carpeta
        </button>
      </div>
      <div className="mt-2  grid gap-4  grid-cols-1  sm:grid-cols-2">
        {carpetas.length === 0 ? (
          <p className="text-xl font-medium">No hay carpetas para mostrar</p>
        ) : (
          carpetas.map((carp) => (
            <Carpeta
              key={carp.Id_Año}
              carp={carp}
              history={history}
              setDeleteCarp={setDeleteCarp}
              handleOpenModalCarpetaUpdate={handleOpenModalCarpetaUpdate}
            />
          ))
        )}
      </div>

      <MyModal openModal={openModalCarpeta} onCloseModal={!loading ? closeModalCarpeta : () => {}} > 
        {bodyModalCarpeta}
      </MyModal>
      {/* <MyModal openModal={response.modal} onCloseModal={() => {
          setResponse(initialResponse)
        }} > 
        {bodyResponse}
      </MyModal> */}
      <ModalResponse response={response} handleCloseResponse={handleCloseResponse} />

      <MyModal openModal={deleteCarp.openModal} onCloseModal={() => {
          !loading && setDeleteCarp(initialDeleteCarpeta);
        }} > 
        {bodyConfirmDelete}
      </MyModal>
    </div>
  );
};

export default ListaCarpetas;
