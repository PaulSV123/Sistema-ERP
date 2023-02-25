import axios from 'axios';
import { getToken } from '../Token';

export const deleteEliminarDatosIntegracion = async (idData) => {
  let smsRespose = false;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  try {
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/clima/eliminarRecurso/${idData}`,
      config
    );
    let json = await res.data;
    smsRespose = true;
  } catch (err) {
    console.log(err, err.response);
    smsRespose = false;
  }
  return smsRespose;
};

export const deleteEliminarDatosInduccion = async (id) => {
  let exito = false;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    let res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/clima/eliminarRecurso/${id}`,
        config
      ),
      json = await res;
    console.log(json);
    exito = true;
  } catch (err) {
    console.log(err, err.response);
  }
  return exito;
};
export const deletePeticionEliminarSesionIntegracion = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/api/clima/sesionIntegracion/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return axios
    .delete(url, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const deleteInduccion = async (Id_Induccion) => {
  Id_Induccion != null &&
    (await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/clima/induccion/${Id_Induccion}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data.msg);
        /* setLoading(true); */
      })
      .catch((e) => {
        console.log(e.msg);
        alert(JSON.stringify(e));
      }));
};
export const deletePeticionEliminarActividades = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/clima/actividadGerencialTodo/${id}`,
      config
    );
    const json = await res;
    console.log('success' + json);
  } catch (err) {
    console.log(err.response);
  }
};
