import axios from "axios";
import { getToken } from "./Token";

//Copiar objeto a profundidad
export function copyObject(obj) {
  let result;
  if (obj instanceof Array) {
    result = [...obj];
  } else if (typeof obj === "object") {
    result = { ...obj };
  } else {
    return obj;
  }
  for (let prop of Reflect.ownKeys(result)) {
    result[prop] = copyObject(result[prop]);
  }
  return result;
}

//Petición para obtener data para departamento
export const getPeticionDepartamento = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.Unidades);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para filtro departamento
export const getPeticionDepartamentoFiltro = async (setState) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      //setState(Response.data.Unidades);
      setState(
        Response.data.Unidades.reduce(function (acc, cur, i) {
          acc[cur] = cur;
          return acc;
        }, {})
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener todos los departamentos con su respectivo id
export const getPeticionAllDepartamentos = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      //setState(Response.data.Unidades);
      setState(Response.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPeticionAreasxDepartamento = async (setState, id) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areas/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para areas
export const getPeticionAreas = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.Areas);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};



//Petición para obtener data para filtro areas
export const getPeticionAreasFiltro = async (setState) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      //setState(Response.data.Areas);
      setState(
        Response.data.Areas.reduce(function (acc, cur, i) {
          acc[cur] = cur;
          return acc;
        }, {})
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para listar la data de tabla evaluacion de conducta
export const getPeticionListarConducta = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarObservacionConducta`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      // console.log(Response.data.evaluacion);
      setState(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para listar la data de tabla evaluacion Star
export const getPeticionListarStar = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarEntrevistaStar`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      // console.log(Response.data.evaluacion);
      setState(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para listar la data de tabla evaluacion de conocimiento
export const getPeticionListarConocimientos = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarEvaluacionConocimientos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para listar la data de tabla resumen general
export const getPeticionListarResumen = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarCalificacionGeneral`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para departamento y areas
export const getPeticionDepartamentoArea = async (
  setState1,
  setState2,
  setLoading
) => {
  let areaApi = `${process.env.REACT_APP_API_URL}/api/areas`;
  let departamentoApi = `${process.env.REACT_APP_API_URL}/api/unidades`;

  const requestAreas = axios.get(areaApi);
  const requestDepartamentos = axios.get(departamentoApi);

  await axios
    .all([requestAreas, requestDepartamentos], {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[1];
        const responseTwo = responses[2];
        console.log(responseOne);
        console.log(responseTwo);
      })
    )
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para Perfiles
export const getPeticionPerfiles = async (
  setPerfiles,
  setLoading,
  setPerfilesTabla
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfil`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Authorization: `Bearer 465|sWP1cEIFtzVrWdGqPKE7p4uZmZ0zAPrT2SqgDjnD`,
      },
    })
    .then((Response) => {
      setPerfiles(Response.data.perfiles);
      setLoading(false);
      setPerfilesTabla(
        Response.data.perfiles.reduce(function (acc, cur, i) {
          acc[cur.perfil_Id] = cur.perfil_nombre;
          return acc;
        }, {}),
      );
    })
    .catch((e) => { });
};

//Petición para obtener data para Perfiles en filtros
export const getPeticionPerfilesFiltro = async (
  setPerfilesTabla,
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfil`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Authorization: `Bearer 465|sWP1cEIFtzVrWdGqPKE7p4uZmZ0zAPrT2SqgDjnD`,
      },
    })
    .then((Response) => {
      setPerfilesTabla(
        Response.data.perfiles.reduce(function (acc, cur, i) {
          acc[cur.perfil_nombre] = cur.perfil_nombre;
          return acc;
        }, {})
      );
      console.log(Response)
    })
    .catch((e) => {
      console.log(e)
    });
};
//Petición para obtener data de Perfil
export const getPeticionPerfilId = async (setData, id) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfil/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      // console.log(Response.data.perfiles[0]);
      const { Marca, Area, SubArea } = Response.data.perfiles[0];
      setData({
        perfil: id,
        departamento: Marca,
        area: Area,
        subarea: SubArea,
      });
    })
    .catch((e) => { });
};
//Mostrar los puntajes del cv de todos los postulantes
export const getPeticionCV = async (setPeticionCV, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarRevisionCv`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPeticionCV(Response.data.evaluacion);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion Marcas
export const getPeticionMarcas = async (setMarcas, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/marcas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setMarcas(Response.data.Marcas);
      setLoading(false);
    })
    .catch((e) => { });
};

