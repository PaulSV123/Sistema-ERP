import axios from 'axios';
import { getToken } from '../Token';

// Peticion para agregar recursos a induccion
export const postPeticionAgregarRecurso = async (data) => {
  let exito = false;

  try {
    let token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/clima/recursos/induccion`,
      data,
      config
    );
    console.log('Insertado ');
    exito = true;
  } catch (err) {
    console.log(err.response);
  }
  return exito;
};

// Peticion para agregar material inetegracion
export const postPeticionAgregarMaterailIntegracion = async (data) => {
  let msg = false;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/clima/recursos/integracion`,
        data,
        config
      ),
      json = await res.data;
    //console.log("success"+ json)
    msg = true;
  } catch (err) {
    console.log(err.response);
    msg = false;
  }

  return msg;
};

export const postPeticionAgregarSesionIntegracion = async (data) => {
  const url = `${process.env.REACT_APP_API_URL}/api/clima/sesionIntegracion`;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  return axios
    .post(url, data, config)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

// Peticion para agregar una nueva Induccion

export const postAgregarInduccion = async (
  Fk_Aprobados_Induccion,
  Fk_Inductor,
  Fecha_Induccion,
  Hora_Induccion,
) => {
    Fk_Aprobados_Induccion != '' &&
    Fk_Inductor != '' &&
    Fecha_Induccion != '' &&
    Hora_Induccion != '' &&
    //modificar
    (await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/clima/induccion`,
        {
          Fk_Aprobados_Induccion,
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
      .then(({ data }) => {
        //alert(JSON.stringify(data.msg));
        console.log(data);
        //setLoading(true);
      })
      .catch((e) => {
        console.log(e);
        //alert(JSON.stringify(e));
      }));
};

export const postPeticionAgregarActividades = async (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/clima/insertarActividadGerencial`,
        data,
        config
      ),
      json = await res.data;
    console.log('success' + json);
  } catch (err) {
    console.log(err.response);
  }
};
