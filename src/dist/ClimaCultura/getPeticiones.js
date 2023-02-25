import axios from 'axios';
import { getToken } from '../Token';

export const getPeticionRecursosInduccion = async () => {
  let Data_Tabla = [];
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/clima/recursos/induccion`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      const data = Response.data.data;
      Data_Tabla = [...data];
    })
    .catch((e) => {
      console.log(e);
    });
  return Data_Tabla;
};

export const getPeticionMarcasID = async () => {
  const arrayMarcasId = [];
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/marcas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      for (let i = 0; i < Response.data.id.length; i++) {
        const marcasId = {};
        marcasId.id = Response.data.id[i];
        marcasId.marca = Response.data.Marcas[i];
        arrayMarcasId.push(marcasId);
      }
      console.log(arrayMarcasId);
    })
    .catch((e) => {
      console.log(e);
    });
  return arrayMarcasId;
};
// Creando la extracción de datos por departamento

export const getPeticionRecursosIntegracion = async () => {
  let dataItegracion = [];
  try {
    let Response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/clima/recursos/integracion`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    dataItegracion = [...Response.data.data];
    //console.log(Response.data.data)
  } catch (e) {
    console.log(e);
  }
  return dataItegracion.reverse();
};

//Listar colaboradores a inducir
export const getPeticionColaboradoresInducir = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/clima/induccion`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Filtro de Inductores
export const getPeticionInductorFiltro = async (
  setInductorTabla,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/clima/inductores`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setLoading(false);
      setInductorTabla(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.Inductor] = cur.Inductor;
          return acc;
        }, {})
      );
    })
    .catch((e) => {});
};


//funcion cambiada 
export const getPeticionCumpleañosColaboradores = async () => {
  const url =
  `${process.env.REACT_APP_API_URL}/api/clima/listarcumplecolaboradores`;
  let colaboradores = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'Application/json',
      },
      /*  params:{
        "año":year
      }, */
    });
    const data = response.data.data;
    colaboradores = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError);
  }
  return colaboradores;
};
//funcion cambiada 
export const getPeticionReporteInducidos = async () => {
  const url =
  `${process.env.REACT_APP_API_URL}/api/clima/reporteInduccion`;
  let inducidos = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'Application/json',
      },
    });
    const data = response.data.data;
    inducidos = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError);
  }
  return inducidos;
};

//Listar Actividades Gerenciales
export const getActividadesGerenciales = async () => {
  let dataActividades = [];
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/clima/listarActiGeren`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      const data = Response.data.data;
      dataActividades = [...data];
      console.log(Response.data.data);
    })
    .catch((e) => {
      console.log(e);
    });
  return dataActividades.reverse();
};

// funcion cambiada
export const getlistarSesionesIntegracion = async () => {
  const url =
  `${process.env.REACT_APP_API_URL}/api/clima/sesionesIntegracion`;
  let sesiones = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'Application/json',
      },
    });
    const data = response.data.data;
    sesiones = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError);
  }
  return sesiones;
};
export const getPeticionSesionesIntegracion = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/clima/sesionesIntegracion`;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'Application/json',
    },
  };

  return axios
    .get(url, config)
    .then((response) => response.data.data)
    .catch((error) => console.error(error));
};

export const getPeticionSesionesIntegracionTipo = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/clima/sesionTipo`;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'Application/json',
    },
  };

  return axios
    .get(url, config)
    .then((response) => response.data.data)
    .catch((error) => console.error(error));
};

export const getPeticionSesionesIntegracionEncargado = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/clima/sesionEmpleado`;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'Application/json',
    },
  };

  return axios
    .get(url, config)
    .then((response) => response.data.data)
    .catch((error) => console.error(error));
};

export const getPeticionSesionesIntegracionDepartamento = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/clima/sesionDepartamento`;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'Application/json',
    },
  };

  return axios
    .get(url, config)
    .then((response) => response.data.data)
    .catch((error) => console.error(error));
};

export const getPeticionSesionesIntegracionArea = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/api/clima/sesionArea/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'Application/json',
    },
  };

  return axios
    .get(url, config)
    .then((response) => response.data.data)
    .catch((error) => console.error(error));
};

export const getPeticionSesionesIntegracionTurno = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/clima/sesionTurno`;
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'Application/json',
    },
  };

  return axios
    .get(url, config)
    .then((response) => response.data.data)
    .catch((error) => console.error(error));
};

//funcion cambiada
export const getPeticionListarAprobadosCapacitacion = async () => {
  const url =
    `${process.env.REACT_APP_API_URL}/api/clima/listarAprobadosCapacitacion`;
  let aprobados = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'Application/json',
      },
    });
    const data = response.data.data;
    aprobados = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError);
  }
  return aprobados;
};


export const getPeticionInductorFiltro2 = async () => {
       const url =
        `${process.env.REACT_APP_API_URL}/api/clima/inductores`;
      let idInductor = [];
     try {
        const response = await axios.get(url, {
          headers: {  
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'Application/json',
          },
        });
        const data = response.data.data;
        idInductor  = [...data];
     }
     catch (e) {
      const message= JSON.stringify(e);
      alert(message);
     }
     return idInductor ;
  };


export const getNotasIntegracion = async( year, departamento, turno ) => {
  let grafico_barraAnual = [];
  try {
      let response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/clima/listarNotasAnual?year=${year}&dept=${departamento}&turn=${turno}`,
          {
              headers: {
                  Authorization: `Bearer ${getToken()}`,
                  Accept: "application/json",
              },
          }
      );
      grafico_barraAnual = response.data.data;
      return grafico_barraAnual;
  } catch (err) {
      console.warn(err);
  }
};

export const getNotasIntegracionSemana = async( year, mes, departamento, turno ) => {
  let grafico_barraAnual = [];
  try {
      let response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/clima/listarNotasMensual?year=${year}&month=${mes}&dept=${departamento}&turn=${turno}`,
          {
              headers: {
                  Authorization: `Bearer ${getToken()}`,
                  Accept: "application/json",
              },
          }
      );
      grafico_barraAnual = response.data.data;
      return grafico_barraAnual;
  } catch (err) {
      console.warn(err);
  }
};