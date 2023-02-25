import axios from "axios";
import { getToken } from "../Token";

export const deleteCurso = async (idCurso, setLoading) => {
  idCurso != null &&
    (await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/capacitacion/cursos/${idCurso}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data }) => {
        console.log(data.msg);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e.msg);
        //alert(JSON.stringify(e));
      }));
};

export const deleteAspecto = async (idAspecto, setLoading) => {
  idAspecto != null &&
    (await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/capacitacion/aspectos/${idAspecto}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data }) => {
        //alert(JSON.stringify(data));
        setLoading(true);
      })
      .catch((e) => {
        //alert(JSON.stringify(e));
        console.log(e);
      }));
};

export const deletePlataforma = async (idPlataforma, setLoading) => {
  idPlataforma != null &&
    (await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/capacitacion/plataformas/${idPlataforma}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data }) => {
        //alert(JSON.stringify(data));
        setLoading(true);
      })
      .catch((e) => {
        //alert(JSON.stringify(e));
        console.log(e);
      }));
};

export const deleteActividad = async (idActividad, setLoading) => {
  idActividad != null &&
    (await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/capacitacion/actividades/${idActividad}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data }) => {
        setLoading(true);
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      }));
};

export const deleteEvaluacion = async (idEvaluacion, setLoading) => {
  idEvaluacion != null &&
    (await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/capacitacion/eliminarEvaluacion/${idEvaluacion}`, {
          headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data }) => {
        console.log(data.msg);
        //alert(JSON.stringify(data.msg));
        setLoading(true);
      })
      .catch((e) => {
        console.log(e.response.data.errors);
        //alert(JSON.stringify(e));
      }));
};

export const deleteNoTerminoCapacitacion = async (Capa_Id, setLoading) => {
  Capa_Id != null &&
    (await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/capacitacion/${Capa_Id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data }) => {
        //console.log(data.msg);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e.msg);
        //alert(JSON.stringify(e));
      }));
};

/* export const deletecapacitacion = async (id_Capacitacion, setLoading) => {
  id_Capacitacion != null &&
    (await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/capacitacion/capacitacion/${id_Capacitacion}`, {
          headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data }) => {
        console.log(data.msg);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e.msg);
        //alert(JSON.stringify(e));
      }));
};
 */
