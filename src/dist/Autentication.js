import axios from "axios";
import { getToken } from "./Token";

//Es para cambiar el valor cuando se logea
export const distSetAutentication = (valor) => {
  localStorage.setItem("Autentication", JSON.stringify(valor));
};

export const distGetAutentication = () => {
  return JSON.parse(localStorage.getItem("Autentication"));
};

// Datos del usuario
export const distSetUser = (valor) => {
  localStorage.setItem("User", JSON.stringify(valor));
}

export const distGetUser = () => {
  return JSON.parse(localStorage.getItem("User"));
}

// export const distGetPermisos = () => {

//   return JSON.parse(localStorage.getItem("User"))?.permisos.map(item => item.name);
// }

// export const distGetRoles = () => {
//   return JSON.parse(localStorage.getItem("User")).roles.map(item => item.name);
// }

export const distGetRolesPermisos = (setPermisosUser, setRolesUser) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/identificarPorToken`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
    .then(Response => {
      setPermisosUser(Response.data.permisos.map(item => item.name))
      setRolesUser(Response.data.roles.map(item => item.name))
      distSetUser(Response.data);
    }).catch(error => {
      console.log(error);
    })
}