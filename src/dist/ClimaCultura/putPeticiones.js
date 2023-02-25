import axios from 'axios';
import { getToken } from '../Token';

// creando el put para Induccion
export const putActualizarDatosInduccion = async (id, data) => {
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
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/clima/recursos/induccion/${id}`,
      data,
      config
    ),
      json = await res.data;
    console.log('Loaded' + json);
    exito = true;
  } catch (err) {
    console.log(err.response);
  }
  return exito;
};

export const putActualizarEstadosDatosIntegracion = async (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/clima/recursos/integracion/${data.id}`,
      data,
      config

    ),
      json = await res.data;
    console.log('success' + json);
  } catch (err) {
    console.log(err.response);
  }
};

export const putActualizarActivadesGerenciales = async (data) => {
  let smg = false;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/clima/actividadGerencialTodo/${data.id}`,
      data,
      config
    ),
      json = await res.data;
    console.log('success' + json);
    smg = true;
  } catch (err) {
    console.log(err.response);
    smg = false;
  }
  return smg;
};


export const putPeticionActualizarSesionIntegracion = async (id, data) => {
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
    .put(url, data, config)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export const putInduccion = async (
  Id_Induccion,
  Fk_Inductor,
  Fecha_Induccion,
  Hora_Induccion
) => {
  await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/clima/induccion/${Id_Induccion}`,
      {
        Fk_Inductor,
        Fecha_Induccion,
        Hora_Induccion,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      //alert(Response.data.msg);
      //setLoading(true);
    })
    .catch((e) => {
      console.log(e);
      //alert(JSON.stringify(e));
    });
};
