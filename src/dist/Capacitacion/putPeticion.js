import axios from "axios";
import { getToken } from "../Token";

// export const putEvaluacion = async (
//   idCapacitacion,
//   fecha,
//   observaciones,
//   setStateMsg
// ) => {
//   await axios
//     .put(
//       `${process.env.REACT_APP_API_URL}/api/capacitacion/evaluacion/observacion`,
//       {
//         capId: parseInt(idCapacitacion),
//         fechaEva: fecha,
//         observacion: observaciones,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${getToken()}`,
//         },
//       }
//     )
//     .then((Response) => {
//       setStateMsg(Response.data.msg);
//     })
//     .catch((e) => {
//       console.log(e);
//       alert(JSON.stringify(e));
//     });
// };

export const putCurso = async (
  idCurso,
  Cur_Codigo,
  Cur_Nombre,
  Cur_Enlace,
  Fk_Plat_Cur,
  Tiempo,
  Modo_Evaluar,
  Modo_Evaluar_Enlace,
  setLoading,
) => {
  console.log(idCurso);
  console.log(Cur_Codigo);
  console.log(Cur_Nombre);
  console.log(Cur_Enlace);
  console.log(Fk_Plat_Cur);
  console.log(Tiempo);
  console.log(Modo_Evaluar);
  console.log(Modo_Evaluar_Enlace);
  axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/curso/${idCurso}`,
      {
        Cur_Codigo,
        Cur_Nombre,
        Cur_Enlace,
        Fk_Plat_Cur,
        Tiempo,
        Modo_Evaluar,
        Modo_Evaluar_Enlace,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    
    .then((Response) => {
      //alert(Response.data.msg);
      console.log(Response)
      setLoading(true);
    })
    .catch((e) => {
      console.log(e);
      //alert(JSON.stringify(e));
    });
};

/* export const putCurso = async(idCurso,form,setResponse,setLoading)=>{
  try{
    let res = await axios.put(`${process.env.REACT_APP_API_URL}/api/capacitacion/curso/${idCurso}`,form,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    });
    let json = await res.data;
    setResponse({status:200,msg:json.msg,modal:true});
  }catch(err){
    console.log(err,err.response);
    setResponse({
      status: err.response.status,
      msg: err.response.data ? err.response.data.errors ? JSON.stringify(err.response.data.errors): err.response.data.message : "Ocurrio un Error",
      modal: true,
    });
  }finally{
    setLoading(false)
  }
} */

export const putEvaluacion = async (
  id,
  Eva_Fecha,
  Eva_Id_Capa,
  Eva_Id_Emp,
  Eva_Id_Acti,
  Eva_Id_Cur,
  Eva_Desc_Acti,
  Eva_Id_Aspecto,
  Eva_Puntaje,
  Eva_Observaciones
) => {
  await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/evaluacion/${id}`,
      {
        Eva_Fecha,
        Eva_Id_Capa,
        Eva_Id_Emp,
        Eva_Id_Acti,
        Eva_Id_Cur,
        Eva_Desc_Acti,
        Eva_Id_Aspecto,
        Eva_Puntaje,
        Eva_Observaciones,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      alert(JSON.stringify(Response.data));
    })
    .catch((e) => {
      console.log(e);
      alert(JSON.stringify(e));
    });
};

export const putEvaluaciones = async (
  enviar
) => {
  const token = getToken();
  console.log(token);

  await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/evaluaciones/${enviar.Id_Evaluacion}`,
      {
        _id_acti:enviar.Eva_Id_Acti,
        _desc_acti:enviar.Eva_Desc_Acti,
        _id_aspecto:enviar.Eva_Id_Aspecto,
        _puntaje:enviar.Eva_Puntaje,
        _observaciones:enviar.Eva_Observaciones
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((Response) => {
      console.log(Response);
      alert(JSON.stringify(Response.data));
    })
    .catch((e) => {
      console.log(e);
      alert(JSON.stringify(e));
    });
};

export const putPlataforma = async (id, Nom_Plata_Cap, setLoading) => {
  await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/plataformas/${id}`,
      {
        Nom_Plata_Cap,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      //alert(Response.data.msg);
      setLoading(true);
    })
    .catch((e) => {
      console.log(e);
      //alert(JSON.stringify(e));
    });
};

export const putAspecto = async (idAspecto, Aspecto_Nombre, setLoading) => {
  await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/aspectos/${idAspecto}`,
      {
        Aspecto_Nombre,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      //alert(Response.data.msg);
      setLoading(true);
    })
    .catch((e) => {
      console.log(e);
      //alert(JSON.stringify(e));
    });
};

export const putActividad = async (ID, Acti_Nombre, setLoading) => {
  await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/actividades/${ID}`,
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
      console.log(Response);
      setLoading(true)
    })
    .catch((e) => {
      console.log(e);
      alert(JSON.stringify(e));
    });
};

export const putCulminoCapacitacion = async (Capa_Id,linkConvenio, setLoading, Estado,) => {
  await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/estadoCapacitacion/${Capa_Id}`,
      {
        Estado,
        _Post_LinkConvenio: linkConvenio
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((data) => {
      //alert(JSON.stringify(data));
      setLoading(true);
    })
    .catch((e) => {
      //alert(JSON.stringify(e));
      console.log(e);
    });
};

export const putActualizarEvaluacionInducidos = async(
  id,
  promBlanda,
  promDura,
  setLoading
  )=>{
    console.log(id);
    console.log(promBlanda);
    console.log(promDura);
  axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/modificarNotasCapacitacion/${id}`,
      {
        promBlanda,
        promDura,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      console.log(Response)
      setLoading(true);
    })
    .catch((e) => {
      console.log(e);
    });
};

/* export const putNoTerminoCapacitacion = async (Capa_Id, Estado, setLoading) => {
  await axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/${Capa_Id}`,
      {
        Estado
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((data) => {
      //alert(JSON.stringify(data));
      setLoading(true);
    })
    .catch((e) => {
      //alert(JSON.stringify(e));
      console.log(e);
    });
}; */

export const putActualizarEvaluacionPracticantes = async(
  idGrupo,
  notablanda,
  notadura,
  link_recurso,
  setLoading
  )=>{
    console.log(idGrupo);
    console.log(notablanda);
    console.log(notadura);
    console.log(link_recurso);
  axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/capacitacion/actualizarNotaHabilidad/${idGrupo}`,
      {
        notablanda,
        notadura,
        link_recurso,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((Response) => {
      console.log(Response)
      setLoading(true);
    })
    .catch((e) => {
      console.log(e);
    });
};