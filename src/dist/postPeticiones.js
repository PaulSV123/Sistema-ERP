import axios from "axios";
import { getToken } from "./Token";
// import { getPeticionCV } from "./getPeticiones";

//Peticion para listar la data de tabla resumen general
export const postPeticionActualizarConocimientos = async (userId, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const bodyParameters = {
    ...data,
  };
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/actualizarPuntajeConocimientos/${userId}`,
      bodyParameters,
      config
    )
    .then((Response) => {
      console.log(Response);
    })
    .catch((e) => {
      console.log(e);
    });
};

//Petición para obtener data para areas
export const postActualizarPtCV = (id, datos, setData, setLoading) => {
  // console.log(datos);
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/actualizarPuntajeCv/${id}`,
      datos,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      //getPeticionCV(setData, setLoading);
      //   setAreas(Response.data.Areas);
      //   setLoading(false);
      //console.log(datos,id);
      console.log(Response);
    })
    .catch((e) => {
      console.log(e,e.response);
    });
};



//Peticion para actualizar Conducta
export const postPeticionActualizarConducta = (userId, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const bodyParameters = {
    ...data,
  };
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/actualizarPuntajeConducta/${userId}`,
      bodyParameters,
      config
    )
    .then((Response) => {
      //console.log(bodyParameters,userId);
      console.log(Response);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion agregar recurso
export const postPeticionAgregarRecurso = (data,setResponse,abrirCerrarModalFormPerfil) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/agregarRecurso`, data, config)
    .then((Response) => {
      console.log(Response);
      setResponse({ status: 200, msg: Response.data.msg, modal: true })
      abrirCerrarModalFormPerfil();
    })
    .catch((err) => {
      console.log(err.response);
      setResponse({
        status: err.response.status,
        msg: err.response.data ? err.response.data.msg : "Ocurrio un Error",
        modal: true,
      });
      abrirCerrarModalFormPerfil();
    });
};
//Peticion para listar la data de tabla resumen general
export const postPeticionActualizarStar = async (userId, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  // const bodyParameters = {
  //   ...data
  // };
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/actualizarPuntajeEntrevista/${userId}`,
      data,
      config
    )
    .then((Response) => {
      console.log(Response);
      // console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion Listar postulacion por plataforma por fecha

export const postPeticionPostPlatFecha = async (
  userId,
  data,
  setData,
  setLoading
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  // const bodyParameters = {
  //   ...data
  // };
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/posPlatFecha/${userId}`,
      data,
      config
    )
    .then((Response) => {
      setData(Response.data.PostulaciónPorPlatfDona);
      setLoading(false);
      // console.log(Response.data.PostulaciónPorPlatfDona);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion Listar postulacion por departamento por fecha
export const postPeticionPostDepFecha = async (
  userId,
  data,
  setData,
  setLoading
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/postulantes/departamentofecha/${userId}`,
      data,
      config
    )
    .then((Response) => {
      setData(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Peticion Listar postulantes totales por departamentos por fecha
export const postPeticionPostDepFechaTotal = async (
  data,
  setData,
  setLoading
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/postulantes/departamento`,
      data,
      config
    )
    .then((Response) => {
      // console.log(Response.data.data)
      setData(Response.data.data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
    });
};
//Agregar Postulante
/* export const postPeticionAgregarPostulante = (
  data,
  setLoading,
  setError,
  funcion
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const bodyParameters = {
    ...data,
  };
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/postulantes`,
      bodyParameters,
      config
    )
    .then((Response) => {
      setError([]);
      // console.log(Response);
      alert(JSON.stringify(Response));
      funcion();
      setLoading(true);
    })
    .catch((error) => {
      setLoading(false);
      // console.log(error.response.data.errors);
      alert(JSON.stringify(error.response.data.errors));
      setError(error.response.data.errors);
    });
}; */
export const postPeticionAgregarPostulante = async (
  form,
  setResponse,
  handleCloseModal,
  setLoading
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try{
    let res = await axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/postulantes`,
      form,
      config
    );
    let json = await res.data;
    //console.log(json)
    setResponse({ status: 200, msg: json.msg, modal: true });
  }catch(err){
    console.log(err.response);
    setResponse({
      status: err.response.status,
      msg: err.response.data ? err.response.data.msg : "Ocurrio un Error",
      modal: true,
    });
  }finally{
    handleCloseModal()
    setLoading(false);
   }  
};


/* export const postPeticionAgregarSolicitud = (
  data,
  setLoading,
  setError,
  funcion
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const bodyParameters = {
    ...data,
  };
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/solicitudes`,
      bodyParameters,
      config
    )
    .then((Response) => {
      setError([]);
      console.log(Response);
      //alert(JSON.stringify(Response));
      funcion();
      setLoading(true);
    })
    .catch((error) => {
      setLoading(false);
      //alert(JSON.stringify(error));
      console.log(error.response.data.errors);
      setError(error.response.data.errors);
    });
}; */

export const postPeticionAgregarSolicitud = async (
  form,
  setResponse,setLoading
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try{
    let res = await axios.post(`${process.env.REACT_APP_API_URL}/api/capacitacion/solicitudes`,form,config),
    json = await res.data;
    //console.log(json);
    setResponse({status:200,msg:json.msg,modal:true})
  }catch(err){
    console.log(err,err.response)
    setResponse({
      status: err.response.status,
      msg: err.response.data ? err.response.data.errors ? JSON.stringify(err.response.data.errors): err.response.data.message : "Ocurrio un Error",
      modal: true,
    });
  }finally{
    setLoading(false);
  }
};

export const postGenerarGrupoEntrevista = async(form,setResponse,setLoading)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try{
    let res = await axios.post(`${process.env.REACT_APP_API_URL}/api/generarGruposEntrev`,form,config);
    let json = await res.data;
    setResponse({ status: 200, msg: json.msg, modal: true });
  }catch(err){
    console.log(err.response);
    setResponse({
      status: err.response.status,
      msg: err.response.data ? err.response.data.errors ? JSON.stringify(err.response.data.errors): err.response.data.message : "Ocurrio un Error",
      modal: true,
    });
  }finally{
    setLoading(false);
  }
}