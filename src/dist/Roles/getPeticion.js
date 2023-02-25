import axios from "axios";
import { getToken } from "../Token";
//Peticion que lista los permisos
export const getPeticionListarPermisos = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/permisos`,
      {
        headers:
          { Authorization: `Bearer ${getToken()}`, },
      })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
      // console.log(Response.data.data)
    })
    .catch((e) => { console.log(e); });
}

export const getPeticionListarRoles = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/roles`,
      {
        headers:
          { Authorization: `Bearer ${getToken()}`, },
      })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => { console.log(e); });
}

export const getPeticionMostrarRol = async (id, setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/roles/${id}`,
      {
        headers:
          { Authorization: `Bearer ${getToken()}`, },
      })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => { console.log(e); });
}

export const getPeticionRolesUser = async (id, setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/usuario/${id}/roles`,
      {
        headers:
          { Authorization: `Bearer ${getToken()}`, },
      })
    .then((Response) => {
      setState(Response.data.roles);
      setLoading(false);
    })
    .catch((e) => { console.log(e); });
}

export const getPeticionListarUsuariosRol = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/usuarios`,
      {
        headers:
          { Authorization: `Bearer ${getToken()}`, },
      })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => { console.log(e); });
}