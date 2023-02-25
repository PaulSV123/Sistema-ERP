import axios from "axios";
import { getToken } from "../Token";
//Peticion que agrega un permiso
export const postPeticionAgregarPermiso = (data, setError, setLoading, abrirCerrarModalAgregar, abrirCerrarModalConfirmar) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    }
  };
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/permisos`,
      data,
      config
    ).then((Response) => {
      console.log(Response);
      setLoading(true)
      abrirCerrarModalAgregar();
      abrirCerrarModalConfirmar();
    })
    .catch((e) => {
      setError('El permiso ya existe')
      console.log(e);
    });
};

//Peticion que agrega un rol
export const postPeticionAgregarRol = (data, setError, setLoading, abrirCerrarModalAgregar, abrirCerrarModalConfirmar) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  };
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/roles`,
      data,
      config
    ).then((Response) => {
      console.log(Response);
      setLoading(true)
      abrirCerrarModalAgregar();
      abrirCerrarModalConfirmar();
    })
    .catch((e) => {
      setError('El Rol ya existe')
      console.log(e);
    });
};

//Peticion que agrega un rol a usuario
export const postPeticionAgregarRolUsuario = (data, setErrorEditar, abrirCerrarModalEditar, abrirCerrarModalConfirmar, setLoadingGlobalRoles) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  };
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/roles/asignar`,
      data,
      config
    ).then((Response) => {
      //console.log(Response);
      // setLoading(true)
      abrirCerrarModalEditar();
      abrirCerrarModalConfirmar();
      setLoadingGlobalRoles(false)
    })
    .catch((error) => {
      setErrorEditar('Ocurrio un error')
      console.log(error);
    });
};