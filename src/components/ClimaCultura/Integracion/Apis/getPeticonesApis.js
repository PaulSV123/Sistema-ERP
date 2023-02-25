import axios from "axios";
import { getToken } from "../../../../dist/Token";

  export const getPeticionAreasApi = async () => {
    const arrayAreasId = [];
    try{
     let Response = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/areas`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      
        for (let i = 0; i < Response.data.id.length; i++) {
          const areasId = {};
          areasId.value = Response.data.id[i];
          areasId.label = Response.data.Areas[i];
          arrayAreasId.push(areasId);
        }
 
      }catch(e) {
        console.log(e);
      };
      return arrayAreasId;
  };


  //Petición para obtener data para Perfiles
export const getPeticionPerfilesApi= async () => {
    let dataPerfiles = [];
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/perfil`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((Response) => {
        const data = Response.data.perfiles
        dataPerfiles = [... data]
      })
      .catch((e) => {});
      return dataPerfiles;
  };

  //Peticion Marcas
export const getPeticionMarcasApi = async () => {
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
        //console.log(arrayMarcasId)
      })
      .catch((e) => {});
      return arrayMarcasId;
  };


  export const getPeticionDepartamentoApi = async () => {
    const arrayUnidadesId = [];
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((Response) => {
        for (let i = 0; i < Response.data.id.length; i++) {
          const unidadesId = {};
          unidadesId.id = Response.data.id[i];
          unidadesId.unidad = Response.data.Unidades[i];
          arrayUnidadesId.push(unidadesId);
        }
       //console.log(arrayUnidadesId)
      })
      .catch((e) => {
        console.log(e);
      });
      return arrayUnidadesId;
  };