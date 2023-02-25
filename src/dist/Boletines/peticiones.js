import { red } from "@mui/material/colors";
import axios from "axios";
import { getToken } from "../Token";

export const getCarpetasBoletines = async (setCarpetas) => {
  try {
    let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boletinesRP/carpetas`
      ),
      json = await res.data;
    setCarpetas(json.data);
    console.log(json.data);
  } catch (err) {
    console.log(err);
  }
};

export const postCrearCarpetaBoletin = async (
  form,
  setLoading,
  setResponse
) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/boletinesRP/insertarCarpetas`,
      form,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    let json = await res.data;
    console.log(json);
    setResponse({ status: 200, msg: json.msg, modal: true });
  } catch (err) {
    console.log(err.response, err.response.data.errors);
    setResponse({
      status: err.response.status,
      msg: err.response.data.errors
        ? err.response.data.errors.AnioCarpeta[0]
        : "Ocurrio un Error",
      modal: true,
    });
    //setResponse(err.response.data.errors? err.response.data.errors.AnioCarpeta[0] : 'Ocurrio un Error');
  } finally {
    setLoading(false);
  }
};
export const deleteCarpetaBoletin = async (idcarp, setLoading, setResponse) => {
  try {
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/boletinesRP/carpeta/${idcarp}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    let json = await res.data;
    console.log(json);
    setResponse({ status: json.status, msg: json.msg, modal: true });
  } catch (err) {
    console.log(err);
    setResponse({
      status: err.response.status,
      msg: err.response.data.errors
        ? JSON.stringify(err.response.data.errors)
        : "Ocurrio un Error",
      modal: true,
    });
  } finally {
    setLoading(false);
  }
};

export const putEditarCarpetaBoletin = async (
  form,
  setLoading,
  setResponse
) => {
  try {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/boletinesRP/carpeta/${form.idcarp}`,
      { Año: form.AnioCarpeta },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    let json = await res.data;
    setResponse({ status: 200, msg: json.msg, modal: true });
  } catch (err) {
    console.log(err, err.response);
    setResponse({
      status: err.response.status,
      msg: err.response.data.errors
        ? err.response.data.errors.Año[0]
        : "Ocurrio un Error",
      modal: true,
    });
  } finally {
    setLoading(false);
  }
};

export const getBoletinesCarpeta = async (
  nomCarp,
  setFiles,
  setIdCarpeta,
  setError,
  setLoading
) => {
  try {
    let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boletinesRP/BoletinesAnio/${nomCarp}`
      ),
      json = await res.data;
    console.log(json);
    setFiles(json.data.Boletines);
    setIdCarpeta(json.data.IdCarpeta);
  } catch (err) {
    console.log(err);
    err.response && setError(err.response);
  } finally {
    setLoading(false);
  }
};

export const postSubirArchivo = async (
  formData,
  setLoadingUpload,
  setResponse
) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/boletinesRP/subirBoletin`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      }
    );
    let json = await res.data;
    console.log(json);
    setResponse({ status: 200, msg: json.msg, modal: true });
  } catch (err) {
    console.log(err, err.response);
    setResponse({
      status: err.response.status,
      msg: err.response.data ? err.response.data.msg : "Ocurrio un Error",
      modal: true,
    });
  } finally {
    setLoadingUpload(false);
  }
};

export const putEditarArchivo = async (
  idBoletin,
  data,
  resolve,
  setResponse,
  reject
) => {
  try {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/boletinesRP/boletin/${idBoletin}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    let json = await res.data;
    console.log(json);
    setResponse({ status: 200, msg: json.msg, modal: true });
    resolve();
  } catch (err) {
    console.log(err,err.response);
    setResponse({
      status: err.response.status,
      msg: err.response.data.msg ? err.response.data.msg : "Ocurrio un Error",
      modal: true,
    });
    reject();
  }
};

export const deleteElliminarArchivo = async (
  idBoletin,
  resolve,
  setResponse,
  reject
) => {
  try {
    let res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boletinesRP/boletin/${idBoletin}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      ),
      json = await res.data;
    console.log(json);
    setResponse({ status: 200, msg: json.msg, modal: true });
    resolve();
  } catch (err) {
    console.log(err);
    setResponse({
      status: err.response.status,
      msg: err.response.data.msg ? err.response.data.msg : "Ocurrio un Error",
      modal: true,
    });
    reject();
  }
};

export const putMoverArchivoOtraCarpeta = async (idArchivo, idCarpeta,setResponse,setLoading) => {
  try {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/boletinesRP/moverBoltinCarpeta`,
      { id_boletin: idArchivo, id_carpeta: idCarpeta },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    let json = await res.data;
    setResponse({ status: 200, msg: json.msg, modal: true });
  } catch (err) {
    console.log(err);
    setResponse({
      status: err.response.status,
      msg: err.response.data.msg ? err.response.data.msg : "Ocurrio un Error",
      modal: true,
    });
  }finally{
    setLoading(false);
  }
};
