import axios from "axios";
import { getToken } from "../Token";
//Peticion que Actualiza un permiso
export const putPeticionActualizarPermiso = (id, data, setLoading, setError,abrirCerrarModalEditar, abrirCerrarModalConfirmar) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  };
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/permisos/${id}`,
      data,
      config
    ).then((Response) => {
      console.log(Response);
      setLoading(true)
      abrirCerrarModalEditar();
      abrirCerrarModalConfirmar();
    })
    .catch((e) => {
      setError('El permiso ya existe')
      console.log(e);
    });
};

//Peticion que Actualiza un Rol
export const putPeticionActualizarRol = (id, data, setError, setLoading, abrirCerrarModalEditar, abrirCerrarModalConfirmar, setLoadingGlobalRoles) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/roles/${id}`,
      data,
      config
    ).then((Response) => {
      setLoading(true)
      setLoadingGlobalRoles(false)
      abrirCerrarModalEditar();
      abrirCerrarModalConfirmar();

    })
    .catch((error) => {
      // console.log(e); 
      setError('El Rol ya existe');
      console.log(error);
    });
};