//Peticion de Listar Recursos
export const getPeticionListarRecursos = async (
  setState,
  dataBody,
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarRecursos`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      // console.log(Response.data.recursos)
      setState(Response.data.recursos);
    })
    .catch((e) => { });
};

//Peticion Listar requerimientos
export const getPeticionRequerimientos = async (
  setRequerimientos,
  setLoading,
  dni
) => {
  const dataBody = {
    dni: dni,
  };
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/requerimientos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: dataBody,
    })
    .then((Response) => {
      setRequerimientos(Response.data.recursos);
      setLoading(false);
    })
    .catch((e) => { });
};

//Mostrar los puntajes del cv de todos los postulantes
export const getPeticionPlataforma = async (setPlataformas, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarPlataformas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPlataformas(Response.data.plataformas);
      setLoading(false);
      // setPlataformasFilter(Response.data.plataformas.reduce(function (acc, cur, i) {
      //   acc[cur.pPost_Id] = cur.pPost_nombre;
      //   return acc;
      // }, {}));
    })
    .catch((e) => { });
};

//Peticion Postulaciones por plataforma - DONA
export const getPeticionPostByPlataforma = async (
  setPostPlataforma,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/posPlatDona`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPostPlataforma(Response.data.PostulaciónPorPlatfDona);
      setLoading(false);
    })
    .catch((e) => { });
};

//Peticion Postulaciones por plataforma - DONA
export const getPeticionPostByDepartamento = async (
  setPostDepartamento,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/posDepBarra`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPostDepartamento(Response.data.PostulaciónPorPlatfDona);
      setLoading(false);
    })
    .catch((e) => { });
};

//Peticion Puntaje de Entrevistado por fecha y departamento
export const getPeticionPuntEntrFecDep = async (
  setState,
  dataBody,
  setLoading
) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/api/puntaje/entrevistados`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      // console.log(Response.data.puntajes)
      setState(Response.data.puntajes);
      setLoading(false);
    })
    .catch((e) => { });
};

//Peticion Total entrevistados - Barra horizontal
export const getPeticionTotalEntrevistados = async (
  setTotalEntrevistados,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/entrevistados`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setTotalEntrevistados(Response.data.data[0]);
      setLoading(false);
    })
    .catch((e) => { });
};

//Peticion Departamento Id
export const getPeticionDepartamentoId = async (setState, setLoading) => {
  const arrayDepId = [];

  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      for (let i = 0; i < Response.data.id.length; i++) {
        const departamentoId = {};
        departamentoId.id = Response.data.id[i];
        departamentoId.Unidades = Response.data.Unidades[i];
        arrayDepId.push(departamentoId);
      }
      setState(arrayDepId);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion Areas Is
export const getPeticionAreasId = async (setState, setLoading) => {
  const arrayAreasId = [];
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      for (let i = 0; i < Response.data.id.length; i++) {
        const areasId = {};
        areasId.id = Response.data.id[i];
        areasId.Areas = Response.data.Areas[i];
        arrayAreasId.push(areasId);
      }
      setState(arrayAreasId);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion Total postulantes y aprobados por plataforma
export const getPeticionTotPosPlat = async (setState, dataBody, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/solicitudes/plataforma`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      // console.log(Response.data.postulaciones)
      setState(Response.data.postulaciones);
      setLoading(false);
    })
    .catch((e) => { });
};
//Peticion de Listar Cantidad de entrevistados / Barra vertical
export const getPeticionListarCantEntre = async (
  setState,
  dataBody,
  setLoading
) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/api/resultado/entrevistados`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      setState(Response.data.postulaciones);
      setLoading(false);
    })
    .catch((e) => { });
};
//Peticion de Listar Postulantes a entrevistar
export const getPeticionListarPostEntre = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/postulantes/entrevistar`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then((Response) => {
      console.log(Response.data)
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => { });
};

