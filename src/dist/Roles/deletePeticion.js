import axios from "axios";
import { getToken } from "../Token";
//Peticion eliminar Permiso
export const deletePeticionPermiso = async (id, setLoading) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };

  await axios
    .delete(`${process.env.REACT_APP_API_URL}/api/permisos/${id}`,
      config
    ).then((Response) => {
      setLoading(true);
      console.log(Response);
      // setResponseData(Response.data.data)
    })
    .catch((e) => {
      console.log(e);
      
    });
};

//Peticion eliminar Rol
export const deletePeticionRol = async (id, setLoading) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  };

  await axios
    .delete(`${process.env.REACT_APP_API_URL}/api/roles/${id}`,
      config
    ).then((Response) => {
      console.log(Response);
      setLoading(true);
    })
    .catch((e) => {
      console.log(e);
    });
};
