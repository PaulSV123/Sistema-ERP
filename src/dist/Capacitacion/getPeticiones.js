
import axios from "axios";
import { getToken } from "../Token";

export const getPeticionPracticante = async (setState, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/practicantesSeleccionados`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPeticionListarCapacitaciones = async (
  setState, 
  setLoading,
  setEvaluacionesTabla
  ) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/capacitacion`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
      setEvaluacionesTabla(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.id] = cur.Evaluaciones;
          return acc;
        }, {})
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPeticionListarReclutadores = async (setState) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/reclutadores`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Listar Evaluaciones por fecha y detalle de cursos
export const getPeticionModalEvaluacion = async (setState, id, setLoading) => {
  
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/${id}/evaluaciones`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
      
    )
    .then((Response) => {
      // alert(JSON.stringify(Response.data.data.Evaluaciones))
      // console.log("Lista:", Response.data.data.Evaluaciones)
      setState(Response.data.data.Evaluaciones);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
    
};

export const getPeticionesListarCursos = async (
  setCursos, 
  setLoading,
  setCursosTabla
  ) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/tipoCursos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setCursos(Response.data.data);
      console.log("Cursos: ",Response.data.data)
      setLoading(false);
      setCursosTabla(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.Id_Tip_Cur] = cur.Tip_Cur_Nom;
          return acc;
        }, {})
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

//Listar cursos con sus temarios
export const getPeticionListarCursosTemarios = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/cursosTemario`, {
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

//Listar reporte capacitados
export const getPeticionListarReporteCapacitados = async (
  setState,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/reporte`, {
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

export const getPeticionCapacitacionesCulminadas = async (
  setState,
  setLoading
) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/practicantesCulmRet`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        }
      }
    )
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      //alert(JSON.stringify(e));
      console.log(e);
    });
};

//Petición para obtener data para Aspectos
export const getPeticionAspectos = async (
  setAspectos,
  setLoading,
  setAspectosTabla
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/aspectos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setAspectos(Response.data.data);
      setLoading(false);
      setAspectosTabla(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.Aspecto_Id] = cur.Aspecto_Nombre;
          return acc;
        }, {})
      );
    })
    .catch((e) => {});
};

//Petición para obtener data para Actividades
export const getPeticionActividades = async (
  setActividades,
  setLoading,
  setActividadesTabla
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/actividades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setActividades(Response.data.data);

      setLoading(false);
      setActividadesTabla(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.ID] = cur.Actividad;
          return acc;
        }, {})
      );
    })
    .catch((e) => {});
};

//Listar Detalle de Curso
export const getPeticionDetalleCurso = async (setState, ID, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/cursos/${ID}/cursosdetalles`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      alert(JSON.stringify(Response.data.data))
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
      console.log(e);
    });
};


//Listar data de Plataformas
export const getPeticionPlataformas = async (
  setPlataformas,
  setLoading,
  setPlataformasTabla
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/plataformas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPlataformas(Response.data.data);
      setLoading(false);
      setPlataformasTabla(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.ID] = cur.Plataforma;
          return acc;
        }, {})
      );
    })
    .catch((e) => {});
};

export const getPeticionCursosBlandos = async (setState, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/cursosBlandos`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPeticionCursosDuros = async (setState, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/cursosDuros`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPeticionCapacitadosGeneral = async (setState, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/practSelecGeneral`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Listar todos los cursos
export const getPeticionListarCurso = async (setState, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/cursos`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion Ingresos/Retiros por departamento y fecha del turno Mañana
export const getPeticionIngRetByDepartamentoM = async (
    id,  
    dataBody,
    setData, 
    setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/IngresoRetiro_Ma/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params:  dataBody,
    })
    .then((Response) => {
      //alert(JSON.stringify(Response.data.data));
      setData(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      // alert(JSON.stringify(e));
      setLoading(false);
    })
};

//Peticion Ingresos/Retiros por departamento y fecha del turno Tarde
export const getPeticionIngRetByDepartamentoT = async (
  id,  
  dataBody,
  setData, 
  setLoading
) => {
await axios
  .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/IngresoRetiro_Ta/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    params:  dataBody,
  })
  .then((Response) => {
    //alert(JSON.stringify(Response.data.data));
    setData(Response.data.data);
    setLoading(false);
  })
  .catch((e) => {
    // alert(JSON.stringify(e));
    setLoading(false);
  })
};

export const getPeticionSelectCursos = async (
  setSelectCursos,
  setLoading,
  setSelectCursosTabla
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/tipoCursos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setSelectCursos(Response.data.data);
      setLoading(false);
      setSelectCursosTabla(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.Id_Tip_Cur] = cur.Tip_Cur_Nom;
          return acc;
        }, {})
      );
    })
    .catch((e) => {});
  };

//Petición para listar Culminados por Mes
export const getPeticionCulminadosMes = async (
  id,  
  dataBody,
  setData, 
  setLoading
) => {
await axios
  .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/CulminDepartamentoMes/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    params:  dataBody,
  })
  .then((Response) => {
    //alert(JSON.stringify(Response.data.data));
    setData(Response.data.data);
    setLoading(false);
  })
  .catch((e) => {
    // alert(JSON.stringify(e));
    setLoading(false);
  })
};
export const getPeticionCulminadosByDepartamento = async (
  id,  
  dataBody,
  setData, 
  setLoading
) => {
await axios
  .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/CulminDepartamentoMes/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    params:  dataBody,
  })
  .then((Response) => {
    //alert(JSON.stringify(Response.data.data));
    setData(Response.data.data);
    setLoading(false);
  })
  .catch((e) => {
    //alert(JSON.stringify(e));
    setLoading(false);
  })
};