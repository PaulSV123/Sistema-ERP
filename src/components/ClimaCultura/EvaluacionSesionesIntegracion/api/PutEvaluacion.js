import axios from "axios";
import { getToken } from '../../../../dist/Token';

export const putActualizarRegistroPracticantes = async(
    eva_integra_id,
    eva_integra_descripcion,
    puntaje1,
    puntaje2,
    puntaje3,
    puntaje4,
    eva_integra_observacion,
    setLoading
    )=>{
      console.log(eva_integra_id);
      console.log(eva_integra_descripcion);
      console.log(puntaje1);
      console.log(puntaje2);
      console.log(puntaje3);
      console.log(puntaje4);
      console.log(eva_integra_observacion);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/clima/evaIntegracion/${eva_integra_id}`,
        {
            eva_integra_descripcion,
            puntaje1,
            puntaje2,
            puntaje3,
            puntaje4,
            eva_integra_observacion,
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