//Peticion de Listar Postulantes a entrevistar por Fechas
export const getPeticionListarPostEntreFechas = async (
  setState,
  dataBody,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/postulantes/fechas`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => { });
};

//Peticion de Listar entrevistas
export const getPeticionListarEntrevistas = async (setState, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/entrevistas`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((Response) => {
      setState(Response.data.data);
      setLoading(false);
    })
    .catch((e) => { });
};
//Peticion de Listar Postulantes
export const getPeticionListarPostulantes = async (setState) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/postulantes`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((Response) => {
      setState(Response.data.data);
      console.log(Response.data.data)
      //setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Peticion para filtro de plataformas
export const getPeticionPlataformaFiltro = async (
  setPlataformasFiltro,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarPlataformas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      //setPlataformasFiltro(Response.data.plataformas);
      setLoading(false);
      setPlataformasFiltro(
        Response.data.plataformas.reduce(function (acc, cur, i) {
          acc[cur.pPost_nombre] = cur.pPost_nombre;
          return acc;
        }, {})
      );
    })
    .catch((e) => { });
};

export const getPeticionListarEvaluaciones = async (
  setListarEvaluaciones,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/evaluaciones`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setListarEvaluaciones(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
    });
};

export const getPeticionListarPerfiles = async (
  setState
) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/solicitudes`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      setState(Response.data.data);
    })
    .catch((e) => {
      console.log(e.response)
    });
};

//Petición para obtener data para Prioridad (Requerimientos)
export const getPeticionPrioridades = async (
  setPrioridades,
  setPrioridadesTabla
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/prioridades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPrioridades(Response.data.data);
      setPrioridadesTabla(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.ID] = cur.Prioridad;
          return acc;
        }, {})
      );
    })
    .catch((e) => { });
};

//Petición de filtro para estado de capacitadosGeneral 

export const getPeticionEstadoCapacitadosGeneralFiltro = async (estadoCG, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/capacitacion/estadoCapacitacion`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      estadoCG(
        Response.data.data.reduce(function (acc, cur, i) {
          acc[cur.Estados] = cur.Estados;
          return acc;
        }, {})
      );
      setLoading(false);
    })
    .catch((e) => { });
};


//Nuevas peticiones para marcas perfiles areas y departamentos---------------------------------------------------------------------------

export const getPeticionMarcasTodas = async (setMarcas) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/marcasGenerales`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      console.log(Response);
      setMarcas(Response.data.data);
    }).catch((e) => { console.log(e) });
};

export const getPeticionDepartamentoXMarca = async (idMarca, setState) => {

  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/departamentos/${idMarca}`, {
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

export const getPeticionAreasXDepart = async (idUnidad, setState) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areas/${idUnidad}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setState(Response.data.data);
    })
    .catch((e) => {
      console.log(e.response);
    });
};
export const getPeticionPerfilesXArea = async (
  idArea,
  setPerfiles,
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfiles/${idArea}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Authorization: `Bearer 465|sWP1cEIFtzVrWdGqPKE7p4uZmZ0zAPrT2SqgDjnD`,
      },
    })
    .then((Response) => {
      setPerfiles(Response.data.data);
    })
    .catch((e) => { });
};

export const getPeticionListarPlataformasPostulacion = async () => {
  const url = `${process.env.REACT_APP_API_URL}/api/plataformaPostulacion`;
  let plataformas = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      }
    })
    const data = response.data.data;
    plataformas = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError)
  }
  return plataformas;
}

export const getPeticionListarPostulantesYearnAndPlataforma = async (year, idPlataforma) => {
  const url = `${process.env.REACT_APP_API_URL}/api/listarCantidadPostulantes`;
  let postulantes = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      params: {
        "año": year,
        "id_plataforma": idPlataforma
      },

    })
    const data = response.data.data;
    postulantes = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError)
  }
  return postulantes;
}

