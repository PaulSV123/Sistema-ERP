import axios from 'axios';
import { getToken } from '../Token';

export const postEvaluacion = async (
  idCapacitacion,
  idEmpleado,
  idActividad,
  idCurso,
  descActi,
  idAspecto,
  puntaje,
  observaciones,
  setStateMsg,
  setLoading
) => {
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/evaluacion`,
      {
        idCapacitacion: parseInt(idCapacitacion),
        idEmpleado: parseInt(idEmpleado),
        idActividad: parseInt(idActividad),
        idCurso: parseInt(idCurso),
        descActi,
        idAspecto: parseInt(idAspecto),
        puntaje: parseInt(puntaje),
        observaciones,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setStateMsg(Response.data.msg);
      setLoading(true);
    })

    .catch((e) => {
      console.log(e);
    });
};

export const postCurso = async (
  Cur_Codigo,
  Cur_Perfil,
  Cur_Tipo,
  setLoading
) => {
  Cur_Codigo != '' &&
    Cur_Perfil != '' &&
    Cur_Tipo != '' &&
    (await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/capacitacion/curso`,
        {
          Cur_Codigo,
          Cur_Perfil,
          Cur_Tipo,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data.msg);
        //alert(JSON.stringify(data.msg));
        setLoading(true);
      })
      .catch((e) => {
        console.log(e.response.data.errors);
        alert(JSON.stringify(e));
      }));
};

export const postInsertarCurso = async (newCurso, setLoading) => {
  const validarDatos =
    newCurso.fkTipoCur !== '' &&
    newCurso.fkPerfCur !== '' &&
    newCurso.codigo !== '' &&
    newCurso.nombre !== '' &&
    newCurso.enlace !== '' &&
    newCurso.fkPlatCur !== '' &&
    newCurso.tiempo !== '' &&
    newCurso.modoEvaluar !== '' &&
    newCurso.modoEvaluarEnlace !== '';

  if (!validarDatos) {
    console.log('Faltan datos');
    return 'Faltan datos';
  }

  try {
    const response = await axios.post(
       `${process.env.REACT_APP_API_URL}/api/capacitacion/curso`,
      newCurso,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = response.data;
    setLoading(false);
    return data;
  } catch (e) {
    if(e.response){
      const data = e.response.data;
      setLoading(false);
      return data;
    }else{
      alert(JSON.stringify(e));
      setLoading(false);
      return {errors:{}};
    }
  }
};

export const postAspecto = async (Aspecto_Nombre, setLoading) => {
  Aspecto_Nombre != '' &&
    (await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/capacitacion/aspectos`,
        {
          Aspecto_Nombre,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(({ data }) => {
        //alert(JSON.stringify(data.msg));
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
        //alert(JSON.stringify(e));
      }));
};

export const postActividad = async (Acti_Nombre, setLoading, setMensaje) => {
  Acti_Nombre != '' &&
    (await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/capacitacion/actividades`,
        {
          Acti_Nombre,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((Response) => {
        setMensaje(Response.data.msg);
        console.log(Response);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      }));
};

export const postListCapacitadosSemana = async (fecha, setState) => {
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/reporte-semana`,
      {
        fecha,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
    });
};
export const postPlataforma = async (Nom_Plata_Cap, setLoading) => {
  Nom_Plata_Cap != '' &&
    (await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/capacitacion/plataformas`,
        {
          Nom_Plata_Cap,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(({ data }) => {
        //alert(JSON.stringify(data.msg));
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
        //alert(JSON.stringify(e));
      }));
};

export const postListCapacitadosMes = async (fecha, setState) => {
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/reporte-mes`,
      {
        fecha,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
    });
};

export const postListCapacitadosAnio = async (anio, setState) => {
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/reporte-anio`,
      {
        anio,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
    });
};

export const postListCapacitadosDia = async (fecha, setState) => {
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/reporte-dia`,
      {
        fecha,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
    });
};

export const postListCapacitadosRango = async (fecha1, fecha2, setState) => {
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/reporte-rango`,
      {
        fecha1,
        fecha2,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
    });
};
