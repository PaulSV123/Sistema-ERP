import axios from "axios";
import { getToken } from "./Token";

export const deletePeticionRecursos = async (id,setResponse,abrirCerrarModalEliminar) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    };
  
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/recurso/${id}`,
        config
      ).then((Response) => {
        console.log(Response);
        setResponse({ status: 200, msg: Response.data.msg, modal: true });
        abrirCerrarModalEliminar();
      })
      .catch((err) => {
        console.log(err);
        setResponse({
          status: err.response.status,
          msg: err.response.data ? err.response.data.msg : "Ocurrio un Error",
          modal: true,
        });
        abrirCerrarModalEliminar();
      });
  };

  export const deletePeticionPostulantes= async (id,setResponse,setDeletePost) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    };
  
    /* await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/postulantes/${id}`,
        config
      ).then((Response) => {
        console.log(Response);
        //alert(JSON.stringify(Response));
      })
      .catch((e) => {
        alert(JSON.stringify(e));
        console.log(e);
      }); */
      try{
          let res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/postulantes/${id}`,config);
          let json = await res.data;
          setResponse({ status: 200, msg: json.msg, modal: true });
      }catch(err){
        console.log(err);
        setResponse({
          status: err.response.status,
          msg: err.response.data ? err.response.data.msg : "Ocurrio un Error",
          modal: true,
        });
      }finally{
        setDeletePost({post:null,open:false})
       } 
  };

  export const deletePeticionSolicitud= async (id,setResponse,setLoading) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    };
  
    try{
      let res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/capacitacion/solicitudes/${id}`,config);
      let json = await res.data;
      setResponse({status:200,msg:json.msg,modal:true});
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

  export const deleteDeshacerGrupoEntrev = async (idGrupEntre,setResponse,setLoading)=>{
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    };
    try{
      let res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/eliminarGrupoEntrevista/${idGrupEntre}`,config);
      let json = await res.data;
      console.log(json);
      setResponse({status:200,msg:json.msg,modal:true});
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
  }
  export const deleteEliminarEntredelGrupo = async (idPost,setResponse,setLoading)=>{
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    };
    try{
      let res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/eliminarEntrevistado/${idPost}`,config);
      let json = await res.data;
      console.log(json);
      setResponse({status:200,msg:json.msg,modal:true});
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
  }