export const getPeticionListarPostulantesYear = async (year) => {
  const url = `${process.env.REACT_APP_API_URL}/api/reportePostulantesYear`;
  let postulantes = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      params: {
        "_año": year
      },
    })
    const data = response.data.data;
    postulantes = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError)
  }
  return postulantes;
}
export const getPeticionListarPostulantesAceptadosYearnAndPlataforma = async (year, idPlataforma) => {
  const url = `${process.env.REACT_APP_API_URL}/api/listarLlamPostAnioXPlat`;
  let postulantes = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      params: {
        "_año": year,
        "_idplataforma": idPlataforma
      },

    })
    const data = response.data.data;
    postulantes = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError)
  }
  return postulantes;
}

export const getPeticionListarPostulantesAceptadosYear = async (year) => {
  const url = `${process.env.REACT_APP_API_URL}/api/listarAceptLlamPostAnio`;
  let postulantes = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      params: {
        "_año": year
      },
    })
    const data = response.data.data;
    postulantes = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError)
  }
  return postulantes;
}

//Listar cantidad de entrevistas y llamadas General
export const getPeticionCantLlamadYEntrevGnral = async (
  data,
  setData,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarCantEntrevLlamadasRango`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: data
    })
    .then((Response) => {
      setData(Response.data.data);
      setLoading(false);
    })
    .catch((e) => { });
};

//Listar cantidad de entrevistas y llamadas por fecha y reclutador
export const getPeticionCantLlamadYEntrevReclutador = async (
  setData,
  dataBody,
  setLoading
) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/listarCantLlamadYEntrevDeReclutador`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: dataBody,
    })
    .then((Response) => {
      setData(Response.data.data);
      setLoading(false);
      console.log(Response.data.data)
    })
    .catch((e) => { });
};
export const getListarGruposEntrevistas = async (setData) => {
  try {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/gruposEntrevista`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }),
      json = await res.data;
    setData(json.data);
  } catch (err) {
    console.log(err, err.response)
  }
}

export const getListarGruposEntreResumGeneral = async (setData) => {
  try {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/api/listarGrupoPostulante`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }),
      json = await res.data;
    console.log(json.data);
    setData(json.data);
  } catch (err) {
    setData([]);
    console.log(err, err.response)
  }
}

export const getPeticionTotalEntByYear = async (year, setData, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/listarCantEntrevSiNoAnio`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          "_año": year
        },
      }
    )
    .then((Response) => {
      //alert(JSON.stringify(Response.data.data));
      setData(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      //alert(JSON.stringify(e));
      setData(e);
      setLoading(false);
    })
};

export const getPeticionTotalEntByYearMonth = async (yearFiltro, month, setData, setLoading) => {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/listarCantEntrevSegunAnioYMes`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          "año": yearFiltro,
          "nro_mes": month
        },
      }
    )
    .then((Response) => {
      //alert(JSON.stringify(Response.data.data));
      setData(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      //alert(JSON.stringify(e));
      setData(e);
      //setLoading(false);
    })
};



export const getPeticionListarCantPostulIngYNoIng = async (year) => {
  const url = `${process.env.REACT_APP_API_URL}/api/listarCantPostulIngYNoIng`;
  let postulantes = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      params: {
        "año": year,
      },
    })
    const data = response.data.data;
    postulantes = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError)
  }
  return postulantes;
}

export const getPeticionListarCantPostulAceptadosODenegados = async (year, condicion) => {
  const url = `${process.env.REACT_APP_API_URL}/api/listarCantPostulAceptadosODenegados`;
  let postulantes = [];
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      params: {
        "año": year,
        "condicion": condicion
      },
    })
    const data = response.data.data;
    postulantes = [...data];
  } catch (e) {
    const messageError = JSON.stringify(e);
    alert(messageError)
  }
  return postulantes;
}

