
import axios from "axios";
import { getToken } from "./Token";
//Peticion que Actualiza un recurso
export const putPeticionActualizarRecurso = (data, setResponse,abrirCerrarModalFormPerfil) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  };

  const bodyParameters = {
    ...data
  };
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/recurso`,
      bodyParameters,
      config
    ).then((Response) => {
      console.log(Response);
      setResponse({ status: 200, msg: Response.data.msg, modal: true })
      abrirCerrarModalFormPerfil()
    })
    .catch((err) => {
      console.log(err.response);
      setResponse({
        status: err.response.status,
        msg: err.response.data ? err.response.data.message : "Ocurrio un Error",
        modal: true,
      })
      abrirCerrarModalFormPerfil()
    });
};
//Peticion que Actualiza un Postulante
/* export const putPeticionActualizarPostulante = (data, id, setLoading, setErrorUpdate, funcion) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };

  const bodyParameters = {
    ...data
  };
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/postulantes/${id}`,
      bodyParameters,
      config
    ).then((Response) => {
      alert(JSON.stringify(Response));
      setLoading(true);
      setErrorUpdate([]);
      funcion();
      // console.log(Response);
    })
    .catch((error) => {
      setLoading(false);
      // console.log(error.response.data.errors);
      alert(JSON.stringify(error.response.data.errors));
      setErrorUpdate(error.response.data.errors);
    });
}; */

export const putPeticionActualizarPostulante = async (form,setResponse,handleCloseModal,setLoading) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };

 try{
  let res = await axios
  .put(`${process.env.REACT_APP_API_URL}/api/postulantes/${form.idPostulante}`,
    form,
    config
  );
  let json = await res.data;
  console.log(json);
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

export const putActualizarEstadosPostulante = async (form,setResponse,resolve,reject)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };
  try{
    let res = await axios.put(`${process.env.REACT_APP_API_URL}/api/postulantes/estado/${form._Id}`,form,config),
    json = await res.data;
    console.log(json);
    
    setResponse({ status: 200, msg: json.msg, modal: true });
    resolve();
  }catch(err){
    console.log(err.response);
    setResponse({
      status: err.response.status,
      msg: err.response.data ? err.response.data.msg : "Ocurrio un Error",
      modal: true,
    });
    reject();
  }
} 

//Peticion que Actualiza una Solicitud (Requerimiento del personal)
export const putPeticionActualizarSolicitud = async (form, setResponse,setLoading) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  };

  try{
    let res = await axios.put(`${process.env.REACT_APP_API_URL}/api/capacitacion/solicitudes/${form.sPer_Id}`,form,config);
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
    setLoading(false);
  }
};

export const putActualizarLinkEntre = async(idGrupo,form,setLink,setOnEdit,setLoading)=>{
  try{
    let res = await axios.put(`${process.env.REACT_APP_API_URL}/api/actualizarLinkGrupo/${idGrupo}`,form,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    });
    let json = await res.data;
    //console.log(json);
    if(json){
      setLink(form.Grup_Link_Entrevista)
    }
    
  }catch(err){
    console.log(err,err.response);
  }finally{
    setOnEdit(false);
    setLoading(false)
  }
}

export const putActualizarEstadoEntrevGrupo = async(idGrupo,form,setResponse,setLoading)=>{
  try{
    let res = await axios.put(`${process.env.REACT_APP_API_URL}/api/actualizarEstadoGrupo/${idGrupo}`,form,
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
}